import { motion, easeOut } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";
import { breadcrumbSchema, faqSchema, useSEO } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const comparison: [string, string, string][] = [
  ["Best for", "Hands-on food lovers", "Couples, families, groups who want to relax"],
  ["Typical time", "4 – 5 hours", "3 – 4 hours, usually dinner"],
  ["Effort", "You shop, prep, and cook", "You sit down; the chef handles the evening"],
  ["Setting", "Class kitchen or your villa", "Your villa, riad, rooftop, or rental"],
  ["Price range", "€45 – €90 / person", "From €85 / person"],
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

export default function CookingClassVsPrivateChef() {
  useSEO({
    title: "Marrakech Cooking Class vs Private Chef | Which Should You Book?",
    description: "Compare Marrakech cooking classes with private chef dinners: prices, effort, setting, group fit and when each option makes sense for your trip.",
    canonical: "https://latablemarrakech.com/marrakech-cooking-class-vs-private-chef",
    ogType: "article",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", url: "https://latablemarrakech.com/" },
        { name: "Cooking Class vs Private Chef", url: "https://latablemarrakech.com/marrakech-cooking-class-vs-private-chef" },
      ]),
      faqSchema([
        { question: "Is a cooking class or private chef better in Marrakech?", answer: "A cooking class is better if you want to learn and participate. A private chef is better if you want a hosted dinner at your villa or riad with no work from your group." },
        { question: "Do private chef dinners cost more than cooking classes?", answer: "They are often in a similar range. Cooking classes commonly run €45 to €90 per person, while La Table Marrakech private chef dinners start from €85 per person." },
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
              Trip Planning
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.7, ease: easeOut }} className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-px bg-amber-600/40" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <div className="w-16 h-px bg-amber-600/40" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1, ease: easeOut }} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
              Cooking class, or <span className="italic text-amber-700">private chef?</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }} className="text-base md:text-lg text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed italic">
              Both are good Marrakech food experiences. They solve different problems. Here&rsquo;s the fast, honest comparison.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── COMPARISON ──────────────────────────────────────────────────── */}
      <section className="relative pt-12 md:pt-16 pb-20 md:pb-24 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/5 pointer-events-none rotate-45">
          <MoroccanOrnament className="w-full h-full" />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-14 items-start">
            <motion.aside initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="bg-zinc-950 text-white p-8 md:p-10 relative overflow-hidden">
              <div className="absolute -bottom-20 -right-20 w-60 h-60 text-amber-500/[0.06] pointer-events-none -rotate-12">
                <MoroccanOrnament className="w-full h-full" />
              </div>
              <p className="text-[10px] tracking-[0.4em] uppercase text-amber-400 mb-4 relative">Short Answer</p>
              <h2 className="font-serif text-3xl md:text-4xl leading-[1.1] mb-5 relative">
                The two-line <span className="italic text-amber-200">version.</span>
              </h2>
              <div className="w-12 h-px bg-amber-500/40 mb-6 relative" />
              <p className="text-white/80 leading-relaxed relative">
                Choose a <span className="text-amber-300">cooking class</span> if you want to shop, prep, and learn. Choose a <span className="text-amber-300">private chef</span> if you want a restaurant-quality dinner at your own table — while everyone else stays in holiday mode.
              </p>
              <Link href="/contact" className="mt-8 group inline-flex items-center gap-3 border border-amber-500/40 text-amber-200 hover:bg-amber-500/10 px-7 py-4 text-xs uppercase tracking-[0.22em] transition-colors relative">
                Ask Which Fits <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.aside>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
              <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">Side By Side</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground mb-8">
                Honest <span className="italic text-amber-700">comparison.</span>
              </h2>

              <div className="bg-white border border-stone-200/80 shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-stone-50 text-left">
                    <tr>
                      <th className="p-5 text-[10px] tracking-[0.3em] uppercase text-amber-700">Question</th>
                      <th className="p-5 text-[10px] tracking-[0.3em] uppercase text-amber-700">Cooking Class</th>
                      <th className="p-5 text-[10px] tracking-[0.3em] uppercase text-amber-700">Private Chef</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map(([q, cooking, chef], i) => (
                      <tr key={q} className={i > 0 ? "border-t border-stone-200/80" : ""}>
                        <td className="p-5 font-serif text-foreground">{q}</td>
                        <td className="p-5 text-muted-foreground">{cooking}</td>
                        <td className="p-5 text-muted-foreground">{chef}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white border border-stone-200/80 p-7 md:p-8 hover:border-amber-600/30 hover:shadow-lg transition-all duration-300">
                  <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-3">Book The Class If</p>
                  <h3 className="font-serif text-xl md:text-2xl leading-snug mb-4">You want hands in the pan.</h3>
                  <div className="w-10 h-px bg-amber-600/40 mb-4" />
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    The souk visit, spice explanations, knife work, and the satisfaction of having cooked the tagine yourself.
                  </p>
                </div>
                <div className="bg-white border border-stone-200/80 p-7 md:p-8 hover:border-amber-600/30 hover:shadow-lg transition-all duration-300">
                  <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-3">Book The Chef If</p>
                  <h3 className="font-serif text-xl md:text-2xl leading-snug mb-4">You want the dinner, not the work.</h3>
                  <div className="w-10 h-px bg-amber-600/40 mb-4" />
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Privacy, a slow dinner, no logistics, a table that feels designed for the night.
                  </p>
                </div>
              </div>
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
            Tell us which <span className="italic text-amber-200">fits.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
            Date, group size, and what you want out of the evening. We&rsquo;ll tell you which works better and quote it.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="compare-final-whatsapp" data-cta-label="Request a quote on WhatsApp" data-cta-position="compare_final_cta" className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
              Ask on WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/contact" data-testid="compare-final-form" className="inline-flex items-center justify-center gap-3 px-12 py-5 border border-white/30 text-white hover:border-amber-300 hover:text-amber-200 uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
              Send Us the Details
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
