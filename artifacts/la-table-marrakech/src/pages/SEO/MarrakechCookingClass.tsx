import { motion, easeOut } from "framer-motion";
import { Link } from "wouter";
import {
  Star,
  ArrowRight,
  Check,
  X as XIcon,
  Clock,
  Users,
  MapPin,
  Languages,
  CalendarCheck,
  Leaf,
  BookOpen,
  Heart,
  Home,
  MessageCircle,
} from "lucide-react";
import { useSEO, breadcrumbSchema } from "@/lib/seo";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { useABTest } from "@/lib/abtest";

const EXPERIMENT_ID = "cooking_class_faq_position";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ─── Content ─────────────────────────────────────────────────────────── */

const highlights = [
  "Top-rated cooking class in Marrakech &mdash; hundreds of happy guests",
  "Visit a traditional Marrakech market and choose your own ingredients",
  "Cook authentic Moroccan dishes &mdash; tagine, salads, mint tea and more",
  "Small-group setting for personal attention",
  "Eat the meal you prepared together in a warm Moroccan home",
  "Take home printed recipe cards in English or French",
  "Vegetarian, vegan and gluten-free menus on request",
  "Open daily except Friday &middot; lunch or dinner sessions",
];

const itinerary = [
  { n: "01", time: "Meeting point", title: "We meet you in the medina", body: "Your exact meeting spot in central Marrakech is shared in the confirmation message. Arrive five minutes early &mdash; the walk to the market is short." },
  { n: "02", time: "~15 min", title: "Local market visit", body: "Walk a traditional Marrakech souk with the chef. Pick the vegetables, herbs and spices for your menu &mdash; smell every basket, taste anything offered." },
  { n: "03", time: "~30 min", title: "Mint tea & welcome", body: "Back at the Moroccan home kitchen. Learn the proper way to pour mint tea, meet the other guests, and walk through the dishes you&rsquo;ll cook." },
  { n: "04", time: "~2 h 45", title: "Hands-on cooking", body: "Tagine, salads, traditional clay-pot technique &mdash; step by step with the chef. Every spice named, every method explained, every small trick shown." },
  { n: "05", time: "~30 min", title: "Sit down and eat", body: "The best part. You taste the meal you made, together, in a relaxed Moroccan dining room. Recipes to take home." },
];

const dishes = [
  { name: "Chicken Tagine", note: "Preserved Lemon & Olives", image: "/images/dish-chicken-tagine.jpg", body: "Free-range chicken, preserved lemon, green olives, saffron, ginger. The sauce reduces to a citrus-bright glaze you&rsquo;ll mop up with bread." },
  { name: "Friday Couscous", note: "Seven Vegetables", image: "/images/dish-couscous-lamb.jpg", body: "Hand-rolled semolina, slow-braised lamb, seven seasonal vegetables stacked tall. The broth is ladled at the table, the way grandmothers serve it." },
  { name: "Harira", note: "Soup of Marrakech", image: "/images/dish-harira.jpg", body: "Lentils, chickpeas, tomato, coriander, a squeeze of lemon. The soup Moroccans break the fast with &mdash; rich, fragrant, restorative." },
  { name: "Mrouzia", note: "Sweet Lamb Tagine", image: "/images/dish-mrouzia.jpg", body: "Lamb caramelised with prunes, honey, cinnamon, toasted almonds. Sweet and savoury at once &mdash; usually the surprise of the evening." },
  { name: "Moroccan Salads", note: "Zaalouk · Taktouka · Carrot", image: "/images/dish-mezze.jpg", body: "Three small bowls that anchor every Moroccan meal: smoky aubergine zaalouk, charred-pepper taktouka, cumin-glazed carrot. Knife work taught from scratch." },
  { name: "Mint Tea Ceremony", note: "Poured From a Height", image: "/images/gallery-tea.png", body: "Three pours, three sittings, one ritual. The aerated foam, the rising scent of mint, the slow conversation that follows. Always last, never rushed." },
];

