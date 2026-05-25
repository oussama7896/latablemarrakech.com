import { motion, useScroll, useTransform, easeOut } from "framer-motion";
import { useRef } from "react";
import { Star, Quote, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useSEO, breadcrumbSchema, reviewAggregateSchema } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const testimonials = [
  {
    text: "Honnêtement, on n'attendait pas grand-chose — le concierge du riad nous a dit « essayez juste ». Je suis revenu le deuxième soir avec deux collègues. Rien que les msemen au miel d'argan valent le voyage.",
    author: "Mark D.",
    origin: "Londres, Royaume-Uni",
    experience: "Dîner Privé sur Rooftop",
  },
  {
    text: "Je suis difficile à impressionner côté cuisine — j'écris sur les restaurants. Le seul mezze me faisait envoyer des photos à mes amis sous la table. Rien ne semblait répété alors que tout l'était. C'est rare.",
    author: "Isabelle M.",
    origin: "Paris, France",
    experience: "Dîner Chef Privé",
  },
  {
    text: "On voyageait avec deux enfants (7 et 11 ans) et j'avais peur d'un long dîner. Le chef a tout adapté — il a même fait un « tajine kids » sans épices pour le plus jeune. Trois mois après, les garçons en parlent encore.",
    author: "Famille Carter",
    origin: "Dublin, Irlande",
    experience: "Chef Privé en Villa",
  },
  {
    text: "On avait réservé le rooftop pour nos 10 ans de mariage. Le vent s'est levé vers 21h et ils ont déplacé toute la table à l'intérieur — bougies, fleurs, thé à la menthe, le tout — en douze minutes peut-être, sans jamais que ça ne paraisse comme une perturbation. C'est ce genre de détail qu'on retient.",
    author: "Hélène & Marc",
    origin: "Lyon, France",
    experience: "Dîner Privé sur Rooftop",
  },
  {
    text: "Huit amis, régimes variés — un végétarien, un pescetarien, une allergie aux fruits à coque. J'ai envoyé un long mail en m'attendant à des objections. J'ai eu un menu sur mesure en retour en 24 heures. Pas donné, mais pour un chef privé dans un riad c'était juste.",
    author: "Olivia R.",
    origin: "Sydney, Australie",
    experience: "Chef Privé en Villa",
  },
  {
    text: "Ma belle-mère fait de la cuisine marocaine depuis quarante ans. Elle a demandé la recette du tajine deux fois pendant le dîner.",
    author: "Yasmine T.",
    origin: "Casablanca, Maroc",
    experience: "Chef Privé en Villa",
  },
  {
    text: "Les 40 ans de ma femme. Douze personnes, dont la moitié n'avait jamais mangé marocain correctement. Deux d'entre elles sont venues me voir après pour me demander « c'est qui ce chef et on peut le réserver à Genève » (vous ne pouvez pas, malheureusement).",
    author: "Édouard L.",
    origin: "Genève, Suisse",
    experience: "Dîner d'Anniversaire Privé",
  },
  {
    text: "Réservé sur WhatsApp deux jours avant d'arriver, ce qui me semblait être un mauvais signe. Ça ne l'était pas. La communication ressemblait à celle d'un petit hôtel de luxe, pas à un freelance. On revient en octobre.",
    author: "David T.",
    origin: "New York, USA",
    experience: "Dîner Chef Privé",
  },
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

export default function TestimonialsFR() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  useTransform(scrollYProgress, [0, 0.75], [1, 0]); // unused but matches EN

  useSEO({
    title: "Témoignages des invités — La Table Marrakech",
    description: "Lisez les témoignages des invités qui ont vécu les dîners chef privé de La Table Marrakech. Des dîners romantiques aux soirées rooftop, découvrez ce qui rend nos expériences inoubliables.",
    canonical: "https://latablemarrakech.com/fr/testimonials",
    jsonLd: [
      breadcrumbSchema([
        { name: "Accueil", url: "https://latablemarrakech.com/" },
        { name: "Témoignages", url: "https://latablemarrakech.com/fr/testimonials" },
      ]),
      reviewAggregateSchema(
        testimonials.map((t) => ({ author: t.author, text: t.text, rating: 5 })),
      ),
    ],
  });

  return (
    <>
      <section ref={heroRef} className="relative pt-40 md:pt-52 pb-20 md:pb-28 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-20 -right-24 w-80 h-80 text-amber-600/[0.07] pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/[0.06] pointer-events-none rotate-45">
          <MoroccanOrnament className="w-full h-full" />
        </div>

        <div className="relative container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} style={{ y: heroY }} className="text-center max-w-4xl mx-auto">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }} className="text-xs md:text-sm tracking-[0.4em] uppercase text-amber-700 mb-6">
              Témoignages d'invités
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.7, ease: easeOut }} className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-px bg-amber-600/40" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <div className="w-16 h-px bg-amber-600/40" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1, ease: easeOut }} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
              Les soirées, <span className="italic text-amber-700">racontées par eux.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }} className="text-base md:text-lg text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed italic">
              Huit lettres des invités qui ont partagé une table privée avec nous à Marrakech.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="pt-8 md:pt-12 pb-28 md:pb-32 bg-gradient-to-b from-stone-50 via-background to-stone-50 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/5 pointer-events-none rotate-45"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="container mx-auto px-6 relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 md:items-stretch">
            {testimonials.map((t, i) => {
              const featured = i === 1;
              const initials = t.author.replace(/[.]/g, "").split(/\s|&/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
              return (
                <motion.div key={i} variants={fadeUp} whileHover={{ y: -8 }} transition={{ duration: 0.35, ease: easeOut }} data-testid={`testimonial-${i}`} className={`relative p-10 md:p-12 flex flex-col justify-between transition-all duration-300 ${featured ? "bg-zinc-950 text-white border border-amber-600/40 shadow-2xl lg:-mt-6 lg:mb-0" : "bg-white border border-stone-200/80 hover:border-amber-600/30 hover:shadow-xl"}`}>
                  <Quote className={`absolute top-6 right-6 w-16 h-16 ${featured ? "text-amber-500/15" : "text-amber-600/10"}`} aria-hidden="true" />
                  <div className="relative">
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, j) => (<Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />))}
                    </div>
                    <p className={`font-serif leading-relaxed ${featured ? "text-white/95 text-lg md:text-xl" : "text-foreground/85 text-base md:text-lg"}`}>
                      &laquo;&nbsp;{t.text}&nbsp;&raquo;
                    </p>
                  </div>
                  <div className={`relative mt-10 pt-6 border-t flex items-start gap-4 ${featured ? "border-amber-500/20" : "border-stone-200"}`}>
                    <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-serif text-sm tracking-wider ${featured ? "bg-amber-500 text-zinc-950" : "bg-amber-600/10 text-amber-700 border border-amber-600/20"}`}>{initials}</div>
                    <div className="min-w-0">
                      <p className={`text-sm font-medium ${featured ? "text-white" : "text-foreground"}`}>{t.author}</p>
                      <p className={`text-xs uppercase tracking-[0.2em] mt-1 ${featured ? "text-amber-300/80" : "text-muted-foreground"}`}>{t.origin}</p>
                      <p className={`text-[10px] tracking-[0.3em] uppercase mt-1.5 ${featured ? "text-amber-300/90" : "text-amber-700/80"}`}>{t.experience}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="relative py-28 md:py-36 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 text-amber-500/[0.05] pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 text-amber-500/[0.05] pointer-events-none -rotate-12"><MoroccanOrnament className="w-full h-full" /></div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl leading-[1.05]">
            Votre soirée.<br /><span className="italic text-amber-200">À retenir, vous aussi.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
            Dites-nous quand vous serez à Marrakech. Nous dresserons une table pour vous.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="btn-testimonials-cta-whatsapp" data-cta-label="Get a Menu and Quote on WhatsApp" data-cta-position="testimonials_fr_final_cta" className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
              Demandez un devis sur WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/fr/contact" data-testid="btn-testimonials-cta" className="inline-flex items-center justify-center gap-3 px-12 py-5 border border-white/30 text-white hover:border-amber-300 hover:text-amber-200 uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
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
