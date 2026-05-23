import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  easeOut,
  backOut,
} from "framer-motion";
import { Link } from "wouter";
import { useRef } from "react";
import { ArrowRight, Star, Users, ChefHat, MapPin, Leaf, ConciergeBell } from "lucide-react";
import {
  HOMEPAGE_DESC,
  HOMEPAGE_TITLE,
  OPENGRAPH_IMAGE,
  SITE_URL,
  useSEO,
  breadcrumbSchema,
} from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

/* ─── Variants ──────────────────────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.14 } } };
const staggerFast = { visible: { transition: { staggerChildren: 0.08 } } };

/* ─── Data ───────────────────────────────────────────────────────────────── */
const EXPERIENCES = [
  {
    number: "01",
    title: ["Private Chef", "at Home"],
    description: "Enjoy a fully customized menu in the comfort of your villa or riad.",
    href: "/villa-chef-marrakech",
    image: "/images/villa-chef.png",
  },
  {
    number: "02",
    title: ["Special", "Occasions"],
    description: "Celebrate birthdays, proposals, anniversaries and more.",
    href: "/romantic-dinner-marrakech",
    image: "/images/romantic-dinner.png",
  },
  {
    number: "03",
    title: ["Events &", "Retreats"],
    description: "We create memorable food experiences for groups, retreats and private events.",
    href: "/experiences",
    image: "/images/desert-dining.png",
  },
  {
    number: "04",
    title: ["Let Us", "Inspire You"],
    description: "Not sure what you want? Tell us a little about your stay and we'll take it from there.",
    href: "/contact",
    image: "/images/moroccan-experience.png",
  },
];

const DISHES = [
  {
    name: "Lamb Couscous",
    origin: "Friday Classic",
    image: "/images/dish-couscous-lamb.jpg",
    alt: "Moroccan lamb couscous with seven vegetables",
    description:
      "Hand-rolled semolina, slow-braised lamb shoulder, seven vegetables stacked tall. The broth is ladled at the table — the way grandmothers have served it for centuries.",
  },
  {
    name: "Chicken Tagine",
    origin: "Preserved Lemon & Olives",
    image: "/images/dish-chicken-tagine.jpg",
    alt: "Chicken tagine with preserved lemon and green olives",
    description:
      "Free-range chicken simmered for hours with preserved lemon, green olives, ginger and saffron. The sauce reduces to a sticky, citrus-bright glaze you'll want to mop up with warm khobz.",
  },
  {
    name: "Harira",
    origin: "Soup of Marrakech",
    image: "/images/dish-harira.jpg",
    alt: "Bowl of Moroccan harira soup with lentils and chickpeas",
    description:
      "The soup we break the fast with. Lamb, lentils, chickpeas, tomato, coriander, a squeeze of lemon. Served with sticky chebakia and a fresh date on the side.",
  },
  {
    name: "Mrouzia",
    origin: "Sweet Lamb Tagine",
    image: "/images/dish-mrouzia.jpg",
    alt: "Mrouzia — sweet lamb tagine with prunes, honey and almonds",
    description:
      "A holiday dish from the Atlas: lamb caramelised with prunes, honey, cinnamon and toasted almonds. Sweet and savoury at once — usually the surprise of the evening.",
  },
  {
    name: "Fish Bastilla",
    origin: "Atlantic Coast",
    image: "/images/dish-mezze.jpg",
    alt: "Moroccan fish bastilla — flaky pastry parcel filled with spiced fish",
    description:
      "Flaky warqa pastry wrapped around white fish, vermicelli, preserved lemon and fresh herbs. Cracked open at the table — the steam, the lemon, the surprise of what's inside.",
  },
  {
    name: "Moroccan Pastries",
    origin: "With Mint Tea",
    image: "/images/dish-pastries.jpg",
    alt: "Plate of Moroccan pastries — kaab el ghazal, fekkas, briouates, ghriba",
    description:
      "Kaab el ghazal, fekkas, briouates, ghriba — pastries layered with almond paste, sesame, orange-blossom water and honey. Served with mint tea poured from a height so it foams.",
  },
];

