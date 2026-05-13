import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const experiences = [
  {
    title: "Romantic Dinner",
    slug: "romantic_dinner",
    description: "An intimate candlelit dinner for two, composed with the precision of a Michelin kitchen and the warmth of Moroccan hospitality. Fresh flowers, fine linen, and a bespoke menu crafted around your evening.",
    detail: "From 2 guests — from 120 EUR/person",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Villa Private Chef",
    slug: "villa_chef",
    description: "Your private chef takes full command of your villa kitchen. From amuse-bouche through dessert, every course is tailored to your group. The ultimate in bespoke luxury dining.",
    detail: "From 4 guests — from 90 EUR/person",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Rooftop Dinner",
    slug: "rooftop_dinner",
    description: "Dine on a candlelit rooftop above the medina as the city's amber lights flicker to life below. Star-gazing and exceptional cuisine, with the sounds of Marrakech as your backdrop.",
    detail: "From 2 guests — from 130 EUR/person",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Family Dining",
    slug: "family_dining",
    description: "A generous Moroccan feast designed for families — mezze, slow-cooked tagines, fresh couscous, and pastries. Warm, abundant, and joyful.",
    detail: "From 6 guests — from 75 EUR/person",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Luxury Breakfast",
    slug: "luxury_breakfast",
    description: "Begin your Marrakech morning with a spread of freshly baked msemen, artisan cheeses, local honey, seasonal fruits, and hand-ground coffee. A ritual worth rising early for.",
    detail: "From 2 guests — from 45 EUR/person",
    image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Birthday Event",
    slug: "birthday_event",
    description: "A fully orchestrated birthday dinner or celebration. Custom cake, bespoke menu, decorated table, and a culinary performance designed to honour the guest of the evening.",
    detail: "From 4 guests — from 110 EUR/person",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Moroccan Traditional Experience",
    slug: "moroccan_experience",
    description: "The full ceremony: harira soup, bastilla, lamb tagine, couscous, mint tea poured from height, and chebakia pastries. Morocco served with reverence.",
    detail: "From 2 guests — from 85 EUR/person",
    image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Cooking Class",
    slug: "cooking_class",
    description: "Learn to command the spice box. A half-day guided kitchen experience where you prepare and then savour a full Moroccan meal under the instruction of a master chef.",
    detail: "From 2 guests — from 65 EUR/person",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Desert Dining Experience",
    slug: "desert_dining",
    description: "A once-in-a-lifetime dinner set in the Agafay Desert as the sun dissolves into the dunes. Berber lanterns, live Gnawa music, and a menu inspired by the nomadic table.",
    detail: "From 2 guests — from 160 EUR/person",
    image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Event Catering",
    slug: "event_catering",
    description: "Full-service catering for private events, corporate gatherings, and celebrations in Marrakech. Customised menu, professional service, and impeccable execution.",
    detail: "20+ guests — contact for pricing",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Experiences() {
  return (
    <>
      <title>Private Chef Experiences in Marrakech — La Table Marrakech</title>
      <meta name="description" content="Discover all private chef experiences in Marrakech: romantic dinners, villa dining, rooftop dinners, Moroccan cooking classes, desert dining, and more. Book your luxury culinary experience." />

      {/* Hero */}
      <section className="relative h-80 flex items-end justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80"
          alt="Private chef experiences in Marrakech"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 pb-14 text-center text-white">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-3">Curated for You</p>
          <h1 className="font-serif text-4xl md:text-6xl">Our Experiences</h1>
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
                    Reserve This Experience <ArrowRight className="w-3 h-3" />
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
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Not Sure Which Experience is Right for You?</h2>
          <p className="text-zinc-300 mb-10 leading-relaxed">Message us on WhatsApp and we will personally help you choose the perfect evening.</p>
          <a
            href="https://wa.me/212600000000"
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
