import React, { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Logo from "@/components/service/Logo";
import SEO from "@/components/service/SEO";
import { ArrowLeft, Shield, Lock, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, loginFailure } from "../store/slices/authSlice";

const API_BASE = "https://tech-in-rent.onrender.com/api";

const loginSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const [, navigate] = useLocation();
  const dispatch = useDispatch();
  const { error: authError } = useSelector((state) => state.auth);
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
      console.log("Sending login request with data:", data);
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.message || "Login failed");
      }

      if (!result.success || !result.token) {
        throw new Error(result?.message || "Invalid server response");
      }

      localStorage.setItem("adminToken", result.token);
      localStorage.setItem("adminData", JSON.stringify(result.admin));
      dispatch(loginSuccess({ username: data.userName, role: "admin" }));
      navigate("/admin");
    } catch (error) {
      console.error("Login error:", error);
      dispatch(loginFailure(error.message || "Invalid credentials"));
      form.setError("root", {
        message: error.message || "Invalid credentials",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-violet-800 to-purple-800 relative overflow-hidden">
      <SEO
        title="Admin Login - TechInRent"
        description="Secure admin login portal for TechInRent administrators."
        keywords="admin login, admin portal, secure access, techinrent admin"
      />
      <div className="absolute top-6 left-6 z-20">
        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="bg-white/90 hover:bg-white border-white/50 text-slate-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Logo size="lg" animated={true} />
          </div>
          <Card className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border-2 border-white/40">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <CardTitle className="font-heading text-3xl font-bold">
                Admin Portal
              </CardTitle>
              <CardDescription className="text-slate-600 font-medium">
                Secure access to TechInRent dashboard
              </CardDescription>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
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
                          className="h-12 bg-white/80 border-2 border-slate-200"
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
                          className="h-12 bg-white/80 border-2 border-slate-200"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
                {form.formState.errors.root && (
                  <div className="text-red-500 text-sm">
                    {form.formState.errors.root.message}
                  </div>
                )}
                {authError && (
                  <div className="text-red-500 text-sm">{authError}</div>
                )}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-500"
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
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 font-medium">
                🔒 Access restricted to administrators only
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
