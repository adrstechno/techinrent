import React, { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import SEO from "@/components/SEO";
import { ArrowLeft, Shield, Lock, Mail, UserPlus } from "lucide-react";

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Register = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      toast({
        title: "Success",
        description: "Admin registered successfully! You can now login.",
      });

      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Registration failed",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 via-violet-800 to-purple-800 relative overflow-hidden">
      <SEO
        title="Admin Registration - TechInRent"
        description="Register as an administrator for TechInRent platform. Create your admin account to manage LinkedIn account rentals and provider information."
        keywords="admin registration, admin signup, create admin account, techinrent admin"
      />
      
      {/* Animated background decorations matching the main site */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 opacity-30 animate-pulse" />
        <div className="absolute bottom-20 -left-32 w-64 h-64 rounded-full bg-gradient-to-r from-purple-400 to-pink-300 opacity-25 animate-bounce" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-400 to-violet-300 opacity-20 animate-spin" style={{animationDuration: '20s'}} />
        <div className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full bg-gradient-to-r from-teal-400 to-emerald-300 opacity-15 animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 rounded-full bg-gradient-to-r from-violet-400 to-purple-300 opacity-25 animate-bounce" style={{animationDelay: '1s'}} />
      </div>

      {/* Back to home button */}
      <div className="absolute top-6 left-6 z-20">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="bg-white/90 hover:bg-white border-white/50 text-slate-800 hover:text-slate-900 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>

      {/* Login link */}
      <div className="absolute top-6 right-6 z-20">
        <Button
          onClick={() => navigate("/login")}
          variant="outline"
          className="bg-white/90 hover:bg-white border-white/50 text-slate-800 hover:text-slate-900 shadow-lg backdrop-blur-sm transition-all duration-200 hover:scale-105"
        >
          <Shield className="mr-2 h-4 w-4" />
          Login
        </Button>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo section with glow effects */}
          <div className="mb-8 text-center relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/40 via-cyan-400/40 to-emerald-400/40 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute inset-0 bg-white/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 drop-shadow-2xl">
              <Logo size="lg" animated={true} />
            </div>
          </div>

          {/* Register card with glassmorphism effect */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-white/40 relative overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 rounded-3xl"></div>
            
            <div className="relative z-10">
              {/* Header with icon */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <UserPlus className="h-8 w-8" />
                </div>
                <h1 className="font-heading text-3xl font-bold text-transparent bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text mb-2">
                  Create Admin Account
                </h1>
                <p className="text-slate-600 font-medium">
                  Register as a TechInRent administrator
                </p>
              </div>

              {/* Register form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="Enter your email address" 
                            {...field} 
                            disabled={isLoading}
                            className="h-12 bg-white/80 border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl text-slate-800 placeholder:text-slate-400 transition-all duration-200"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Create a strong password"
                            {...field}
                            disabled={isLoading}
                            className="h-12 bg-white/80 border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl text-slate-800 placeholder:text-slate-400 transition-all duration-200"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold flex items-center gap-2">
                          <Lock className="h-4 w-4" />
                          Confirm Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirm your password"
                            {...field}
                            disabled={isLoading}
                            className="h-12 bg-white/80 border-2 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl text-slate-800 placeholder:text-slate-400 transition-all duration-200"
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 border-0"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <UserPlus className="h-4 w-4" />
                        Create Admin Account
                      </div>
                    )}
                  </Button>
                </form>
              </Form>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-sm text-slate-500 font-medium">
                  🔒 Admin registration creates secure access credentials
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Secure registration process
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => navigate("/login")}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
                  >
                    Already have an account? Login here
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
