
import { CheckSquare, Globe, Clock, ArrowRight } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Globe className="h-10 w-10 text-bank-blue" />,
      title: "Select Countries & Banks",
      description: "Choose the sending and receiving countries, banks, transfer type, and method.",
    },
    {
      icon: <CheckSquare className="h-10 w-10 text-bank-blue" />,
      title: "Instant Verification",
      description: "Our system checks if your transfer is possible and provides real-time information.",
    },
    {
      icon: <Clock className="h-10 w-10 text-bank-blue" />,
      title: "Get Transfer Details",
      description: "View estimated fees, processing times, and any limitations that may apply.",
    },
    {
      icon: <ArrowRight className="h-10 w-10 text-bank-blue" />,
      title: "Make Your Transfer",
      description: "Use the information to proceed with your bank transfer with confidence.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-bank-lightGray/30" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our service provides transparent information about international money transfers.
            Here's how you can use our platform to check your transfer options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="glass-card p-6 rounded-xl hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 p-3 bg-bank-blue/10 rounded-full">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground/50" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
