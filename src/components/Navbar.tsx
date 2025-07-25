
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="sr-only">BankTrack Logo</span>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-bank-blue to-bank-navy flex items-center justify-center">
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M3 8L12 4L21 8M7 17V11M12 17V11M17 17V11M3 8V16L12 20L21 16V8" 
                    stroke="white" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-bold text-xl">BankTrack</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#how-it-works" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a 
              href="#reviews" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Reviews
            </a>
            <a 
              href="#check-transfer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Check Transfer
            </a>
            <Link 
              to="/intel"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Intel
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              className="text-sm font-medium hover:text-bank-blue"
            >
              Log In
            </Button>
            <Button 
              className="bg-bank-blue hover:bg-bank-navy text-white transition-colors"
            >
              Sign Up
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2" 
            onClick={() => setIsMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-4 px-4 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#how-it-works" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#reviews" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Reviews
            </a>
            <a 
              href="#check-transfer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Check Transfer
            </a>
                <Link 
                  to="/intel"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors p-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Intel
                </Link>
            <hr className="border-border" />
            <div className="flex flex-col space-y-2">
              <Button 
                variant="ghost" 
                className="justify-start"
              >
                Log In
              </Button>
              <Button 
                className="bg-bank-blue hover:bg-bank-navy text-white transition-colors w-full"
              >
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
