import { motion, easeOut } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";
import { useSEO, breadcrumbSchema } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const experiences = [
  {
    title: "Romantic Dinner",
    slug: "romantic_dinner",
    description: "A table set just for the two of you — flowers, candles, slow service, a menu built around what you like. We've done first dates, anniversaries, proposals, and one wedding rehearsal in a riad courtyard. Tell us what kind of night you want.",
    detail: "For 2 · From €120/person",
    image: "/images/romantic-dinner.png",
  },
  {
    title: "Villa Private Chef",
    slug: "villa_chef",
    description: "Hand us your villa kitchen for the evening. We arrive with everything, cook through the night, and leave the kitchen cleaner than we found it. You and your group eat like you booked a restaurant — except no one had to leave the pool.",
    detail: "From 4 guests · From €90/person",
    image: "/images/villa-chef.png",
  },
  {
    title: "Rooftop Dinner",
    slug: "rooftop_dinner",
    description: "Marrakech is best from a rooftop, after dark, when the amber lights of the medina start to flicker. We set the table, light the lanterns, and serve dinner course by course as the city quiets down.",
    detail: "For 2 · From €130/person",
    image: "/images/hero-villa-terrace.jpg",
  },
  {
    title: "Family Dining",
    slug: "family_dining",
    description: "A long table, a lot of food, a lot of small bowls. Mezze, three or four tagines down the middle, couscous, pastries. The kind of meal where seconds are expected.",
    detail: "From 6 guests · From €75/person",
    image: "/images/moroccan-experience.png",
  },
  {
    title: "Luxury Breakfast",
    slug: "luxury_breakfast",
    description: "Hot msemen and beghrir off the pan, local honey, soft cheeses, fruit picked that morning, coffee ground at your table. Slow it down. Eat for an hour. The medina can wait.",
    detail: "For 2 · From €45/person",
    image: "/images/luxury-breakfast.png",
  },
  {
    title: "Birthday Event",
    slug: "birthday_event",
    description: "A custom cake. A menu built around the person of the evening. The table dressed for them, not the room. Tell us a few things they love — we handle the rest.",
    detail: "From 4 guests · From €110/person",
    image: "/images/hero-riad.png",
  },
  {
    title: "Moroccan Traditional Experience",
    slug: "moroccan_experience",
    description: "The full ceremony, in the right order: harira to start, bastilla, lamb tagine, couscous, mint tea poured from a height, chebakia to finish. The version your Moroccan friend would cook for you, not the version on a tourist menu.",
    detail: "For 2 · From €85/person",
    image: "/images/dish-couscous-lamb.jpg",
  },
  {
    title: "Cooking Class",
    slug: "cooking_class",
    description: "Half a day in the kitchen with the chef. Start at the souk picking spices and produce, come back, cook a full Moroccan meal, then eat what you made. You'll leave knowing how to make a tagine from scratch.",
    detail: "For 2 · From €65/person",
    image: "/images/dish-chicken-tagine.jpg",
  },
  {
    title: "Desert Dining Experience",
    slug: "desert_dining",
    description: "An hour outside Marrakech, the city is gone and the Agafay dunes start. We set a table on the sand, light Berber lanterns, and a small band plays Gnawa as the sun goes. Dinner is nomadic — grilled, smoky, slow.",
    detail: "For 2 · From €160/person",
    image: "/images/desert-dining.png",
  },
  {
    title: "Event Catering",
    slug: "event_catering",
    description: "Weddings, corporate dinners, riad takeovers, brand launches. Tell us the date, the count, and the vibe. We'll send back a proposal within 48 hours.",
    detail: "20+ guests · Price on request",
    image: "/images/experiences-bg.jpg",
  },
];

/* ─── Moroccan SVG Ornament ────────────────────────────────────────────── */
function MoroccanOrnament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="40,4 50,20 68,20 55,32 60,50 40,40 20,50 25,32 12,20 30,20" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6"/>
      <circle cx="40" cy="40" r="10" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.4"/>
      <polygon points="40,14 46,26 60,26 50,34 54,46 40,38 26,46 30,34 20,26 34,26" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.3"/>
      <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="0.5" fill="none" opacity="0.2" strokeDasharray="4 4"/>
    </svg>
  );
}

