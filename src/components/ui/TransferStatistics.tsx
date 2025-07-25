
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Clock, Calendar, BarChart2, TrendingUp, Users } from "lucide-react";
import { TransferStatistic } from "@/utils/transferData";
import { ReliabilityData } from "@/types/transfer";
import ReliabilityChart from "./ReliabilityChart";

interface TransferStatisticsProps {
  statistics: TransferStatistic;
}

// Extended TransferStatistic to include additional fields that may not be in the base type
declare module "@/utils/transferData" {
  interface TransferStatistic {
    notes?: string;
    lastUpdated?: string;
  }
}

const TransferStatistics = ({ statistics }: TransferStatisticsProps) => {
  // Create reliability data for the chart
  const createReliabilityData = (): ReliabilityData => {
    const { successRate } = statistics;
    
    // Use reliabilityData directly if available
    if (statistics.reliabilityData) {
      // Make sure we have the necessary fields
      const days = statistics.reliabilityData.days || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const values = statistics.reliabilityData.values || [85, 90, 88, 92, 87, 82, 80];
      
      return {
        days,
        values,
        reliability: calculateAverageReliability(values)
      };
    }
    
    // Default data in case statistics are incomplete
    const defaultData: ReliabilityData = {
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [85, 92, 89, 94, 90, 87, 83],
      reliability: successRate || 90
    };
    
    return defaultData;
  };

  // Helper function to calculate average reliability
  const calculateAverageReliability = (values: number[] = []): number => {
    if (!values || values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return Number((sum / values.length).toFixed(1));
  };

  const reliabilityData = createReliabilityData();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Success Rate Section */}
        <Card className="border-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Successful Transfers
              </span>
              <Badge 
                variant="outline" 
                className={`
                  ${statistics.successRate >= 95 
                    ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                    : statistics.successRate >= 80 
                      ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      : 'bg-red-500/10 text-red-500 border-red-500/20'
                  }
                `}
              >
                {statistics.successRate}%
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {statistics.successRate >= 95 
                ? 'Excellent reliability with minimal issues'
                : statistics.successRate >= 80
                  ? 'Good reliability with occasional issues'
                  : 'Variable reliability with some issues'
              }
            </p>
          </CardContent>
        </Card>

        {/* Average Processing Section */}
        <Card className="border-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-blue-500" />
                Average Processing Time
              </span>
              <Badge 
                variant="outline" 
                className="bg-blue-500/10 text-blue-500 border-blue-500/20"
              >
                {statistics.averageTime || "N/A"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Typical processing time based on recent transfers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {statistics.totalTransactions && (
          <Card className="border-primary/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-indigo-500" />
                  Total Transactions
                </span>
                <Badge 
                  variant="outline" 
                  className="bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
                >
                  {statistics.totalTransactions.toLocaleString()}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Total number of processed transfers
              </p>
            </CardContent>
          </Card>
        )}

        {statistics.lastMonthGrowth !== undefined && (
          <Card className="border-primary/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-pink-500" />
                  Last Month Growth
                </span>
                <Badge 
                  variant="outline" 
                  className={`
                    ${statistics.lastMonthGrowth > 0 
                      ? 'bg-green-500/10 text-green-500 border-green-500/20' 
                      : 'bg-red-500/10 text-red-500 border-red-500/20'
                    }
                  `}
                >
                  {statistics.lastMonthGrowth > 0 ? '+' : ''}{statistics.lastMonthGrowth}%
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Change in number of transfers over the last month
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Reliability Chart */}
      <Card className="border-primary/10">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium flex items-center gap-1.5">
              <BarChart2 className="h-4 w-4 text-purple-500" />
              Reliability by Day of Week
            </span>
            <Badge 
              variant="outline"
              className="bg-purple-500/10 text-purple-500 border-purple-500/20 flex items-center gap-1"
            >
              <Calendar className="h-3 w-3 mr-0.5" />
              Latest Data
            </Badge>
          </div>
          
          {/* Pass reliability data correctly to the chart */}
          <div className="h-48">
            <ReliabilityChart data={reliabilityData} />
          </div>
          
          {statistics.lastUpdated && (
            <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1.5">
              <Calendar className="h-3 w-3" />
              Last Updated: {statistics.lastUpdated}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Average Amount Section */}
      {statistics.averageAmount && (
        <Card className="border-primary/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium flex items-center gap-1.5">
                <BarChart2 className="h-4 w-4 text-teal-500" />
                Average Transfer Amount
              </span>
              <Badge 
                variant="outline" 
                className="bg-teal-500/10 text-teal-500 border-teal-500/20"
              >
                {statistics.averageAmount}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Average amount of all transfers in this direction
            </p>
          </CardContent>
        </Card>
      )}

      {/* Warnings or Notes */}
      {statistics.notes && (
        <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-md border border-amber-200 dark:border-amber-800/50">
          <AlertTriangle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-medium text-amber-700 dark:text-amber-400">Note:</p>
            <p className="text-amber-600 dark:text-amber-300">{statistics.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransferStatistics;
