import { motion, easeOut, easeInOut, backOut } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "wouter";

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
    answer: "The price includes the chef's time, menu design, all ingredients sourced fresh that morning, preparation, cooking, service, and clean-up. Drinks are not included unless arranged separately. There are no hidden charges.",
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

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div variants={fadeUp} className="border-b border-border" data-testid={`faq-item-${index}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left py-7 flex items-start justify-between gap-4"
        data-testid={`faq-toggle-${index}`}
        aria-expanded={open}
      >
        <span className="font-serif text-lg pr-4">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary shrink-0 mt-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: easeOut }}
        className="overflow-hidden"
      >
        <p className="text-muted-foreground leading-relaxed pb-7 pr-8">{faq.answer}</p>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <>
      <title>Frequently Asked Questions — La Table Marrakech Private Chef</title>
      <meta name="description" content="Everything you need to know about booking a private chef in Marrakech. FAQs about dietary requirements, locations, pricing, booking process, and more." />
      <link rel="canonical" href="https://latablemarrakech.com/faq" />

      {/* Schema: FAQ */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer,
            },
          })),
        }),
      }} />

      {/* Hero */}
      <section className="relative h-72 flex items-end justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1920&q=80"
          alt="FAQ La Table Marrakech"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 pb-14 text-center text-white">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-3">Everything You Need to Know</p>
          <h1 className="font-serif text-4xl md:text-6xl">FAQ</h1>
        </div>
      </section>

      {/* FAQ List */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mt-20 text-center"
          >
            <p className="text-muted-foreground mb-4">Still have a question?</p>
            <a
              href="https://wa.me/212721354757"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="btn-faq-whatsapp"
              className="inline-block border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors px-10 py-4 uppercase tracking-[0.2em] text-xs mr-4"
            >
              Ask on WhatsApp
            </a>
            <Link
              href="/contact"
              data-testid="btn-faq-reserve"
              className="inline-block bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-10 py-4 uppercase tracking-[0.2em] text-xs"
            >
              Reserve Now
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}




