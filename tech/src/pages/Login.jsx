import React, { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
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
import { ArrowLeft, Shield, Lock, User } from "lucide-react";

const loginSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      // Store the token in localStorage
      localStorage.setItem('adminToken', result.token);
      localStorage.setItem('adminData', JSON.stringify(result.admin));

      toast({
        title: "Success",
        description: "Login successful",
      });

      navigate("/admin");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 via-violet-800 to-purple-800 relative overflow-hidden">
      <SEO
        title="Admin Login - TechInRent"
        description="Secure admin login portal for TechInRent administrators. Access the dashboard to manage LinkedIn account rentals and provider information."
        keywords="admin login, admin portal, secure access, techinrent admin"
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

          {/* Login card with glassmorphism effect */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-white/40 relative overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/30 rounded-3xl"></div>

            <div className="relative z-10">
              {/* Header with icon */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <Shield className="h-8 w-8" />
                </div>
                <h1 className="font-heading text-3xl font-bold text-transparent bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text mb-2">
                  Admin Portal
                </h1>
                <p className="text-slate-600 font-medium">
                  Secure access to TechInRent dashboard
                </p>
              </div>

              {/* Login form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-semibold flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter username"
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
                            placeholder="Enter your password"
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
                    className="w-full h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 border-0"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Logging in...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Access Dashboard
                      </div>
                    )}
                  </Button>
                </form>
              </Form>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-sm text-slate-500 font-medium">
                  🔒 Access restricted to administrators only
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Secure connection established
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
