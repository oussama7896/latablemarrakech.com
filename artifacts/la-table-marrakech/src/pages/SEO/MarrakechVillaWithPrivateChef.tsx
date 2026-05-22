import { Link } from "wouter";
import { ArrowRight, Home, MapPin, Utensils } from "lucide-react";
import { breadcrumbSchema, faqSchema, useSEO } from "@/lib/seo";

const areas = [
  ["Palmeraie", "Best for groups, pool dinners and bigger villa kitchens."],
  ["Medina riads", "Best for atmosphere, rooftops and intimate courtyard dinners."],
  ["Hivernage", "Best for short stays close to hotels, nightlife and the medina."],
  ["Ourika", "Best for Atlas views and slower countryside lunches."],
];

export default function MarrakechVillaWithPrivateChef() {
  useSEO({
    title: "Marrakech Villas With Private Chef | 2026 Booking Guide",
    description:
      "Renting a villa or riad in Marrakech and want a private chef? Compare areas, kitchen requirements, pricing and how to book La Table Marrakech.",
    canonical: "https://latablemarrakech.com/marrakech-villa-with-private-chef",
    ogType: "article",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", url: "https://latablemarrakech.com/" },
        {
          name: "Marrakech Villa With Private Chef",
          url: "https://latablemarrakech.com/marrakech-villa-with-private-chef",
        },
      ]),
      faqSchema([
        {
          question: "Can I book a private chef for a Marrakech villa?",
          answer:
            "Yes. La Table Marrakech cooks in villas, riads and rentals across Marrakech, including Palmeraie, Medina, Hivernage and Ourika.",
        },
        {
          question: "What does the villa kitchen need?",
          answer:
            "A working hob, oven, basic prep space and enough plates/glasses for the group are ideal. The chef can bring specialist equipment when needed.",
        },
      ]),
    ],
  });

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-zinc-950 text-white">
        <img
          src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=1920&q=80"
          alt="Marrakech villa with a private chef dinner"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="relative z-10 container mx-auto px-6 py-32 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-5">
            Villa Dining Guide
          </p>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
            Marrakech villas with a private chef
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            Where to stay, what to ask your host, and how to bring a private
            chef into the villa without turning dinner into logistics.
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 px-8 py-4 text-sm uppercase tracking-[0.2em] text-white"
            >
              Plan A Villa Dinner <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1fr] gap-14">
            <div className="space-y-6">
              <div className="bg-stone-100 p-8">
                <Home className="h-6 w-6 text-amber-700 mb-5" />
                <h2 className="font-serif text-3xl mb-4">What works best</h2>
                <p className="text-muted-foreground leading-relaxed">
                  A private chef works beautifully in villas with outdoor
                  tables, courtyards or rooftops. We confirm the kitchen,
                  headcount, dietary notes and table setup before you book.
                </p>
              </div>
              <div className="bg-zinc-950 text-white p-8">
                <Utensils className="h-6 w-6 text-amber-300 mb-5" />
                <h2 className="font-serif text-3xl mb-4">What we bring</h2>
                <p className="text-white/70 leading-relaxed">
                  Ingredients, menu plan, chef team, cookware when needed,
                  service rhythm, plating and cleanup.
                </p>
              </div>
            </div>
            <div>
              <h2 className="font-serif text-4xl mb-8">Best areas for villa dining</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {areas.map(([name, text]) => (
                  <article key={name} className="border border-border p-7">
                    <MapPin className="h-5 w-5 text-amber-700 mb-4" />
                    <h3 className="font-serif text-2xl mb-3">{name}</h3>
                    <p className="text-muted-foreground leading-relaxed">{text}</p>
                  </article>
                ))}
              </div>
              <p className="mt-10 text-muted-foreground leading-relaxed">
                Already have a villa booked? Send the address, date and group
                size on WhatsApp. We will tell you quickly whether the kitchen
                setup is enough and what dinner would cost.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
