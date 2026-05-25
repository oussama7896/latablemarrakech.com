import { motion, easeOut } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star } from "lucide-react";
import { useSEO, breadcrumbSchema } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const experiences = [
  { title: "Dîner Romantique", slug: "romantic_dinner", description: "Une table dressée juste pour vous deux — fleurs, bougies, service lent, un menu construit autour de ce que vous aimez. On a fait des premiers rendez-vous, des anniversaires, des demandes en mariage, et une répétition de mariage dans une cour de riad. Dites-nous quel genre de soirée vous voulez.", detail: "Pour 2 · À partir de 120€/personne", image: "/images/romantic-dinner.png" },
  { title: "Chef Privé en Villa", slug: "villa_chef", description: "Confiez-nous la cuisine de votre villa pour la soirée. On arrive avec tout, on cuisine toute la nuit, et on laisse la cuisine plus propre qu'on l'a trouvée. Vous et votre groupe mangez comme dans un restaurant — sauf que personne n'a eu à quitter la piscine.", detail: "À partir de 4 invités · À partir de 90€/personne", image: "/images/villa-chef.png" },
  { title: "Dîner sur Rooftop", slug: "rooftop_dinner", description: "Marrakech est plus belle vue d'un rooftop, après la tombée du jour, quand les lumières ambrées de la médina commencent à clignoter. On dresse la table, on allume les lanternes, et on sert le dîner plat par plat pendant que la ville se calme.", detail: "Pour 2 · À partir de 130€/personne", image: "/images/hero-villa-terrace.jpg" },
  { title: "Dîner en Famille", slug: "family_dining", description: "Une longue table, beaucoup de plats, beaucoup de petits bols. Mezzés, trois ou quatre tajines au milieu, couscous, pâtisseries. Le genre de repas où on se ressert sans hésiter.", detail: "À partir de 6 invités · À partir de 75€/personne", image: "/images/moroccan-experience.png" },
  { title: "Petit-déjeuner d'Exception", slug: "luxury_breakfast", description: "Msemen et beghrir chauds sortis de la poêle, miel local, fromages frais, fruits cueillis le matin, café moulu à votre table. Ralentissez. Mangez pendant une heure. La médina peut attendre.", detail: "Pour 2 · À partir de 45€/personne", image: "/images/luxury-breakfast.png" },
  { title: "Anniversaire Privé", slug: "birthday_event", description: "Un gâteau sur mesure. Un menu construit autour de la personne du soir. La table dressée pour elle, pas pour la salle. Dites-nous ce qu'elle aime — on gère le reste.", detail: "À partir de 4 invités · À partir de 110€/personne", image: "/images/hero-riad.png" },
  { title: "Expérience Marocaine Traditionnelle", slug: "moroccan_experience", description: "La cérémonie complète, dans le bon ordre : harira pour commencer, bastilla, tajine d'agneau, couscous, thé à la menthe versé en hauteur, chebakia pour finir. La version que votre ami marocain cuisinerait pour vous, pas celle du menu touristique.", detail: "Pour 2 · À partir de 85€/personne", image: "/images/dish-couscous-lamb.jpg" },
  { title: "Cours de Cuisine", slug: "cooking_class", description: "Une demi-journée en cuisine avec le chef. On commence au souk en choisissant épices et produits, on rentre, on cuisine un repas marocain complet, puis on mange ce qu'on a fait. Vous repartez en sachant faire un tajine de zéro.", detail: "Pour 2 · À partir de 65€/personne", image: "/images/dish-chicken-tagine.jpg" },
  { title: "Dîner dans le Désert", slug: "desert_dining", description: "À une heure de Marrakech, la ville disparaît et les dunes de l'Agafay commencent. On dresse une table sur le sable, on allume les lanternes berbères, et un petit groupe joue du Gnawa au coucher du soleil. Le dîner est nomade — grillé, fumé, lent.", detail: "Pour 2 · À partir de 160€/personne", image: "/images/desert-dining.png" },
  { title: "Traiteur d'Événements", slug: "event_catering", description: "Mariages, dîners d'entreprise, privatisations de riad, lancements de marque. Dites-nous la date, le nombre, l'ambiance. On vous renvoie une proposition sous 48 heures.", detail: "20+ invités · Devis sur demande", image: "/images/experiences-bg.jpg" },
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

export default function ExperiencesFR() {
  useSEO({
    title: "Dix façons de bien manger à Marrakech — La Table Marrakech",
    description: "Dîners romantiques, chefs en villa, tables sur rooftop, cours de cuisine, dîners dans le désert et plus. Choisissez votre soirée — ou écrivez-nous sur WhatsApp, on vous aide à choisir.",
    canonical: "https://latablemarrakech.com/fr/experiences",
    jsonLd: breadcrumbSchema([
      { name: "Accueil", url: "https://latablemarrakech.com/" },
      { name: "Expériences", url: "https://latablemarrakech.com/fr/experiences" },
    ]),
  });

  return (
    <>
      <section className="relative pt-40 md:pt-52 pb-20 md:pb-24 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-20 -right-24 w-80 h-80 text-amber-600/[0.07] pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/[0.06] pointer-events-none rotate-45"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="relative container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-4xl mx-auto">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }} className="text-xs md:text-sm tracking-[0.4em] uppercase text-amber-700 mb-6">Dix façons de bien manger</motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.7, ease: easeOut }} className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-px bg-amber-600/40" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <div className="w-16 h-px bg-amber-600/40" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1, ease: easeOut }} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
              Choisissez la soirée <span className="italic text-amber-700">qui vous ressemble.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }} className="text-base md:text-lg text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed italic">
              Ou écrivez-nous, on vous en suggère une. La plupart des invités changent d'avis après qu'on en a parlé, de toute façon.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="pt-12 md:pt-16 pb-28 md:pb-32 bg-gradient-to-b from-stone-50 via-background to-stone-50 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/5 pointer-events-none rotate-45"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="container mx-auto px-6 relative">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-5xl mx-auto">
            {experiences.map((exp, i) => {
              const reverse = i % 2 === 1;
              const isLast = i === experiences.length - 1;
              return (
                <motion.article key={exp.slug} variants={fadeUp} data-testid={`experience-${exp.slug}`} className={`relative ${reverse ? "md:ml-auto md:pl-12 md:text-left md:max-w-3xl" : "md:mr-auto md:pr-12 md:max-w-3xl"} py-12 md:py-16`}>
                  <span aria-hidden className={`absolute top-2 md:top-6 ${reverse ? "right-0 md:-right-4" : "left-0 md:-left-4"} font-serif text-[6rem] md:text-[10rem] leading-[0.85] text-amber-700/[0.10] select-none pointer-events-none`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative">
                    <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700/60 mb-3">N° {String(i + 1).padStart(2, "0")} / {String(experiences.length).padStart(2, "0")}</p>
                    <p className="text-xs tracking-[0.3em] uppercase text-amber-700 mb-4">{exp.detail}</p>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.05] text-foreground mb-5">{exp.title}</h2>
                    <div className="w-12 h-px bg-amber-600/40 mb-6" />
                    <p className="text-muted-foreground leading-relaxed text-base md:text-lg max-w-2xl">{exp.description}</p>
                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                      <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid={`btn-whatsapp-${exp.slug}`} data-cta-label="Get a Menu and Quote on WhatsApp" data-cta-position={`experience_fr_${exp.slug}`} className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.2em] text-xs transition-colors">
                        Demandez sur WhatsApp <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </a>
                      <Link href="/fr/contact" data-testid={`btn-book-${exp.slug}`} className="inline-flex items-center justify-center gap-3 px-7 py-4 border border-foreground/80 text-foreground hover:border-amber-600 hover:text-amber-700 uppercase tracking-[0.2em] text-xs transition-colors">
                        Réserver cette soirée
                      </Link>
                    </div>
                  </div>
                  {!isLast && (
                    <div aria-hidden className="flex items-center justify-center gap-5 pt-16 md:pt-20">
                      <span className="block h-px w-20 md:w-28 bg-amber-600/20" />
                      <svg width="10" height="10" viewBox="0 0 10 10" className="text-amber-600/50 flex-shrink-0"><path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" /></svg>
                      <span className="block h-px w-20 md:w-28 bg-amber-600/20" />
                    </div>
                  )}
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="relative py-28 md:py-36 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 text-amber-500/[0.05] pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 text-amber-500/[0.05] pointer-events-none -rotate-12"><MoroccanOrnament className="w-full h-full" /></div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl leading-[1.05]">Encore en train de <span className="italic text-amber-200">choisir ?</span></motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">Envoyez-nous un WhatsApp avec vos dates et le nombre d'invités. On vous suggère la bonne soirée en deux messages.</motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="btn-experiences-final-whatsapp" data-cta-label="Get a Menu and Quote on WhatsApp" data-cta-position="experiences_fr_final_cta" className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
              Demandez un devis sur WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/fr/contact" data-testid="btn-experiences-final-form" className="inline-flex items-center justify-center gap-3 px-12 py-5 border border-white/30 text-white hover:border-amber-300 hover:text-amber-200 uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">Envoyez vos détails</Link>
          </motion.div>
          <motion.p variants={fadeUp} className="text-white/50 text-xs tracking-[0.2em] uppercase mt-8">Pas d'acompte avant que vous confirmiez le menu</motion.p>
        </motion.div>
      </section>
    </>
  );
}
