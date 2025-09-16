
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

const API_URI = "https://techinrent.onrender.com";

const bookDemoSchema = z
  .object({
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
        /^[a-zA-Z0-9._%+-]+@(?!gmail\.com$)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Gmail addresses are not allowed"
      ),
    countryCode: z.string().nonempty("Select a country code"),
    customCode: z.string().optional(),
    phone: z
      .string()
      .min(7, "Phone number must be at least 7 digits")
      .regex(/^[0-9]+$/, "Phone number must contain only digits"),
    company: z.string().min(2, "Company name is required"),
    designation: z.string().min(2, "Designation is required"),
  })
  .superRefine((val, ctx) => {
    if (val.countryCode === "other") {
      if (!val.customCode || !/^\+\d{1,4}$/.test(val.customCode)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter a valid country code starting with + (e.g. +123)",
          path: ["customCode"],
        });
      }
    }
  });

export function BookDemoForm({ isOpen, onClose }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookDemoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+91",
      customCode: "",
      phone: "",
      company: "",
      designation: "",
    },
  });


  const countryCode = watch("countryCode");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const code = data.countryCode === "other" ? data.customCode : data.countryCode;
      const fullPhone = `${code}${data.phone}`; 

      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: fullPhone,
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
        } catch (e) {}
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
        description: error?.message || "Failed to submit demo request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="w-[95%] max-w-sm sm:max-w-[425px] bg-white rounded-2xl shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book a Demo</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll schedule a personalized demo for you.
          </DialogDescription>
        </DialogHeader>

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
                <p className="text-red-500 text-xs">{errors.firstName.message}</p>
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
                <p className="text-red-500 text-xs">{errors.lastName.message}</p>
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

          {/* Phone (country code select + optional custom + phone number) */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="flex gap-2 items-center">
              <select
                id="countryCode"
                {...register("countryCode")}
                className="w-[140px] rounded-md border border-gray-300 bg-white px-2 py-2 text-sm focus:border-black focus:outline-none"
                defaultValue="+91"
              >
                <option value="+1">🇺🇸 +1 (USA)</option>
                <option value="+44">🇬🇧 +44 (UK)</option>
                <option value="+91">🇮🇳 +91 (India)</option>
                <option value="+61">🇦🇺 +61 (Australia)</option>
                <option value="+81">🇯🇵 +81 (Japan)</option>
                <option value="+49">🇩🇪 +49 (Germany)</option>
                <option value="+33">🇫🇷 +33 (France)</option>
                <option value="+39">🇮🇹 +39 (Italy)</option>
                <option value="+34">🇪🇸 +34 (Spain)</option>
                <option value="+55">🇧🇷 +55 (Brazil)</option>
                <option value="+7">🇷🇺 +7 (Russia)</option>
                <option value="+86">🇨🇳 +86 (China)</option>
                <option value="+82">🇰🇷 +82 (South Korea)</option>
                <option value="+60">🇲🇾 +60 (Malaysia)</option>
                <option value="+65">🇸🇬 +65 (Singapore)</option>
                <option value="+63">🇵🇭 +63 (Philippines)</option>
                <option value="+62">🇮🇩 +62 (Indonesia)</option>
                <option value="+66">🇹🇭 +66 (Thailand)</option>
                <option value="+92">🇵🇰 +92 (Pakistan)</option>
                <option value="+94">🇱🇰 +94 (Sri Lanka)</option>
                <option value="+880">🇧🇩 +880 (Bangladesh)</option>
                <option value="+971">🇦🇪 +971 (UAE)</option>
                <option value="+966">🇸🇦 +966 (Saudi Arabia)</option>
                <option value="+20">🇪🇬 +20 (Egypt)</option>
                <option value="+27">🇿🇦 +27 (South Africa)</option>
                <option value="+234">🇳🇬 +234 (Nigeria)</option>
                <option value="+52">🇲🇽 +52 (Mexico)</option>
                <option value="+54">🇦🇷 +54 (Argentina)</option>
                <option value="+31">🇳🇱 +31 (Netherlands)</option>
                <option value="+46">🇸🇪 +46 (Sweden)</option>

                {/* Other */}
                <option value="other"> Other</option>
              </select>

              {/* If Other chosen, show custom code input */}
              {countryCode === "other" && (
                <Input
                  id="customCode"
                  {...register("customCode")}
                  placeholder="+123"
                  className={`w-[90px] ${errors.customCode ? "border-red-500" : ""}`}
                />
              )}

              {/* Phone Input */}
              <Input
                id="phone"
                {...register("phone")}
                placeholder="1234567890"
                className={`flex-1 ${errors.phone ? "border-red-500" : ""}`}
              />
            </div>

            {errors.customCode && (
              <p className="text-red-500 text-xs">{errors.customCode.message}</p>
            )}
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
                <p className="text-red-500 text-xs">{errors.designation.message}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                onClose();
              }}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Submitting..." : "Book Demo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
