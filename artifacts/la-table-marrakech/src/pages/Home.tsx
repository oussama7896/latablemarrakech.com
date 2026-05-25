import {
  motion,
  useScroll,
  useTransform,
  easeOut,
  backOut,
} from "framer-motion";
import { Link } from "wouter";
import { useRef } from "react";
import { ArrowRight, Star, ChefHat, Leaf, ConciergeBell, Quote } from "lucide-react";
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
      "Hand-rolled semolina, slow-braised lamb shoulder, seven vegetables stacked tall. The broth is ladled at the table, the way grandmothers have served it for centuries.",
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
    alt: "Mrouzia: sweet lamb tagine with prunes, honey and almonds",
    description:
      "A holiday dish from the Atlas: lamb caramelised with prunes, honey, cinnamon and toasted almonds. Sweet and savoury at once, usually the surprise of the evening.",
  },
  {
    name: "Fish Bastilla",
    origin: "Atlantic Coast",
    image: "/images/dish-mezze.jpg",
    alt: "Moroccan fish bastilla: flaky pastry parcel filled with spiced fish",
    description:
      "Flaky warqa pastry wrapped around white fish, vermicelli, preserved lemon and fresh herbs. Cracked open at the table; the steam, the lemon, the surprise of what's inside.",
  },
  {
    name: "Tanjia Marrakchia",
    origin: "Slow-Cooked in Clay",
    image: "/images/dish-tanjia.jpg",
    alt: "Marrakchi tanjia: clay urn tipped open revealing slow-cooked lamb",
    description:
      "The bachelor's dish of Marrakech: lamb shoulder, preserved lemon, cumin, smen and saffron sealed in a clay urn and buried for hours in the embers of the hammam. Tipped open at the table; the meat falls apart at a glance.",
  },
];

const TESTIMONIALS = [
  {
    text: "We celebrated our anniversary with a dinner that surpassed every Michelin restaurant we have ever visited. The chef understood exactly what we wanted without us even explaining.",
    author: "Sophie & Marc L.",
    origin: "Paris, France",
  },
  {
    text: "Booking La Table Marrakech was the best decision of our entire trip. The tagine was extraordinary: the most complex, layered, perfumed dish I have ever tasted.",
    author: "James W.",
    origin: "London, UK",
  },
  {
    text: "Our chef walked in with baskets from the souk and turned our riad kitchen into the best restaurant in Marrakech for one night. The chicken tagine was perfect: bright, savory, deeply comforting.",
    author: "Elena & Thomas K.",
    origin: "Munich, Germany",
  },
];

