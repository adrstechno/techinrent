// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";
// import { useToast } from "@/hooks/use-toast";
// import { motion } from "framer-motion";

// export default function ContactForm({ title = "", subtitle = "", className = "" }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [company, setCompany] = useState("");
//   const [message, setMessage] = useState("");
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { toast } = useToast();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!name || !email || !message || !acceptTerms) {
//       toast({
//         title: "Validation Error",
//         description: "Please fill in all required fields and accept the terms.",
//         variant: "destructive"
//       });
//       return;
//     }
//     setIsSubmitting(true);
//     try {
//       // Submit to our API
//         const response = await fetch("http://localhost:5000/api/contact/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           email,
//           phone,
//           company,
//           subject: "Contact Form Submission",
//           message,
//         }),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to submit contact form');
//       }
//       toast({
//         title: "Message sent successfully!",
//         description: "We'll get back to you within 24 hours.",
//       });
//       // Reset form
//       setName("");
//       setEmail("");
//       setPhone("");
//       setCompany("");
//       setMessage("");
//       setAcceptTerms(false);
//     } catch (error) {
//       console.error("Error submitting contact form:", error);
//       toast({
//         title: "Error sending message",
//         description: "Please try again or contact us directly.",
//         variant: "destructive"
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className={`bg-white rounded-xl shadow-lg p-6 ${className}`}
//     >
//       {title && (
//         <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
//       )}
//       {subtitle && (
//         <p className="text-neutral-dark mb-6">{subtitle}</p>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//           <div className="space-y-2">
//             <Label htmlFor="name">Full Name *</Label>
//             <Input
//               id="name"
//               placeholder="Your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="email">Email Address *</Label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="your.email@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="phone">Phone Number</Label>
//             <Input
//               id="phone"
//               type="tel"
//               placeholder="+1 (123) 456-7890"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </div>
//           <div className="space-y-2">
//             <Label htmlFor="company">Company</Label>
//             <Input
//               id="company"
//               placeholder="Your company name"
//               value={company}
//               onChange={(e) => setCompany(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="mt-4 space-y-2">
//           <Label htmlFor="message">Message *</Label>
//           <Textarea
//             id="message"
//             placeholder="Tell us about your needs or questions..."
//             rows={4}
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mt-4 flex items-center space-x-2">
//           <Checkbox
//             id="terms"
//             checked={acceptTerms}
//             onCheckedChange={(checked) => setAcceptTerms(checked)}
//             required
//           />
//           <Label htmlFor="terms" className="text-sm">
//             I agree to the terms and privacy policy
//           </Label>
//         </div>
//         <Button
//           type="submit"
//           className="mt-6 w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary"
//           disabled={isSubmitting}
//         >
//           {isSubmitting ? "Sending..." : "Send Message"}
//         </Button>
//       </form>
//     </motion.div>
//   );
// }



import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
const API_URI = "https://api-tech-in-rent.onrender.com"

export default function ContactForm({ title = "", subtitle = "", className = "" }) {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullname || !email || !message || !acceptTerms) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields and accept the terms.",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URI}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          phone,
          company,
          subject: "Contact Form Submission",
          message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit contact form');
      }

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFullname("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMessage("");
      setAcceptTerms(false);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive"
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
      {subtitle && (
        <p className="text-neutral-dark mb-6">{subtitle}</p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name"> Full Name * </Label>
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
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              placeholder="Your company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
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
            onCheckedChange={(checked) => setAcceptTerms(checked)}
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