const dreamCards = [
  { icon: Home, title: "Your kitchen, transformed.", body: "The bottle of saffron that&rsquo;s been sitting in the cupboard for two years finally has a purpose. You start making harira on cold Sundays. The tagine moves from ‘special occasion’ to ‘Tuesday night.’" },
  { icon: Heart, title: "Friends start asking.", body: "&ldquo;Wait, what is this?&rdquo; The dinner party where you serve mrouzia for the first time. The way your friend texts you a week later to ask for the recipe. The pride of saying you learned it in a real home kitchen in Marrakech." },
  { icon: BookOpen, title: "The story you tell.", body: "Every time you cook one of the dishes, the smell of cumin pulls you back to the market. The chef showing you how the clay pot retains heat. The first sip of mint tea. Small things, kept." },
];

const included = [
  "Local Moroccan chef as your guide and host",
  "Traditional market visit with the chef",
  "All ingredients sourced the morning of",
  "All cooking equipment (clay tagines, knives, prep)",
  "Hands-on cooking session",
  "Full lunch or dinner (whichever session you book)",
  "Traditional Moroccan mint tea ceremony",
  "Printed recipe cards in English or French",
  "Filtered water",
];

const excluded = [
  "Hotel pickup and drop-off (meet at our shared meeting point)",
  "Additional drinks beyond mint tea and water",
];

const faqs = [
  { q: "How long does the class last?", a: "Approximately four hours including the market visit, cooking session, and the meal you sit down to eat together." },
  { q: "Where does the class take place?", a: "In a traditional Moroccan home kitchen in the medina, a short walk from the meeting point we share on confirmation. Cosy, lived-in, the way locals actually cook." },
  { q: "How big is the group?", a: "Small-group format for personal attention. Booking the full session privately is also possible &mdash; just ask us." },
  { q: "Can I bring kids?", a: "Yes, from 7 years old and up. Younger than that, the kitchen isn&rsquo;t suitable. The chef adjusts spice levels and gives kids simple tasks they enjoy." },
  { q: "I&rsquo;m vegan / gluten-free / have allergies.", a: "All accommodated. Tell us when you book and the menu is adapted &mdash; Moroccan cuisine works beautifully across diets." },
  { q: "What language is the class in?", a: "English or French, depending on your group. The chef speaks both. Arabic is the third option." },
  { q: "Is there a meal at the end?", a: "Yes. You eat everything you prepared, together with the other guests, in a relaxed Moroccan dining room." },
  { q: "Can I cancel if my plans change?", a: "Free cancellation up to 24 hours before. After that, the chef has already shopped the souk and prepped &mdash; a 100% fee applies." },
  { q: "When can I book it?", a: "Most days &mdash; lunch or dinner. The kitchen is closed on Fridays. We can usually fit you in within a few days; weekends fill faster." },
];

const bookingPrefill = `Hi La Table Marrakech! I'd like to book the cooking class.

Date(s) I'm considering:
Number of guests:
Lunch or dinner session:
Anything we should know (dietary, kids, language):

Thanks!`;

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

function Fleuron() {
  return (
    <div className="flex items-center justify-center gap-5 py-12 md:py-16" aria-hidden>
      <span className="block h-px w-16 md:w-28 bg-amber-600/25" />
      <svg width="10" height="10" viewBox="0 0 10 10" className="text-amber-600/55 flex-shrink-0">
        <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
      </svg>
      <span className="block h-px w-16 md:w-28 bg-amber-600/25" />
    </div>
  );
}

