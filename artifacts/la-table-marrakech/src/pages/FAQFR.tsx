import { motion, easeOut } from "framer-motion";
import { useState } from "react";
import { ChevronDown, Star, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useSEO, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

const faqs = [
  { question: "Combien de temps à l'avance dois-je réserver ?", answer: "Nous recommandons de réserver au moins 48 à 72 heures à l'avance pour garantir la disponibilité et permettre au chef de sourcer les meilleurs ingrédients de saison. Pour les occasions spéciales (anniversaires, grands événements), une semaine ou plus est idéale." },
  { question: "Dans quels quartiers de Marrakech intervenez-vous ?", answer: "Nous venons à vous, où que vous séjourniez : villas, riads, Airbnb, terrasses privées, rooftops à Marrakech et alentours. Nous proposons aussi l'expérience dans le désert d'Agafay. Si vous avez un doute, demandez-nous et nous confirmons." },
  { question: "Les régimes alimentaires et allergies sont-ils accommodés ?", answer: "Absolument. Notre chef adapte chaque menu personnellement. Détaillez vos allergies, intolérances ou préférences sur le formulaire de réservation. Nous accommodons végétarien, végan, sans gluten, halal et toutes autres demandes." },
  { question: "Qu'est-ce qui est inclus dans le prix ?", answer: "Les prix commencent à partir de 85€ par personne. Le tarif final dépend de la taille du groupe, du menu choisi et des demandes particulières. Le prix comprend le temps du chef, la conception du menu, les ingrédients sourcés le matin même, la préparation, la cuisson, le service et le rangement." },
  { question: "Comment se passe la réservation ?", answer: "Soumettez votre formulaire de réservation ou contactez-nous sur WhatsApp. Nous vous recontactons personnellement sous 24 heures pour confirmer les détails, finaliser le menu et répondre à toutes vos questions. Un acompte peut être demandé pour les grosses réservations." },
  { question: "Faut-il une cuisine entièrement équipée ?", answer: "La plupart des cuisines de villas et riads à Marrakech sont bien équipées. Notre chef évalue la cuisine à son arrivée. Pour des cuisines plus basiques, nous adaptons le menu — certains des plats les plus spectaculaires nécessitent très peu de matériel." },
  { question: "Le chef peut-il sourcer des ingrédients marocains à emporter ?", answer: "Oui. Beaucoup d'invités nous demandent de préparer une sélection d'épices, huile d'argan, eau de rose et citrons confits à emporter en cadeau ou pour leur propre cuisine. Demandez-le simplement dans votre message et nous emballerons tout joliment." },
  { question: "L'expérience dans le désert est-elle disponible toute l'année ?", answer: "Oui, mais nous recommandons le printemps (mars à mai) et l'automne (septembre à novembre) pour les températures les plus confortables. Les soirées d'hiver dans le désert peuvent surprendre par leur fraîcheur — nous fournissons couvertures et plaids. L'été est possible avec la bonne préparation." },
  { question: "Quelles langues parle le chef ?", answer: "Notre chef parle couramment arabe, darija (arabe marocain), français et anglais. La communication avant, pendant et après le dîner est chaleureuse et personnelle." },
  { question: "Puis-je demander un menu ou des plats spécifiques ?", answer: "Bien sûr. Bien que le chef propose toujours un menu de saison basé sur ce qu'il y a de meilleur au marché, vous pouvez demander des plats spécifiques, des spécialités régionales ou une cuisine particulière. Le menu est toujours une collaboration." },
  { question: "Que se passe-t-il si je dois annuler ou modifier ma réservation ?", answer: "Nous comprenons que les plans changent. Contactez-nous le plus tôt possible. Les annulations faites plus de 48 heures à l'avance reçoivent un remboursement intégral de l'acompte. Les annulations tardives sont traitées au cas par cas." },
  { question: "La Table Marrakech convient-elle aux groupes ?", answer: "Oui. Nous accueillons des groupes de toutes tailles, du dîner intime pour deux à la célébration pour trente personnes ou plus. Pour les grands événements, contactez-nous directement pour discuter logistique, équipe et options de menu." },
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

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp} data-testid={`faq-item-${index}`} className={`bg-white border transition-all duration-300 ${open ? "border-amber-600/40 shadow-lg" : "border-stone-200/80 hover:border-amber-600/30 hover:shadow-md"}`}>
      <button onClick={() => setOpen(!open)} className="w-full text-left p-6 md:p-7 flex items-start justify-between gap-5" data-testid={`faq-toggle-${index}`} aria-expanded={open}>
        <span className="flex items-baseline gap-4 md:gap-5 flex-1 min-w-0">
          <span className="text-[10px] tracking-[0.3em] uppercase text-amber-700/80 shrink-0 mt-1">{String(index + 1).padStart(2, "0")}</span>
          <span className="font-serif text-lg md:text-xl text-foreground leading-snug">{faq.question}</span>
        </span>
        <ChevronDown className={`w-5 h-5 text-amber-700 shrink-0 mt-1.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.35, ease: easeOut }} className="overflow-hidden">
        <div className="px-6 md:px-7 pb-7 md:pb-8 md:pl-[5.25rem]">
          <div className="w-10 h-px bg-amber-600/40 mb-5" />
          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQFR() {
  useSEO({
    title: "Questions fréquentes — La Table Marrakech",
    description: "Tout ce que vous devez savoir pour réserver un chef privé à Marrakech. FAQ sur les régimes, lieux, prix, processus de réservation et plus.",
    canonical: "https://latablemarrakech.com/fr/faq",
    jsonLd: [
      breadcrumbSchema([
        { name: "Accueil", url: "https://latablemarrakech.com/" },
        { name: "FAQ", url: "https://latablemarrakech.com/fr/faq" },
      ]),
      faqSchema(faqs.map((f) => ({ question: f.question, answer: f.answer }))),
    ],
  });

  return (
    <>
      <section className="relative pt-40 md:pt-52 pb-20 md:pb-28 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-20 -right-24 w-80 h-80 text-amber-600/[0.07] pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/[0.06] pointer-events-none rotate-45"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="relative container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-4xl mx-auto">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }} className="text-xs md:text-sm tracking-[0.4em] uppercase text-amber-700 mb-6">Questions fréquentes</motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.7, ease: easeOut }} className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-px bg-amber-600/40" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <div className="w-16 h-px bg-amber-600/40" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1, ease: easeOut }} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-foreground">
              Tout ce que vous vouliez <span className="italic text-amber-700">demander.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }} className="text-base md:text-lg text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed italic">
              Douze réponses sur la réservation d'un chef privé à Marrakech. Si la vôtre n'est pas là, écrivez-nous : on répond dans l'heure.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="pt-8 md:pt-12 pb-28 md:pb-32 bg-gradient-to-b from-stone-50 via-background to-stone-50 relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/5 pointer-events-none rotate-45"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="container mx-auto px-6 relative max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-4 md:space-y-5">
            {faqs.map((faq, i) => (<FAQItem key={i} faq={faq} index={i} />))}
          </motion.div>
        </div>
      </section>

      <section className="relative py-28 md:py-36 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 text-amber-500/[0.05] pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 text-amber-500/[0.05] pointer-events-none -rotate-12"><MoroccanOrnament className="w-full h-full" /></div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl leading-[1.05]">Encore une <span className="italic text-amber-200">question ?</span></motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">Écrivez-nous sur WhatsApp ou envoyez les détails. On répond dans l'heure, en journée.</motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-testid="btn-faq-whatsapp" data-cta-label="Request a quote on WhatsApp" data-cta-position="faq_fr_final_cta" className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
              Posez votre question <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/fr/contact" data-testid="btn-faq-reserve" className="inline-flex items-center justify-center gap-3 px-12 py-5 border border-white/30 text-white hover:border-amber-300 hover:text-amber-200 uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">Envoyez vos détails</Link>
          </motion.div>
          <motion.p variants={fadeUp} className="text-white/50 text-xs tracking-[0.2em] uppercase mt-8">Pas d'acompte avant que vous confirmiez le menu</motion.p>
        </motion.div>
      </section>
    </>
  );
}
