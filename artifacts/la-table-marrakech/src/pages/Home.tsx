import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { useRef } from "react";
import { ArrowRight, Star, Users, ChefHat, MapPin } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const experiences = [
  {
    title: "Romantic Dinner",
    description: "A candlelit evening crafted for two. Intimate, personal, and utterly unforgettable.",
    href: "/romantic-dinner-marrakech",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Villa Private Chef",
    description: "Your villa, your menu. A full dining experience tailored to your group's desires.",
    href: "/villa-chef-marrakech",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Moroccan Cooking Class",
    description: "Learn the ancient art of Moroccan cuisine, guided by a master chef in your own kitchen.",
    href: "/moroccan-cooking-experience",
    image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Rooftop Dinner",
    description: "Dine under the stars above the medina with the muezzin's call as your soundtrack.",
    href: "/experiences",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
];

const testimonials = [
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
    text: "The cooking class was pure magic. We came back home with skills and memories that will last a lifetime. Worth every dirham.",
    author: "Elena & Thomas K.",
    origin: "Munich, Germany",
  },
];

const steps = [
  { number: "01", title: "Choose Your Experience", desc: "Browse our curated experiences and select the one that speaks to your soul." },
  { number: "02", title: "Send Your Reservation", desc: "Complete the booking form with your details, date, and preferences." },
  { number: "03", title: "Personal Confirmation", desc: "We reach out within 24 hours to confirm every detail personally." },
  { number: "04", title: "Relax & Savour", desc: "Your chef arrives. You simply enjoy the most memorable meal of your journey." },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      {/* Meta */}
      <title>La Table Marrakech — Private Chef Experiences in Marrakech</title>
      <meta name="description" content="Book a private chef in Marrakech for romantic dinners, villa dining, cooking classes, rooftop experiences, and luxury breakfasts. Michelin-level private dining for tourists." />

      {/* Hero */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=1920&q=90"
            alt="Elegant Moroccan dining table at night"
            className="w-full h-full object-cover object-center scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xs tracking-[0.4em] uppercase mb-8 text-amber-300/90"
          >
            Marrakech — Private Chef Experiences
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8"
          >
            Private Chef Experiences
            <br />
            <span className="italic text-amber-200/90">in Marrakech</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Luxury Moroccan and international dining experiences in your villa, riad, or private event.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              data-testid="hero-cta-reserve"
              className="px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white uppercase tracking-[0.2em] text-sm transition-colors"
            >
              Reserve Your Experience
            </Link>
            <Link
              href="/experiences"
              data-testid="hero-cta-experiences"
              className="px-10 py-4 border border-white/50 text-white hover:bg-white hover:text-black uppercase tracking-[0.2em] text-sm transition-colors"
            >
              View Experiences
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-px h-16 bg-white/30 mx-auto" />
        </motion.div>
      </section>

      {/* Trust Stats */}
      <section className="bg-zinc-950 text-white py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { icon: <Star className="w-5 h-5 text-amber-400 mx-auto mb-3" />, value: "5.0", label: "Average Rating" },
              { icon: <Users className="w-5 h-5 text-amber-400 mx-auto mb-3" />, value: "500+", label: "Guests Served" },
              { icon: <ChefHat className="w-5 h-5 text-amber-400 mx-auto mb-3" />, value: "10+", label: "Unique Experiences" },
              { icon: <MapPin className="w-5 h-5 text-amber-400 mx-auto mb-3" />, value: "Marrakech", label: "& Agafay Desert" },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp} data-testid={`stat-${i}`}>
                {stat.icon}
                <div className="font-serif text-3xl md:text-4xl text-amber-200">{stat.value}</div>
                <div className="text-xs tracking-widest uppercase text-zinc-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Curated Experiences</p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">Dining Unlike Any Other</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                data-testid={`experience-card-${i}`}
                className="group relative overflow-hidden aspect-[4/3]"
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-serif text-2xl text-white mb-2">{exp.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed mb-6">{exp.description}</p>
                  <Link
                    href={exp.href}
                    className="inline-flex items-center gap-2 text-amber-300 text-xs uppercase tracking-widest hover:gap-4 transition-all"
                  >
                    Discover <ArrowRight className="w-3 h-3" />
                  </Link>
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
              className="inline-block border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors px-12 py-4 uppercase tracking-[0.2em] text-xs"
            >
              All Experiences
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Chef Intro */}
      <section className="py-28 bg-zinc-950 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80"
                  alt="Private Chef in Marrakech"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-zinc-950 to-transparent" />
              </div>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="md:pr-12"
            >
              <p className="text-xs tracking-[0.4em] uppercase text-amber-400 mb-6">The Chef</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
                Twenty Years of Moroccan Culinary Mastery
              </h2>
              <p className="text-zinc-300 leading-relaxed mb-6">
                Trained in the finest kitchens of Marrakech and France, our chef brings a profound reverence for Morocco's spice-laden culinary heritage together with the precision of modern European technique.
              </p>
              <p className="text-zinc-300 leading-relaxed mb-10">
                Every dinner is composed from the morning market — seasonal, soulful, and deeply personal.
              </p>
              <Link
                href="/chef"
                data-testid="btn-meet-chef"
                className="inline-flex items-center gap-3 border border-amber-400/50 text-amber-300 hover:bg-amber-400/10 transition-colors px-8 py-4 uppercase tracking-widest text-xs"
              >
                Meet the Chef <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">The Process</p>
            <h2 className="font-serif text-4xl md:text-5xl">How It Works</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-4 gap-12"
          >
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center" data-testid={`step-${i}`}>
                <div className="font-serif text-5xl text-primary/20 mb-4">{step.number}</div>
                <div className="w-px h-12 bg-border mx-auto mb-6" />
                <h3 className="font-serif text-xl mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 bg-stone-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-4">Guest Stories</p>
            <h2 className="font-serif text-4xl md:text-5xl">What Our Guests Say</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                data-testid={`testimonial-card-${i}`}
                className="bg-white p-10 flex flex-col justify-between"
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
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-40 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1920&q=80"
          alt="Luxurious Moroccan dinner setting"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto"
        >
          <p className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-6">Ready to Begin?</p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-8">
            Reserve Your Table in Marrakech
          </h2>
          <p className="text-white/70 text-lg mb-12 max-w-xl mx-auto">
            Every reservation is handled personally. Your private chef experience begins the moment you reach out.
          </p>
          <Link
            href="/contact"
            data-testid="btn-final-cta"
            className="inline-block px-14 py-5 bg-amber-600 hover:bg-amber-700 text-white uppercase tracking-[0.25em] text-sm transition-colors"
          >
            Reserve Your Experience
          </Link>
        </motion.div>
      </section>

      {/* Sticky Mobile Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-950 p-4 border-t border-zinc-800">
        <Link
          href="/contact"
          data-testid="mobile-sticky-cta"
          className="block w-full text-center py-4 bg-amber-600 hover:bg-amber-700 text-white uppercase tracking-[0.2em] text-sm transition-colors"
        >
          Reserve Your Experience
        </Link>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/212600000000"
        target="_blank"
        rel="noopener noreferrer"
        data-testid="whatsapp-float"
        className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-xl transition-colors"
        aria-label="Contact on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </>
  );
}
