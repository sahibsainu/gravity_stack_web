import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "GravityStack has transformed our infrastructure. Their computing power and reliability allowed us to scale without worrying about the underlying hardware.",
    author: "Sarah Johnson",
    role: "CTO, TechInnovate",
    stars: 5
  },
  {
    id: 2,
    content: "The object storage solution is fast, reliable, and significantly more cost-effective than what we were using before. Migrating was painless.",
    author: "Michael Chen",
    role: "DevOps Lead, DataFlow Inc",
    stars: 5
  },
  {
    id: 3,
    content: "Their Kubernetes service made container management simple. We deployed our microservices architecture in hours instead of weeks.",
    author: "Emma Rodriguez",
    role: "Lead Engineer, WebScale",
    stars: 5
  }
];

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Developers Worldwide
          </h2>
          <p className="text-lg text-cosmic-600">
            See what our customers have to say about GravityStack
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-soft border border-cosmic-100"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-warning-500 fill-warning-500" />
                ))}
              </div>
              <blockquote className="mb-6 text-lg text-space-700">
                "{testimonial.content}"
              </blockquote>
              <div>
                <p className="font-semibold text-space-900">{testimonial.author}</p>
                <p className="text-cosmic-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