const TESTIMONIALS = [
  {
    text: "We celebrated our anniversary with a dinner that surpassed every Michelin restaurant we have ever visited. The chef understood exactly what we wanted without us even explaining.",
    author: "Sophie & Marc L.",
    origin: "Paris, France",
  },
  {
    text: "Booking La Table Marrakech was the best decision of our entire trip. The tagine was extraordinary — the most complex, layered, perfumed dish I have ever tasted.",
    author: "James W.",
    origin: "London, UK",
  },
  {
    text: "The cooking class was pure magic. We came home with skills and memories that will last a lifetime. Worth every dirham.",
    author: "Elena & Thomas K.",
    origin: "Munich, Germany",
  },
];

const STEPS = [
  { number: "01", title: "Tell Us What You Want", desc: "Message on WhatsApp. A date, how many of you, where you're staying. That's enough to start." },
  { number: "02", title: "We Design Your Evening", desc: "We send a menu, a price, and a few questions back. Tweak anything." },
  { number: "03", title: "Confirm The Night", desc: "Send a small deposit. Everything else — shopping, cooking, serving, cleanup — is on us." },
  { number: "04", title: "Sit Down And Eat", desc: "We arrive two hours before. You arrive at the table." },
];

/* ─── Moroccan SVG Ornament ─────────────────────────────────────────────── */
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

