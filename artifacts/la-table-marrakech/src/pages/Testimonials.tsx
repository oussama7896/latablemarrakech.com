import { motion, easeOut, easeInOut, backOut } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const testimonials = [
  {
    text: "I have dined in Paris, Tokyo, and New York, and none of those evenings matched what was created for us in that Marrakech riad. Every element — the setting, the sequence, the flavours — was perfect. The chef has an extraordinary gift.",
    author: "Isabelle M.",
    origin: "Paris, France",
    experience: "Romantic Dinner",
  },
  {
    text: "We booked a villa chef for our group of eight and could not have been more delighted. The mezze alone was extraordinary. The tagine changed my understanding of what a slow-cooked dish can be. We extended our stay by two days.",
    author: "James & Sarah W.",
    origin: "London, United Kingdom",
    experience: "Villa Private Chef",
  },
  {
    text: "The cooking class was the highlight of our entire trip to Morocco. We came home with skills, recipes, and a jar of ras el hanout that we guard jealously. Worth every euro.",
    author: "Elena K.",
    origin: "Munich, Germany",
    experience: "Moroccan Cooking Class",
  },
  {
    text: "Dinner in the Agafay Desert under the stars with Gnawa musicians in the distance — I have never felt more alive. This was not a dinner. It was a ceremony.",
    author: "Carlos & Lucia M.",
    origin: "Barcelona, Spain",
    experience: "Desert Dining Experience",
  },
  {
    text: "My husband surprised me with a rooftop dinner for our anniversary. The medina lights, the food, the chef's warmth and attention — I cried three times during the meal. In the best possible way.",
    author: "Nadia F.",
    origin: "Amsterdam, Netherlands",
    experience: "Rooftop Dinner",
  },
  {
    text: "The luxury breakfast was beyond anything I expected. Freshly baked msemen with argan honey, hand-squeezed orange juice, pastries from the medina bakery. I have tried to recreate it at home. It is impossible.",
    author: "Alexander P.",
    origin: "Stockholm, Sweden",
    experience: "Luxury Breakfast",
  },
  {
    text: "We organised a birthday dinner for twelve people and the execution was flawless. The chef prepared a custom menu based on everyone's preferences, including our allergies. It was like having a private restaurant.",
    author: "Sophie & Edouard L.",
    origin: "Geneva, Switzerland",
    experience: "Birthday Event",
  },
  {
    text: "From the first WhatsApp message to the last glass of mint tea, the entire experience was handled with grace and professionalism. This is what five-star hospitality looks like when it is personal.",
    author: "David T.",
    origin: "New York, USA",
    experience: "Moroccan Traditional Experience",
  },
];

export default function Testimonials() {
  return (
    <>
      <title>Guest Testimonials — La Table Marrakech</title>
      <meta name="description" content="Read testimonials from guests who have experienced La Table Marrakech private chef dinners. From romantic dinners to desert dining, discover what makes our experiences unforgettable." />
      <link rel="canonical" href="https://latablemarrakech.com/testimonials" />

      {/* Hero */}
      <section className="relative h-72 flex items-end justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80"
          alt="Testimonials La Table Marrakech"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 pb-14 text-center text-white">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-3">What Guests Say</p>
          <h1 className="font-serif text-4xl md:text-6xl">Testimonials</h1>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 bg-stone-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                data-testid={`testimonial-${i}`}
                className="bg-white p-10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-foreground/80 leading-relaxed italic font-serif text-lg">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.author}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{t.origin}</p>
                  </div>
                  <span className="text-xs text-primary uppercase tracking-wider text-right">{t.experience}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Google Review Banner */}
      <section className="py-16 bg-white border-y border-border">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex flex-col md:flex-row items-center justify-center gap-8"
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div>
              <p className="font-serif text-2xl">5.0 / 5</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">Based on 120+ Google Reviews</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-serif text-4xl mb-6">Write Your Own Story</h2>
            <p className="text-muted-foreground mb-10 leading-relaxed">
              Join the guests who have discovered that the most memorable evening of their Marrakech visit was the one they spent around our table.
            </p>
            <Link
              href="/contact"
              data-testid="btn-testimonials-cta"
              className="inline-block px-14 py-5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors uppercase tracking-[0.2em] text-sm"
            >
              Reserve Your Experience
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}




