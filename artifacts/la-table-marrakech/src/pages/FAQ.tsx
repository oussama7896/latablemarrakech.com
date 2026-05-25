import { motion, easeOut } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Star, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useSEO, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

const faqs = [
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 48 to 72 hours in advance to ensure availability and allow the chef time to source the finest seasonal ingredients. For special occasions such as anniversaries or large events, a week's notice or more is ideal.",
  },
  {
    question: "Where in Marrakech do you operate?",
    answer: "We come to you wherever you are staying — villas, riads, Airbnbs, private terraces, and rooftops across Marrakech and its surrounds. We also offer the Agafay Desert experience. If you are unsure, simply ask and we will confirm.",
  },
  {
    question: "Can dietary restrictions and allergies be accommodated?",
    answer: "Absolutely. Our chef tailors every menu personally. Please detail any allergies, intolerances, or dietary preferences in your reservation form. We accommodate vegetarian, vegan, gluten-free, halal, and all other requirements.",
  },
  {
    question: "What is included in the price?",
    answer: "Prices start from €85 per person. Final pricing depends on group size, menu selection, and special requirements. The price includes the chef's time, menu design, ingredients sourced fresh that morning, preparation, cooking, service, and clean-up.",
  },
  {
    question: "How does the booking process work?",
    answer: "Submit your reservation form or contact us on WhatsApp. We will reach out personally within 24 hours to confirm details, finalise the menu, and answer any questions. A deposit may be requested for larger bookings.",
  },
  {
    question: "Do I need a fully equipped kitchen?",
    answer: "Most villa and riad kitchens in Marrakech are well-equipped. Our chef will assess the kitchen setup upon arrival. For more basic kitchens, we adapt the menu accordingly — some of the most spectacular dishes require very little equipment.",
  },
  {
    question: "Can the chef source Moroccan cooking ingredients for me to take home?",
    answer: "Yes. Many guests ask us to prepare a selection of spices, argan oil, rose water, and preserved lemons to take as gifts or for their own kitchen. Simply request this in your message and we will have everything beautifully packaged.",
  },
  {
    question: "Is the desert dining experience available year-round?",
    answer: "Yes, though we recommend spring (March to May) and autumn (September to November) for the most comfortable temperatures. Winter evenings can be surprisingly cold in the desert, so we provide blankets and warm covers. Summer is possible with the right preparation.",
  },
  {
    question: "What languages does the chef speak?",
    answer: "Our chef is fluent in Arabic, Darija (Moroccan Arabic), French, and English. Communication before, during, and after the dinner is warm and personal.",
  },
  {
    question: "Can I request a specific menu or dishes?",
    answer: "Of course. While the chef always proposes a seasonal menu based on what is finest at the market, you are welcome to request specific dishes, regional specialities, or a particular cuisine. The menu is always a collaboration.",
  },
  {
    question: "What happens if I need to cancel or change my booking?",
    answer: "We understand that travel plans change. Please contact us as early as possible. Cancellations made more than 48 hours in advance receive a full refund of any deposit. Cancellations with less notice are reviewed on a case-by-case basis.",
  },
  {
    question: "Is La Table Marrakech suitable for groups?",
    answer: "Yes. We cater for groups of all sizes, from an intimate dinner for two to a celebration for thirty or more. For large events, please contact us directly so we can discuss logistics, staffing, and menu options.",
  },
];

/* ─── Moroccan SVG Ornament (same as Home / Testimonials) ──────────────── */
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

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      data-testid={`faq-item-${index}`}
      className={`bg-white border transition-all duration-300 ${
        open
          ? "border-amber-600/40 shadow-lg"
          : "border-stone-200/80 hover:border-amber-600/30 hover:shadow-md"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 md:p-7 flex items-start justify-between gap-5"
        data-testid={`faq-toggle-${index}`}
        aria-expanded={open}
      >
        <span className="flex items-baseline gap-4 md:gap-5 flex-1 min-w-0">
          <span className="text-[10px] tracking-[0.3em] uppercase text-amber-700/80 shrink-0 mt-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-serif text-lg md:text-xl text-foreground leading-snug">
            {faq.question}
          </span>
        </span>
        <ChevronDown
          className={`w-5 h-5 text-amber-700 shrink-0 mt-1.5 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: easeOut }}
        className="overflow-hidden"
      >
        <div className="px-6 md:px-7 pb-7 md:pb-8 md:pl-[5.25rem]">
          <div className="w-10 h-px bg-amber-600/40 mb-5" />
          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  useSEO({
    title: "Frequently Asked Questions — La Table Marrakech Private Chef",
    description: "Everything you need to know about booking a private chef in Marrakech. FAQs about dietary requirements, locations, pricing, booking process, and more.",
    canonical: "https://latablemarrakech.com/faq",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", url: "https://latablemarrakech.com/" },
        { name: "FAQ", url: "https://latablemarrakech.com/faq" },
      ]),
      faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer }))),
    ],
  });

  return (
    <>
      {/* ── HERO — typographic, matches Testimonials ─────────────────────── */}
      <section className="relative pt-40 md:pt-52 pb-20 md:pb-28 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        {/* Moroccan ornaments */}
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
              Frequently Asked
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
              Everything <span className="italic text-amber-700">worth asking.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.9 }}
              className="text-base md:text-lg text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed italic"
            >
              Twelve answers about booking a private chef in Marrakech. If yours isn&rsquo;t here, message us and we&rsquo;ll reply within an hour.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ LIST ─────────────────────────────────────────────────────── */}
      <section className="pt-8 md:pt-12 pb-28 md:pb-32 bg-gradient-to-b from-stone-50 via-background to-stone-50 relative overflow-hidden">
        {/* Decorative ornaments */}
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/5 pointer-events-none rotate-45">
          <MoroccanOrnament className="w-full h-full" />
        </div>

        <div className="container mx-auto px-6 relative max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-4 md:space-y-5"
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
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
            Still have a <span className="italic text-amber-200">question?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
            Message us on WhatsApp or send the details. We reply within an hour during the day.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="btn-faq-whatsapp"
              data-cta-label="Request a quote on WhatsApp"
              data-cta-position="faq_final_cta"
              className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300"
            >
              Ask on WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/contact"
              data-testid="btn-faq-reserve"
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
