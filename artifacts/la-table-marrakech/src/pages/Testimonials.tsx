import { motion, easeOut } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useSEO, breadcrumbSchema, reviewAggregateSchema } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const testimonials = [
  {
    text: "Honestly didn't expect much — the concierge at our riad said 'just try it'. I came back the second night and dragged two colleagues with me. The msemen-with-argan-honey thing alone is worth the trip.",
    author: "Mark D.",
    origin: "London, United Kingdom",
    experience: "Private Chef Rooftop Dinner",
  },
  {
    text: "I'm hard to impress with food — I write about restaurants for a living. The mezze course alone had me texting friends photos under the table. Nothing felt rehearsed even though clearly everything was. That's rare.",
    author: "Isabelle M.",
    origin: "Paris, France",
    experience: "Private Chef Dinner",
  },
  {
    text: "Travelling with two kids (7 and 11) and I was nervous about doing a long dinner. The chef adapted the whole menu — even did a no-spice 'kid tagine' for the youngest. Three months on, the boys still bring it up.",
    author: "The Carter family",
    origin: "Dublin, Ireland",
    experience: "Villa Private Chef",
  },
  {
    text: "Booked the rooftop for our 10-year anniversary. The wind picked up around 9pm and they moved the entire table inside — candles, flowers, mint tea, the lot — in maybe twelve minutes, without it ever feeling like a disruption. That's the bit you remember.",
    author: "Hélène & Marc",
    origin: "Lyon, France",
    experience: "Private Chef Rooftop Dinner",
  },
  {
    text: "Eight friends, mixed dietary stuff — one vegetarian, one pescatarian, one nut allergy. Sent a long email expecting pushback. Got a custom menu back within 24 hours. Not cheap, but for a private chef in a riad it was fair.",
    author: "Olivia R.",
    origin: "Sydney, Australia",
    experience: "Villa Private Chef",
  },
  {
    text: "My mother-in-law has cooked Moroccan food for forty years. She asked for the tagine recipe twice during dinner.",
    author: "Yasmine T.",
    origin: "Casablanca, Morocco",
    experience: "Villa Private Chef",
  },
  {
    text: "Wife's 40th. Twelve people, half of whom had never eaten Moroccan food properly. Two of them came up to me afterwards asking 'who is this chef and can we book them in Geneva' (you cannot, sadly).",
    author: "Edouard L.",
    origin: "Geneva, Switzerland",
    experience: "Private Chef Birthday Dinner",
  },
  {
    text: "Booked over WhatsApp two days before arriving, which I expected to be a red flag. It wasn't. Communication felt like dealing with a small hotel front desk, not a freelance chef. Back in October.",
    author: "David T.",
    origin: "New York, USA",
    experience: "Private Chef Dinner",
  },
];

/* ─── Moroccan SVG Ornament (same as Home) ──────────────────────────────── */
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

export default function Testimonials() {
  useSEO({
    title: "Guest Testimonials — La Table Marrakech",
    description: "Read testimonials from guests who have experienced La Table Marrakech private chef dinners. From romantic dinners to desert dining, discover what makes our experiences unforgettable.",
    canonical: "https://latablemarrakech.com/testimonials",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", url: "https://latablemarrakech.com/" },
        { name: "Testimonials", url: "https://latablemarrakech.com/testimonials" },
      ]),
      reviewAggregateSchema(
        testimonials.map((t) => ({ author: t.author, text: t.text, rating: 5 })),
      ),
    ],
  });

  return (
    <>
      {/* ── HERO — typographic, matches home's section-header grammar ──── */}
      <section className="relative pt-40 md:pt-52 pb-20 md:pb-28 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        {/* Moroccan ornaments — same as home */}
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
              Guest Testimonials
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
              The evenings, in <span className="italic text-amber-700">their own words.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.9 }}
              className="text-base md:text-lg text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed italic"
            >
              Eight letters from the guests who shared a private table with us in Marrakech.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.9 }}
              className="text-xs tracking-[0.3em] uppercase text-amber-700/80 mt-8"
            >
              4.9&#9733; on TripAdvisor &middot; 200+ verified reviews
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS GRID ────────────────────────────────────────────── */}
      <section className="pt-8 md:pt-12 pb-28 md:pb-32 bg-gradient-to-b from-stone-50 via-background to-stone-50 relative overflow-hidden">
        {/* Decorative ornaments */}
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/5 pointer-events-none rotate-45">
          <MoroccanOrnament className="w-full h-full" />
        </div>

        <div className="container mx-auto px-6 relative">
          {/* Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 md:items-stretch"
          >
            {testimonials.map((t, i) => {
              const featured = i === 1;
              const initials = t.author
                .replace(/[.]/g, "")
                .split(/\s|&/)
                .filter(Boolean)
                .slice(0, 2)
                .map((p) => p[0])
                .join("")
                .toUpperCase();
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.35, ease: easeOut }}
                  data-testid={`testimonial-${i}`}
                  className={`relative p-10 md:p-12 flex flex-col justify-between transition-all duration-300 ${
                    featured
                      ? "bg-zinc-950 text-white border border-amber-600/40 shadow-2xl lg:-mt-6 lg:mb-0"
                      : "bg-white border border-stone-200/80 hover:border-amber-600/30 hover:shadow-xl"
                  }`}
                >
                  {/* Decorative quote icon */}
                  <Quote
                    className={`absolute top-6 right-6 w-16 h-16 ${
                      featured ? "text-amber-500/15" : "text-amber-600/10"
                    }`}
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p
                      className={`font-serif leading-relaxed ${
                        featured
                          ? "text-white/95 text-lg md:text-xl"
                          : "text-foreground/85 text-base md:text-lg"
                      }`}
                    >
                      &ldquo;{t.text}&rdquo;
                    </p>
                  </div>

                  <div
                    className={`relative mt-10 pt-6 border-t flex items-start gap-4 ${
                      featured ? "border-amber-500/20" : "border-stone-200"
                    }`}
                  >
                    <div
                      className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-serif text-sm tracking-wider ${
                        featured
                          ? "bg-amber-500 text-zinc-950"
                          : "bg-amber-600/10 text-amber-700 border border-amber-600/20"
                      }`}
                    >
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium ${featured ? "text-white" : "text-foreground"}`}>
                        {t.author}
                      </p>
                      <p
                        className={`text-xs uppercase tracking-[0.2em] mt-1 ${
                          featured ? "text-amber-300/80" : "text-muted-foreground"
                        }`}
                      >
                        {t.origin}
                      </p>
                      <p
                        className={`text-[10px] tracking-[0.3em] uppercase mt-1.5 ${
                          featured ? "text-amber-300/90" : "text-amber-700/80"
                        }`}
                      >
                        {t.experience}
                      </p>
                    </div>
                  </div>
                </motion.div>
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
            Your evening.<br />
            <span className="italic text-amber-200">Yours to remember.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
            Tell us when you&rsquo;ll be in Marrakech. We&rsquo;ll set a table for you.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="btn-testimonials-cta-whatsapp"
              data-cta-label="Get a Menu and Quote on WhatsApp"
              data-cta-position="testimonials_final_cta"
              className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300"
            >
              Get a Menu &amp; Quote on WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/contact"
              data-testid="btn-testimonials-cta"
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
