import { motion, easeOut } from "framer-motion";
import { Link } from "wouter";
import {
  Star,
  ArrowRight,
  Check,
  X as XIcon,
  Clock,
  Users,
  MapPin,
  Languages,
  CalendarCheck,
  Leaf,
  BookOpen,
  Heart,
  Home,
  MessageCircle,
} from "lucide-react";
import { useSEO, breadcrumbSchema } from "@/lib/seo";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import { useABTest } from "@/lib/abtest";

const EXPERIMENT_ID = "cooking_class_faq_position";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const highlights = [
  "Cours de cuisine le mieux noté de Marrakech &mdash; des centaines d&rsquo;invités conquis",
  "Visite d&rsquo;un souk traditionnel pour choisir vos propres ingrédients",
  "Plats marocains authentiques : tajine, salades, thé à la menthe et plus",
  "Cours en petit groupe pour une attention personnalisée",
  "On s&rsquo;attable pour déguster le repas dans une vraie maison marocaine",
  "Repartez avec vos fiches recettes imprimées en français",
  "Menus végétariens, végans et sans gluten sur demande",
  "Ouvert tous les jours sauf le vendredi · sessions déjeuner ou dîner",
];

const itinerary = [
  { n: "01", time: "Rendez-vous", title: "On vous retrouve dans la médina", body: "Votre point de rendez-vous précis dans le centre de Marrakech vous sera communiqué dans le message de confirmation. Arrivez cinq minutes en avance : la marche jusqu&rsquo;au marché est courte." },
  { n: "02", time: "~15 min", title: "Visite du marché", body: "Parcourez un vrai souk avec le chef. Choisissez les légumes, les herbes et les épices de votre menu. Sentez chaque panier, goûtez tout ce qu&rsquo;on vous tend." },
  { n: "03", time: "~30 min", title: "Thé à la menthe & accueil", body: "Retour à la cuisine de la maison marocaine. Apprenez à verser le thé à la menthe dans les règles de l&rsquo;art, faites connaissance avec les autres invités, et passez en revue les plats que vous allez cuisiner." },
  { n: "04", time: "~2 h 45", title: "Cuisine, les mains dans la pâte", body: "Tajine, salades, technique du tajine en terre cuite. Étape par étape avec le chef. Chaque épice nommée, chaque méthode expliquée, chaque petit truc montré." },
  { n: "05", time: "~30 min", title: "On s&rsquo;attable", body: "Le meilleur moment. Vous dégustez le repas que vous avez préparé, tous ensemble, dans une salle à manger marocaine décontractée. Les recettes repartent avec vous." },
];

const dishes = [
  { name: "Tajine de poulet", note: "Citrons confits & olives", image: "/images/dish-chicken-tagine.jpg", body: "Poulet fermier, citron confit, olives vertes, safran, gingembre. La sauce réduit en un glaçage citronné qu&rsquo;on sauce avec le pain." },
  { name: "Couscous du vendredi", note: "Sept légumes", image: "/images/dish-couscous-lamb.jpg", body: "Semoule roulée à la main, agneau braisé doucement, sept légumes de saison empilés en pyramide. Le bouillon servi à table, à la façon des grand-mères." },
  { name: "Harira", note: "La soupe de Marrakech", image: "/images/dish-harira.jpg", body: "Lentilles, pois chiches, tomate, coriandre, un trait de citron. La soupe avec laquelle les Marocains rompent le jeûne : riche, parfumée, réconfortante." },
  { name: "Mrouzia", note: "Tajine d&rsquo;agneau sucré", image: "/images/dish-mrouzia.jpg", body: "Agneau caramélisé aux pruneaux, miel, cannelle, amandes torréfiées. Sucré-salé. Souvent la surprise du dîner." },
  { name: "Salades marocaines", note: "Zaalouk · Taktouka · Carotte", image: "/images/dish-mezze.jpg", body: "Trois petits bols qui ancrent chaque repas marocain : zaalouk d&rsquo;aubergine fumée, taktouka aux poivrons grillés, carotte au cumin. Le travail au couteau enseigné de zéro." },
  { name: "Cérémonie du thé", note: "Versé en hauteur", image: "/images/gallery-tea.png", body: "Trois services, trois infusions, un rituel. La mousse aérée, le parfum de la menthe qui monte, la conversation qui s&rsquo;installe. Toujours pour finir, jamais pressé." },
];

