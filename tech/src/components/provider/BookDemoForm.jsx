
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const API_URI = "https://tech-in-rent.onrender.com";

// ✅ Strong schema
const bookDemoSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .regex(/^[A-Za-z]+$/, "First name should contain only letters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .regex(/^[A-Za-z]+$/, "Last name should contain only letters"),
  email: z
    .string()
    .email("Enter a valid email address")
    .regex(
      /^[a-zA-Z0-9._%+-]+@(?!gmail\.com$)(?!yahoo\.com$)(?!outlook\.com$)(?!hotmail\.com$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Only business emails are allowed"
    )
    .refine(
      (val) => /(info|support|sales|contact|admin)@/.test(val),
      "Use a business email like info@company.com"
    ),
  phone: z
    .string()
    .regex(
      /^\+[1-9]{1}[0-9]{1,3}[0-9]{6,12}$/,
      "Enter a valid phone number with country code (e.g. +14155552671)"
    ),
  company: z.string().min(2, "Company name is required"),
  designation: z.string().min(2, "Designation is required"),
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
      <DialogContent className="w-[95%] max-w-sm sm:max-w-[425px] bg-white rounded-2xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book a Demo</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll schedule a personalized demo for
            you.
          </DialogDescription>
        </DialogHeader>

        {/* ✅ Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First + Last Name */}
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

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Business Email *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="e.g. info@company.com"
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              {...register("phone")}
              placeholder="+14155552671"
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs">{errors.phone.message}</p>
            )}
          </div>

          {/* Company + Designation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input
                id="company"
                {...register("company")}
                placeholder="Enter your company name"
                className={errors.company ? "border-red-500" : ""}
              />
              {errors.company && (
                <p className="text-red-500 text-xs">{errors.company.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="designation">Designation *</Label>
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

          {/* Buttons */}
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
