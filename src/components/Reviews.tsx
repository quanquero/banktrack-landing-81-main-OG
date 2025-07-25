
import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { reviews } from "@/utils/transferData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };
  
  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };
  
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-bank-lightGray/30 to-white" id="reviews">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-foreground">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real experiences from people who have used our service to check and make international transfers.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="glass-card border-primary/20 p-8 md:p-12 rounded-xl">
            <Quote className="h-12 w-12 text-bank-blue/20 absolute top-6 left-6" />
            
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-20 h-20 mb-4 border-4 border-white shadow-soft">
                <AvatarImage src={reviews[currentIndex].avatar} alt={reviews[currentIndex].name} />
                <AvatarFallback className="bg-bank-blue text-white">
                  {reviews[currentIndex].name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <h3 className="text-xl font-semibold mb-1">{reviews[currentIndex].name}</h3>
              
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex">
                  {renderStars(reviews[currentIndex].rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {new Date(reviews[currentIndex].date).toLocaleDateString()}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <Badge variant="secondary" className="bg-accent">
                  {reviews[currentIndex].fromCountry} to {reviews[currentIndex].toCountry}
                </Badge>
                <Badge variant="outline" className="bg-white">
                  {reviews[currentIndex].method}
                </Badge>
              </div>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
                "{reviews[currentIndex].text}"
              </p>
              
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevReview}
                  className="rounded-full"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex space-x-1">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        index === currentIndex ? 'bg-bank-blue' : 'bg-bank-gray/20'
                      }`}
                      aria-label={`Go to review ${index + 1}`}
                    />
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextReview}
                  className="rounded-full"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
