import { useState } from "react";
import { useForm  } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MessageSquare,
  Linkedin,
  ArrowRight,
  CheckCircle2
} from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import ContactForm from "./ContactForm";


const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});
export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      acceptTerms: false
    }
  });

const onSubmit = async (data) => {
  setIsSubmitting(true);
  try {
   await apiRequest("POST", "https://api-tech-in-rent.onrender.com/", data);

    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });
    form.reset(); 
  } catch (error) {
    toast({
      title: "Error sending message",
      description: error.message,
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <section id="contact" className="py-16 bg-skyblue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-bl-full"></div>

          <div className="text-center mb-8">
            <h2 className="font-heading text-3xl font-bold text-primary mb-2 tracking-tight">
              Ready to Scale Your LinkedIn Outreach?
            </h2>
            <p className="font-body text-lg text-gray-700 max-w-3xl mx-auto font-normal tracking-normal">
              Join hundreds of businesses that have supercharged their lead generation with our LinkedIn accounts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-1 tracking-normal">Risk-Free</h3>
              <p className="font-body text-gray-600 font-normal tracking-normal">
                No commitment required & flexible rental periods
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Linkedin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-1 tracking-normal">Verified Accounts</h3>
              <p className="font-body text-gray-600 font-normal tracking-normal">
                500+ connections with established trust scores
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-1 tracking-normal">Quick Setup</h3>
              <p className="font-body text-gray-600 font-normal tracking-normal">
                Be up and running in just 72 hours
              </p>
            </div>
          </div>

          {/* Main Contact Area */}
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Get In Touch</h3>
              <p className="font-body text-lg text-gray-700 mb-8 font-normal tracking-normal">
                Have questions or need a custom solution? Our team is ready to help you find the perfect LinkedIn accounts for your business needs.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                    <Mail className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-gray-700">vibhanshu@techinrent.com</p>
                    <p className="text-sm text-gray-500 mt-1">We respond to all inquiries within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                    <Phone className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <p className="text-gray-700">+917898711748</p>
                    <p className="text-sm text-gray-500 mt-1">Available Monday-Friday, 9am-6pm IST</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mr-4 mt-1">
                    <MessageSquare className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">WhatsApp</h3>
                    <p className="text-gray-700">+917898711748</p>
                    <p className="text-sm text-gray-500 mt-1">24/7 support for urgent inquiries</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="font-semibold text-xl mb-6">Send Us a Message</h3>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Your Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John Smith"
                              {...field}
                              className="w-full rounded-md border-gray-300 p-3"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Email Address</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john@example.com"
                              type="email"
                              {...field}
                              className="w-full rounded-md border-gray-300 p-3"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Subject</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                              <SelectItem value="Account Rental Question">Account Rental Question</SelectItem>
                              <SelectItem value="Custom Solution Request">Custom Solution Request</SelectItem>
                              <SelectItem value="Technical Support">Technical Support</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="How can we help you?"
                              className="w-full rounded-md border-gray-300 p-3 h-32"
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
                        <FormItem className="flex items-start space-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              id="terms"
                              className="mt-1"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel
                              htmlFor="terms"
                              className="text-sm text-gray-700 font-normal"
                            >
                              I agree to the <Link href="/terms" className="text-primary hover:underline">
                                Terms and Conditions
                              </Link>
                            </FormLabel>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