const dreamCards = [
  { icon: Home, title: "Votre cuisine, transformée.", body: "Le pot de safran qui dormait dans le placard depuis deux ans trouve enfin son usage. Vous commencez à faire la harira les dimanches d&rsquo;hiver. Le tajine quitte la case « occasion spéciale » pour devenir un mardi soir." },
  { icon: Heart, title: "Les amis se mettent à demander.", body: "&laquo; Attends, c&rsquo;est quoi ça ? &raquo; Le dîner où vous servez la mrouzia pour la première fois. L&rsquo;ami qui vous texte une semaine plus tard pour la recette. La fierté de raconter que vous avez appris ça dans une vraie cuisine de Marrakech." },
  { icon: BookOpen, title: "L&rsquo;histoire que vous racontez.", body: "Chaque fois que vous cuisinez un des plats, l&rsquo;odeur du cumin vous ramène au marché. Le chef qui vous montre comment le tajine retient la chaleur. La première gorgée de thé à la menthe. Les petites choses, gardées." },
];

const included = [
  "Le chef marocain comme guide et hôte",
  "Visite du marché traditionnel avec le chef",
  "Tous les ingrédients sourcés le matin même",
  "Tout le matériel de cuisine (tajines en terre, couteaux, prép)",
  "Session de cuisine pratique",
  "Déjeuner ou dîner complet (selon la session réservée)",
  "Cérémonie du thé à la menthe",
  "Fiches recettes imprimées en français",
  "Eau filtrée",
];

const excluded = [
  "Prise en charge à l&rsquo;hôtel (rendez-vous au point convenu)",
  "Boissons supplémentaires au-delà du thé et de l&rsquo;eau",
];

const faqs = [
  { q: "Combien de temps dure le cours ?", a: "Environ quatre heures, incluant la visite du marché, la session de cuisine, et le repas que vous dégustez ensemble." },
  { q: "Où se déroule le cours ?", a: "Dans une cuisine de maison traditionnelle au cœur de la médina, à quelques pas du point de rendez-vous communiqué à la confirmation. Authentique, vécu, à la façon dont les locaux cuisinent vraiment." },
  { q: "Quelle est la taille du groupe ?", a: "Un format petit groupe pour une attention personnalisée. La privatisation de la session entière est également possible &mdash; il suffit de nous le demander." },
  { q: "Je peux venir avec mes enfants ?", a: "Oui, à partir de 7 ans. Plus jeunes, la cuisine n&rsquo;est pas adaptée. Le chef ajuste le niveau d&rsquo;épices et donne aux enfants des tâches simples qu&rsquo;ils adorent." },
  { q: "Je suis végan / sans gluten / j&rsquo;ai des allergies.", a: "Tout est accommodé. Dites-le-nous à la réservation et le menu est adapté. La cuisine marocaine se prête merveilleusement bien à tous les régimes." },
  { q: "En quelle langue se passe le cours ?", a: "Français ou anglais, selon votre groupe. Le chef parle les deux. L&rsquo;arabe est la troisième option." },
  { q: "Il y a un repas à la fin ?", a: "Oui. Vous mangez tout ce que vous avez préparé, ensemble, dans une salle à manger marocaine décontractée." },
  { q: "Je peux annuler si mes plans changent ?", a: "Annulation gratuite jusqu&rsquo;à 24 heures avant. Au-delà, le chef a déjà fait le marché et la mise en place &mdash; 100 % de frais s&rsquo;appliquent." },
  { q: "Quand peut-on réserver ?", a: "La plupart des jours, déjeuner ou dîner. La cuisine est fermée le vendredi. On peut généralement vous caser dans les jours qui suivent ; les week-ends se remplissent plus vite." },
];

const bookingPrefill = `Bonjour La Table Marrakech ! Je souhaite réserver le cours de cuisine.

Date(s) envisagée(s) :
Nombre d'invités :
Session déjeuner ou dîner :
Quelque chose à savoir (régime, enfants, langue) :

Merci !`;

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