export default function Experiences() {
  useSEO({
    title: "Ten Ways To Eat Well In Marrakech — La Table Marrakech",
    description: "Romantic dinners, villa chefs, rooftop tables, cooking classes, desert dining and more. Pick the evening you want — or message us on WhatsApp and we'll help you choose.",
    canonical: "https://latablemarrakech.com/experiences",
    jsonLd: breadcrumbSchema([
      { name: "Home", url: "https://latablemarrakech.com/" },
      { name: "Experiences", url: "https://latablemarrakech.com/experiences" },
    ]),
  });

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 md:pt-52 pb-20 md:pb-24 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-20 -right-24 w-80 h-80 text-amber-600/[0.07] pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/[0.06] pointer-events-none rotate-45">
          <MoroccanOrnament className="w-full h-full" />
        </div>

        <div className="relative container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9 }}
              className="text-xs md:text-sm tracking-[0.4em] uppercase text-amber-700 mb-6"
            >
              Ten Ways to Eat Well
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.7, ease: easeOut }}
              className="flex items-center justify-center gap-3 mb-8"
            >
              <div className="w-16 h-px bg-amber-600/40" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <div className="w-16 h-px bg-amber-600/40" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 1, ease: easeOut }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground"
            >
              Pick the evening <span className="italic text-amber-700">you want.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.9 }}
              className="text-base md:text-lg text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed italic"
            >
              Or message us and we&rsquo;ll suggest one. Most guests change their mind after we talk anyway.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCES — typographic tasting-menu spread ────────────────── */}
      <section className="pt-12 md:pt-16 pb-28 md:pb-32 bg-gradient-to-b from-stone-50 via-background to-stone-50 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/5 pointer-events-none rotate-45">
          <MoroccanOrnament className="w-full h-full" />
        </div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-5xl mx-auto"
          >
            {experiences.map((exp, i) => {
              const reverse = i % 2 === 1;
              const isLast = i === experiences.length - 1;
              return (
                <motion.article
                  key={exp.slug}
                  variants={fadeUp}
                  data-testid={`experience-${exp.slug}`}
                  className={`relative ${reverse ? "md:ml-auto md:pl-12 md:text-left md:max-w-3xl" : "md:mr-auto md:pr-12 md:max-w-3xl"} py-12 md:py-16`}
                >
                  {/* Oversized folio number watermark */}
                  <span
                    aria-hidden
                    className={`absolute top-2 md:top-6 ${reverse ? "right-0 md:-right-4" : "left-0 md:-left-4"} font-serif text-[6rem] md:text-[10rem] leading-[0.85] text-amber-700/[0.10] select-none pointer-events-none`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700/60 mb-3">
                      No. {String(i + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}
                    </p>
                    <p className="text-xs tracking-[0.3em] uppercase text-amber-700 mb-4">{exp.detail}</p>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-foreground mb-5">
                      {exp.title}
                    </h2>
                    <div className="w-12 h-px bg-amber-600/40 mb-6" />
                    <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-2xl">
                      {exp.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`btn-whatsapp-${exp.slug}`}
                        data-cta-label="Get a Menu and Quote on WhatsApp"
                        data-cta-position={`experience_${exp.slug}`}
                        className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.2em] text-xs transition-colors"
                      >
                        Ask on WhatsApp
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </a>
                      <Link
                        href="/contact"
                        data-testid={`btn-book-${exp.slug}`}
                        className="inline-flex items-center justify-center gap-3 px-7 py-4 border border-foreground/80 text-foreground hover:border-amber-600 hover:text-amber-700 uppercase tracking-[0.2em] text-xs transition-colors"
                      >
                        Reserve This Evening
                      </Link>
                    </div>
                  </div>

                  {/* Fleuron section break between experiences */}
                  {!isLast && (
                    <div
                      aria-hidden
                      className="flex items-center justify-center gap-5 pt-16 md:pt-20"
                    >
                      <span className="block h-px w-20 md:w-28 bg-amber-600/20" />
                      <svg width="10" height="10" viewBox="0 0 10 10" className="text-amber-600/50 flex-shrink-0">
                        <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
                      </svg>
                      <span className="block h-px w-20 md:w-28 bg-amber-600/20" />
                    </div>
                  )}
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 text-amber-500/[0.05] pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 text-amber-500/[0.05] pointer-events-none -rotate-12">
          <MoroccanOrnament className="w-full h-full" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        >
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl leading-[1.05]">
            Still <span className="italic text-amber-200">deciding?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
            Send us a WhatsApp with your dates and group size. We&rsquo;ll suggest the right evening in two messages.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="btn-experiences-final-whatsapp"
              data-cta-label="Get a Menu and Quote on WhatsApp"
              data-cta-position="experiences_final_cta"
              className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300"
            >
              Get a Menu &amp; Quote on WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/contact"
              data-testid="btn-experiences-final-form"
              className="inline-flex items-center justify-center gap-3 px-12 py-5 border border-white/30 text-white hover:border-amber-300 hover:text-amber-200 uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300"
            >
              Send Us the Details
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="text-white/50 text-xs tracking-[0.2em] uppercase mt-8">
            No deposit until you confirm the menu
          </motion.p>
        </motion.div>
      </section>
    </>
  );
}
