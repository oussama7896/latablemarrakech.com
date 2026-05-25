import { motion, easeOut } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, MapPin, Home, Utensils, Star } from "lucide-react";
import { breadcrumbSchema, faqSchema, useSEO } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const areas: [string, string][] = [
  ["Palmeraie", "Best for groups, pool dinners, and big villa kitchens."],
  ["Medina Riads", "Best for atmosphere, rooftops, and intimate courtyards."],
  ["Hivernage", "Best for short stays close to hotels, nightlife, and the medina."],
  ["Ourika", "Best for Atlas views and slow countryside lunches."],
];

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

export default function MarrakechVillaWithPrivateChef() {
  useSEO({
    title: "Marrakech Villas With Private Chef | 2026 Booking Guide",
    description: "Renting a villa or riad in Marrakech and want a private chef? Compare areas, kitchen requirements, pricing and how to book La Table Marrakech.",
    canonical: "https://latablemarrakech.com/marrakech-villa-with-private-chef",
    ogType: "article",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", url: "https://latablemarrakech.com/" },
        { name: "Marrakech Villa With Private Chef", url: "https://latablemarrakech.com/marrakech-villa-with-private-chef" },
      ]),
      faqSchema([
        { question: "Can I book a private chef for a Marrakech villa?", answer: "Yes. La Table Marrakech cooks in villas, riads and rentals across Marrakech, including Palmeraie, Medina, Hivernage and Ourika." },
        { question: "What does the villa kitchen need?", answer: "A working hob, oven, basic prep space and enough plates/glasses for the group are ideal. The chef can bring specialist equipment when needed." },
      ]),
    ],
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
              Villa Dining Guide · 2026
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.7, ease: easeOut }} className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-px bg-amber-600/40" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <div className="w-16 h-px bg-amber-600/40" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1, ease: easeOut }} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
              A Marrakech villa, <span className="italic text-amber-700">a private chef.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }} className="text-base md:text-lg text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed italic">
              Where to stay, what to ask your host, and how to bring a chef into the villa without turning dinner into logistics.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.9 }} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="villa-guide-hero-whatsapp" data-cta-label="Get a Menu and Quote on WhatsApp" data-cta-position="villa_guide_hero" className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-colors">
                Plan a Villa Dinner <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-foreground/80 text-foreground hover:border-amber-600 hover:text-amber-700 uppercase tracking-[0.22em] text-xs md:text-sm transition-colors">
                Send Us the Details
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
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-14 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="space-y-5">
              <div className="bg-white border border-stone-200/80 p-8 md:p-10 shadow-sm hover:border-amber-600/30 transition-colors">
                <Home className="h-6 w-6 text-amber-700 mb-5" strokeWidth={1.5} />
                <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-3">What Works Best</p>
                <h2 className="font-serif text-2xl md:text-3xl leading-[1.15] mb-4">
                  Villas with outdoor <span className="italic text-amber-700">tables.</span>
                </h2>
                <div className="w-10 h-px bg-amber-600/40 mb-5" />
                <p className="text-muted-foreground leading-relaxed">
                  Courtyards, rooftops, or terraces. We confirm the kitchen, headcount, dietary notes, and table setup before you book.
                </p>
              </div>
              <div className="bg-zinc-950 text-white p-8 md:p-10 relative overflow-hidden">
                <div className="absolute -bottom-16 -right-16 w-48 h-48 text-amber-500/[0.06] pointer-events-none -rotate-12">
                  <MoroccanOrnament className="w-full h-full" />
                </div>
                <Utensils className="h-6 w-6 text-amber-300 mb-5 relative" strokeWidth={1.5} />
                <p className="text-[10px] tracking-[0.4em] uppercase text-amber-400 mb-3 relative">What We Bring</p>
                <h2 className="font-serif text-2xl md:text-3xl leading-[1.15] mb-4 relative">
                  Everything <span className="italic text-amber-200">but the villa.</span>
                </h2>
                <div className="w-10 h-px bg-amber-500/40 mb-5 relative" />
                <p className="text-white/70 leading-relaxed relative">
                  Ingredients, the menu plan, the chef team, cookware when needed, service rhythm, plating, and cleanup.
                </p>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
              <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">Best Areas</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground mb-8">
                Where to stay <span className="italic text-amber-700">in Marrakech.</span>
              </h2>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {areas.map(([name, text], i) => (
                  <motion.article
                    key={name}
                    variants={fadeUp}
                    className="bg-white border border-stone-200/80 p-7 md:p-8 hover:border-amber-600/30 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-baseline gap-3 mb-4">
                      <MapPin className="h-5 w-5 text-amber-700 shrink-0" strokeWidth={1.5} />
                      <span className="text-[10px] tracking-[0.4em] uppercase text-amber-700/70">No. {String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl leading-snug mb-3">{name}</h3>
                    <div className="w-10 h-px bg-amber-600/40 mb-4" />
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{text}</p>
                  </motion.article>
                ))}
              </motion.div>
              <p className="mt-10 text-muted-foreground leading-relaxed italic">
                Already have a villa booked? Send the address, date, and group size on WhatsApp. We&rsquo;ll tell you quickly whether the kitchen setup is enough and what dinner would cost.
              </p>
            </motion.div>
          </div>
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
            Bring dinner to <span className="italic text-amber-200">your villa.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
            Tell us the address, date, and group size. We&rsquo;ll send back a menu and a price.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="villa-guide-final-whatsapp" data-cta-label="Get a Menu and Quote on WhatsApp" data-cta-position="villa_guide_final_cta" className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
              Get a Menu &amp; Quote on WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/contact" data-testid="villa-guide-final-form" className="inline-flex items-center justify-center gap-3 px-12 py-5 border border-white/30 text-white hover:border-amber-300 hover:text-amber-200 uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
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
