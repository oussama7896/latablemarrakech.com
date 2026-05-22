import { motion, easeOut, easeInOut, backOut } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ChefHat } from "lucide-react";
import { useSEO, breadcrumbSchema } from "@/lib/seo";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const dishes = ["Chicken Tagine with Preserved Lemon", "Lamb Mrouzia", "Classic Couscous with Seven Vegetables", "Bastilla (Pigeon Pie)", "Harira Soup", "Chebakia Pastries", "Moroccan Mint Tea Ceremony"];

export default function MoroccanCookingExperience() {
  useSEO({
    title: "Moroccan Cooking Class in Marrakech — Private Chef Experience | La Table Marrakech",
    description: "Learn to cook authentic Moroccan cuisine with a private chef in Marrakech. Hands-on cooking class in your riad or villa, followed by a full Moroccan feast. Book your cooking experience.",
    canonical: "https://latablemarrakech.com/moroccan-cooking-experience",
    jsonLd: breadcrumbSchema([
      { name: "Home", url: "https://latablemarrakech.com/" },
      { name: "Moroccan Cooking Experience", url: "https://latablemarrakech.com/moroccan-cooking-experience" },
    ]),
  });

  return (
    <>

      {/* Hero */}
      <section className="relative h-screen max-h-[700px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/5737365/pexels-photo-5737365.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt="Moroccan cooking class Marrakech private chef"
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
            <ChefHat className="w-6 h-6 text-amber-400" />
          </motion.div>
          <motion.p variants={fadeUp} className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-4">Learn the Art</motion.p>
          <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl leading-tight mb-8">
            Moroccan Cooking<br /><span className="italic text-amber-200">Experience</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/80 text-xl mb-12 leading-relaxed max-w-xl mx-auto">
            A hands-on private cooking class with a master Moroccan chef, followed by a feast of everything you have created together.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link href="/contact" data-testid="cooking-cta" className="px-12 py-5 bg-amber-600 hover:bg-amber-700 text-white uppercase tracking-[0.2em] text-sm transition-colors inline-block">
              Book Your Cooking Class
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-serif text-3xl md:text-4xl mb-8">Cook Like a Moroccan. Eat Like a King.</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  The spice markets of Marrakech are one of the world's great sensory experiences. But the real magic happens when those spices reach the kitchen — and when a master teaches you exactly how to use them.
                </p>
                <p>
                  Our private cooking class begins with a guided introduction to Moroccan spices and techniques, followed by a half-day of hands-on cooking in your villa or riad kitchen. You will learn to make traditional dishes from scratch, understand the layering of flavours, and master the techniques that make Moroccan cuisine so distinctively complex and satisfying.
                </p>
                <p>
                  The class ends with the greatest reward: sitting down together to eat everything you have created, accompanied by freshly baked bread and mint tea.
                </p>
                <p>
                  You leave with recipes, techniques, a spice selection to take home, and a skill that will impress your guests for years.
                </p>
              </div>
              <div className="mt-10">
                <Link href="/contact" data-testid="cooking-inline-cta" className="inline-flex items-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-10 py-4 uppercase tracking-[0.2em] text-xs">
                  Reserve Your Cooking Class <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="space-y-8">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2260825/pexels-photo-2260825.jpeg?auto=compress&cs=tinysrgb&w=800&q=85"
                  alt="Moroccan spices and ingredients cooking class"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="bg-stone-100 p-8">
                <p className="text-xs uppercase tracking-widest text-primary mb-5">Dishes You May Learn to Make</p>
                <ul className="space-y-3">
                  {dishes.map((dish, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm">
                      <div className="w-4 h-px bg-primary shrink-0" />
                      {dish}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Duration/Format */}
      <section className="py-20 bg-zinc-950 text-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { title: "Duration", value: "3 – 4 Hours" },
              { title: "Group Size", value: "2 – 8 Guests" },
              { title: "Language", value: "English, French, Arabic" },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-xs uppercase tracking-widest text-amber-400 mb-2">{item.title}</p>
                <p className="font-serif text-3xl text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background text-center">
        <div className="container mx-auto px-6 max-w-xl">
          <h2 className="font-serif text-4xl mb-6">Learn to Cook Morocco</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">Reserve your private cooking class and take a piece of Morocco home with you.</p>
          <Link href="/contact" className="inline-block px-14 py-5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors uppercase tracking-[0.2em] text-sm">
            Book Your Class
          </Link>
        </div>
      </section>
    </>
  );
}




