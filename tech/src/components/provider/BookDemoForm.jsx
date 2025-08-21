import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogOverlay,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const API_URI = "https://tech-in-rent.onrender.com";

const bookDemoSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  company: z.string().min(2, "Company name is required"),
  designation: z.string().min(2, "Please enter your job title or designation"),
});

export function BookDemoForm({ isOpen, onClose }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookDemoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      designation: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        companyName: data.company,
        jobtitle: data.designation,
      };

      const response = await fetch(`${API_URI}/api/book-demo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let serverMessage = "Failed to submit demo request";
        try {
          const errJson = await response.json();
          serverMessage = errJson?.message || errJson?.error || serverMessage;
        } catch {}
        throw new Error(serverMessage);
      }

      toast({
        title: "Demo Request Submitted",
        description: "We'll contact you within 24 hours to schedule your demo.",
      });

      reset();
      onClose();
    } catch (error) {
      console.error("Error submitting demo request:", error);
      toast({
        title: "Error",
        description:
          error?.message || "Failed to submit demo request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      {/* Overlay with blur */}
      <DialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Responsive form */}
      <DialogContent className="z-[60] w-[95%] max-w-sm sm:max-w-[425px] bg-white rounded-2xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book a Demo</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll schedule a personalized demo for
            you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                placeholder="Enter your first name"
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                {...register("lastName")}
                placeholder="Enter your last name"
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email address"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="Enter your phone number"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                {...register("company")}
                placeholder="Enter your company name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">Designation/Job Title *</Label>
              <Input
                id="designation"
                {...register("designation")}
                placeholder="Enter your job title"
                className={errors.designation ? "border-red-500" : ""}
              />
              {errors.designation && (
                <p className="text-red-500 text-xs">
                  {errors.designation.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Submitting..." : "Book Demo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
