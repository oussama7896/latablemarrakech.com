import { motion, easeOut, easeInOut, backOut } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const experiences = [
  {
    title: "Romantic Dinner",
    slug: "romantic_dinner",
    description: "A table set just for the two of you — flowers, candles, slow service, a menu built around what you like. We've done first dates, anniversaries, proposals, and one wedding rehearsal in a riad courtyard. Tell us what kind of night you want.",
    detail: "For 2 · From €120/person",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=720&q=75",
  },
  {
    title: "Villa Private Chef",
    slug: "villa_chef",
    description: "Hand us your villa kitchen for the evening. We arrive with everything, cook through the night, and leave the kitchen cleaner than we found it. You and your group eat like you booked a restaurant — except no one had to leave the pool.",
    detail: "From 4 guests · From €90/person",
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=720&q=75",
  },
  {
    title: "Rooftop Dinner",
    slug: "rooftop_dinner",
    description: "Marrakech is best from a rooftop, after dark, when the amber lights of the medina start to flicker. We set the table, light the lanterns, and serve dinner course by course as the city quiets down.",
    detail: "For 2 · From €130/person",
    image: "https://images.pexels.com/photos/28730586/pexels-photo-28730586.jpeg?auto=compress&cs=tinysrgb&w=720&q=75",
  },
  {
    title: "Family Dining",
    slug: "family_dining",
    description: "A long table, a lot of food, a lot of small bowls. Mezze, three or four tagines down the middle, couscous, pastries. The kind of meal where seconds are expected.",
    detail: "From 6 guests · From €75/person",
    image: "https://images.pexels.com/photos/5410419/pexels-photo-5410419.jpeg?auto=compress&cs=tinysrgb&w=720&q=75",
  },
  {
    title: "Luxury Breakfast",
    slug: "luxury_breakfast",
    description: "Hot msemen and beghrir off the pan, local honey, soft cheeses, fruit picked that morning, coffee ground at your table. Slow it down. Eat for an hour. The medina can wait.",
    detail: "For 2 · From €45/person",
    image: "https://images.pexels.com/photos/30560980/pexels-photo-30560980.jpeg?auto=compress&cs=tinysrgb&w=720&q=75",
  },
  {
    title: "Birthday Event",
    slug: "birthday_event",
    description: "A custom cake. A menu built around the person of the evening. The table dressed for them, not the room. Tell us a few things they love — we handle the rest.",
    detail: "From 4 guests · From €110/person",
    image: "https://images.pexels.com/photos/29125650/pexels-photo-29125650.jpeg?auto=compress&cs=tinysrgb&w=720&q=75",
  },
  {
    title: "Moroccan Traditional Experience",
    slug: "moroccan_experience",
    description: "The full ceremony, in the right order: harira to start, bastilla, lamb tagine, couscous, mint tea poured from a height, chebakia to finish. The version your Moroccan friend would cook for you, not the version on a tourist menu.",
    detail: "For 2 · From €85/person",
    image: "https://images.pexels.com/photos/5737365/pexels-photo-5737365.jpeg?auto=compress&cs=tinysrgb&w=720&q=75",
  },
  {
    title: "Cooking Class",
    slug: "cooking_class",
    description: "Half a day in the kitchen with the chef. Start at the souk picking spices and produce, come back, cook a full Moroccan meal, then eat what you made. You'll leave knowing how to make a tagine from scratch.",
    detail: "For 2 · From €65/person",
    image: "https://images.pexels.com/photos/30356249/pexels-photo-30356249.jpeg?auto=compress&cs=tinysrgb&w=720&q=75",
  },
  {
    title: "Desert Dining Experience",
    slug: "desert_dining",
    description: "An hour outside Marrakech, the city is gone and the Agafay dunes start. We set a table on the sand, light Berber lanterns, and a small band plays Gnawa as the sun goes. Dinner is nomadic — grilled, smoky, slow.",
    detail: "For 2 · From €160/person",
    image: "https://images.pexels.com/photos/36209321/pexels-photo-36209321.jpeg?auto=compress&cs=tinysrgb&w=720&q=75",
  },
  {
    title: "Event Catering",
    slug: "event_catering",
    description: "Weddings, corporate dinners, riad takeovers, brand launches. Tell us the date, the count, and the vibe. We'll send back a proposal within 48 hours.",
    detail: "20+ guests · Price on request",
    image: "https://images.pexels.com/photos/5737365/pexels-photo-5737365.jpeg?auto=compress&cs=tinysrgb&w=720&q=75",
  },
];

export default function Experiences() {
  return (
    <>
      <title>Ten Ways To Eat Well In Marrakech — La Table Marrakech</title>
      <meta name="description" content="Romantic dinners, villa chefs, rooftop tables, cooking classes, desert dining and more. Pick the evening you want — or message us on WhatsApp and we'll help you choose." />

      {/* Hero */}
      <section className="relative h-80 flex items-end justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/30769609/pexels-photo-30769609.jpeg?auto=compress&cs=tinysrgb&w=1600&q=75"
          srcSet="https://images.pexels.com/photos/30769609/pexels-photo-30769609.jpeg?auto=compress&cs=tinysrgb&w=800&q=70 800w, https://images.pexels.com/photos/30769609/pexels-photo-30769609.jpeg?auto=compress&cs=tinysrgb&w=1600&q=75 1600w"
          sizes="100vw"
          fetchPriority="high"
          decoding="async"
          alt="Private chef experiences in Marrakech"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 pb-14 text-center text-white px-6">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-3">Ten Ways To Eat Well In Marrakech</p>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">Pick the evening you want.</h1>
          <p className="text-white/70 max-w-xl mx-auto text-sm md:text-base">Or message us and we'll suggest one. Most guests change their mind after we talk anyway.</p>
        </div>
      </section>

      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-24"
          >
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.slug}
                variants={fadeUp}
                data-testid={`experience-${exp.slug}`}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
              >
                <div className={i % 2 === 1 ? "[direction:ltr]" : ""}>
                  <div className="overflow-hidden aspect-[4/3]">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
                <div className={`${i % 2 === 1 ? "[direction:ltr] md:pr-0 md:pl-0" : ""} space-y-6`}>
                  <div>
                    <p className="text-xs tracking-[0.2em] uppercase text-primary mb-4">{exp.detail}</p>
                    <h2 className="font-serif text-3xl md:text-4xl mb-6">{exp.title}</h2>
                    <p className="text-muted-foreground leading-relaxed text-lg">{exp.description}</p>
                  </div>
                  <Link
                    href="/contact"
                    data-testid={`btn-book-${exp.slug}`}
                    className="inline-flex items-center gap-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors px-8 py-4 uppercase tracking-[0.2em] text-xs"
                  >
                    Reserve This Evening <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-zinc-950 text-white text-center">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Still deciding?</h2>
          <p className="text-zinc-300 mb-10 leading-relaxed">Send us a WhatsApp with your dates and group size. We'll suggest the right evening in two messages.</p>
          <a
            href="https://wa.me/212721354757"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-4 bg-amber-600 hover:bg-amber-700 text-white uppercase tracking-[0.2em] text-sm transition-colors"
          >
            WhatsApp Us
          </a>
        </div>
      </section>
    </>
  );
}




