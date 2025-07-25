import { Building2, Shield, Globe, TrendingUp, Users, Database } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IntelStats = () => {
  const stats = [
    {
      title: "Total PSP Providers",
      value: "50+",
      description: "Across 3 jurisdictions",
      icon: <Building2 className="h-8 w-8 text-bank-blue" />,
      trend: "+12% this month"
    },
    {
      title: "Active Licenses",
      value: "45",
      description: "Currently operational",
      icon: <Shield className="h-8 w-8 text-green-600" />,
      trend: "98% success rate"
    },
    {
      title: "Jurisdictions",
      value: "3",
      description: "UK, Lithuania, Singapore",
      icon: <Globe className="h-8 w-8 text-purple-600" />,
      trend: "Expanding to EU"
    },
    {
      title: "Data Updates",
      value: "24/7",
      description: "Real-time monitoring",
      icon: <Database className="h-8 w-8 text-orange-600" />,
      trend: "Automated via AI"
    },
    {
      title: "B2B Clients",
      value: "25+",
      description: "Using our API",
      icon: <Users className="h-8 w-8 text-teal-600" />,
      trend: "+5 new this quarter"
    },
    {
      title: "Data Accuracy",
      value: "99.5%",
      description: "Verified information",
      icon: <TrendingUp className="h-8 w-8 text-indigo-600" />,
      trend: "Industry leading"
    }
  ];

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Platform Statistics</h2>
        <p className="text-muted-foreground">
          Real-time data on PSP providers and platform usage
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className="glass-card hover-lift transition-all duration-300"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="text-muted-foreground">
                {stat.icon}
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mb-1">
                {stat.description}
              </p>
              <p className="text-xs text-green-600 font-medium">
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-bank-blue/5 rounded-lg">
          <h3 className="font-semibold mb-2">License Types</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div>EMI: 20 providers</div>
            <div>PI: 15 providers</div>
            <div>Orchestration: 8 providers</div>
            <div>White-label: 7 providers</div>
          </div>
        </div>
        
        <div className="text-center p-4 bg-bank-blue/5 rounded-lg">
          <h3 className="font-semibold mb-2">Top Services</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div>Card Acquiring: 45 providers</div>
            <div>Payouts: 42 providers</div>
            <div>API Services: 38 providers</div>
            <div>FX: 35 providers</div>
          </div>
        </div>
        
        <div className="text-center p-4 bg-bank-blue/5 rounded-lg">
          <h3 className="font-semibold mb-2">Jurisdiction Breakdown</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <div>UK: 25 providers</div>
            <div>Lithuania: 15 providers</div>
            <div>Singapore: 10 providers</div>
            <div>EU Expansion: Coming soon</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelStats; 