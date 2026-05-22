import { motion, easeOut, easeInOut, backOut } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useSEO, breadcrumbSchema } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const credentials = [
  "Le Cordon Bleu, Paris — 2003",
  "20+ years cooking, 7 in private dining",
  "Former Sous Chef, Palais Namaskar Marrakech",
  "Specialist in Moroccan and Mediterranean cuisine",
  "Featured in Condé Nast Traveller",
  "Speaks English, French, Arabic, and Darija",
];

const values = [
  {
    title: "Bought That Morning",
    desc: "We start at the market by 7am. If it isn't ripe, it isn't on your plate tonight. The menu we sent you might shift slightly by service — that's a good sign.",
  },
  {
    title: "Built Around You",
    desc: "Before we cook, we ask. Allergies, of course. But also: what you ate yesterday, what you're tired of, what you've never tried. Then the menu gets built around the answers.",
  },
  {
    title: "Cooked In The Room",
    desc: "The chef stays the whole evening. He'll pour the first glass, explain each course, adjust on the fly. It's not service. It's company.",
  },
];

export default function Chef() {
  useSEO({
    title: "The Chef — Twenty Years In The Kitchen | La Table Marrakech",
    description: "Trained in Paris. Cooked at Palais Namaskar. Now cooks one table at a time for travellers in Marrakech. Meet the chef behind La Table Marrakech.",
    canonical: "https://latablemarrakech.com/chef",
    jsonLd: breadcrumbSchema([
      { name: "Home", url: "https://latablemarrakech.com/" },
      { name: "The Chef", url: "https://latablemarrakech.com/chef" },
    ]),
  });

  return (
    <>

      {/* Hero */}
      <section className="relative h-screen max-h-[800px] flex items-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1600&q=75"
          srcSet="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=70 800w, https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1600&q=75 1600w"
          sizes="100vw"
          fetchPriority="high"
          decoding="async"
          alt="Private chef La Table Marrakech"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 px-6 container mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-xl text-white"
          >
            <motion.p variants={fadeUp} className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-6">
              The Chef
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-serif text-5xl md:text-7xl leading-[1.05] mb-8">
              Twenty years.<br />
              <span className="italic text-amber-200">One obsession.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-white/70 text-lg leading-relaxed">
              Trained in Paris. Cooked at Palais Namaskar. Walked away to cook for one table at a time.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-28 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
            >
              <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">The Story</p>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-10">
                Born in Fez.<br />
                <span className="italic">Refined in Paris.</span><br />
                Came home to cook.
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  He grew up in the medina of Fez, in a house where the kitchen was the loudest room. His grandmother taught him the order of spices before he could read — cumin first, then coriander, ginger last, never rushed.
                </p>
                <p>
                  At twenty-two, a scholarship took him to Le Cordon Bleu in Paris. He stayed a decade. Worked the line in three Michelin kitchens. Learned the silence and the precision of French cuisine — and missed Morocco the whole time.
                </p>
                <p>
                  He came back, took the kitchen at Palais Namaskar, one of Marrakech's most celebrated hotels. But cooking for a hundred strangers a night was never the point. The dinners that mattered to him were the small ones. Six people. One table. A long evening.
                </p>
                <p>
                  So he left. La Table Marrakech started with one private dinner in 2018. Now he cooks four nights a week, for whoever is in town — and still treats each one like the first.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="space-y-12"
            >
              <div className="bg-stone-100 p-10">
                <p className="text-xs tracking-[0.4em] uppercase text-primary mb-6">Credentials</p>
                <ul className="space-y-4">
                  {credentials.map((c, i) => (
                    <li key={i} className="flex items-center gap-4 text-sm text-foreground">
                      <div className="w-5 h-px bg-primary shrink-0" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2260825/pexels-photo-2260825.jpeg?auto=compress&cs=tinysrgb&w=720&q=75"
                  alt="Moroccan spices and ingredients"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-28 bg-zinc-950 text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="text-center mb-20"
          >
            <p className="text-xs tracking-[0.4em] uppercase text-amber-400 mb-4">The Way He Cooks</p>
            <h2 className="font-serif text-4xl md:text-5xl">Three things, every time.</h2>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {values.map((v, i) => (
              <motion.div key={i} variants={fadeUp} className="border-l border-amber-400/30 pl-8">
                <h3 className="font-serif text-2xl text-amber-200 mb-4">{v.title}</h3>
                <p className="text-zinc-300 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-background text-center">
        <div className="container mx-auto px-6 max-w-xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-serif text-4xl mb-6">Want him to cook for you?</h2>
            <p className="text-muted-foreground mb-10">One message is enough to start.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="btn-chef-cta-whatsapp"
                data-cta-label="Request a quote on WhatsApp"
                data-cta-position="chef_cta"
                className="inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-12 py-5 uppercase tracking-[0.2em] text-xs"
              >
                Request a quote on WhatsApp <ArrowRight className="w-3 h-3" />
              </a>
              <Link
                href="/contact"
                data-testid="btn-chef-cta-form"
                className="inline-flex items-center justify-center gap-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors px-12 py-5 uppercase tracking-[0.2em] text-xs"
              >
                Or Send A Form
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}



