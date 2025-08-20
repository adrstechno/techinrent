import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
// Use relative API path to leverage Vite proxy

const providerFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(6, "Please enter a valid phone number"),
  linkedinUrl: z.string().url("Please enter a valid LinkedIn profile URL"),
  profileStatus: z.enum(["verified", "nonVerified"]),
  additionalInfo: z.string().optional(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

export default function ProviderFormPopup({ isOpen, onClose }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setLocation] = useLocation();

  const form = useForm({
    resolver: zodResolver(providerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      linkedinUrl: "",
      profileStatus: "nonVerified",
      additionalInfo: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const payload = {
        fullName: data.fullName?.trim(),
        email: data.email?.trim(),
        phone: data.phone?.trim() || "N/A",
        linkedIn: data.linkedinUrl?.trim(),
        verification: data.profileStatus,
        additionalInfo: data.additionalInfo?.trim() || "N/A",
      };

      console.log("Sending to backend:", payload);

      const response = await fetch(
        `https://tech-in-rent.onrender.com/api/provider/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      console.log("Backend response:", result);

      if (!response.ok) {
        const rawMessage = result?.error || result?.message;
        const friendlyMessage =
          rawMessage && /E11000/.test(rawMessage)
            ? "This email is already registered. Please use a different email."
            : rawMessage || "Failed to submit form";
        throw new Error(friendlyMessage);
      }

      toast({
        title: "Application Submitted!",
        description:
          "We'll review your application and get back to you within 24 hours.",
      });

      form.reset();
      onClose();

      setTimeout(() => {
        setLocation("/admin");
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Submission failed. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="z-[70] max-w-3xl w-[95%] bg-white rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-blue-600">
            Earn Money With Your LinkedIn Account
          </DialogTitle>
          <DialogDescription className="text-base text-center text-gray-600 mb-6">
            Turn your professional profile into a revenue-generating asset. Earn
            guaranteed monthly payments for each approved account. Complete the
            form below to register as a provider.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* Form Section */}
          <div className="space-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 (123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn Profile URL *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/yourprofile"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profileStatus"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Profile Verification Status *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <div className="flex items-center space-x-3 rounded-md border p-3">
                            <RadioGroupItem value="verified" id="verified" />
                            <label
                              htmlFor="verified"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Verified Profile
                              <p className="text-xs text-muted-foreground mt-1">
                                My profile has 500+ connections and is regularly
                                active
                              </p>
                            </label>
                          </div>
                          <div className="flex items-center space-x-3 rounded-md border p-3">
                            <RadioGroupItem
                              value="nonVerified"
                              id="nonVerified"
                            />
                            <label
                              htmlFor="nonVerified"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Non-Verified Profile
                              <p className="text-xs text-muted-foreground mt-1">
                                Less than 500 connections or new account
                              </p>
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your LinkedIn profile, experience, industry, etc..."
                          className="resize-none min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-md border">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal">
                          I agree to the terms and privacy policy, and consent
                          to my profile being rented through this platform *
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <DialogFooter className="gap-2 sm:gap-0">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>

          {/* Benefits Section */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-lg font-semibold text-purple-700 mb-4">
                Benefits of Becoming a Provider
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-purple-100 p-1 mt-0.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="#7c3aed"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-blue-700">Monthly Income</p>
                    <p className="text-sm text-gray-600">
                      Guaranteed monthly payment for each approved account
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-purple-100 p-1 mt-0.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="#7c3aed"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Zero Technical Involvement</p>
                    <p className="text-sm text-gray-600">
                      We handle all the technical details for you
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-purple-100 p-1 mt-0.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="#7c3aed"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Account Protection</p>
                    <p className="text-sm text-gray-600">
                      Your profile is handled with utmost care and security
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-purple-100 p-1 mt-0.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 6L9 17L4 12"
                        stroke="#7c3aed"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Flexible Terms</p>
                    <p className="text-sm text-gray-600">
                      Choose your comfort level and availability
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-gradient-to-r from-purple-600/10 to-indigo-600/10 p-4 border border-purple-100 mt-6">
                <div className="font-semibold text-blue-600 text-sm mb-1">
                  ★★★★★ PROVIDER TESTIMONIAL
                </div>
                <p className="text-sm font-medium text-purple-800">
                  "I've been earning money every month with TechInRent for 6
                  months now. The payments are always on time, and my account is
                  handled professionally. It's the easiest passive income I've
                  ever made"
                </p>
                <p className="text-xs text-purple-700 mt-2">
                  — Sarah K., Digital Marketing Specialist
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
