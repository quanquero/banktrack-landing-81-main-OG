interface GoogleSheetsTransferData {
  fromCountry: string;
  toCountry: string;
  fromBank?: string;
  toBank?: string;
  method: string;
  transferType: string;
  available: string;
  fee: string;
  processingTime: string;
  limitations: string;
  // Statistical fields
  successRate?: string;
  averageTime?: string;
  totalTransactions?: string;
  averageAmount?: string;
  lastMonthGrowth?: string;
  popularDays?: string;
  // Fields for individual reliability days
  reliability_mon?: string;
  reliability_tue?: string;
  reliability_wed?: string;
  reliability_thu?: string;
  reliability_fri?: string;
  reliability_sat?: string;
  reliability_sun?: string;
}

export interface ProcessedTransferData {
  fromCountry: string;
  toCountry: string;
  fromBank?: string;
  toBank?: string;
  method: string;
  transferType: string;
  available: boolean;
  fee: string;
  processingTime: string;
  limitations: string;
  // Statistical fields
  successRate?: number;
  averageTime?: string;
  totalTransactions?: number;
  averageAmount?: string;
  lastMonthGrowth?: number;
  popularDays?: string[];
  // Reliability data for the last 7 days
  reliabilityData?: {
    days: string[];
    values: number[];
    dates: string[];
    reliability: number;
  };
}

// Your Google Sheets spreadsheet ID
const SPREADSHEET_ID = "\";
const SHEET_NAME = "TransferData";

