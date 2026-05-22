import { motion, easeOut, easeInOut, backOut } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const experiences = [
  {
    title: "Romantic Dinner",
    slug: "romantic_dinner",
    description: "A candlelit table for two — fresh flowers, fine linen, slow service, and a menu built around what the both of you love. We've done first dates, anniversaries, and more than one proposal.",
    detail: "From 2 guests — from 120 EUR/person",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Villa Private Chef",
    slug: "villa_chef",
    description: "Hand us your villa kitchen for the night. We arrive with everything, cook every course around your group, and leave the kitchen cleaner than we found it.",
    detail: "From 4 guests — from 90 EUR/person",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Rooftop Dinner",
    slug: "rooftop_dinner",
    description: "Dine on a candlelit rooftop as the medina's amber lights flicker on below. Course by course, with the call to prayer and the hum of the city quieting under you.",
    detail: "From 2 guests — from 130 EUR/person",
    image: "https://images.pexels.com/photos/28730586/pexels-photo-28730586.jpeg?auto=compress&cs=tinysrgb&w=800&q=85",
  },
  {
    title: "Family Dining",
    slug: "family_dining",
    description: "A generous Moroccan feast designed for families — mezze, slow-cooked tagines, fresh couscous, and pastries. Warm, abundant, and joyful.",
    detail: "From 6 guests — from 75 EUR/person",
    image: "https://images.pexels.com/photos/5410419/pexels-photo-5410419.jpeg?auto=compress&cs=tinysrgb&w=800&q=85",
  },
  {
    title: "Luxury Breakfast",
    slug: "luxury_breakfast",
    description: "Begin your Marrakech morning with a spread of freshly baked msemen, artisan cheeses, local honey, seasonal fruits, and hand-ground coffee. A ritual worth rising early for.",
    detail: "From 2 guests — from 45 EUR/person",
    image: "https://images.pexels.com/photos/30560980/pexels-photo-30560980.jpeg?auto=compress&cs=tinysrgb&w=800&q=85",
  },
  {
    title: "Birthday Event",
    slug: "birthday_event",
    description: "A birthday dinner built around the person of the evening — custom cake, a menu of their favourites, the table dressed for them. Tell us a few things they love.",
    detail: "From 4 guests — from 110 EUR/person",
    image: "https://images.pexels.com/photos/29125650/pexels-photo-29125650.jpeg?auto=compress&cs=tinysrgb&w=800&q=85",
  },
  {
    title: "Moroccan Traditional Experience",
    slug: "moroccan_experience",
    description: "The full ceremony: harira soup, bastilla, lamb tagine, couscous, mint tea poured from height, and chebakia pastries. Morocco served with reverence.",
    detail: "From 2 guests — from 85 EUR/person",
    image: "https://images.pexels.com/photos/5737365/pexels-photo-5737365.jpeg?auto=compress&cs=tinysrgb&w=800&q=85",
  },
  {
    title: "Cooking Class",
    slug: "cooking_class",
    description: "Half a day with the chef — start at the souk choosing spices and produce, then cook a full Moroccan meal and eat what you made. You'll leave able to build a tagine from scratch.",
    detail: "From 2 guests — from 65 EUR/person",
    image: "https://images.pexels.com/photos/30356249/pexels-photo-30356249.jpeg?auto=compress&cs=tinysrgb&w=800&q=85",
  },
  {
    title: "Desert Dining Experience",
    slug: "desert_dining",
    description: "A once-in-a-lifetime dinner set in the Agafay Desert as the sun dissolves into the dunes. Berber lanterns, live Gnawa music, and a menu inspired by the nomadic table.",
    detail: "From 2 guests — from 160 EUR/person",
    image: "https://images.pexels.com/photos/36209321/pexels-photo-36209321.jpeg?auto=compress&cs=tinysrgb&w=800&q=85",
  },
  {
    title: "Event Catering",
    slug: "event_catering",
    description: "Weddings, corporate dinners, riad takeovers. Tell us the date, the headcount, and the kind of evening you want — we'll send back a proposal within 48 hours.",
    detail: "20+ guests — contact for pricing",
    image: "https://images.pexels.com/photos/5737365/pexels-photo-5737365.jpeg?auto=compress&cs=tinysrgb&w=800&q=85",
  },
];

export default function Experiences() {
  return (
    <>
      <title>Ten Ways to Eat Well in Marrakech — La Table Marrakech</title>
      <meta name="description" content="Romantic dinners, villa chefs, rooftop tables, cooking classes, desert dining and more — ten private chef experiences in Marrakech. From €45 per person. Book on WhatsApp." />

      {/* Hero */}
      <section className="relative h-80 flex items-end justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/30769609/pexels-photo-30769609.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt="Private chef experiences in Marrakech"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 pb-14 text-center text-white">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-3">Choose Your Evening</p>
          <h1 className="font-serif text-4xl md:text-6xl">Ten ways to eat well in Marrakech.</h1>
        </div>
      </section>

      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-24"
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.slug}
                variants={fadeUp}
                data-testid={`experience-${exp.slug}`}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
              >
                <div className={i % 2 === 1 ? "[direction:ltr]" : ""}>
                  <div className="overflow-hidden aspect-[4/3]">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? "[direction:ltr] md:pr-0 md:pl-0" : ""} space-y-6`}>
                  <div>
                    <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4">{exp.detail}</p>
                    <h2 className="font-serif text-3xl md:text-4xl mb-6">{exp.title}</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">{exp.description}</p>
                  </div>
                  <Link
                    href="/contact"
                    data-testid={`btn-book-${exp.slug}`}
                    className="inline-flex items-center gap-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors px-8 py-4 uppercase tracking-[0.2em] text-xs"
                  >
                    Reserve This Evening <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-zinc-950 text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Still deciding?</h2>
          <p className="text-zinc-300 mb-10 leading-relaxed">Send us your dates and group size on WhatsApp. We'll suggest the right evening in a couple of messages.</p>
          <a
            href="https://wa.me/212721354757"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-4 bg-amber-600 hover:bg-amber-700 text-white uppercase tracking-[0.2em] text-sm transition-colors"
          >
            Ask on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}




