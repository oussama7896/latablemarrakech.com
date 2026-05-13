import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function VillaChefMarrakech() {
  return (
    <>
      <title>Villa Private Chef in Marrakech — Luxury Chef at Your Villa | La Table Marrakech</title>
      <meta name="description" content="Book a private chef for your villa in Marrakech. Full dining experience in your private villa or riad, from appetisers through dessert. Perfect for groups and family holidays." />
      <link rel="canonical" href="https://latablemarrakech.com/villa-chef-marrakech" />

      {/* Hero */}
      <section className="relative h-screen max-h-[700px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1920&q=80"
          alt="Villa private chef Marrakech"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto"
        >
          <motion.div variants={fadeUp} className="flex justify-center mb-6">
            <Users className="w-6 h-6 text-amber-400" />
          </motion.div>
          <motion.p variants={fadeUp} className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-4">Groups & Families</motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl leading-tight mb-8">
            Villa Private Chef<br /><span className="italic text-amber-200">in Marrakech</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/80 text-xl mb-12 leading-relaxed max-w-xl mx-auto">
            Your private chef arrives at your villa, commands your kitchen, and serves a full dining experience tailored entirely to your group.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/contact" data-testid="villa-cta" className="px-12 py-5 bg-amber-600 hover:bg-amber-700 text-white uppercase tracking-[0.2em] text-sm transition-colors inline-block">
              Book Your Villa Chef
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6 text-muted-foreground leading-relaxed">
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">Your Villa. Our Kitchen. One Extraordinary Dinner.</h2>
              <p>
                You chose a villa in Marrakech for a reason: privacy, space, and the luxury of your own home away from home. La Table Marrakech completes that vision with a professional private chef who transforms your villa kitchen into the stage for an unforgettable dining experience.
              </p>
              <p>
                Our chef arrives with everything — fresh market ingredients, equipment, linens, and a menu designed around your group's preferences, dietary needs, and the spirit of the evening. You watch, relax, or join in. The kitchen is handled entirely.
              </p>
              <p>
                Perfect for families, friend groups, corporate retreats, or any gathering where the dinner table should be the centrepiece of the evening.
              </p>
              <div className="mt-8">
                <Link href="/contact" data-testid="villa-inline-cta" className="inline-flex items-center gap-3 border border-foreground hover:bg-foreground hover:text-background transition-colors px-8 py-4 uppercase tracking-[0.2em] text-xs">
                  Reserve Your Villa Chef <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-6">
              <div className="bg-stone-100 p-10">
                <p className="text-xs uppercase tracking-widest text-primary mb-6">The Villa Chef Experience Includes</p>
                <ul className="space-y-4">
                  {[
                    "Full market sourcing on the morning of your dinner",
                    "Customised multi-course menu for your group",
                    "Dietary requirements and allergies fully accommodated",
                    "Professional set-up of your dining area",
                    "Complete cooking and serving",
                    "Kitchen clean-up included",
                    "From 4 to 30+ guests",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-4 h-px bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-video overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&w=800&q=80"
                  alt="Villa dinner Marrakech group dining"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950 text-white text-center">
        <div className="container mx-auto px-6 max-w-xl">
          <h2 className="font-serif text-4xl mb-6">Book Your Villa Chef Today</h2>
          <p className="text-zinc-300 mb-10">Tell us about your group, your villa, and your occasion. We will take care of the rest.</p>
          <Link href="/contact" className="inline-block px-14 py-5 bg-amber-600 hover:bg-amber-700 text-white uppercase tracking-[0.2em] text-sm transition-colors">
            Make a Reservation
          </Link>
        </div>
      </section>
    </>
  );
}
