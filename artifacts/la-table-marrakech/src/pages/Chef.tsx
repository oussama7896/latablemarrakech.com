import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const credentials = [
  "Trained at Le Cordon Bleu Paris",
  "20+ years of private dining experience",
  "Former chef at Palais Namaskar, Marrakech",
  "Specialist in Moroccan and Mediterranean cuisine",
  "Featured in Condé Nast Traveller",
  "Speaks English, French, Arabic, and Darija",
];

const values = [
  {
    title: "Sourced at Dawn",
    desc: "Every morning begins at the Mellah market. Only what is ripe, seasonal, and exceptional earns a place on the menu.",
  },
  {
    title: "Composed with Intent",
    desc: "Each dish tells a story — of a spice route, a grandmother's recipe, or a childhood memory of tagine steam rising through a riad courtyard.",
  },
  {
    title: "Served with Presence",
    desc: "Dinner is not merely eaten. It is experienced. Our chef is present throughout — explaining, adjusting, and ensuring every moment is memorable.",
  },
];

export default function Chef() {
  return (
    <>
      <title>The Private Chef — La Table Marrakech</title>
      <meta name="description" content="Meet the private chef behind La Table Marrakech. A master of Moroccan and Mediterranean cuisine with 20 years of experience creating unforgettable private dining experiences." />

      {/* Hero */}
      <section className="relative h-screen max-h-[800px] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1920&q=80"
          alt="Private chef La Table Marrakech"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 px-6 container mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-xl text-white"
          >
            <motion.p variants={fadeUp} className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-6">
              The Artisan
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl leading-tight mb-8">
              Where Tradition Meets Precision
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-lg leading-relaxed">
              Twenty years. One obsession: the perfect dinner.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">The Story</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-10">
                Born in Fez,<br />
                <span className="italic">Refined in Paris</span>
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Growing up in the medina of Fez, food was ceremony. His grandmother's hands — dusted in cumin and coriander — shaped his earliest understanding of what a meal could mean. Not sustenance. Devotion.
                </p>
                <p>
                  A scholarship brought him to Le Cordon Bleu in Paris at twenty-two. He spent a decade in European kitchens, learning the architecture of French cuisine — its precision, its silence, its discipline. But the flavours he craved always pulled him south.
                </p>
                <p>
                  He returned to Morocco and joined the kitchen at Palais Namaskar, one of Marrakech's most celebrated luxury hotels. It was there he understood that his true calling was not the restaurant — it was the intimate table. The private dinner where a chef could know, truly know, the people he was cooking for.
                </p>
                <p>
                  La Table Marrakech was born from that conviction.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="space-y-12"
            >
              <div className="bg-stone-100 p-10">
                <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">Credentials</p>
                <ul className="space-y-4">
                  {credentials.map((c, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm text-foreground">
                      <div className="w-5 h-px bg-primary shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80"
                  alt="Moroccan spices and ingredients"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-28 bg-zinc-950 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-amber-400 mb-4">The Philosophy</p>
            <h2 className="font-serif text-4xl md:text-5xl">A Meal is a Memory</h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {values.map((v, i) => (
              <motion.div key={i} variants={fadeUp} className="border-l border-amber-400/30 pl-8">
                <h3 className="font-serif text-2xl text-amber-200 mb-4">{v.title}</h3>
                <p className="text-zinc-300 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background text-center">
        <div className="container mx-auto px-6 max-w-xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-serif text-4xl mb-6">Reserve Your Table</h2>
            <p className="text-muted-foreground mb-10">Let us compose an evening you will speak of for years.</p>
            <Link
              href="/contact"
              data-testid="btn-chef-cta"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-12 py-5 uppercase tracking-[0.2em] text-xs"
            >
              Begin Your Experience <ArrowRight className="w-3 h-3" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
