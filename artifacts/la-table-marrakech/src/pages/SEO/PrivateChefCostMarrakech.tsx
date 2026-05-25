import { motion, easeOut } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, Star } from "lucide-react";
import { breadcrumbSchema, faqSchema, useSEO } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const priceRows: [string, string, string][] = [
  ["2 guests", "€170 total", "Private dinner for a couple"],
  ["4 guests", "€340 total", "Family or small villa dinner"],
  ["8 guests", "€680 total", "Friends, birthdays, group holidays"],
  ["20+ guests", "Custom quote", "Weddings and event catering"],
];

const included = [
  "Menu planning over WhatsApp",
  "Morning souk sourcing and fresh ingredients",
  "Multi-course cooking at your villa or riad",
  "Plating, table service, mint tea, cleanup",
  "Dietary needs and allergies handled in advance",
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

export default function PrivateChefCostMarrakech() {
  useSEO({
    title: "Private Chef Cost in Marrakech 2026 | From €85 Per Person",
    description: "Transparent private chef pricing in Marrakech: from €85 per person, all-inclusive. See what's included, total cost by group size, and how it compares to restaurants.",
    canonical: "https://latablemarrakech.com/private-chef-cost-marrakech",
    ogType: "article",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", url: "https://latablemarrakech.com/" },
        { name: "Private Chef Cost Marrakech", url: "https://latablemarrakech.com/private-chef-cost-marrakech" },
      ]),
      faqSchema([
        { question: "How much does a private chef cost in Marrakech?", answer: "Prices start from €85 per person. Final pricing depends on group size, menu selection, and special requirements." },
        { question: "What is included in the price?", answer: "Menu planning, market sourcing, ingredients, cooking, service, mint tea and kitchen cleanup are included. Premium produce and drinks are quoted separately if requested." },
        { question: "Is a private chef cheaper than a restaurant in Marrakech?", answer: "The price sits in the same range as Marrakech fine dining, but your table is private and the menu is planned around your group." },
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
              Pricing Guide · 2026
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.7, ease: easeOut }} className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-px bg-amber-600/40" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <div className="w-16 h-px bg-amber-600/40" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1, ease: easeOut }} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
              From <span className="italic text-amber-700">€85</span> per person.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }} className="text-base md:text-lg text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed italic">
              A private multi-course dinner at your villa or riad — ingredients, cooking, service, and cleanup included.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.9 }} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="pricing-hero-whatsapp" data-cta-label="Request a quote on WhatsApp" data-cta-position="pricing_hero" className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-colors">
                Ask For a Quote <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/contact" className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-foreground/80 text-foreground hover:border-amber-600 hover:text-amber-700 uppercase tracking-[0.22em] text-xs md:text-sm transition-colors">
                Send Us the Details
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING TABLE + INCLUDED ─────────────────────────────────────── */}
      <section className="relative pt-12 md:pt-16 pb-28 md:pb-32 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/5 pointer-events-none rotate-45">
          <MoroccanOrnament className="w-full h-full" />
        </div>

        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.9fr] gap-10 md:gap-14 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
              <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">One Clean Number</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground mb-6">
                €85 per person, <span className="italic text-amber-700">all in.</span>
              </h2>
              <div className="w-12 h-px bg-amber-600/40 mb-8" />
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-10">
                That puts a La Table Marrakech dinner in the same band as the city&rsquo;s better restaurants — with one major difference: the room is yours, the menu is built for your group, and there are no taxis, no reservations, and no public dining room.
              </p>

              <div className="bg-white border border-stone-200/80 shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-stone-50 text-left">
                    <tr>
                      <th className="p-5 text-[10px] tracking-[0.3em] uppercase text-amber-700">Group Size</th>
                      <th className="p-5 text-[10px] tracking-[0.3em] uppercase text-amber-700">Typical Total</th>
                      <th className="p-5 text-[10px] tracking-[0.3em] uppercase text-amber-700">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceRows.map(([size, total, best], i) => (
                      <tr key={size} className={i > 0 ? "border-t border-stone-200/80" : ""}>
                        <td className="p-5 font-serif text-foreground">{size}</td>
                        <td className="p-5 font-serif text-amber-700">{total}</td>
                        <td className="p-5 text-muted-foreground">{best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
              <div className="bg-white border border-stone-200/80 p-8 md:p-10 shadow-sm">
                <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-6">Included In The Price</p>
                <ul className="space-y-4">
                  {included.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm md:text-base text-foreground/85 leading-relaxed">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-700 mt-0.5" strokeWidth={1.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="w-12 h-px bg-amber-600/40 my-7" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Wine, premium produce (lobster, truffle), and large event rentals are quoted separately before you confirm. No surprises.
                </p>
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
            Get a quote in <span className="italic text-amber-200">two messages.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
            Tell us the date, group size, and where you&rsquo;re staying. We&rsquo;ll send back a menu and a price.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="pricing-final-whatsapp" data-cta-label="Request a quote on WhatsApp" data-cta-position="pricing_final_cta" className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
              Ask on WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/contact" data-testid="pricing-final-form" className="inline-flex items-center justify-center gap-3 px-12 py-5 border border-white/30 text-white hover:border-amber-300 hover:text-amber-200 uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
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
