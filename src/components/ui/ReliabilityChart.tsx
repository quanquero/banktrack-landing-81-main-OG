
import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";
import { ReliabilityData } from "@/types/transfer";

interface ReliabilityChartProps {
  data?: ReliabilityData;
  className?: string;
}

const ReliabilityChart = ({ data, className }: ReliabilityChartProps) => {
  if (!data || !data.values || data.values.length === 0) {
    return null;
  }

  // Prepare chart data combining days and dates
  const chartData = data.values.map((value, index) => {
    const day = data.days?.[index] || `Day ${index + 1}`;
    const date = data.dates?.[index] || '';
    
    return {
      name: day,
      date: date,
      value: value
    };
  });

  // Custom tooltip showing date, day and value
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white/95 p-2 border border-border rounded shadow-sm text-sm">
          <p className="font-medium">{item.name}</p>
          {item.date && <p className="text-xs text-muted-foreground">{item.date}</p>}
          <p className="text-red-500 font-medium">{`${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  // Custom X-axis tick with weekday abbreviations and dates
  const CustomXAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const item = chartData[payload.index];
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text 
          x={0} 
          y={0} 
          dy={16} 
          fontSize={10} 
          textAnchor="middle" 
          fill="#666"
        >
          {item.name.split(' ')[0].substring(0, 3)}
        </text>
        {item.date && (
          <text 
            x={0} 
            y={16} 
            dy={12} 
            fontSize={8} 
            textAnchor="middle" 
            fill="#999"
          >
            {item.date}
          </text>
        )}
      </g>
    );
  };

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 0, left: 0, bottom: 25 }} // Increased bottom margin for dates
          >
            <defs>
              <linearGradient id="reliabilityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              tick={<CustomXAxisTick />}
              tickLine={false}
              axisLine={false}
              height={50} // Increased axis height to accommodate dates
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#ef4444" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#reliabilityGradient)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ReliabilityChart;