// Function to fetch data from Google Sheets
export async function fetchTransferDataFromGoogleSheets(): Promise<ProcessedTransferData[]> {
  try {
    // URL for accessing the published sheet in CSV format
    const url = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/gviz/tq?tqx=out:csv&sheet=${SHEET_NAME}`;
    
    const response = await fetch(url, {
      method: 'GET',
      cache: 'no-cache', // Avoid caching issues
      headers: {
        'Content-Type': 'text/csv',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const csvText = await response.text();
    
    // Debug information
    console.log("Raw CSV data:", csvText.substring(0, 500) + "...");
    
    const data = parseCSV(csvText);
    
    console.log("Parsed data from Google Sheets:", data);
    
    if (data.length === 0) {
      console.error("No data parsed from Google Sheets");
      return [];
    }
    
    // Transform data to the required format
    const processedData = data.map(row => {
      console.log("Processing row:", row);
      
      // Check for weird key names with trailing spaces and fix them
      const cleanedRow = cleanRowKeys(row);
      
      return {
        fromCountry: cleanedRow.fromCountry || "",
        toCountry: cleanedRow.toCountry || "",
        fromBank: cleanedRow.fromBank || undefined,
        toBank: cleanedRow.toBank || undefined,
        method: cleanedRow.method || "",
        transferType: cleanedRow.transferType || "",
        available: cleanedRow.available?.toLowerCase() === "true" || 
                  cleanedRow.available?.toLowerCase() === "yes" || false,
        fee: cleanedRow.fee || "",
        processingTime: cleanedRow.processingTime || "",
        limitations: cleanedRow.limitations || "",
        // Convert statistics fields
        successRate: cleanedRow.successRate ? parseFloat(cleanedRow.successRate.replace('%', '')) : undefined,
        averageTime: cleanedRow.averageTime || undefined,
        totalTransactions: cleanedRow.totalTransactions ? parseInt(cleanedRow.totalTransactions.replace(/,/g, ''), 10) : undefined,
        averageAmount: cleanedRow.averageAmount || undefined,
        lastMonthGrowth: cleanedRow.lastMonthGrowth ? parseFloat(cleanedRow.lastMonthGrowth.replace('%', '')) : undefined,
        popularDays: cleanedRow.popularDays ? cleanedRow.popularDays.split(',').map(day => day.trim()) : undefined,
        // Process reliability data for the last 7 days
        reliabilityData: processReliabilityData(cleanedRow)
      };
    });
    
    console.log("Processed data:", processedData);
    return processedData;
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return [];
  }
}

// Helper function to clean row keys by removing trailing spaces
function cleanRowKeys(row: GoogleSheetsTransferData): GoogleSheetsTransferData {
  const cleanedRow: any = {};
  
  Object.keys(row).forEach(key => {
    // Remove trailing spaces from keys
    const cleanKey = key.trim();
    cleanedRow[cleanKey] = row[key as keyof GoogleSheetsTransferData];
  });
  
  return cleanedRow as GoogleSheetsTransferData;
}

// Function to process reliability data from Google Sheets
function processReliabilityData(row: GoogleSheetsTransferData) {
  // Define weekday names in English
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  // Generate the current date for each day of the week
  const today = new Date();
  const formattedDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(today.getDate() - 6 + i);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  });
  
  // Get reliability values directly from the sheet
  const reliabilityValues: number[] = [];
  
  // Use the reliability values from Google Sheets for each weekday
  // This follows the order in spreadsheet (mon, tue, wed, thu, fri, sat, sun)
  const weekdayKeys = [
    'reliability_mon',
    'reliability_tue',
    'reliability_wed',
    'reliability_thu',
    'reliability_fri',
    'reliability_sat',
    'reliability_sun'
  ];

  // Start from Monday (index 1) in our dayNames array
  const weekdayOrder = [1, 2, 3, 4, 5, 6, 0]; // mon=1, tue=2, ..., sun=0
  
  // Get values in the right order based on weekdayOrder
  for (let i = 0; i < 7; i++) {
    const dayKey = weekdayKeys[i];
    
    // Try both potential key formats (with and without trailing space)
    let value: any = row[dayKey as keyof GoogleSheetsTransferData];
    if (value === undefined) {
      const keyWithSpace = `${dayKey} ` as keyof GoogleSheetsTransferData;
      value = row[keyWithSpace];
    }
    
    // Ensure proper parsing of reliability values
    let numValue = 0;
    if (value !== undefined) {
      // Remove any whitespace and parse as float
      const cleanValue = value.toString().trim();
      numValue = cleanValue ? parseFloat(cleanValue) : 0;
    }
    
    reliabilityValues.push(numValue);
  }
  
  // Reorder days based on current day
  const today_dayIdx = today.getDay(); // 0 = Sunday, 1 = Monday, ...
  
  // We want to show 7 days, starting from today
  const daysShift = weekdayOrder.indexOf(today_dayIdx);
  
  // Reorder the days, values, and dates to start from the current day
  const reorderedDays: string[] = [];
  const reorderedValues: number[] = [];
  const reorderedDates: string[] = [];
  
  for (let i = 0; i < 7; i++) {
    const idx = (daysShift + i) % 7;
    reorderedDays.push(dayNames[weekdayOrder[idx]]);
    reorderedValues.push(reliabilityValues[idx]);
    reorderedDates.push(formattedDates[i]); // Dates are already in the correct order
  }
  
  // Calculate average reliability
  const reliabilitySum = reorderedValues.reduce((sum, value) => sum + value, 0);
  const reliabilityAvg = reorderedValues.length > 0 ? Number((reliabilitySum / reorderedValues.length).toFixed(1)) : 0;
  
  return {
    days: reorderedDays,
    values: reorderedValues,
    dates: reorderedDates,
    reliability: reliabilityAvg
  };
}

// Improved CSV parser
function parseCSV(csv: string): GoogleSheetsTransferData[] {
  const lines = csv.split('\n');
  if (lines.length < 2) {
    console.error("CSV has less than 2 lines", lines);
    return [];
  }
  
  const headers = parseCSVLine(lines[0]);
  console.log("CSV Headers:", headers);
  
  if (headers.length === 0) {
    console.error("No headers found in CSV");
    return [];
  }
  
  const result: GoogleSheetsTransferData[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '') continue;
    
    const data = parseCSVLine(lines[i]);
    if (data.length === 0) continue;
    
    const item: any = {};
    
    headers.forEach((header, index) => {
      if (index < data.length) {
        item[header] = data[index];
      } else {
        item[header] = '';
      }
    });
    
    // Skip rows with empty from/to country
    if (!item.fromCountry || !item.toCountry) continue;
    
    result.push(item as GoogleSheetsTransferData);
  }
  
  return result;
}

// Function to parse a single CSV line accounting for quotes
function parseCSVLine(line: string): string[] {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else if (char === '"') {
      if (inQuotes && i < line.length - 1 && line[i+1] === '"') {
        // Handle escaped quotes (two double quotes in a row)
        current += '"';
        i++; // Skip the next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else {
      current += char;
    }
  }
  
  if (current !== '') {
    result.push(current);
  }
  
  return result;
}
