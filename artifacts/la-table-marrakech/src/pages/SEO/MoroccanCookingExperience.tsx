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

const dishes = [
  "Chicken Tagine with Preserved Lemon",
  "Lamb Mrouzia",
  "Classic Couscous with Seven Vegetables",
  "Bastilla",
  "Harira Soup",
  "Chebakia Pastries",
  "Moroccan Mint Tea Ceremony",
];

const facts = [
  { title: "Duration", value: "3 – 4 hours" },
  { title: "Group Size", value: "2 – 8 guests" },
  { title: "Language", value: "EN · FR · AR" },
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

export default function MoroccanCookingExperience() {
  useSEO({
    title: "Moroccan Cooking Class in Marrakech — Private Chef Experience | La Table Marrakech",
    description: "Learn to cook authentic Moroccan cuisine with a private chef in Marrakech. Hands-on cooking class in your riad or villa, followed by a full Moroccan feast. Book your cooking experience.",
    canonical: "https://latablemarrakech.com/moroccan-cooking-experience",
    jsonLd: breadcrumbSchema([
      { name: "Home", url: "https://latablemarrakech.com/" },
      { name: "Moroccan Cooking Experience", url: "https://latablemarrakech.com/moroccan-cooking-experience" },
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
              Hands In The Pan
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.7, ease: easeOut }} className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-px bg-amber-600/40" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <div className="w-16 h-px bg-amber-600/40" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1, ease: easeOut }} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
              Cook like a Moroccan. <span className="italic text-amber-700">Eat like a king.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }} className="text-base md:text-lg text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed italic">
              A hands-on private cooking class with a master Moroccan chef, followed by a feast of everything you&rsquo;ve made together.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.9 }} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="cooking-hero-whatsapp" data-cta-label="Get a Menu and Quote on WhatsApp" data-cta-position="cooking_class_hero" className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-colors">
                Ask on WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/contact" data-testid="cooking-cta" className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-foreground/80 text-foreground hover:border-amber-600 hover:text-amber-700 uppercase tracking-[0.22em] text-xs md:text-sm transition-colors">
                Book Your Class
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
              <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">The Class</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground mb-6">
                The recipes your Moroccan friend would <span className="italic text-amber-700">actually cook for you.</span>
              </h2>
              <div className="w-12 h-px bg-amber-600/40 mb-8" />
              <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
                <p>The spice markets of Marrakech are one of the world&rsquo;s great sensory experiences. The real magic happens when those spices reach the kitchen — and when a master teaches you exactly how to use them.</p>
                <p>The class starts with a guided introduction to Moroccan spices and techniques, followed by half a day of hands-on cooking in your villa or riad kitchen. You learn traditional dishes from scratch, the layering of flavours, and the techniques that make Moroccan cuisine so distinctively rich.</p>
                <p>It ends with the best part: sitting down together to eat everything you&rsquo;ve made, with warm khobz and mint tea poured from a height.</p>
                <p>You leave with the recipes, the techniques, a small jar of ras el hanout, and a skill that will impress your dinner guests for years.</p>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="space-y-6">
              <div className="overflow-hidden border border-stone-200/80 aspect-[4/3]">
                <img src="/images/dish-chicken-tagine.jpg" alt="Chicken tagine learned in a Moroccan cooking class" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white border border-stone-200/80 p-8 md:p-10 shadow-sm">
                <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-6">Dishes You May Learn</p>
                <ul className="space-y-3">
                  {dishes.map((dish, i) => (
                    <li key={i} className="flex items-baseline gap-4 text-sm text-foreground/85 leading-relaxed">
                      <span className="text-amber-700/80 font-serif text-xs shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span>{dish}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FACTS BAND ──────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-24 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute -top-16 -right-16 w-72 h-72 text-amber-500/[0.06] pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="absolute -bottom-16 -left-16 w-72 h-72 text-amber-500/[0.06] pointer-events-none -rotate-12">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="container mx-auto px-6 max-w-4xl relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 text-center">
            {facts.map((item, i) => (
              <div key={i}>
                <p className="text-[10px] tracking-[0.4em] uppercase text-amber-400 mb-3">{item.title}</p>
                <p className="font-serif text-3xl md:text-4xl text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 text-amber-600/[0.06] pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 text-amber-600/[0.06] pointer-events-none -rotate-12">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl leading-[1.05] text-foreground">
            Take Marrakech <span className="italic text-amber-700">home with you.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
            Reserve your private cooking class — for two to eight people, in your villa or riad.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="cooking-final-whatsapp" data-cta-label="Get a Menu and Quote on WhatsApp" data-cta-position="cooking_class_final_cta" className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
              Get a Menu &amp; Quote on WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/contact" data-testid="cooking-final-form" className="inline-flex items-center justify-center gap-3 px-12 py-5 border border-foreground/80 text-foreground hover:border-amber-600 hover:text-amber-700 uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
              Send Us the Details
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
