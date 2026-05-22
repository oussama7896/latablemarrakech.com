import { motion, easeOut, easeInOut, backOut } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";
import { useSEO, breadcrumbSchema } from "@/lib/seo";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function PrivateChefMarrakech() {
  useSEO({
    title: "Private Chef in Marrakech — Luxury Dining at Your Villa or Riad",
    description: "Book a private chef in Marrakech for your villa, riad, or Airbnb. Romantic dinners, Moroccan feasts, rooftop experiences, and cooking classes. Luxury private dining for tourists.",
    canonical: "https://latablemarrakech.com/private-chef-marrakech",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", url: "https://latablemarrakech.com/" },
        { name: "Private Chef Marrakech", url: "https://latablemarrakech.com/private-chef-marrakech" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "La Table Marrakech",
        description: "Private chef experiences in Marrakech for tourists",
        url: "https://latablemarrakech.com/private-chef-marrakech",
        telephone: "+212721354757",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Marrakech",
          addressCountry: "MA",
        },
        priceRange: "€€€",
        servesCuisine: ["Moroccan", "Mediterranean", "International"],
      },
    ],
  });

  return (
    <>

      {/* Hero */}
      <section className="relative h-screen max-h-[700px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1920&q=80"
          alt="Private chef Marrakech"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto"
        >
          <motion.p variants={fadeUp} className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-6">Marrakech</motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl leading-tight mb-8">
            Private Chef in<br /><span className="italic text-amber-200">Marrakech</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/80 text-xl mb-12 leading-relaxed max-w-xl mx-auto">
            A luxury private chef experience in your villa, riad, or private event. Tailored menus, exceptional ingredients, unforgettable evenings.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" data-testid="seo1-cta-primary" className="px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white uppercase tracking-[0.2em] text-sm transition-colors">
              Reserve Your Chef
            </Link>
            <Link href="/experiences" data-testid="seo1-cta-secondary" className="px-10 py-4 border border-white/50 text-white hover:bg-white hover:text-black uppercase tracking-[0.2em] text-sm transition-colors">
              View Experiences
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-serif text-3xl md:text-4xl mb-8">The Finest Private Chef Experience in Marrakech</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  La Table Marrakech brings Michelin-level private dining directly to your accommodation. Whether you are staying in a riad in the medina, a luxury villa in the Palmeraie, or a boutique Airbnb in Gueliz, our private chef transforms your space into the finest restaurant in the city.
                </p>
                <p>
                  Every menu is composed fresh, sourced from the morning markets, and personalised to your tastes, dietary requirements, and the spirit of your occasion. There are no set menus, no constraints, and no compromises.
                </p>
                <p>
                  From an intimate dinner for two to a grand celebration for thirty guests, we create culinary experiences that are remembered long after your return flight home.
                </p>
              </div>
              <div className="mt-10">
                <Link href="/contact" data-testid="seo1-inline-cta" className="inline-flex items-center gap-3 border border-foreground hover:bg-foreground hover:text-background transition-colors px-8 py-4 uppercase tracking-[0.2em] text-xs">
                  Book Your Private Chef <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
              {[
                { title: "Romantic Dinner for Two", href: "/romantic-dinner-marrakech" },
                { title: "Villa Private Chef", href: "/villa-chef-marrakech" },
                { title: "Moroccan Cooking Experience", href: "/moroccan-cooking-experience" },
                { title: "Rooftop Dinner Marrakech", href: "/experiences" },
                { title: "Desert Dining Agafay", href: "/experiences" },
                { title: "Birthday & Special Events", href: "/experiences" },
              ].map((item, i) => (
                <Link key={i} href={item.href} className="flex items-center justify-between py-4 border-b border-border hover:text-primary transition-colors group">
                  <span className="font-serif">{item.title}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-20 bg-stone-50">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
          </div>
          <p className="font-serif text-2xl italic mb-4">&ldquo;The best private chef in Marrakech. An experience beyond compare.&rdquo;</p>
          <p className="text-xs text-muted-foreground uppercase tracking-widest">Google Reviews — 5.0 / 5</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-zinc-950 text-white text-center">
        <div className="container mx-auto px-6 max-w-xl">
          <h2 className="font-serif text-4xl mb-6">Ready to Book Your Private Chef?</h2>
          <p className="text-zinc-300 mb-10">We confirm within 24 hours and handle every detail personally.</p>
          <Link href="/contact" className="inline-block px-14 py-5 bg-amber-600 hover:bg-amber-700 text-white uppercase tracking-[0.2em] text-sm transition-colors">
            Reserve Now
          </Link>
        </div>
      </section>
    </>
  );
}




