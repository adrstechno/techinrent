
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

const API_BASE_URL = "https://techinrent.onrender.com/api/provider/";

const providerFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").transform((val) => val.trim()),
  email: z.string().email("Please enter a valid email address").transform((val) => val.trim()),
  phone: z
    .string()
    .min(7, "Phone number must be between 7 and 15 digits")
    .max(15, "Phone number must be between 7 and 15 digits")
    .regex(/^\d+$/, "Phone number must contain only digits")
    .transform((val) => val.trim()),
  countryCode: z
    .string()
    .regex(/^\+\d{1,4}$/, "Country code must start with '+' followed by 1-4 digits"),
  linkedinUrl: z
    .string()
    .url("Please enter a valid LinkedIn profile URL")
    .refine((url) => url.includes("linkedin.com"), {
      message: "URL must be a valid LinkedIn profile URL",
    })
    .transform((val) => val.trim()),
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
  const [countryCode, setCountryCode] = useState("+91");

  const form = useForm({
    resolver: zodResolver(providerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      countryCode: "+91",
      linkedinUrl: "",
      profileStatus: "nonVerified",
      additionalInfo: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const fullPhoneNumber = `${data.countryCode}${data.phone}`;
      const payload = {
        fullName: data.fullName,
        email: data.email,
        phone: fullPhoneNumber,
        linkedIn: data.linkedinUrl,
        verification: data.profileStatus,
        additionalInfo: data.additionalInfo || "N/A",
      };

      console.log("Sending to backend:", payload);

      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

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
        description: "We'll review your application and get back to you within 24 hours.",
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
      <DialogContent className="max-w-5xl w-[95%] bg-white rounded-2xl shadow-2xl p-10 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-blue-700">
            Earn Money With Your LinkedIn Account
          </DialogTitle>
          <DialogDescription className="text-lg text-center text-gray-600 mb-10">
            Turn your professional profile into a revenue-generating asset. Earn guaranteed monthly payments for each approved account.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form Section */}
          <div className="space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Full Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your full name"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Email Address *
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="your.email@example.com"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-gray-700">
                          Phone Number *
                        </FormLabel>
                        <div className="flex gap-2">
                          <FormField
                            control={form.control}
                            name="countryCode"
                            render={({ field }) => (
                              <FormControl>
                                <select
                                  value={field.value}
                                  onChange={(e) => {
                                    field.onChange(e.target.value);
                                    setCountryCode(e.target.value);
                                  }}
                                  className="w-[90px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500 h-11"
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
                                  <option value="+971">🇦🇪 +971 (UAE)</option>
                                  <option value="+966">🇸🇦 +966 (Saudi Arabia)</option>
                                  <option value="+27">🇿🇦 +27 (South Africa)</option>
                                  <option value="+234">🇳🇬 +234 (Nigeria)</option>
                                  <option value="+52">🇲🇽 +52 (Mexico)</option>
                                  <option value="+31">🇳🇱 +31 (Netherlands)</option>
                                  <option value="+46">🇸🇪 +46 (Sweden)</option>
                                  <option value="+9999">🌍 Other</option>
                                </select>
                              </FormControl>
                            )}
                          />
                          {form.watch("countryCode") === "+9999" && (
                            <FormField
                              control={form.control}
                              name="countryCode"
                              render={({ field }) => (
                                <FormControl>
                                  <Input
                                    placeholder="+123"
                                    className="w-[90px] border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-11"
                                    {...field}
                                  />
                                </FormControl>
                              )}
                            />
                          )}
                          <FormControl>
                            <Input
                              placeholder="1234567890"
                              className=" border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-11"
                              {...field}
                              onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))}
                              maxLength={15}
                            />
                          </FormControl>
                        </div>
                        <FormMessage className="text-red-500 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="linkedinUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        LinkedIn Profile URL *
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://linkedin.com/in/yourprofile"
                          className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-11"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="profileStatus"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Profile Verification Status *
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-3"
                        >
                          <div className="flex items-center space-x-3 rounded-md border border-gray-200 p-4 bg-gray-50">
                            <RadioGroupItem value="verified" id="verified" />
                            <label
                              htmlFor="verified"
                              className="text-sm font-medium text-gray-700"
                            >
                              Verified Profile
                              <p className="text-xs text-gray-500 mt-1">
                                My profile has 500+ connections and is regularly active
                              </p>
                            </label>
                          </div>
                          <div className="flex items-center space-x-3 rounded-md border border-gray-200 p-4 bg-gray-50">
                            <RadioGroupItem value="nonVerified" id="nonVerified" />
                            <label
                              htmlFor="nonVerified"
                              className="text-sm font-medium text-gray-700"
                            >
                              Non-Verified Profile
                              <p className="text-xs text-gray-500 mt-1">
                                Less than 500 connections or new account
                              </p>
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gray-700">
                        Additional Information
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your LinkedIn profile, experience, industry, etc..."
                          className="resize-none min-h-[120px] border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500 text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acceptTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 rounded-md border border-gray-200">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-gray-300"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm font-normal text-gray-700">
                          I agree to the{" "}
                          <a href="/terms" className="text-blue-500 hover:underline">
                            terms and conditions
                          </a>{" "}
                          and{" "}
                          <a href="/privacy" className="text-blue-500 hover:underline">
                            privacy policy
                          </a>
                          , and consent to my profile being rented through this platform *
                        </FormLabel>
                        <FormMessage className="text-red-500 text-xs" />
                      </div>
                    </FormItem>
                  )}
                />

                <DialogFooter className="gap-4 sm:gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="border-gray-300 hover:bg-gray-100 px-6 py-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <h3 className="text-xl font-semibold text-blue-700">Why Become a Provider?</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2 mt-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Passive Income</p>
                  <p className="text-sm text-gray-600">
                    Earn guaranteed monthly payments for each approved LinkedIn account.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2 mt-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">No Technical Hassle</p>
                  <p className="text-sm text-gray-600">
                    We manage all technical aspects, so you can focus on earning.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2 mt-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Profile Safety</p>
                  <p className="text-sm text-gray-600">
                    Your LinkedIn account is handled with the highest security standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="rounded-full bg-blue-100 p-2 mt-1">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 6L9 17L4 12"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-700">Flexible Participation</p>
                  <p className="text-sm text-gray-600">
                    Choose terms that suit your schedule and preferences.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 p-6 border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-yellow-500">★★★★★</span>
                <span className="text-sm font-semibold text-blue-700">Provider Testimonial</span>
              </div>
              <p className="text-sm font-medium text-gray-700">
                "TechInRent has been a game-changer for me. I've been earning passive income for over 6 months with zero hassle. The team is professional, and payments are always on time!"
              </p>
              <p className="text-xs text-gray-500 mt-3">
                — Sarah K., Digital Marketing Specialist
              </p>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}