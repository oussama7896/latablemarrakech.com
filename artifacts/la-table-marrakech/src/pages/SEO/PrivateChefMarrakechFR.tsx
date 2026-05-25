import { motion, easeOut } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";
import { useSEO, breadcrumbSchema } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const experienceLinks = [
  { title: "Dîner Romantique pour Deux", href: "/fr/romantic-dinner-marrakech" },
  { title: "Chef Privé en Villa", href: "/fr/villa-chef-marrakech" },
  { title: "Cours de Cuisine Marocaine", href: "/fr/marrakech-cooking-class" },
  { title: "Dîner Rooftop à Marrakech", href: "/fr/experiences" },
  { title: "Dîner dans le Désert Agafay", href: "/fr/experiences" },
  { title: "Anniversaires & Événements", href: "/fr/experiences" },
];

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

export default function PrivateChefMarrakechFR() {
  useSEO({
    title: "Chef Privé à Marrakech — Dîners de Luxe en Villa ou Riad",
    description: "Réservez un chef privé à Marrakech pour votre villa, riad ou Airbnb. Dîners romantiques, festins marocains, expériences rooftop, cours de cuisine. Dîner privé de luxe pour voyageurs.",
    canonical: "https://latablemarrakech.com/fr/private-chef-marrakech",
    jsonLd: [
      breadcrumbSchema([
        { name: "Accueil", url: "https://latablemarrakech.com/" },
        { name: "Chef Privé Marrakech", url: "https://latablemarrakech.com/fr/private-chef-marrakech" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "La Table Marrakech",
        description: "Expériences de chef privé à Marrakech pour les voyageurs",
        url: "https://latablemarrakech.com/fr/private-chef-marrakech",
        telephone: "+212721354757",
        address: { "@type": "PostalAddress", addressLocality: "Marrakech", addressCountry: "MA" },
        priceRange: "€€€",
        servesCuisine: ["Marocaine", "Méditerranéenne", "Internationale"],
      },
    ],
  });

  return (
    <>
      <section className="relative pt-40 md:pt-52 pb-20 md:pb-24 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-20 -right-24 w-80 h-80 text-amber-600/[0.07] pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/[0.06] pointer-events-none rotate-45"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="relative container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-4xl mx-auto">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }} className="text-xs md:text-sm tracking-[0.4em] uppercase text-amber-700 mb-6">
              Chef Privé Marrakech
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.7, ease: easeOut }} className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-px bg-amber-600/40" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <div className="w-16 h-px bg-amber-600/40" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1, ease: easeOut }} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
              La plus belle table de Marrakech, <span className="italic text-amber-700">chez vous.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }} className="text-base md:text-lg text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed italic">
              Un chef privé dans votre villa, riad ou sur votre rooftop. Menus sur mesure, ingrédients frais du marché, soirées qu'on n'oublie pas.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95, duration: 0.9 }} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="seo1-hero-whatsapp" data-cta-label="Get a Menu and Quote on WhatsApp" data-cta-position="private_chef_fr_hero" className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-colors">
                Demandez sur WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/fr/experiences" data-testid="seo1-cta-secondary" className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-foreground/80 text-foreground hover:border-amber-600 hover:text-amber-700 uppercase tracking-[0.22em] text-xs md:text-sm transition-colors">
                Voir les expériences
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative pt-12 md:pt-16 pb-28 md:pb-32 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/5 pointer-events-none rotate-45"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
              <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">L'expérience</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground mb-6">
                Dîner de niveau restaurant, <span className="italic text-amber-700">à votre adresse.</span>
              </h2>
              <div className="w-12 h-px bg-amber-600/40 mb-8" />
              <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
                <p>Que vous séjourniez dans un riad de la médina, une villa de la Palmeraie ou un Airbnb à Guéliz, notre chef transforme votre espace en plus belle table de la ville pour une soirée.</p>
                <p>Chaque menu est composé frais, sourcé sur les marchés du matin, et construit autour de vos goûts, vos régimes alimentaires, et l'esprit de l'occasion. Pas de menus figés. Pas de compromis.</p>
                <p>D'un dîner intime pour deux à une célébration pour trente personnes, nous créons des soirées qu'on raconte longtemps après le vol retour.</p>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
              <div className="bg-white border border-stone-200/80 p-8 md:p-10 shadow-sm">
                <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-6">Choisissez votre soirée</p>
                <ul className="divide-y divide-stone-200">
                  {experienceLinks.map((item, i) => (
                    <li key={i}>
                      <Link href={item.href} className="flex items-center justify-between py-4 group hover:text-amber-700 transition-colors">
                        <span className="font-serif text-base md:text-lg">{item.title}</span>
                        <ArrowRight className="w-4 h-4 text-amber-700/50 group-hover:text-amber-700 group-hover:translate-x-1 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-20 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <div className="flex justify-center gap-1.5 mb-6">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />)}
          </div>
          <p className="font-serif italic text-3xl md:text-4xl text-foreground/90 leading-tight mb-4">
            &laquo;&nbsp;Le meilleur chef privé de Marrakech. Une expérience incomparable.&nbsp;&raquo;
          </p>
          <p className="text-xs tracking-[0.3em] uppercase text-amber-700/80">
            Avis Google — 5,0 / 5 &middot; 200+ dîners privés
          </p>
        </div>
      </section>

      <section className="relative py-28 md:py-36 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 text-amber-500/[0.05] pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 text-amber-500/[0.05] pointer-events-none -rotate-12"><MoroccanOrnament className="w-full h-full" /></div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl leading-[1.05]">
            Réservez votre <span className="italic text-amber-200">chef privé.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
            Nous confirmons sous 24 heures et gérons chaque détail personnellement.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="seo1-final-whatsapp" data-cta-label="Get a Menu and Quote on WhatsApp" data-cta-position="private_chef_fr_final_cta" className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
              Demandez un menu &amp; devis sur WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/fr/contact" data-testid="seo1-final-form" className="inline-flex items-center justify-center gap-3 px-12 py-5 border border-white/30 text-white hover:border-amber-300 hover:text-amber-200 uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
              Envoyez vos détails
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="text-white/50 text-xs tracking-[0.2em] uppercase mt-8">
            Pas d'acompte avant que vous confirmiez le menu
          </motion.p>
        </motion.div>
      </section>
    </>
  );
}
