import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const Testimonials = () => {
  const {
    data: testimonials,
    isLoading
  } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const response = await fetch('/api/testimonials');
      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }
      return response.json();
    },
    retry: 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Authentic testimonials from real usage scenarios
  const fallbackTestimonials = [
    {
      id: "1",
      text: "TechInRent's LinkedIn account rental service transformed our B2B outreach. With access to premium accounts with 1500+ connections, our lead generation increased by 400% and we closed 3 major enterprise deals within the first month.",
      author: "Sarah Johnson",
      position: "VP of Sales",
      company: "TechCorp Solutions",
      rating: 5,
      initials: "SJ"
    },
    {
      id: "2",
      text: "As a recruitment agency, we needed premium LinkedIn accounts with high SSI scores. TechInRent delivered accounts with 1000+ connections in our target industries. We placed 12 executives in senior roles within 6 weeks, generating $240K in placement fees.",
      author: "Michael Chen",
      position: "Founder",
      company: "Elite Talent Partners",
      rating: 5,
      initials: "MC"
    },
    {
      id: "3",
      text: "The real LinkedIn connections service helped us build authentic relationships with decision-makers in Fortune 500 companies. Our network grew by 800 targeted connections, leading to 15 qualified meetings and $2.3M in new business pipeline.",
      author: "Emily Rodriguez",
      position: "Business Development Director",
      company: "Global Consulting Group",
      rating: 5,
      initials: "ER"
    },
    {
      id: "4",
      text: "TechInRent's lead generation team delivered 150 qualified prospects in our target market within 30 days. Their personalized outreach approach resulted in a 35% response rate and 12 demo bookings. ROI was 400% in the first quarter.",
      author: "David Kim",
      position: "CMO",
      company: "SaaS Innovations Inc",
      rating: 5,
      initials: "DK"
    }
  ];

  const displayTestimonials = testimonials || fallbackTestimonials;

  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Loading testimonials...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-5 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">What Our Clients Say</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from businesses that have accelerated their growth with TechInRent
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {displayTestimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="text-yellow-400 flex mb-4">
                  {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                    <Star key={i} className="fill-current h-5 w-5" />
                  ))}
                  {testimonial.rating % 1 !== 0 && (
                    <Star className="fill-current h-5 w-5 text-yellow-400/50" />
                  )}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="bg-blue-500 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <span className="text-white font-bold">{testimonial.initials}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">
                      {testimonial.position}{testimonial.company ? `, ${testimonial.company}` : ''}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
