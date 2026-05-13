import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Heart } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const includes = [
  "Bespoke 5-course tasting menu for two",
  "Market-fresh seasonal ingredients",
  "Personalised menu based on your preferences",
  "Candlelit table decoration",
  "Full set-up, cooking, service, and clean-up",
  "Mint tea and Moroccan pastries finale",
];

export default function RomanticDinnerMarrakech() {
  return (
    <>
      <title>Romantic Dinner in Marrakech — Private Chef for Two | La Table Marrakech</title>
      <meta name="description" content="Book a romantic private chef dinner in Marrakech for your anniversary, honeymoon, or special occasion. Candlelit dinner in your riad or villa, curated just for the two of you." />
      <link rel="canonical" href="https://latablemarrakech.com/romantic-dinner-marrakech" />

      {/* Hero */}
      <section className="relative h-screen max-h-[700px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80"
          alt="Romantic dinner Marrakech private chef"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
          </motion.div>
          <motion.p variants={fadeUp} className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-4">For Two</motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl leading-tight mb-8">
            Romantic Dinner<br /><span className="italic text-amber-200">in Marrakech</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/80 text-xl mb-12 leading-relaxed max-w-xl mx-auto">
            An intimate candlelit dinner composed exclusively for the two of you, in the privacy of your villa or riad.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/contact" data-testid="romantic-cta" className="px-12 py-5 bg-amber-600 hover:bg-amber-700 text-white uppercase tracking-[0.2em] text-sm transition-colors inline-block">
              Reserve Your Evening
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-serif text-3xl md:text-4xl mb-8">An Evening You Will Never Forget</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  Marrakech is a city built for romance — the candlelight flickering in a riad courtyard, the scent of orange blossom, the sound of a distant oud. La Table Marrakech transforms that atmosphere into a dinner experience that rivals anything you have encountered in the world's finest restaurants.
                </p>
                <p>
                  Our private chef designs a five-course tasting menu exclusively around you: your tastes, your occasion, your story. Whether it is an anniversary, a honeymoon, a proposal, or simply a night to honour each other, we orchestrate every detail.
                </p>
                <p>
                  From your amuse-bouche to your dessert, from the arrangement of candles to the final glass of Moroccan mint tea poured from height — every gesture is intentional.
                </p>
              </div>

              <div className="mt-10 space-y-3">
                <p className="text-xs uppercase tracking-widest text-primary font-medium mb-4">What is Included</p>
                {includes.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <div className="w-4 h-px bg-primary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link href="/contact" data-testid="romantic-inline-cta" className="inline-flex items-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-10 py-4 uppercase tracking-[0.2em] text-xs">
                  Book Your Romantic Dinner <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/30769609/pexels-photo-30769609.jpeg?auto=compress&cs=tinysrgb&w=800&q=85"
                  alt="Romantic candlelit dinner Marrakech"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="font-serif text-3xl mb-12">Perfect for Every Special Occasion</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {["Anniversary Dinner", "Honeymoon Night", "Marriage Proposal", "Valentine's Day", "Birthday Dinner", "Simply Because"].map((occ, i) => (
              <div key={i} className="bg-white p-6 border border-border">
                <p className="font-serif text-sm">{occ}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950 text-white text-center">
        <div className="container mx-auto px-6 max-w-xl">
          <h2 className="font-serif text-4xl mb-6">Reserve Your Romantic Evening</h2>
          <p className="text-zinc-300 mb-10">We handle every detail. You simply arrive and fall in love with Marrakech all over again.</p>
          <Link href="/contact" className="inline-block px-14 py-5 bg-amber-600 hover:bg-amber-700 text-white uppercase tracking-[0.2em] text-sm transition-colors">
            Begin Your Reservation
          </Link>
        </div>
      </section>
    </>
  );
}