function Fleuron() {
  return (
    <div className="flex items-center justify-center gap-5 py-12 md:py-16" aria-hidden>
      <span className="block h-px w-16 md:w-28 bg-amber-600/25" />
      <svg width="10" height="10" viewBox="0 0 10 10" className="text-amber-600/55 flex-shrink-0">
        <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="currentColor" />
      </svg>
      <span className="block h-px w-16 md:w-28 bg-amber-600/25" />
    </div>
  );
}

export default function MarrakechCookingClassFR() {
  useSEO({
    title: "Cours de cuisine à Marrakech avec un chef local | La Table Marrakech",
    description: "Le cours de cuisine marocaine le mieux noté de Marrakech. Visite du souk, cuisine pratique avec un chef local dans une vraie cuisine de maison, puis on s'attable ensemble. Petit groupe, tous les jours, annulation gratuite.",
    canonical: "https://latablemarrakech.com/fr/marrakech-cooking-class",
    jsonLd: breadcrumbSchema([
      { name: "Accueil", url: "https://latablemarrakech.com/" },
      { name: "Cours de cuisine Marrakech", url: "https://latablemarrakech.com/fr/marrakech-cooking-class" },
    ]),
  });

  const faqVariant = useABTest(EXPERIMENT_ID);

  const faqSection = (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden" data-experiment-id={EXPERIMENT_ID} data-experiment-variant={faqVariant}>
      <div className="container mx-auto px-6 max-w-3xl relative">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">Questions fréquentes</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground">
            Les réponses, en clair.
          </h2>
        </motion.div>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div key={i} variants={fadeUp} className="bg-white border border-stone-200/80 hover:border-amber-600/30 hover:shadow-md transition-all p-6 md:p-7">
              <div className="flex items-baseline gap-4">
                <span className="text-[10px] tracking-[0.3em] uppercase text-amber-700/80 shrink-0 mt-1">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-serif text-base md:text-lg text-foreground mb-2" dangerouslySetInnerHTML={{ __html: f.q }} />
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: f.a }} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 md:pt-52 pb-16 md:pb-20 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-20 -right-24 w-80 h-80 text-amber-600/[0.07] pointer-events-none">
          <MoroccanOrnament className="w-full h-full" />
        </div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/[0.06] pointer-events-none rotate-45">
          <MoroccanOrnament className="w-full h-full" />
        </div>

        <div className="relative container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-4xl mx-auto">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }} className="text-xs md:text-sm tracking-[0.4em] uppercase text-amber-700 mb-6">
              Cours de cuisine &middot; Marrakech
            </motion.p>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.35, duration: 0.7, ease: easeOut }} className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-px bg-amber-600/40" />
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <div className="w-16 h-px bg-amber-600/40" />
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1, ease: easeOut }} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.04] text-foreground">
              Le cours de cuisine le plus aimé <span className="italic text-amber-700">de Marrakech.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9 }} className="text-base md:text-lg text-muted-foreground mt-7 max-w-2xl mx-auto leading-relaxed italic">
              Un cours en petit groupe, les mains dans la pâte, avec un chef marocain local. Visite du souk, trois plats traditionnels cuisinés dans une vraie cuisine de maison, puis on s&rsquo;attable ensemble.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.9 }} className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs md:text-sm text-foreground/75">
              <span className="inline-flex items-center gap-2"><Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> 4,9 &middot; 200+ invités</span>
              <span className="text-stone-300">·</span>
              <span className="inline-flex items-center gap-1.5"><CalendarCheck className="w-3.5 h-3.5 text-amber-700" strokeWidth={1.75} /> Annulation gratuite 24h avant</span>
              <span className="text-stone-300">·</span>
              <span className="inline-flex items-center gap-1.5"><Languages className="w-3.5 h-3.5 text-amber-700" strokeWidth={1.75} /> FR &middot; EN &middot; AR</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.9 }} className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a href={createWhatsAppUrl(bookingPrefill)} target="_blank" rel="noopener noreferrer" data-testid="cooking-fr-hero-whatsapp" data-cta-label="Demander un devis sur WhatsApp" data-cta-position="cooking_fr_ads_hero" data-experiment-id={EXPERIMENT_ID} data-experiment-variant={faqVariant} className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-colors">
                Vérifier la disponibilité <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link href="/contact" data-testid="cooking-fr-hero-form" className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-foreground/80 text-foreground hover:border-amber-600 hover:text-amber-700 uppercase tracking-[0.22em] text-xs md:text-sm transition-colors">
                Envoyez vos dates
              </Link>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15, duration: 0.9 }} className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-muted-foreground mt-6">
              Réservation directe &middot; Annulation gratuite &middot; Confirmation dans l&rsquo;heure
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── KEY FACTS BAND ──────────────────────────────────────────────── */}
      <section className="relative py-8 md:py-10 bg-zinc-950 text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6 text-sm">
            <div className="flex items-center gap-3"><Clock className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={1.75} /><div><p className="text-[10px] tracking-[0.3em] uppercase text-amber-400/80">Durée</p><p className="text-white/90">~ 4 heures</p></div></div>
            <div className="flex items-center gap-3"><Users className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={1.75} /><div><p className="text-[10px] tracking-[0.3em] uppercase text-amber-400/80">Groupe</p><p className="text-white/90">Petit groupe</p></div></div>
            <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={1.75} /><div><p className="text-[10px] tracking-[0.3em] uppercase text-amber-400/80">Où</p><p className="text-white/90">Cuisine en médina</p></div></div>
            <div className="flex items-center gap-3"><Leaf className="w-4 h-4 text-amber-400 shrink-0" strokeWidth={1.75} /><div><p className="text-[10px] tracking-[0.3em] uppercase text-amber-400/80">Régime</p><p className="text-white/90">Tous accommodés</p></div></div>
          </div>
        </div>
      </section>

      {/* ── ABOUT + HIGHLIGHTS ──────────────────────────────────────────── */}
      <section className="relative pt-20 md:pt-24 pb-16 md:pb-20 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="container mx-auto px-6 max-w-6xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp}>
              <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">À propos du cours</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground mb-6">
                La cuisine marocaine dont les voyageurs <span className="italic text-amber-700">ne cessent de parler.</span>
              </h2>
              <div className="w-12 h-px bg-amber-600/40 mb-8" />
              <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
                <p>Ce n&rsquo;est pas une démonstration de cuisine d&rsquo;hôtel léchée. C&rsquo;est une vraie cuisine de maison marocaine dans la médina, tenue par un chef local qui enseigne aux invités depuis des années &mdash; et toujours noté au sommet par tous ceux qui sont passés par là.</p>
                <p>Vous retrouvez le chef dans le centre de Marrakech, parcourez un souk en activité pour choisir vos ingrédients, puis filez en cuisine pour la cérémonie du thé à la menthe d&rsquo;accueil. S&rsquo;ensuivent trois heures de cuisine pratique &mdash; tajine, salades, le travail des épices en couches qu&rsquo;aucun livre de recettes ne capture vraiment. À la fin, on s&rsquo;attable avec les autres invités pour déguster le repas qu&rsquo;on a préparé.</p>
                <p>Petit groupe, atmosphère chaleureuse, recettes à emporter. Parfait pour les couples, les familles avec enfants plus grands, les voyageurs solo, et toute personne qui préfère sauter le menu touristique pour apprendre la vraie chose.</p>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="space-y-6">
              <div className="overflow-hidden border border-stone-200/80 aspect-[4/5]">
                <img src="/images/dish-chicken-tagine.jpg" alt="Tajine de poulet appris pendant un cours de cuisine à Marrakech" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white border border-stone-200/80 p-7 md:p-8 shadow-sm">
                <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-5">Points forts</p>
                <ul className="space-y-3">
                  {highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/85 leading-relaxed">
                      <Check className="w-4 h-4 text-amber-700 shrink-0 mt-1" strokeWidth={2} />
                      <span dangerouslySetInnerHTML={{ __html: h }} />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT YOU'LL COOK ────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-background overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none -rotate-12"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="container mx-auto px-6 max-w-6xl relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="text-center mb-14 md:mb-16 max-w-3xl mx-auto">
            <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">Ce que vous cuisinerez</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground">
              Trois plats. Ceux que vous referez pendant des années.
            </h2>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed italic">
              Le menu change selon la saison et l&rsquo;humeur du chef au marché. La plupart du temps, vous en cuisinerez trois &mdash; un plat principal, un accompagnement, une finale.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {dishes.map((d, i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="group bg-white border border-stone-200/80 hover:border-amber-600/40 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={d.image}
                    alt={d.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.6, ease: easeOut }}
                  />
                </div>
                <div className="p-6 md:p-7 flex-1 flex flex-col">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700/80 mb-2">{d.note}</p>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">{d.name}</h3>
                  <div className="w-8 h-px bg-amber-600/40 mb-3" />
                  <p className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: d.body }} />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ITINERARY ───────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="text-center mb-14 md:mb-20">
            <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">Le déroulé</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground">
              Cinq étapes, du souk à l&rsquo;assiette.
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="space-y-6 md:space-y-8">
            {itinerary.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="grid grid-cols-[auto_1fr] md:grid-cols-[6rem_auto_1fr] gap-x-5 md:gap-x-8 gap-y-3 items-baseline pb-6 md:pb-8 border-b border-stone-200/70 last:border-b-0">
                <span className="font-serif text-3xl md:text-4xl text-amber-700/30 leading-none">{step.n}</span>
                <span className="hidden md:inline-block text-[10px] tracking-[0.3em] uppercase text-amber-700/80 md:pt-2 whitespace-nowrap">{step.time}</span>
                <div className="col-span-2 md:col-span-1">
                  <p className="md:hidden text-[10px] tracking-[0.3em] uppercase text-amber-700/80 mb-2">{step.time}</p>
                  <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2" dangerouslySetInnerHTML={{ __html: step.title }} />
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: step.body }} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── AFTER THE CLASS ─────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/5 pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 text-amber-600/5 pointer-events-none rotate-45"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="container mx-auto px-6 max-w-5xl relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="text-center mb-14 md:mb-16 max-w-3xl mx-auto">
            <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">Après le cours</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground">
              Ce qui change une fois <span className="italic text-amber-700">rentré chez vous.</span>
            </h2>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed italic">
              Un cours de cuisine n&rsquo;est pas qu&rsquo;un cours. Le meilleur souvenir de Marrakech ne traîne pas sur une étagère &mdash; il revient dans votre assiette toutes les deux ou trois semaines.
            </p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {dreamCards.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div key={i} variants={fadeUp} className="bg-white border border-stone-200/80 hover:border-amber-600/30 hover:shadow-xl p-8 md:p-10 transition-all duration-300">
                  <Icon className="w-6 h-6 text-amber-700 mb-5" strokeWidth={1.5} />
                  <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700/80 mb-3">Chapitre {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="font-serif text-2xl md:text-3xl leading-tight mb-4" dangerouslySetInnerHTML={{ __html: c.title }} />
                  <div className="w-10 h-px bg-amber-600/40 mb-5" />
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: c.body }} />
                </motion.div>
              );
            })}
          </motion.div>

          <Fleuron />

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-2xl mx-auto">
            <p className="font-serif italic text-xl md:text-2xl text-foreground/85 leading-relaxed">
              &laquo; Le cours a duré quatre heures. Le tajine d&rsquo;agneau est sur notre table presque tous les mois depuis. Le meilleur souvenir qu&rsquo;on ait jamais ramené d&rsquo;un voyage. &raquo;
            </p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700/80 mt-6">
              Invitée passée &middot; cours de cuisine &middot; Septembre
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── INCLUDED / NOT INCLUDED ─────────────────────────────────────── */}
      <section className="relative py-20 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-white border border-stone-200/80 p-8 md:p-10 shadow-sm">
              <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-5">Inclus</p>
              <h3 className="font-serif text-2xl md:text-3xl leading-snug mb-6">
                Tout ce qui est <span className="italic text-amber-700">compris.</span>
              </h3>
              <ul className="space-y-3">
                {included.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base text-foreground/85 leading-relaxed">
                    <Check className="w-4 h-4 text-amber-700 shrink-0 mt-1" strokeWidth={2} />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="p-8 md:p-10 md:py-12">
              <p className="text-[10px] tracking-[0.4em] uppercase text-stone-500 mb-5">Non inclus</p>
              <h3 className="font-serif text-2xl md:text-3xl leading-snug mb-6 text-foreground/70">
                Ce que vous gérez vous-même.
              </h3>
              <ul className="space-y-3">
                {excluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm md:text-base text-muted-foreground leading-relaxed">
                    <XIcon className="w-4 h-4 text-stone-400 shrink-0 mt-1" strokeWidth={2} />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </li>
                ))}
              </ul>
              <div className="w-10 h-px bg-stone-300 my-7" />
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                Annulation gratuite jusqu&rsquo;à 24 heures avant. Au-delà, le chef a déjà fait le marché &mdash; 100 % de frais s&rsquo;appliquent. Honnête, sans surprises.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BOOKING CARD ────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-28 bg-background overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 text-amber-600/[0.06] pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>

        <div className="container mx-auto px-6 max-w-4xl relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="text-center mb-10">
            <p className="text-xs tracking-[0.4em] uppercase text-amber-700 mb-4">Réservez votre place</p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] text-foreground">
              Choisissez une date. On s&rsquo;occupe du reste.
            </h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={fadeUp} className="bg-white border border-amber-600/40 shadow-2xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute -bottom-16 -right-16 w-56 h-56 text-amber-600/[0.06] pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-4">Comment ça marche</p>
                <ol className="space-y-4 mb-6">
                  <li className="flex items-baseline gap-4 text-sm md:text-base text-foreground/85 leading-relaxed">
                    <span className="font-serif text-amber-700 text-base shrink-0">01.</span>
                    <span>Envoyez-nous un message avec vos dates et le nombre d&rsquo;invités.</span>
                  </li>
                  <li className="flex items-baseline gap-4 text-sm md:text-base text-foreground/85 leading-relaxed">
                    <span className="font-serif text-amber-700 text-base shrink-0">02.</span>
                    <span>Nous confirmons la disponibilité et le point de rendez-vous dans l&rsquo;heure.</span>
                  </li>
                  <li className="flex items-baseline gap-4 text-sm md:text-base text-foreground/85 leading-relaxed">
                    <span className="font-serif text-amber-700 text-base shrink-0">03.</span>
                    <span>Vous arrivez, vous cuisinez, vous dégustez. Les recettes rentrent avec vous.</span>
                  </li>
                </ol>
                <div className="w-12 h-px bg-amber-600/40 my-6" />
                <div className="space-y-3 text-sm">
                  <div className="flex items-baseline gap-3 text-foreground/80">
                    <CalendarCheck className="w-4 h-4 text-amber-700 shrink-0" strokeWidth={1.75} />
                    <span>Annulation gratuite jusqu&rsquo;à 24h avant</span>
                  </div>
                  <div className="flex items-baseline gap-3 text-foreground/80">
                    <Check className="w-4 h-4 text-amber-700 shrink-0" strokeWidth={2} />
                    <span>Pas d&rsquo;acompte avant que vous confirmiez le menu</span>
                  </div>
                  <div className="flex items-baseline gap-3 text-foreground/80">
                    <MessageCircle className="w-4 h-4 text-amber-700 shrink-0" strokeWidth={1.75} />
                    <span>Réponses dans l&rsquo;heure, presque tous les jours</span>
                  </div>
                </div>
              </div>

              <div className="md:border-l md:border-stone-200/80 md:pl-12">
                <p className="text-[10px] tracking-[0.4em] uppercase text-amber-700 mb-4">Lancez la conversation</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  Cliquez ci-dessous pour ouvrir WhatsApp avec un message déjà prêt. Modifiez-le, envoyez-le, et nous vous revenons avec les disponibilités.
                </p>

                <div className="bg-stone-50 border border-stone-200/80 p-5 mb-6 text-xs text-foreground/75 leading-relaxed whitespace-pre-line font-mono">{bookingPrefill}</div>

                <a
                  href={createWhatsAppUrl(bookingPrefill)}
                  target="_blank" rel="noopener noreferrer"
                  data-testid="cooking-fr-booking-whatsapp"
                  data-cta-label="Demander un devis sur WhatsApp"
                  data-cta-position="cooking_fr_ads_booking_card"
                  data-experiment-id={EXPERIMENT_ID}
                  data-experiment-variant={faqVariant}
                  className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-colors"
                >
                  Ouvrir WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mt-4 text-center">
                  Ou remplissez <Link href="/contact" className="text-amber-700 hover:underline">notre formulaire</Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ────────────────────────────────────────────────── */}
      <section className="relative py-20 md:py-24 bg-gradient-to-b from-stone-50 via-background to-stone-50 overflow-hidden">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="flex justify-center gap-1.5 mb-6">
              {Array.from({ length: 5 }).map((_, j) => (<Star key={j} className="w-4 h-4 fill-amber-500 text-amber-500" />))}
            </div>
            <p className="font-serif italic text-2xl md:text-3xl text-foreground/90 leading-relaxed">
              &laquo; J&rsquo;ai fait le cours un mardi pluvieux. Quatre personnes, petit groupe. On a fait la harira, le tajine de poulet aux citrons confits, et un dessert dont j&rsquo;ai déjà oublié le nom. J&rsquo;ai refait le tajine deux fois chez moi depuis. &raquo;
            </p>
            <div className="mt-8">
              <p className="text-sm font-medium text-foreground">Priya S.</p>
              <p className="text-[10px] tracking-[0.3em] uppercase text-amber-700/80 mt-1">Toronto &middot; Cours de cuisine</p>
            </div>
            <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-amber-700/80 mt-10">
              Rejoignez les 200+ invités notés <span className="text-foreground">4,9 &star;</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ (control: before CTA) ───────────────────────────────────── */}
      {faqVariant === "control" && faqSection}

      {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
      <section className="relative py-28 md:py-36 bg-zinc-950 text-white overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 text-amber-500/[0.05] pointer-events-none"><MoroccanOrnament className="w-full h-full" /></div>
        <div className="absolute -bottom-24 -right-24 w-80 h-80 text-amber-500/[0.05] pointer-events-none -rotate-12"><MoroccanOrnament className="w-full h-full" /></div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <motion.h2 variants={fadeUp} className="font-serif text-4xl md:text-6xl leading-[1.05]">
            Ramenez le Maroc <span className="italic text-amber-200">chez vous.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
            Quatre heures qui changent votre façon de cuisiner pour le reste de votre vie. Dites-nous vos dates &mdash; on répond dans l&rsquo;heure.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href={createWhatsAppUrl(bookingPrefill)} target="_blank" rel="noopener noreferrer" data-testid="cooking-fr-final-whatsapp" data-cta-label="Demander un devis sur WhatsApp" data-cta-position="cooking_fr_ads_final_cta" data-experiment-id={EXPERIMENT_ID} data-experiment-variant={faqVariant} className="group inline-flex items-center justify-center gap-3 px-12 py-5 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
              Vérifier la disponibilité sur WhatsApp <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link href="/contact" data-testid="cooking-fr-final-form" data-experiment-id={EXPERIMENT_ID} data-experiment-variant={faqVariant} className="inline-flex items-center justify-center gap-3 px-12 py-5 border border-white/30 text-white hover:border-amber-300 hover:text-amber-200 uppercase tracking-[0.22em] text-xs md:text-sm transition-all duration-300">
              Envoyez vos dates
            </Link>
          </motion.div>
          <motion.p variants={fadeUp} className="text-white/50 text-xs tracking-[0.2em] uppercase mt-8">
            Annulation gratuite 24h avant &middot; Confirmation dans l&rsquo;heure
          </motion.p>
        </motion.div>
      </section>

      {/* ── FAQ (variant: after CTA) ────────────────────────────────────── */}
      {faqVariant === "variant" && faqSection}

      {/* Mobile-only spacer for sticky CTA */}
      <div className="h-20 md:hidden" aria-hidden />

      {/* ── STICKY MOBILE CTA ───────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-zinc-950 p-4 border-t border-zinc-800">
        <a
          href={createWhatsAppUrl(bookingPrefill)}
          target="_blank" rel="noopener noreferrer"
          data-testid="cooking-fr-mobile-sticky"
          data-cta-label="Demander un devis sur WhatsApp"
          data-cta-position="cooking_fr_ads_mobile_sticky"
          data-experiment-id={EXPERIMENT_ID}
          data-experiment-variant={faqVariant}
          className="block w-full text-center py-4 bg-amber-600 hover:bg-amber-500 text-white uppercase tracking-[0.2em] text-sm transition-colors"
        >
          Réserver sur WhatsApp
        </a>
      </div>
    </>
  );
}
