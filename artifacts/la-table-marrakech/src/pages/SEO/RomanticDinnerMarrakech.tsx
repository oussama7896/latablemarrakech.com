import { motion, easeOut } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";
import { useSEO, breadcrumbSchema } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const includes = [
  "Bespoke five-course tasting menu for two",
  "Market-fresh seasonal ingredients",
  "Personalised around your tastes",
  "Candlelit table styling",
  "Full set-up, cooking, service, cleanup",
  "Mint tea and Moroccan pastries finale",
];

const occasions = ["Anniversary", "Honeymoon", "Proposal", "Valentine's", "Birthday", "Just Because"];

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

export default function RomanticDinnerMarrakech() {
  useSEO({
    title: "Romantic Dinner in Marrakech — Private Chef for Two | La Table Marrakech",
    description: "Book a romantic private chef dinner in Marrakech for your anniversary, honeymoon, or special occasion. Candlelit dinner in your riad or villa, curated just for the two of you.",
    canonical: "https://latablemarrakech.com/romantic-dinner-marrakech",
    jsonLd: breadcrumbSchema([
      { name: "Home", url: "https://latablemarrakech.com/" },
      { name: "Romantic Dinner Marrakech", url: "https://latablemarrakech.com/romantic-dinner-marrakech" },
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
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-4xl mx-auto">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }} className="text-xs md:text-sm tracking-[0.4em] uppercase text-amber-700 mb-6">
              A Table For Two
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.7, ease: easeOut }} className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-px bg-amber-600/40" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <div className="w-16 h-px bg-amber-600/40" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1, ease: easeOut }} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
              A romantic dinner <span className="italic text-amber-700">in Marrakech.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }} className="text-base md:text-lg text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed italic">
              An intimate candlelit dinner composed exclusively for the two of you — in the privacy of your villa, riad, or rooftop.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.9 }} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="romantic-hero-whatsapp" data-cta-label="Get a Menu and Quote on WhatsApp" data-cta-position="romantic_dinner_hero" className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-colors">
                Ask on WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/contact" data-testid="romantic-cta" className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-foreground/80 text-foreground hover:border-amber-600 hover:text-amber-700 uppercase tracking-[0.22em] text-xs md:text-sm transition-colors">
                Reserve Your Evening
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CONTENT ─────────────────────────────────────────────────────── */}
      <section className="relative pt-12 md:pt-16 pb-20 md:pb-24 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/5 pointer-events-none rotate-45">
          <MoroccanOrnament className="w-full h-full" />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
              <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">An Evening for Two</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground mb-6">
                The kind of night you&rsquo;ll <span className="italic text-amber-700">always remember.</span>
              </h2>
              <div className="w-12 h-px bg-amber-600/40 mb-8" />
              <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
                <p>Marrakech is a city built for romance — candlelight flickering in a riad courtyard, the scent of orange blossom, a distant oud. We turn that atmosphere into a dinner that rivals anything you&rsquo;ve eaten in the world&rsquo;s finest restaurants.</p>
                <p>Our chef designs a five-course tasting menu exclusively around you — your tastes, your occasion, your story. Anniversary, honeymoon, proposal, or simply a night to honour each other.</p>
                <p>From your amuse-bouche to your dessert, from the arrangement of candles to the final pour of mint tea, every gesture is intentional.</p>
              </div>

              <div className="mt-10 bg-white border border-stone-200/80 p-7 md:p-8 shadow-sm">
                <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-5">What&rsquo;s Included</p>
                <ul className="space-y-3">
                  {includes.map((item, i) => (
                    <li key={i} className="flex items-baseline gap-4 text-sm text-foreground/85 leading-relaxed">
                      <span className="text-amber-700/80 font-serif text-xs shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
              <div className="overflow-hidden border border-stone-200/80 aspect-[3/4]">
                <img src="/images/romantic-dinner.png" alt="Intimate candlelit dinner for two in a Marrakech riad" loading="lazy" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OCCASIONS ───────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl text-center relative">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">Six Reasons</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] mb-6">
            Built for any <span className="italic text-amber-700">occasion.</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-12 h-px bg-amber-600/40" />
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <div className="w-12 h-px bg-amber-600/40" />
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {occasions.map((occ, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-white border border-stone-200/80 hover:border-amber-600/30 hover:shadow-lg p-7 transition-all duration-300">
                <p className="font-serif text-base md:text-lg">{occ}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 text-amber-500/[0.05] pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 text-amber-500/[0.05] pointer-events-none -rotate-12">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl leading-[1.05]">
            Reserve your <span className="italic text-amber-200">romantic evening.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
            We handle every detail. You arrive and fall in love with Marrakech all over again.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="romantic-final-whatsapp" data-cta-label="Get a Menu and Quote on WhatsApp" data-cta-position="romantic_dinner_final_cta" className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
              Get a Menu &amp; Quote on WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/contact" data-testid="romantic-final-form" className="inline-flex items-center justify-center gap-3 px-12 py-5 border border-white/30 text-white hover:border-amber-300 hover:text-amber-200 uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
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
