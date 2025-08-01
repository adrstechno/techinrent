import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show the popup when component mounts
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleUserTypeSelect = (type) => {
    // Save user type in localStorage
    localStorage.setItem('userType', type);
    setIsOpen(false);
    // Here you would typically redirect or show different content
    // based on the user type selection
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Welcome to TechInRent
          </DialogTitle>
          <DialogDescription className="text-center">
            Choose your role to get started with our LinkedIn account rental service.
          </DialogDescription>
        </DialogHeader>
        <button
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            onClick={() => handleUserTypeSelect('taker')}
            className="flex flex-col h-32 items-center justify-center bg-primary hover:bg-primary/90"
          >
            <span className="text-2xl mb-2">👤</span>
            <span className="font-bold">LinkedIn Taker</span>
            <span className="text-xs mt-1">Rent an account</span>
          </Button>
          <Button
            onClick={() => handleUserTypeSelect('provider')}
            className="flex flex-col h-32 items-center justify-center bg-secondary hover:bg-secondary/90"
          >
            <span className="text-2xl mb-2">💼</span>
            <span className="font-bold">LinkedIn Provider</span>
            <span className="text-xs mt-1">List your account</span>
          </Button>
        </div>
        <DialogFooter className="sm:justify-center">
          <p className="text-xs text-muted-foreground text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomePopup;