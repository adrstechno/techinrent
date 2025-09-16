

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const API_URI = "https://techinrent.onrender.com";

export default function ContactForm({
  title = "",
  subtitle = "",
  className = "",
}) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // default
  const [customCode, setCustomCode] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic required check
    if (
      !fullname.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !company.trim() ||
      !message.trim() ||
      !acceptTerms
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and accept the terms.",
        variant: "destructive",
      });
      return;
    }

    // if other selected, validate customCode (like +123)
    if (countryCode === "other") {
      if (!/^\+\d{1,4}$/.test(customCode.trim())) {
        toast({
          title: "Invalid country code",
          description: "Enter a valid country code starting with + (e.g. +880).",
          variant: "destructive",
        });
        return;
      }
    }

    // sanitize phone (remove spaces, parentheses, dashes)
    const sanitizedPhone = phone.replace(/\D/g, "");
    if (sanitizedPhone.length < 7) {
      toast({
        title: "Invalid phone",
        description: "Enter a valid phone number (at least 7 digits).",
        variant: "destructive",
      });
      return;
    }

    const codeToUse = countryCode === "other" ? customCode.trim() : countryCode;
    const fullPhone = `${codeToUse}${sanitizedPhone}`; // e.g. +919876543210

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URI}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: fullname.trim(),
          email: email.trim(),
          phone: fullPhone,
          company: company.trim(),
          subject: "Contact Form Submission",
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        // try to parse server message
        let errMsg = "Failed to submit contact form";
        try {
          const json = await response.json();
          errMsg = json?.message || json?.error || errMsg;
        } catch {}
        throw new Error(errMsg);
      }

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // reset form
      setFullname("");
      setEmail("");
      setCountryCode("+91");
      setCustomCode("");
      setPhone("");
      setCompany("");
      setMessage("");
      setAcceptTerms(false);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Error sending message",
        description: error?.message || "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-xl shadow-lg p-6 ${className}`}
    >
      {title && (
        <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
      )}
      {subtitle && <p className="text-neutral-dark mb-6">{subtitle}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullname"> Full Name * </Label>
            <Input
              id="fullname"
              placeholder="Your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* PHONE: country code select + optional custom code + phone input */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="flex gap-2 items-center">
              <select
                id="countryCode"
                value={countryCode}
                onChange={(e) => {
                  setCountryCode(e.target.value);
                  // clear custom code when switching away
                  if (e.target.value !== "other") setCustomCode("");
                }}
                className="w-[150px] rounded-md border border-gray-300 bg-white px-2 py-2 text-sm focus:border-black focus:outline-none"
              >
                {/* 30+ popular codes */}
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
                <option value="other">🌍 Other</option>
              </select>

              {/* custom code when Other selected */}
              {countryCode === "other" && (
                <Input
                  id="customCode"
                  placeholder="+123"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  className="w-[100px]"
                />
              )}

              <Input
                id="phone"
                type="tel"
                placeholder="1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1"
                required
              />
            </div>
            <p className="text-xs text-neutral-500 mt-1">
              Select country code (or Other → enter +code). Phone digits only in the
              phone field — formatting will be handled automatically.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              placeholder="Your company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            placeholder="Tell us about your needs or questions..."
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(Boolean(checked))}
            required
          />
          <Label htmlFor="terms" className="text-sm">
            I agree to the terms and privacy policy
          </Label>
        </div>

        <Button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </motion.div>
  );
}
