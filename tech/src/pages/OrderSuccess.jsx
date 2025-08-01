import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  DollarSign,
  Users,
  ArrowRight,
  Home
} from "lucide-react";
import SEO from "@/components/SEO";
import Logo from "@/components/Logo";

const OrderSuccess = () => {
  const [, setLocation] = useLocation();
  const [countdown, setCountdown] = useState(10);
  const [orderDetails, setOrderDetails] = useState({
    orderId: "",
    connections: "",
    packageName: "",
    totalPrice: 0,
    estimatedDelivery: ""
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const storedOrder = localStorage.getItem("lastOrderDetails");
    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder);
      setOrderDetails({
        orderId: parsedOrder.orderId.toString().slice(-6),
        connections: parsedOrder.connections,
        packageName: parsedOrder.packageName,
        totalPrice: parsedOrder.totalPrice,
        estimatedDelivery: parsedOrder.estimatedDelivery
      });
      localStorage.removeItem("lastOrderDetails");
    } else {
      setOrderDetails({
        orderId: (Math.random() * 1000000).toFixed(0).toString().slice(-6),
        connections: parseInt(urlParams.get("connections") || "100"),
        packageName: urlParams.get("packageName") || "Standard Package",
        totalPrice: parseFloat(urlParams.get("price") || "10"),
        estimatedDelivery: urlParams.get("estimatedDelivery") || "3 Days"
      });
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setLocation("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [setLocation]);

  const handleGoHome = () => {
    setLocation("/");
  };

  return (
    div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-violet-900 flex items-center justify-center p-4"
      SEO
        title="Order Successful - TechInRent"
        description="Your LinkedIn connection order has been successfully placed and is being processed."
        noIndex={true}
      /
      motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      
        motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-center mb-8"
        
          div className="mx-auto w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6"
            CheckCircle className="w-12 h-12 text-white" /
          /div
          h1 className="text-4xl font-bold text-white mb-2"Order Successful/h1
          p className="text-xl text-blue-200"Your LinkedIn connection order has been placed/p
        /motion.div

        motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-lg border-white/20 text-white p-6 rounded-lg space-y-6"
        
          CardHeader className="text-center"
            div className="flex items-center justify-center gap-2 mb-2"
              Logo size="sm" /
            /div
            CardTitle className="text-2xl"Order Confirmation/CardTitle
            div className="flex items-center justify-center gap-2"
              span className="text-blue-200"Order ID: Badge variant="secondary" className="bg-blue-600/30 text-blue-100"
                {orderDetails.orderId}
              /Badge/span
            /div
          /CardHeader
          CardContent className="space-y-6"
            div className="grid grid-cols-1 md:grid-cols-3 gap-4"
              div className="text-center p-4 bg-white/10 rounded-lg"
                Users className="w-8 h-8 text-blue-400 mx-auto mb-2" /
                div className="text-2xl font-bold"{orderDetails.connections}/div
                div className="text-sm text-blue-200"Connections/div
              /div
              div className="text-center p-4 bg-white/10 rounded-lg"
                DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" /
                div className="text-2xl font-bold"${orderDetails.totalPrice}/div
                div className="text-sm text-blue-200"Total Paid/div
              /div
              div className="text-center p-4 bg-white/10 rounded-lg"
                Clock className="w-8 h-8 text-orange-400 mx-auto mb-2" /
                div className="text-lg font-bold"{orderDetails.estimatedDelivery}/div
                div className="text-sm text-blue-200"Delivery Time/div
              /div
            /div

            div className="bg-white/10 rounded-lg p-4"
              h3 className="text-lg font-semibold mb-2"Package Details/h3
              div className="flex justify-between items-center"
                {orderDetails.packageName}
                Badge variant="outline" className="border-green-400 text-green-400"
                  Processing
                /Badge
              /div
            /div

            div className="bg-white/10 rounded-lg p-4"
              h3 className="text-lg font-semibold mb-3"What's Next?/h3
              div className="space-y-2 text-sm text-blue-200"
                div className="flex items-center gap-2"
                  div className="w-2 h-2 bg-green-400 rounded-full"/div
                  Payment verification in progress
                /div
                div className="flex items-center gap-2"
                  div className="w-2 h-2 bg-yellow-400 rounded-full"/div
                  LinkedIn connections will be delivered within {orderDetails.estimatedDelivery}
                /div
                div className="flex items-center gap-2"
                  div className="w-2 h-2 bg-blue-400 rounded-full"/div
                  You'll receive email updates on order progress
                /div
              /div
            /div

            div className="bg-white/10 rounded-lg p-4 text-center"
              p className="text-sm text-blue-200 mb-2"Need help? Contact our support team/p
              p className="text-white font-medium"support@techinrent.com/p
            /div

            div className="text-center"
              p className="text-blue-200 text-sm mb-4"
                Redirecting to homepage in {countdown} seconds...
              /p
              Button
                onClick={handleGoHome}
                className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white px-6 py-3"
              
                Go to Homepage
                ArrowRight className="w-4 h-4 ml-2" /
              /Button
            /div
          /CardContent
        /motion.div

        motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="fixed inset-0 pointer-events-none"
        
          {[...Array(20)].map((_, i) = (
            motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-violet-400 rounded-full"
                initial={{ y: Math.random() * 100 - 50, scale: 0 }}
                animate={{ y: Math.random() * 200 - 100, scale: 1 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 2 + Math.random() * 3
                }}
            
            /motion.div
          ))}
        /motion.div
      /motion.div
    /div
  );
};

export default OrderSuccess;

