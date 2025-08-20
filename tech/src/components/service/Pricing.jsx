import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { scrollToSection } from "@/lib/utils";
export default function Pricing() {
  const pricingTiers = [
    {
      name: "Basic",
      description: "Perfect for small businesses and startups",
      priceRange: "$50-100",
      period: "/month",
      features: [
        "Basic profile setup",
        "InMail credits included",
        "Whatsapp credits included",
        "LinkedIn features"
      ],
      buttonText: "Get Started",
      buttonStyle: "outline"
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses and sales teams",
      priceRange: "$100-200",
      period: "/month",
      features: [
        "1+ years account age",
        "Industry-specific networks",
        "High SSI scores (70-90)",
        "50+ InMail credits capacity",
        "Quality recommendations"
      ],
      buttonText: "Most Popular",
      buttonStyle: "default"
    },
    {
      name: "Enterprise",
      description: "For large organizations and enterprise sales",
      priceRange: "$150-300",
      period: "/month",
      features: [
        "Sales Navigator or Recruiter",
        "Advanced targeting",
        "CRM integration",
        "3+ years account age",
        "Executive-level positioning",
        "High SSI scores (85-100)",
        "Priority support included"
      ],
      buttonText: "Contact Sales",
      buttonStyle: "outline"
    }
  ];

  return (
    <section id="pricing" className="py-16 bg-neutral-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-inter font-bold text-neutral-darkest">
            Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-neutral-dark max-w-3xl mx-auto">
            Choose from our range of account types to match your business requirements
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`
            bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative
            flex flex-col   /* 🔑 makes card a column flexbox */
            ${tier.popular ? "border-2 border-primary" : ""}
          `}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
                  Most Popular
                </div>
              )}

              {/* Content wrapper should flex-grow */}
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="font-inter font-semibold text-xl mb-2">{tier.name}</h3>
                <p className="text-neutral-dark mb-6">{tier.description}</p>
                <p className="text-4xl font-inter font-bold text-primary mb-6">
                  {tier.priceRange}
                  <span className="text-lg font-normal">{tier.period}</span>
                </p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="text-success mt-1 mr-2 h-4 w-4" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Button always pushed to bottom */}
                <Button
                  onClick={() => {
                    const message = `
Hello!

TechInRent is offering an exciting plan:

Plan Name: ${tier.name}
Description: ${tier.description}
Price Range: ${tier.priceRange} ${tier.period}

What's included:
${tier.features.map((f) => `- ${f}`).join("\n")}

If you're looking to boost your LinkedIn connections or grow professionally, this plan might be perfect for you.

Let me know if you’re interested — I’ll help you connect with the team.
                `;

                    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
                    window.open(whatsappURL, "_blank");
                  }}
                  className={`
                mt-auto cursor-pointer block text-center w-full px-6 py-3
                ${tier.buttonStyle === "outline"
                      ? "bg-white border border-primary text-primary hover:bg-primary hover:text-white"
                      : "bg-primary text-white hover:bg-primary-dark"}
              `}
                  variant={tier.buttonStyle === "outline" ? "outline" : "default"}
                >
                  {tier.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

  );
}
