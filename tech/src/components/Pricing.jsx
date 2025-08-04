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
        "500-2,000 connections",
        "Basic profile setup",
        "3+ years account age",
        "Industry-specific networks",
        "Standard LinkedIn features"
      ],
      popular: false,
      buttonStyle: "outline",
      buttonText: "Get Started"
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses and sales teams",
      priceRange: "$150-300",
      period: "/month",
      features: [
        "2,000-5,000+ connections",
        "LinkedIn Premium features",
        "5+ years account age",
        "High SSI scores (70-90)",
        "InMail credits included",
        "Quality recommendations"
      ],
      popular: true,
      buttonStyle: "default",
      buttonText: "Most Popular"
    },
    {
      name: "Enterprise",
      description: "For large organizations and enterprise sales",
      priceRange: "$400-500",
      period: "/month",
      features: [
        "5,000+ industry connections",
        "Sales Navigator or Recruiter",
        "8+ years account age",
        "Executive-level positioning",
        "High SSI scores (85-100)",
        "Priority support included"
      ],
      popular: false,
      buttonStyle: "outline",
      buttonText: "Contact Sales"
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
                ${tier.popular ? 'border-2 border-primary' : ''}
              `}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg font-medium text-sm">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="font-inter font-semibold text-xl mb-2">{tier.name}</h3>
                <p className="text-neutral-dark mb-6">{tier.description}</p>
                <p className="text-4xl font-inter font-bold text-primary mb-6">
                  {tier.priceRange}<span className="text-lg font-normal">{tier.period}</span>
                </p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="text-success mt-1 mr-2 h-4 w-4" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => scrollToSection("browse")}
                  className={`
                    block text-center w-full px-6 py-3 h-auto
                    ${tier.buttonStyle === 'outline'
                      ? 'bg-white border border-primary text-primary hover:bg-primary hover:text-white'
                      : 'bg-primary text-white hover:bg-primary-dark'}
                  `}
                  variant={tier.buttonStyle === 'outline' ? 'outline' : 'default'}
                >
                  {tier.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-neutral-dark mb-4">
            Need a custom solution? Contact us for specialized LinkedIn account solutions.
          </p>
          <Button
            onClick={() => scrollToSection("contact")}
            className="inline-block bg-primary hover:bg-primary-dark text-white"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}