/* ─── Animated Number ────────────────────────────────────────────────────── */
function AnimatedStat({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: easeOut }}
      className="text-center"
    >
      {icon}
      <div className="font-serif text-3xl md:text-4xl text-amber-200">{value}</div>
      <div className="text-xs tracking-widest uppercase text-zinc-400 mt-2">{label}</div>
    </motion.div>
  );
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  const chefRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: chefScroll } = useScroll({ target: chefRef, offset: ["start end", "end start"] });
  const chefImgY = useTransform(chefScroll, [0, 1], ["-8%", "8%"]);
  const chefImgSpring = useSpring(chefImgY, { stiffness: 60, damping: 20 });

  // 🔒 LOCKED 2026-05-19 — Do NOT change for 90 days.
  // Title has been edited multiple times in the last 30 days, destroying SEO ranking
  // (CTR collapsed from 11% in March to 1.4% by May).
  // Next eligible review date: 2026-08-19. Contact Oussama before changing.
  // Keep in sync with the static <title> + meta description in index.html.
  useSEO({
    title: HOMEPAGE_TITLE,
    description: HOMEPAGE_DESC,
    canonical: SITE_URL,
    ogTitle: HOMEPAGE_TITLE,
    ogDescription: HOMEPAGE_DESC,
    ogImage: OPENGRAPH_IMAGE,
    jsonLd: breadcrumbSchema([
      { name: "Home", url: "https://latablemarrakech.com/" },
    ]),
  });

  return (
    <>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[820px] flex items-start md:items-center overflow-hidden pt-28 md:pt-32 pb-44 md:pb-40">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <picture>
            <source media="(max-width: 767px)" srcSet="/images/hero-villa-terrace-mobile.jpg" />
            <img
              src="/images/hero-villa-terrace.jpg"
              fetchPriority="high"
              decoding="async"
              alt="Candlelit Moroccan dinner table on a Marrakech villa terrace overlooking the Koutoubia at dusk"
              className="w-full h-full object-cover object-[65%_center] md:object-center"
            />
          </picture>
          {/* Mobile: stronger top-to-bottom wash so text reads anywhere. Desktop: left-to-right wash keeps the terrace bright on the right of the layout. */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85 md:hidden" />
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
          <div className="absolute inset-0 hidden md:block bg-gradient-to-b from-black/30 via-transparent to-black/70" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full text-white px-6 md:px-12 lg:px-20 max-w-7xl mx-auto"
        >
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="text-xs md:text-sm tracking-[0.35em] uppercase mb-6 text-amber-400"
            >
              Private Chef In Marrakech
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 1, ease: easeOut }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8 text-white"
            >
              A private Moroccan experience, cooked at your villa.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.9 }}
              className="text-base md:text-lg text-white/80 max-w-xl leading-relaxed mb-10"
            >
              Your chef shops the souk in the morning, prepares a seasonal Moroccan menu, serves it on your terrace, and leaves the kitchen spotless.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.9 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-cta-whatsapp"
                data-cta-label="Book on WhatsApp"
                data-cta-position="hero"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.2em] text-xs md:text-sm transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book on WhatsApp
              </a>
              <Link
                href="/experiences"
                data-testid="hero-cta-experiences"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/50 text-white hover:border-amber-300 hover:text-amber-200 uppercase tracking-[0.2em] text-xs md:text-sm transition-all duration-300"
              >
                Discover The Experience
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9 }}
          className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/15 bg-black/30 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-5 grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 text-white/85 text-xs md:text-sm">
            <div className="flex items-center gap-3">
              <Star className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span>4.9/5 from 200+ reviews</span>
            </div>
            <div className="flex items-center gap-3">
              <ChefHat className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Professional Chefs</span>
            </div>
            <div className="flex items-center gap-3">
              <Leaf className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Fresh &amp; Local Ingredients</span>
            </div>
            <div className="flex items-center gap-3">
              <ConciergeBell className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Full Service &amp; Cleanup</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="bg-zinc-950 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            <AnimatedStat value="5.0" label="Guest Rating" icon={<Star className="w-5 h-5 text-amber-400 mx-auto mb-3" />} />
            <AnimatedStat value="200" label="Dinners Cooked" icon={<Users className="w-5 h-5 text-amber-400 mx-auto mb-3" />} />
            <AnimatedStat value="10" label="Experiences" icon={<ChefHat className="w-5 h-5 text-amber-400 mx-auto mb-3" />} />
            <AnimatedStat value="Marrakech" label="+ Agafay Desert" icon={<MapPin className="w-5 h-5 text-amber-400 mx-auto mb-3" />} />
          </div>
        </div>
      </section>

      {/* ── DISH SHOWCASE ────────────────────────────────────────────────── */}
      <section className="bg-zinc-950 overflow-hidden">
        <div className="container mx-auto px-6 py-28">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-amber-400 mb-4">The Flavours</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
              What Morocco actually tastes like.
            </h2>
            <p className="text-zinc-400 mt-6 max-w-2xl mx-auto leading-relaxed">
              A glimpse of what your chef may cook for you — each menu is built around the season, the souk that morning, and how you like to eat. Six dishes that show up most often on our tables.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerFast}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {DISHES.map((dish, i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: easeOut }}
                data-testid={`dish-card-${i}`}
                className="group bg-zinc-900/60 border border-zinc-800 hover:border-amber-600/40 transition-colors duration-300 flex flex-col overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={dish.image}
                    alt={dish.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.6, ease: easeOut }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 text-[0.6rem] tracking-[0.3em] uppercase bg-black/55 backdrop-blur-sm text-amber-300 px-3 py-1.5">
                    {dish.origin}
                  </span>
                </div>
                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <h3 className="font-serif text-2xl text-white mb-3 group-hover:text-amber-200 transition-colors duration-300">
                    {dish.name}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Spice labels */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-wrap justify-center gap-3 md:gap-4 mt-16"
          >
            {["Ras el Hanout", "Preserved Lemon", "Saffron", "Argan Oil", "Rose Water", "Cumin", "Harissa"].map((spice, i) => (
              <motion.span
                key={i}
                variants={fadeUp}
                className="px-4 py-2 border border-amber-600/30 text-amber-400/70 text-xs uppercase tracking-widest"
              >
                {spice}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCES ──────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        {/* Warm courtyard background with subtle dark wash */}
        <div className="absolute inset-0">
          <img
            src="/images/experiences-bg.jpg"
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/55" />
        </div>

        <div className="relative container mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-16 md:mb-20 text-white"
          >
            <p className="text-[0.7rem] md:text-xs tracking-[0.45em] uppercase text-white/85 mb-5">How It Begins</p>
            <div className="w-10 h-px bg-white/40 mx-auto mb-8" />
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] max-w-4xl mx-auto">
              Four ways most of <span className="italic">our</span> guests begin.
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-white/80 leading-relaxed">
              Pick one, or{" "}
              <Link href="/contact" className="underline underline-offset-4 hover:text-amber-200 transition-colors">
                message us
              </Link>{" "}
              and we'll help you create something entirely your own.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6"
          >
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: easeOut }}
                data-testid={`experience-card-${i}`}
                className="group flex flex-col"
              >
                <Link href={exp.href} className="flex flex-col h-full">
                  {/* Portrait photo with number + title overlay */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <motion.img
                      src={exp.image}
                      alt={exp.title.join(" ")}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7, ease: easeOut }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/60" />

                    {/* Number */}
                    <div className="absolute top-6 left-6">
                      <span className="font-serif text-amber-400 text-lg tracking-wider">{exp.number}</span>
                      <div className="w-7 h-px bg-amber-400/80 mt-2" />
                    </div>

                    {/* Title */}
                    <h3 className="absolute top-20 left-6 right-6 font-serif text-white text-2xl md:text-[1.7rem] leading-[1.15]">
                      {exp.title.map((line, idx) => (
                        <span key={idx} className="block">
                          {line}
                        </span>
                      ))}
                    </h3>
                  </div>

                  {/* Caption block */}
                  <div className="bg-stone-100 px-6 py-7 flex-1 flex flex-col justify-between">
                    <p className="text-stone-700 text-sm leading-relaxed">{exp.description}</p>
                    <div className="mt-6 pt-5 border-t border-stone-300/70">
                      <span className="inline-flex items-center gap-2 text-amber-700 text-xs tracking-[0.25em] uppercase group-hover:text-amber-600 transition-colors">
                        Learn More
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CHEF INTRO ───────────────────────────────────────────────────── */}
      <section ref={chefRef} className="py-32 bg-zinc-950 text-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: easeOut }}
              className="relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <motion.img
                  style={{ y: chefImgSpring }}
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=720&q=75"
                  alt="Private Chef in Marrakech"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[110%] object-cover object-top -mt-[5%]"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-zinc-950 to-transparent" />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 bg-amber-600 text-white p-6 text-center w-32 h-32 flex flex-col items-center justify-center"
              >
                <span className="font-serif text-3xl">20</span>
                <span className="text-xs uppercase tracking-wider mt-1 leading-tight">Years Experience</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: easeOut, delay: 0.15 }}
              className="md:pl-8 pt-8 md:pt-0"
            >
              <p className="text-xs tracking-[0.4em] uppercase text-amber-400 mb-6">The Chef</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
                Twenty years in the kitchen.<br />
                <span className="italic text-amber-200">One obsession:</span><br />
                your evening.
              </h2>
              <div className="w-8 h-px bg-amber-600 mb-8" />
              <p className="text-zinc-300 leading-relaxed mb-6">
                He trained in Paris, cooked at Palais Namaskar, and walked away from restaurants because the best part of his work was never the dining room — it was knowing the people he was cooking for.
              </p>
              <p className="text-zinc-300 leading-relaxed mb-10">
                He'll meet you before service. Ask about your trip. Pour the first glass himself. By the time the tagine lid lifts, he'll know exactly how you like it.
              </p>

              {/* Ingredients strip */}
              <div className="flex gap-6 mb-10 overflow-x-auto pb-2">
                {[
                  { src: "https://images.pexels.com/photos/2260825/pexels-photo-2260825.jpeg?auto=compress&cs=tinysrgb&w=160&q=70", label: "Spices" },
                  { src: "https://images.pexels.com/photos/30356249/pexels-photo-30356249.jpeg?auto=compress&cs=tinysrgb&w=160&q=70", label: "Souk" },
                  { src: "https://images.pexels.com/photos/30560980/pexels-photo-30560980.jpeg?auto=compress&cs=tinysrgb&w=160&q=70", label: "Mint Tea" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="shrink-0 text-center"
                  >
                    <div className="w-20 h-20 overflow-hidden mb-2">
                      <img src={item.src} alt={item.label} loading="lazy" decoding="async" width={80} height={80} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[0.6rem] uppercase tracking-widest text-zinc-500">{item.label}</span>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/chef"
                data-testid="btn-meet-chef"
                className="group inline-flex items-center gap-3 border border-amber-400/50 text-amber-300 hover:bg-amber-400/10 hover:border-amber-300 transition-all duration-300 px-8 py-4 uppercase tracking-widest text-xs"
              >
                Meet The Chef
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-32 bg-stone-50 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="grid grid-cols-8 h-full">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-foreground" />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-24"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">The Process</p>
            <h2 className="font-serif text-4xl md:text-5xl">From message to mint tea.</h2>
            <div className="w-12 h-px bg-primary mx-auto mt-8" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-4 gap-12 relative"
          >
            {/* Connecting line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: easeOut, delay: 0.3 }}
              className="absolute top-8 left-1/8 right-1/8 h-px bg-primary/20 hidden md:block origin-left"
            />
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="text-center relative"
                data-testid={`step-${i}`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.2, duration: 0.5, ease: backOut }}
                  className="font-serif text-6xl text-primary/15 mb-4"
                >
                  {step.number}
                </motion.div>
                <div className="w-px h-12 bg-primary/30 mx-auto mb-6" />
                <h3 className="font-serif text-xl mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-32 bg-background relative overflow-hidden">
        {/* Decorative ornament */}
        <div className="absolute -top-20 -right-20 w-64 h-64 text-primary/5 pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>

        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-24"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">What Guests Say</p>
            <h2 className="font-serif text-4xl md:text-5xl">"The best meal of our trip."</h2>
            <p className="text-muted-foreground mt-6 max-w-xl mx-auto leading-relaxed italic">Said often. We keep cooking like it's the first time.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                data-testid={`testimonial-card-${i}`}
                className="bg-stone-50 border border-border p-10 flex flex-col justify-between hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div>
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-foreground/80 leading-relaxed italic font-serif">&ldquo;{t.text}&rdquo;</p>
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-sm font-medium text-foreground">{t.author}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{t.origin}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mt-12"
          >
            <Link href="/testimonials" className="text-xs uppercase tracking-widest text-primary hover:underline">
              Read All Reviews →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="relative py-48 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: easeOut }}
          className="absolute inset-0"
        >
          <img
            src="https://images.pexels.com/photos/28730586/pexels-photo-28730586.jpeg?auto=compress&cs=tinysrgb&w=1600&q=75"
            srcSet="https://images.pexels.com/photos/28730586/pexels-photo-28730586.jpeg?auto=compress&cs=tinysrgb&w=800&q=70 800w, https://images.pexels.com/photos/28730586/pexels-photo-28730586.jpeg?auto=compress&cs=tinysrgb&w=1600&q=75 1600w"
            sizes="100vw"
            loading="lazy"
            decoding="async"
            alt="Moroccan lantern evening dinner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
          {/* Moroccan geometry overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <MoroccanOrnament className="w-[800px] h-[800px] text-amber-200" />
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto"
        >
          <motion.p variants={fadeUp} className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-6">
            Ready?
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl leading-tight mb-8">
            Pick a night.<br />
            <span className="italic text-amber-200">We'll handle the rest.</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="w-16 h-px bg-amber-400/50 mx-auto mb-8" />
          <motion.p variants={fadeUp} className="text-white/65 text-lg mb-14 max-w-xl mx-auto leading-relaxed">
            Tell us when you're free and where you're staying. We'll reply within the hour during the day.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="btn-final-cta-whatsapp"
              data-cta-label="Request a quote on WhatsApp"
              data-cta-position="final_cta"
              className="group inline-flex items-center justify-center gap-3 px-14 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.25em] text-sm transition-all duration-300"
            >
              Request a quote on WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/contact"
              data-testid="btn-final-cta-form"
              className="inline-flex items-center justify-center gap-3 px-12 py-5 border border-white/30 text-white hover:border-amber-300 hover:text-amber-200 uppercase tracking-[0.2em] text-sm transition-all duration-300"
            >
              Or Write It All Out
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STICKY MOBILE BAR ────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-950 p-4 border-t border-zinc-800">
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="mobile-sticky-cta"
          data-cta-label="Request a quote on WhatsApp"
          data-cta-position="mobile_sticky"
          className="block w-full text-center py-4 bg-amber-600 hover:bg-amber-700 text-white uppercase tracking-[0.2em] text-sm transition-colors"
        >
          Request a quote on WhatsApp
        </a>
      </div>

      {/* ── WHATSAPP FLOAT ───────────────────────────────────────────────── */}
      <motion.a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="whatsapp-float"
        data-cta-label="Request a quote on WhatsApp"
        data-cta-position="floating_whatsapp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.4, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-2xl transition-colors"
        aria-label="Request a quote on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </>
  );
}