export default function MarrakechCookingClass() {
  useSEO({
    title: "Marrakech Cooking Class with a Local Chef | La Table Marrakech",
    description: "Marrakech's top-rated Moroccan cooking class. Souk visit, hands-on cooking with a local chef in a traditional home kitchen, then sit down and eat together. Small group, daily, free cancellation.",
    canonical: "https://latablemarrakech.com/marrakech-cooking-class",
    jsonLd: breadcrumbSchema([
      { name: "Home", url: "https://latablemarrakech.com/" },
      { name: "Marrakech Cooking Class", url: "https://latablemarrakech.com/marrakech-cooking-class" },
    ]),
  });

  const faqVariant = useABTest(EXPERIMENT_ID);

  const faqSection = (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden" data-experiment-id={EXPERIMENT_ID} data-experiment-variant={faqVariant}>
      <div className="container mx-auto px-6 max-w-3xl relative">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">Common Questions</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground">
            Common questions, answered.
          </h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white border border-stone-200/80 hover:border-amber-600/30 hover:shadow-md transition-all p-6 md:p-7">
              <div className="flex items-baseline gap-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-amber-700/80 shrink-0 mt-1">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-serif text-base md:text-lg text-foreground mb-2" dangerouslySetInnerHTML={{ __html: f.q }} />
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: f.a }} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 md:pt-52 pb-16 md:pb-20 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-20 -right-24 w-80 h-80 text-amber-600/[0.07] pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/[0.06] pointer-events-none rotate-45">
          <MoroccanOrnament className="w-full h-full" />
        </div>

        <div className="relative container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-4xl mx-auto">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }} className="text-xs md:text-sm tracking-[0.4em] uppercase text-amber-700 mb-6">
              Cooking Class &middot; Marrakech
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.7, ease: easeOut }} className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-px bg-amber-600/40" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <div className="w-16 h-px bg-amber-600/40" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1, ease: easeOut }} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.04] text-foreground">
              Marrakech&rsquo;s most-loved <span className="italic text-amber-700">cooking class.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }} className="text-base md:text-lg text-muted-foreground mt-7 max-w-2xl mx-auto leading-relaxed italic">
              A small-group hands-on class with a local Moroccan chef. Visit the souk, cook three traditional dishes in a real home kitchen, then sit down and eat the meal together.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.9 }} className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs md:text-sm text-foreground/75">
              <span className="inline-flex items-center gap-2"><Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 4.9 &middot; 200+ guests</span>
              <span className="text-stone-300">·</span>
              <span className="inline-flex items-center gap-1.5"><CalendarCheck className="w-3.5 h-3.5 text-amber-700" strokeWidth={1.75} /> Free cancellation 24h before</span>
              <span className="text-stone-300">·</span>
              <span className="inline-flex items-center gap-1.5"><Languages className="w-3.5 h-3.5 text-amber-700" strokeWidth={1.75} /> EN &middot; FR &middot; AR</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.9 }} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a href={createWhatsAppUrl(bookingPrefill)} target="_blank" rel="noopener noreferrer" data-testid="cooking-hero-whatsapp" data-cta-label="Get a Menu and Quote on WhatsApp" data-cta-position="cooking_ads_hero" data-experiment-id={EXPERIMENT_ID} data-experiment-variant={faqVariant} className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-colors">
                Check Availability <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/contact" data-testid="cooking-hero-form" className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-foreground/80 text-foreground hover:border-amber-600 hover:text-amber-700 uppercase tracking-[0.22em] text-xs md:text-sm transition-colors">
                Send Us Your Dates
              </Link>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15, duration: 0.9 }} className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground mt-6">
              Book direct &middot; Free cancellation &middot; Confirmation within the hour
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── KEY FACTS BAND ──────────────────────────────────────────────── */}
      <section className="relative py-8 md:py-10 bg-zinc-950 text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 text-sm">
            <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={1.75} /><div><p className="text-[10px] tracking-[0.3em] uppercase text-amber-400/80">Duration</p><p className="text-white/90">~ 4 hours</p></div></div>
            <div className="flex items-center gap-3"><Users className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={1.75} /><div><p className="text-[10px] tracking-[0.3em] uppercase text-amber-400/80">Group</p><p className="text-white/90">Small group</p></div></div>
            <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={1.75} /><div><p className="text-[10px] tracking-[0.3em] uppercase text-amber-400/80">Where</p><p className="text-white/90">Medina kitchen</p></div></div>
            <div className="flex items-center gap-3"><Leaf className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={1.75} /><div><p className="text-[10px] tracking-[0.3em] uppercase text-amber-400/80">Diet</p><p className="text-white/90">All accommodated</p></div></div>
          </div>
        </div>
      </section>

      {/* ── ABOUT + HIGHLIGHTS ──────────────────────────────────────────── */}
      <section className="relative pt-20 md:pt-24 pb-16 md:pb-20 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
              <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">About The Class</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground mb-6">
                The Marrakech kitchen <span className="italic text-amber-700">visitors keep talking about.</span>
              </h2>
              <div className="w-12 h-px bg-amber-600/40 mb-8" />
              <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
                <p>This isn&rsquo;t a polished hotel cooking demo. It&rsquo;s a real Moroccan home kitchen in the medina, run by a local chef who&rsquo;s been teaching guests for years &mdash; consistently top-rated by everyone who&rsquo;s walked through.</p>
                <p>You meet the chef in central Marrakech, walk a working souk to pick your ingredients, then head to the kitchen for the welcome mint tea ceremony. From there it&rsquo;s three hours of hands-on cooking &mdash; tagine, salads, the layered spice work that no recipe book quite captures. At the end you sit down with the other guests and eat the meal you made.</p>
                <p>Small group, warm atmosphere, recipes home with you. Good for couples, families with older kids, solo travellers, and anyone who&rsquo;d rather skip the tourist menu and learn the real thing.</p>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="space-y-6">
              <div className="overflow-hidden border border-stone-200/80 aspect-[4/5]">
                <img src="/images/dish-chicken-tagine.jpg" alt="Chicken tagine learned in a Marrakech cooking class" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white border border-stone-200/80 p-7 md:p-8 shadow-sm">
                <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-5">Highlights</p>
                <ul className="space-y-3">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/85 leading-relaxed">
                      <Check className="w-4 h-4 text-amber-700 shrink-0 mt-1" strokeWidth={2} />
                      <span dangerouslySetInnerHTML={{ __html: h }} />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL COOK (visual dish grid) ─────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-background overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none -rotate-12"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="container mx-auto px-6 max-w-6xl relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="text-center mb-14 md:mb-16 max-w-3xl mx-auto">
            <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">What You&rsquo;ll Cook</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground">
              Three dishes. The ones you&rsquo;ll cook for years.
            </h2>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed italic">
              The menu shifts with the season and the chef&rsquo;s mood at the market. Most days, you&rsquo;ll make three of these &mdash; one main, one side, one finale.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {dishes.map((d, i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="group bg-white border border-stone-200/80 hover:border-amber-600/40 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.6, ease: easeOut }}
                  />
                </div>
                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700/80 mb-2">{d.note}</p>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">{d.name}</h3>
                  <div className="w-8 h-px bg-amber-600/40 mb-3" />
                  <p className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: d.body }} />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ITINERARY ───────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="text-center mb-14 md:mb-20">
            <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">How It Goes</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground">
              Five steps, beginning to plate.
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="space-y-6 md:space-y-8">
            {itinerary.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="grid grid-cols-[auto_1fr] md:grid-cols-[6rem_auto_1fr] gap-x-5 md:gap-x-8 gap-y-3 items-baseline pb-6 md:pb-8 border-b border-stone-200/70 last:border-b-0">
                <span className="font-serif text-3xl md:text-4xl text-amber-700/30 leading-none">{step.n}</span>
                <span className="hidden md:inline-block text-[10px] tracking-[0.3em] uppercase text-amber-700/80 md:pt-2 whitespace-nowrap">{step.time}</span>
                <div className="col-span-2 md:col-span-1">
                  <p className="md:hidden text-[10px] tracking-[0.3em] uppercase text-amber-700/80 mb-2">{step.time}</p>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: step.body }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── AFTER THE CLASS (the dream) ─────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/5 pointer-events-none rotate-45"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="container mx-auto px-6 max-w-5xl relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="text-center mb-14 md:mb-16 max-w-3xl mx-auto">
            <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">After The Class</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground">
              What changes when you <span className="italic text-amber-700">get home.</span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed italic">
              A cooking class isn&rsquo;t just a class. The best souvenir from Marrakech doesn&rsquo;t sit on a shelf &mdash; it ends up on your plate every few weeks for the rest of your life.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {dreamCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="bg-white border border-stone-200/80 hover:border-amber-600/30 hover:shadow-xl p-8 md:p-10 transition-all duration-300">
                  <Icon className="w-6 h-6 text-amber-700 mb-5" strokeWidth={1.5} />
                  <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700/80 mb-3">Chapter {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-4" dangerouslySetInnerHTML={{ __html: c.title }} />
                  <div className="w-10 h-px bg-amber-600/40 mb-5" />
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: c.body }} />
                </motion.div>
              );
            })}
          </motion.div>

          <Fleuron />

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto">
            <p className="font-serif italic text-xl md:text-2xl text-foreground/85 leading-relaxed">
              &ldquo;The class was four hours. The lamb tagine has been on our table almost every month since. Best souvenir we&rsquo;ve ever brought back from anywhere.&rdquo;
            </p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700/80 mt-6">
              Past guest &middot; cooking class &middot; September
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── INCLUDED / NOT INCLUDED ─────────────────────────────────────── */}
      <section className="relative py-20 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white border border-stone-200/80 p-8 md:p-10 shadow-sm">
              <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-5">Included</p>
              <h3 className="font-serif text-2xl md:text-3xl leading-snug mb-6">
                What you get, <span className="italic text-amber-700">all in.</span>
              </h3>
              <ul className="space-y-3">
                {included.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base text-foreground/85 leading-relaxed">
                    <Check className="w-4 h-4 text-amber-700 shrink-0 mt-1" strokeWidth={2} />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-8 md:p-10 md:py-12">
              <p className="text-[10px] tracking-[0.4em] uppercase text-stone-500 mb-5">Not Included</p>
              <h3 className="font-serif text-2xl md:text-3xl leading-snug mb-6 text-foreground/70">
                What you handle yourself.
              </h3>
              <ul className="space-y-3">
                {excluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                    <XIcon className="w-4 h-4 text-stone-400 shrink-0 mt-1" strokeWidth={2} />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
              <div className="w-10 h-px bg-stone-300 my-7" />
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                Free cancellation up to 24 hours before. After that the chef has already shopped, so a 100% fee applies. Honest, no surprises.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BOOKING CARD (concierge-style reservation) ──────────────────── */}
      <section className="relative py-20 md:py-28 bg-background overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/[0.06] pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="container mx-auto px-6 max-w-4xl relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="text-center mb-10">
            <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">Reserve Your Spot</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground">
              Pick a date. <span className="italic text-amber-700">We&rsquo;ll handle the rest.</span>
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="bg-white border border-amber-600/40 shadow-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -bottom-16 -right-16 w-56 h-56 text-amber-600/[0.06] pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-4">How It Works</p>
                <ol className="space-y-4 mb-6">
                  <li className="flex items-baseline gap-4 text-sm md:text-base text-foreground/85 leading-relaxed">
                    <span className="font-serif text-amber-700 text-base shrink-0">01.</span>
                    <span>Message us with your dates and group size.</span>
                  </li>
                  <li className="flex items-baseline gap-4 text-sm md:text-base text-foreground/85 leading-relaxed">
                    <span className="font-serif text-amber-700 text-base shrink-0">02.</span>
                    <span>We confirm availability and the meeting point within the hour.</span>
                  </li>
                  <li className="flex items-baseline gap-4 text-sm md:text-base text-foreground/85 leading-relaxed">
                    <span className="font-serif text-amber-700 text-base shrink-0">03.</span>
                    <span>You arrive, you cook, you eat. Recipes home with you.</span>
                  </li>
                </ol>
                <div className="w-12 h-px bg-amber-600/40 my-6" />
                <div className="space-y-3 text-sm">
                  <div className="flex items-baseline gap-3 text-foreground/80">
                    <CalendarCheck className="w-4 h-4 text-amber-700 shrink-0" strokeWidth={1.75} />
                    <span>Free cancellation up to 24h before</span>
                  </div>
                  <div className="flex items-baseline gap-3 text-foreground/80">
                    <Check className="w-4 h-4 text-amber-700 shrink-0" strokeWidth={2} />
                    <span>No deposit until you confirm the menu</span>
                  </div>
                  <div className="flex items-baseline gap-3 text-foreground/80">
                    <MessageCircle className="w-4 h-4 text-amber-700 shrink-0" strokeWidth={1.75} />
                    <span>Most replies within an hour, every day</span>
                  </div>
                </div>
              </div>

              <div className="md:border-l md:border-stone-200/80 md:pl-12">
                <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-4">Start The Conversation</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Tap below to open WhatsApp with a quick template ready to send. Edit it, send it, and we&rsquo;ll come back to you with availability.
                </p>

                <div className="bg-stone-50 border border-stone-200/80 p-5 mb-6 text-xs text-foreground/75 leading-relaxed whitespace-pre-line font-mono">{bookingPrefill}</div>

                <a
                  href={createWhatsAppUrl(bookingPrefill)}
                  target="_blank" rel="noopener noreferrer"
                  data-testid="cooking-booking-whatsapp"
                  data-cta-label="Get a Menu and Quote on WhatsApp"
                  data-cta-position="cooking_ads_booking_card"
                  data-experiment-id={EXPERIMENT_ID}
                  data-experiment-variant={faqVariant}
                  className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-colors"
                >
                  Open WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-4 text-center">
                  Or fill in <Link href="/contact" className="text-amber-700 hover:underline">our form</Link> instead
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-24 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="flex justify-center gap-1.5 mb-6">
              {Array.from({ length: 5 }).map((_, j) => (<Star key={j} className="w-4 h-4 fill-amber-500 text-amber-500" />))}
            </div>
            <p className="font-serif italic text-2xl md:text-3xl text-foreground/90 leading-relaxed">
              &ldquo;Did the half-day cooking class on a rainy Tuesday. Four of us, small group. Made harira, chicken tagine with preserved lemon, and a dessert whose name I&rsquo;ve already forgotten. I&rsquo;ve made the tagine twice at home since.&rdquo;
            </p>
            <div className="mt-8">
              <p className="text-sm font-medium text-foreground">Priya S.</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700/80 mt-1">Toronto &middot; Cooking Class</p>
            </div>
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-amber-700/80 mt-10">
              Joining 200+ guests rated <span className="text-foreground">4.9 &star;</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ (control: before CTA) ───────────────────────────────────── */}
      {faqVariant === "control" && faqSection}

      {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 text-amber-500/[0.05] pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 text-amber-500/[0.05] pointer-events-none -rotate-12"><MoroccanOrnament className="w-full h-full" /></div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl leading-[1.05]">
            Bring Morocco <span className="italic text-amber-200">home with you.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
            Four hours that change how you cook for the rest of your life. Tell us your dates &mdash; we reply within the hour.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href={createWhatsAppUrl(bookingPrefill)} target="_blank" rel="noopener noreferrer" data-testid="cooking-final-whatsapp" data-cta-label="Get a Menu and Quote on WhatsApp" data-cta-position="cooking_ads_final_cta" data-experiment-id={EXPERIMENT_ID} data-experiment-variant={faqVariant} className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
              Check Availability on WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/contact" data-testid="cooking-final-form" data-experiment-id={EXPERIMENT_ID} data-experiment-variant={faqVariant} className="inline-flex items-center justify-center gap-3 px-12 py-5 border border-white/30 text-white hover:border-amber-300 hover:text-amber-200 uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
              Send Us Your Dates
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="text-white/50 text-xs tracking-[0.2em] uppercase mt-8">
            Free cancellation 24h before &middot; Confirmation within the hour
          </motion.p>
        </motion.div>
      </section>

      {/* ── FAQ (variant: after CTA) ────────────────────────────────────── */}
      {faqVariant === "variant" && faqSection}

      {/* Mobile-only spacer so the sticky CTA bar (~80px) doesn't clip last-section content */}
      <div className="h-20 md:hidden" aria-hidden />

      {/* ── STICKY MOBILE CTA — paid traffic conversion guard ───────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-950 p-4 border-t border-zinc-800">
        <a
          href={createWhatsAppUrl(bookingPrefill)}
          target="_blank" rel="noopener noreferrer"
          data-testid="cooking-mobile-sticky"
          data-cta-label="Get a Menu and Quote on WhatsApp"
          data-cta-position="cooking_ads_mobile_sticky"
          data-experiment-id={EXPERIMENT_ID}
          data-experiment-variant={faqVariant}
          className="block w-full text-center py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.2em] text-sm transition-colors"
        >
          Book on WhatsApp
        </a>
      </div>
    </>
  );
}
