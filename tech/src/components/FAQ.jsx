import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
export default function FAQSection() {
  const {
    data: faqs,
    isLoading,
    error
  } = useQuery({
    queryKey: ['faqs'],
    queryFn: async () => {
      const response = await fetch('/api/faqs');
      if (!response.ok) {
        throw new Error('Failed to fetch FAQs');
      }
      return response.json();
    },
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  // Fallback FAQs in case of loading or error
  const fallbackFaqs = [
    {
      id: "1",
      question: "How does the LinkedIn account rental process work?",
      answer: "Simply browse our available accounts, select one that matches your industry and needs, choose your rental duration, complete the payment, and receive secure access credentials. You'll have full access to the account during your rental period while our team manages the backend security."
    },
    {
      id: "2",
      question: "Is it safe to use rented LinkedIn accounts?",
      answer: "Yes, we implement strict security practices, including IP masking and browser fingerprinting, to ensure account security. Additionally, we follow ethical usage guidelines and provide clients with best practices to maintain account integrity."
    },
    {
      id: "3",
      question: "What security measures do you have in place?",
      answer: "We use multiple layers of protection, including IP rotation, VPN protection, and secure access protocols. Each account is continuously monitored for any suspicious activity, and we perform regular security audits. All communications and credentials are encrypted, and we provide dedicated access methods for each client."
    },
    {
      id: "4",
      question: "Can I modify the LinkedIn profile during rental?",
      answer: "While you have access to most account features, we don't allow major profile changes or modifications that would alter the account's core identity. This helps maintain the account's authenticity and long-term viability. We can provide guidelines on permitted activities and offer additional services for specific messaging campaigns."
    },
    {
      id: "5",
      question: "What happens if there's an issue with my rented account?",
      answer: "If you experience any technical issues or account problems, we'll either resolve it promptly or provide you with an equivalent replacement account. We also offer prorated refunds for any significant downtime that impacts your business activities."
    }
  ];
  const displayedFaqs = faqs || fallbackFaqs;

  return (
    <section id="faq" className="py-16 bg-neutral-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-inter font-bold text-neutral-darkest">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-neutral-dark">
            Find answers to common questions about our LinkedIn account rental service
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="p-6">
                  <Skeleton className="h-6 w-3/4 mb-6" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-6">
            {displayedFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`faq-${faq.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm border-0"
              >
                <AccordionTrigger className="p-5 text-left font-inter font-semibold text-lg hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="p-6 pt-0 mt-2 text-neutral-dark">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </section>
  );
}
