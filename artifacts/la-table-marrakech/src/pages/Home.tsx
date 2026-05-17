import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  easeOut,
  easeInOut,
  backOut,
} from "framer-motion";
import { Link } from "wouter";
import { useRef } from "react";
import { ArrowRight, Star, Users, ChefHat, MapPin } from "lucide-react";

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
const MARQUEE_IMAGES = [
  { src: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=320&q=70", alt: "Moroccan tagine" },
  { src: "https://images.pexels.com/photos/2260825/pexels-photo-2260825.jpeg?auto=compress&cs=tinysrgb&w=320&q=70", alt: "Moroccan spices" },
  { src: "https://images.pexels.com/photos/30560980/pexels-photo-30560980.jpeg?auto=compress&cs=tinysrgb&w=320&q=70", alt: "Moroccan mint tea" },
  { src: "https://images.pexels.com/photos/5410419/pexels-photo-5410419.jpeg?auto=compress&cs=tinysrgb&w=320&q=70", alt: "Moroccan couscous" },
  { src: "https://images.pexels.com/photos/28730586/pexels-photo-28730586.jpeg?auto=compress&cs=tinysrgb&w=320&q=70", alt: "Moroccan lanterns" },
  { src: "https://images.pexels.com/photos/30356249/pexels-photo-30356249.jpeg?auto=compress&cs=tinysrgb&w=320&q=70", alt: "Moroccan spice souk" },
  { src: "https://images.pexels.com/photos/30769609/pexels-photo-30769609.jpeg?auto=compress&cs=tinysrgb&w=320&q=70", alt: "Dining under stars Marrakech" },
];

const EXPERIENCES = [
  {
    title: "Romantic Dinner",
    tag: "For Two · From €120",
    description: "Candlelit table, slow service, a menu built around the two of you.",
    href: "/romantic-dinner-marrakech",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=720&q=75",
  },
  {
    title: "Villa Private Chef",
    tag: "For Your Group · From €90",
    description: "Your kitchen, our chef, your menu. From amuse-bouche to mint tea.",
    href: "/villa-chef-marrakech",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=720&q=75",
  },
  {
    title: "Moroccan Cooking Class",
    tag: "Hands-on · From €65",
    description: "Morning at the souk, then cook (and eat) a full Moroccan lunch.",
    href: "/moroccan-cooking-experience",
    image: "https://images.pexels.com/photos/30356249/pexels-photo-30356249.jpeg?auto=compress&cs=tinysrgb&w=720&q=75",
  },
  {
    title: "Desert Dining",
    tag: "Agafay · From €160",
    description: "Dinner under the stars, Berber lanterns, Gnawa music as the sun goes.",
    href: "/experiences",
    image: "https://images.pexels.com/photos/36209321/pexels-photo-36209321.jpeg?auto=compress&cs=tinysrgb&w=720&q=75",
  },
];

const FOOD_MOSAIC = [
  { src: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=600&q=75", alt: "Slow-cooked tagine", span: "row-span-2" },
  { src: "https://images.pexels.com/photos/30560980/pexels-photo-30560980.jpeg?auto=compress&cs=tinysrgb&w=480&q=75", alt: "Moroccan mint tea ceremony", span: "" },
  { src: "https://images.pexels.com/photos/2260825/pexels-photo-2260825.jpeg?auto=compress&cs=tinysrgb&w=480&q=75", alt: "Moroccan spice palette", span: "" },
  { src: "https://images.pexels.com/photos/5410419/pexels-photo-5410419.jpeg?auto=compress&cs=tinysrgb&w=480&q=75", alt: "Friday couscous", span: "" },
  { src: "https://images.pexels.com/photos/28730586/pexels-photo-28730586.jpeg?auto=compress&cs=tinysrgb&w=480&q=75", alt: "Riad lanterns at dusk", span: "" },
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
  { number: "03", title: "Confirm The Night", desc: "Send a small deposit. Everything else — shopping, setup, service — is on us." },
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

  return (
    <>
      <title>Private Chef in Marrakech | Villa, Riad & Desert Dining — La Table Marrakech</title>
      <meta name="description" content="A private chef at your villa, riad, or in the Agafay desert. Romantic dinners, family feasts, cooking classes — designed for travellers in Marrakech. Message on WhatsApp." />
      <link rel="canonical" href="https://latablemarrakech.com/" />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/29125650/pexels-photo-29125650.jpeg?auto=compress&cs=tinysrgb&w=1600&q=80"
            srcSet="https://images.pexels.com/photos/29125650/pexels-photo-29125650.jpeg?auto=compress&cs=tinysrgb&w=800&q=70 800w, https://images.pexels.com/photos/29125650/pexels-photo-29125650.jpeg?auto=compress&cs=tinysrgb&w=1200&q=75 1200w, https://images.pexels.com/photos/29125650/pexels-photo-29125650.jpeg?auto=compress&cs=tinysrgb&w=1600&q=80 1600w"
            sizes="100vw"
            fetchPriority="high"
            decoding="async"
            alt="Elegant Moroccan dining table at night"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/85" />
        </motion.div>

        {/* Rotating ornament */}
        <motion.div
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 0.15, rotate: 0 }}
          transition={{ delay: 0.5, duration: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] text-amber-300 pointer-events-none"
          style={{ rotate: 0 }}
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" as const }}>
            <MoroccanOrnament className="w-full h-full" />
          </motion.div>
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ delay: 0.3, duration: 1.2 }}
            className="text-xs uppercase mb-8 text-amber-300/90"
          >
            Marrakech · Private Chef · In Your Riad Or Villa
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.1, ease: easeOut }}
            className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] md:leading-[0.95] mb-8"
          >
            A private chef at your table.
            <br />
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="italic text-amber-200/90"
            >
              In Marrakech, tonight.
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.2, duration: 0.8, ease: easeOut }}
            className="w-24 h-px bg-amber-400/50 mx-auto mb-8 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.9 }}
            className="text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            We come to your riad, villa, rooftop, or the desert — and cook the kind of dinner you'll still be talking about a year from now.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://wa.me/212721354757"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="hero-cta-whatsapp"
              className="group px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.2em] text-sm transition-all duration-300 flex items-center justify-center gap-3"
            >
              Message Us On WhatsApp
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </a>
            <Link
              href="/experiences"
              data-testid="hero-cta-experiences"
              className="px-10 py-4 border border-white/40 text-white hover:border-amber-300 hover:text-amber-200 uppercase tracking-[0.2em] text-sm transition-all duration-300"
            >
              See The Experiences
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: easeInOut }}
            className="w-px h-14 bg-gradient-to-b from-white/50 to-transparent"
          />
          <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/40">Scroll</span>
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

      {/* ── MARQUEE ──────────────────────────────────────────────────────── */}
      <section className="overflow-hidden bg-zinc-950 pb-0 pt-0">
        <div className="relative flex">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" as const }}
            className="flex gap-4 py-6 will-change-transform"
            style={{ width: "max-content" }}
          >
            {[...MARQUEE_IMAGES, ...MARQUEE_IMAGES].map((img, i) => (
              <div key={i} className="shrink-0 w-64 h-44 overflow-hidden">
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  width={256}
                  height={176}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── EXPERIENCES ──────────────────────────────────────────────────── */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-24"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Choose Your Evening</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">Not sure what you want? Start here.</h2>
            <p className="text-muted-foreground mt-6 max-w-xl mx-auto leading-relaxed">Four ways most of our guests begin. Pick one, or message us and we'll match the evening to your trip.</p>
            <div className="w-12 h-px bg-primary mx-auto mt-8" />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {EXPERIENCES.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                data-testid={`experience-card-${i}`}
                className="group relative overflow-hidden aspect-[4/3] cursor-pointer"
              >
                <motion.img
                  src={exp.image}
                  alt={exp.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.7, ease: easeOut }}
                />
                {/* Gradient always visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                {/* Hover color wash */}
                <div className="absolute inset-0 bg-amber-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Tag */}
                <div className="absolute top-6 left-6">
                  <span className="text-[0.6rem] tracking-[0.3em] uppercase bg-black/40 text-amber-300 px-3 py-1.5 backdrop-blur-sm">
                    {exp.tag}
                  </span>
                </div>

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-amber-200 transition-colors duration-300">
                    {exp.title}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-5 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">
                    {exp.description}
                  </p>
                  <motion.div
                    className="flex items-center gap-2 text-amber-300 text-xs uppercase tracking-widest"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                  >
                    <Link href={exp.href}>See This</Link>
                    <ArrowRight className="w-3 h-3" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mt-16"
          >
            <Link
              href="/experiences"
              data-testid="btn-all-experiences"
              className="group inline-flex items-center gap-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 px-12 py-4 uppercase tracking-[0.2em] text-xs"
            >
              See All Experiences
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── MOROCCAN FOOD MOSAIC ─────────────────────────────────────────── */}
      <section className="py-0 bg-zinc-950 overflow-hidden">
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
            <p className="text-zinc-400 mt-6 max-w-xl mx-auto leading-relaxed">
              Lamb tagine that's been on the fire since morning. Bastilla — pigeon pie, dusted in icing sugar and cinnamon, the most surprising thing you'll eat all week. Mint tea poured from a height so it foams. None of it is what you ate in the medina restaurants.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerFast}
            className="grid grid-cols-3 grid-rows-2 gap-3 h-[520px]"
          >
            {FOOD_MOSAIC.map((img, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className={`overflow-hidden group ${img.span} ${i === 0 ? "col-span-1 row-span-2" : ""}`}
              >
                <motion.img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: easeOut }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Spice labels */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-wrap justify-center gap-4 mt-12"
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
              href="https://wa.me/212721354757"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="btn-final-cta-whatsapp"
              className="group inline-flex items-center justify-center gap-3 px-14 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.25em] text-sm transition-all duration-300"
            >
              WhatsApp +212 721 354 757
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="/contact"
              data-testid="btn-final-cta-form"
              className="inline-flex items-center justify-center gap-3 px-12 py-5 border border-white/30 text-white hover:border-amber-300 hover:text-amber-200 uppercase tracking-[0.2em] text-sm transition-all duration-300"
            >
              Or Send A Form
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STICKY MOBILE BAR ────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-950 p-4 border-t border-zinc-800">
        <a
          href="https://wa.me/212721354757"
          target="_blank"
          rel="noopener noreferrer"
          data-testid="mobile-sticky-cta"
          className="block w-full text-center py-4 bg-amber-600 hover:bg-amber-700 text-white uppercase tracking-[0.2em] text-sm transition-colors"
        >
          WhatsApp +212 721 354 757
        </a>
      </div>

      {/* ── WHATSAPP FLOAT ───────────────────────────────────────────────── */}
      <motion.a
        href="https://wa.me/212721354757"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="whatsapp-float"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.4, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-2xl transition-colors"
        aria-label="Contact on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </motion.a>
    </>
  );
}