const STEPS = [
  { number: "01", title: "Tell Us What You Want", desc: "Message on WhatsApp. A date, how many of you, where you're staying. That's enough to start." },
  { number: "02", title: "We Design Your Evening", desc: "We send a menu, a price, and a few questions back. Tweak anything." },
  { number: "03", title: "Confirm the Night", desc: "Send a small deposit. Everything else (shopping, cooking, serving, cleanup) is on us." },
  { number: "04", title: "Sit Down and Eat", desc: "We arrive two hours before. You arrive at the table." },
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

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

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
      <section ref={heroRef} className="relative h-screen min-h-[820px] flex flex-col overflow-hidden pt-28 md:pt-32">
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
          className="relative z-10 w-full flex-1 flex items-start md:items-center text-white pb-24 md:pb-32"
        >
          <div className="w-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
            <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.9 }}
              className="text-xs md:text-sm tracking-[0.35em] uppercase mb-6 text-amber-400"
            >
              Private Chef in Marrakech
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
                data-cta-label="Get a Menu and Quote on WhatsApp"
                data-cta-position="hero"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.2em] text-xs md:text-sm transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current shrink-0" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Get a Menu &amp; Quote
              </a>
              <Link
                href="/experiences"
                data-testid="hero-cta-experiences"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/50 text-white hover:border-amber-300 hover:text-amber-200 uppercase tracking-[0.2em] text-xs md:text-sm transition-all duration-300"
              >
                Browse Experiences
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.05, duration: 0.9 }}
              className="text-xs md:text-sm text-white/65 mt-5 tracking-wide"
            >
              From &euro;85 / person &middot; <span className="text-amber-300/90">No deposit until you confirm the menu</span>
            </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9 }}
          className="relative z-10 mt-auto border-t border-white/15 bg-black/40 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-6 md:py-7 grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6 text-white/85 text-xs md:text-sm">
            <div className="flex items-center gap-3">
              <Star className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span>4.9&#9733; &middot; 200+ private dinners</span>
            </div>
            <div className="flex items-center gap-3">
              <ChefHat className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Menus from &euro;85 / person</span>
            </div>
            <div className="flex items-center gap-3">
              <Leaf className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Souk-Fresh Ingredients</span>
            </div>
            <div className="flex items-center gap-3">
              <ConciergeBell className="w-4 h-4 text-amber-400 shrink-0" aria-hidden="true" />
              <span>Full Service &amp; Cleanup</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── RECOMMENDED BY ───────────────────────────────────────────────── */}
      <section className="bg-stone-50 border-y border-stone-200 py-10 md:py-14 overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center text-[0.7rem] md:text-xs tracking-[0.4em] uppercase text-stone-500 mb-8"
          >
            Recommended By
          </motion.p>
        </div>
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="flex items-center gap-x-16 md:gap-x-24 whitespace-nowrap w-max"
          >
            {(() => {
              const logos = [
                { name: "Condé Nast Traveler", className: "font-serif italic text-2xl md:text-3xl tracking-tight", color: "#B8860B" },
                { name: "TRIPADVISOR", className: "font-sans font-bold text-xl md:text-2xl tracking-[0.15em]", color: "#00AF87" },
                { name: "The Guardian", className: "font-serif font-bold text-2xl md:text-3xl tracking-tight", color: "#052962" },
                { name: "FORBES", className: "font-serif font-black text-2xl md:text-3xl tracking-[0.05em]", color: "#D71921" },
                { name: "VOGUE", className: "font-serif font-bold text-2xl md:text-3xl tracking-[0.4em]", color: "#000000" },
              ];
              return logos.concat(logos).map((logo, i) => (
                <span
                  key={i}
                  style={{ color: logo.color }}
                  className={`opacity-90 hover:opacity-100 transition-opacity shrink-0 ${logo.className}`}
                >
                  {logo.name}
                </span>
              ));
            })()}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCES ──────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-100">
        {/* Decorative ornaments */}
        <div className="absolute -top-24 -left-24 w-80 h-80 text-amber-600/[0.06] pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 text-amber-600/[0.06] pointer-events-none -rotate-12">
          <MoroccanOrnament className="w-full h-full" />
        </div>

        <div className="relative container mx-auto px-6">
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-16 md:mb-20"
          >
            <p className="text-[0.7rem] md:text-xs tracking-[0.45em] uppercase text-amber-700 mb-5">How It Begins</p>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-px bg-amber-600/40" />
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <div className="w-12 h-px bg-amber-600/40" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] max-w-4xl mx-auto">
              Four ways to <span className="italic text-amber-700">begin.</span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-muted-foreground leading-relaxed">
              Pick one, or{" "}
              <Link href="/contact" className="underline underline-offset-4 text-amber-700 hover:text-amber-600 transition-colors">
                tell us what you&rsquo;re picturing
              </Link>{" "}
              and we&rsquo;ll build it.
            </p>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          >
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4, ease: easeOut }}
                data-testid={`experience-card-${i}`}
                className="group flex flex-col"
              >
                <Link
                  href={exp.href}
                  className="flex flex-col h-full bg-white border border-stone-200/80 hover:border-amber-600/40 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden"
                >
                  {/* Portrait photo with number + title overlay */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <motion.img
                      src={exp.image}
                      alt={exp.title.join(" ")}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.8, ease: easeOut }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/75" />

                    {/* Number badge */}
                    <div className="absolute top-5 left-5 w-12 h-12 rounded-full bg-amber-500 text-zinc-950 font-serif text-base flex items-center justify-center shadow-lg shadow-black/30">
                      {exp.number}
                    </div>

                    {/* Title overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-serif text-white text-2xl md:text-[1.7rem] leading-[1.1]">
                        {exp.title.map((line, idx) => (
                          <span key={idx} className="block">
                            {line}
                          </span>
                        ))}
                      </h3>
                      <div className="w-10 h-px bg-amber-400 mt-3 group-hover:w-20 transition-all duration-500" />
                    </div>
                  </div>

                  {/* Caption block */}
                  <div className="bg-white px-6 py-7 flex-1 flex flex-col justify-between">
                    <p className="text-stone-700 text-sm leading-relaxed">{exp.description}</p>
                    <div className="mt-6 pt-5 border-t border-stone-200">
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
              A glimpse of what your chef may cook for you. Each menu is built around the season, the souk that morning, and how you like to eat. These six show up most often. Yours can look completely different.
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

          {/* More plates CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="flex justify-center mt-16"
          >
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="btn-dishes-whatsapp"
              data-cta-label="Get a Menu and Quote on WhatsApp"
              data-cta-position="dishes"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 border border-amber-600/40 text-amber-300 hover:bg-amber-600/10 hover:border-amber-500 uppercase tracking-[0.25em] text-xs md:text-sm transition-all duration-300"
            >
              Get the Full Menu on WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
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
      <section className="py-32 bg-gradient-to-b from-stone-50 via-background to-stone-50 relative overflow-hidden">
        {/* Decorative ornaments */}
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/5 pointer-events-none rotate-45">
          <MoroccanOrnament className="w-full h-full" />
        </div>

        <div className="container mx-auto px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">What Guests Say</p>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-amber-600/40" />
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <div className="w-12 h-px bg-amber-600/40" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1]">
              &ldquo;The best meal <span className="italic text-amber-700">of our trip.</span>&rdquo;
            </h2>
            <p className="text-muted-foreground mt-6 max-w-xl mx-auto leading-relaxed italic">
              Said often. We keep cooking like it's the first time.
            </p>
            <p className="text-xs tracking-[0.25em] uppercase text-amber-700/80 mt-5">
              4.9&#9733; on TripAdvisor &middot; 200+ verified reviews
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 md:items-stretch"
          >
            {TESTIMONIALS.map((t, i) => {
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
                  data-testid={`testimonial-card-${i}`}
                  className={`relative p-10 md:p-12 flex flex-col justify-between transition-all duration-300 ${
                    featured
                      ? "bg-zinc-950 text-white border border-amber-600/40 shadow-2xl md:-mt-6 md:mb-0"
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
                    className={`relative mt-10 pt-6 border-t flex items-center gap-4 ${
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
                    <div>
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
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
      <section className="relative py-28 md:py-36 bg-zinc-950 text-white overflow-hidden">
        {/* Subtle ornaments */}
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
            Pick a night.<br />
            <span className="italic text-amber-200">We'll handle the rest.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
            Tell us your date and where you&rsquo;re staying. We reply within an hour during the day.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="btn-final-cta-whatsapp"
              data-cta-label="Get a Menu and Quote on WhatsApp"
              data-cta-position="final_cta"
              className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300"
            >
              Get a Menu &amp; Quote on WhatsApp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/contact"
              data-testid="btn-final-cta-form"
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

      {/* ── STICKY MOBILE BAR ────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-950 p-4 border-t border-zinc-800">
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="mobile-sticky-cta"
          data-cta-label="Get a Menu and Quote on WhatsApp"
          data-cta-position="mobile_sticky"
          className="block w-full text-center py-4 bg-amber-600 hover:bg-amber-700 text-white uppercase tracking-[0.2em] text-sm transition-colors"
        >
          Get a Menu &amp; Quote on WhatsApp
        </a>
      </div>

      {/* ── WHATSAPP FLOAT ───────────────────────────────────────────────── */}
      <motion.a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="whatsapp-float"
        data-cta-label="Get a Menu and Quote on WhatsApp"
        data-cta-position="floating_whatsapp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.4, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white hidden md:flex items-center justify-center shadow-2xl transition-colors"
        aria-label="Get a Menu and Quote on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </>
  );
}


