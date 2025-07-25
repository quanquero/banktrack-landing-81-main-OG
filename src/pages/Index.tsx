
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight, Globe, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { TransferChecker } from "@/components/TransferChecker";
import HowItWorks from "@/components/HowItWorks";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { transferMethods } from "@/utils/transferData";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const features = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Coverage",
      description: "Track transfers between major banks in over 100 countries worldwide."
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Accurate Information",
      description: "Get real-time data on fees, processing times, and transfer limitations."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Instant Verification",
      description: "Check transfer possibilities between banks in seconds."
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "AI-Powered Data",
      description: "Advanced AI technology provides the most current transfer information."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section with prominent transfer checker */}
      <section className="pt-20 pb-8 md:pt-28 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="staggered-animate">
              <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-xs font-medium bg-bank-blue/10 text-bank-blue border-bank-blue/20">
                International Bank Transfer Tracking
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
                Track your international bank transfers with AI
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Get instant information about fees, processing times and limitations for international transfers between banks worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prominent Transfer Checker Section */}
      <section className="py-6 pb-12 bg-bank-blue/5">
        <div className="container mx-auto px-4">
          <div className="w-full max-w-4xl mx-auto">
            <div className="glass-card border-primary/20 shadow-soft p-6 rounded-xl bg-white ring-2 ring-bank-blue/20 animate-fade-in">
              <h2 className="text-2xl font-bold mb-6 text-center text-bank-blue">Check Your Transfer Now</h2>
              <TransferChecker />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-bank-lightGray/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`glass-card p-6 rounded-xl hover-lift ${
                  isVisible ? 'animate-fade-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="h-12 w-12 rounded-lg bg-bank-blue/10 flex items-center justify-center text-bank-blue mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <HowItWorks />
      
      {/* Reviews Section */}
      <Reviews />
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-bank-blue to-bank-navy text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to track your international transfers?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Join thousands of users who trust BankTrack for accurate transfer information.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="bg-white text-bank-blue hover:bg-gray-100 w-full sm:w-auto">
                Sign Up for Free
              </Button>
              <Button variant="sales" className="w-full sm:w-auto">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
};

export default Index;
