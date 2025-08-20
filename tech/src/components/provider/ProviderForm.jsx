import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Shield, ShieldAlert } from "lucide-react";

export default function ProviderForm({
  title = "Become a Provider",
  subtitle = "Join our network and start earning",
  className = "",
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileLink, setProfileLink] = useState("");
  const [profileType, setProfileType] = useState("verified");
  const [message, setMessage] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !profileLink || !message || !acceptTerms) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and accept the terms.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://tech-in-rent.onrender.com/api/provider/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: name,
            email: email,
            phone: phone?.trim() || "N/A",
            linkedIn: profileLink,
            verification: profileType,
            additionalInfo: message,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong. Please try again."
        );
      }

      toast({
        title: "Application Submitted!",
        description:
          "Thank you for your interest. We'll review your application and get back to you soon.",
      });

      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setProfileLink("");
      setMessage("");
      setAcceptTerms(false);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`bg-white rounded-xl shadow-lg p-6 ${className}`}
    >
      {title && (
        <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
      )}
      {subtitle && <p className="text-neutral-dark mb-6">{subtitle}</p>}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (123) 456-7890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profileLink">LinkedIn Profile URL *</Label>
            <Input
              id="profileLink"
              placeholder="https://linkedin.com/in/yourprofile"
              value={profileLink}
              onChange={(e) => setProfileLink(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-6 mb-4">
          <Label>Profile Verification Status *</Label>
          <RadioGroup
            value={profileType}
            onValueChange={setProfileType}
            className="mt-2 flex flex-col space-y-2"
          >
            <div className="flex items-center space-x-2 rounded-lg border p-3 shadow-sm cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="verified" id="verified" />
              <Label
                htmlFor="verified"
                className="flex items-center cursor-pointer"
              >
                <Shield className="h-5 w-5 text-green-600 mr-2" />
                <div>
                  <span className="font-semibold">Verified Profile</span>
                  <p className="text-xs text-gray-500">
                    500+ connections and active
                  </p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border p-3 shadow-sm cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="nonVerified" id="nonVerified" />
              <Label
                htmlFor="nonVerified"
                className="flex items-center cursor-pointer"
              >
                <ShieldAlert className="h-5 w-5 text-amber-600 mr-2" />
                <div>
                  <span className="font-semibold">Non-Verified Profile</span>
                  <p className="text-xs text-gray-500">
                    Less than 500 connections or new account
                  </p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="mt-4 space-y-2">
          <Label htmlFor="message">Additional Information *</Label>
          <Textarea
            id="message"
            placeholder="Tell us about your profile, experience, industry, etc..."
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
            onCheckedChange={(checked) => setAcceptTerms(checked)}
            required
          />
          <Label htmlFor="terms" className="text-sm">
            I agree to the terms and privacy policy, and consent to my profile
            being rented through this platform.
          </Label>
        </div>

        <Button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-secondary to-secondary-foreground hover:from-secondary/90 hover:to-secondary-foreground/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Profile"}
        </Button>
      </form>
    </motion.div>
  );
}
