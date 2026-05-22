import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { breadcrumbSchema, faqSchema, useSEO } from "@/lib/seo";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const priceRows = [
  ["2 guests", "EUR170 total", "Private dinner for a couple"],
  ["4 guests", "EUR340 total", "Family or small villa dinner"],
  ["8 guests", "EUR680 total", "Friends, birthdays, group holidays"],
  ["20+ guests", "Custom quote", "Weddings and event catering"],
];

const included = [
  "Menu planning over WhatsApp",
  "Morning souk sourcing and fresh ingredients",
  "Multi-course cooking at your villa or riad",
  "Plating, table service, mint tea and cleanup",
  "Dietary requirements and allergies handled in advance",
];

export default function PrivateChefCostMarrakech() {
  useSEO({
    title: "Private Chef Cost in Marrakech 2026 | From EUR85 Per Person",
    description:
      "Transparent private chef pricing in Marrakech: from EUR85 per person, all-inclusive. See what is included, total cost by group size, and how it compares to restaurants.",
    canonical: "https://latablemarrakech.com/private-chef-cost-marrakech",
    ogType: "article",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", url: "https://latablemarrakech.com/" },
        {
          name: "Private Chef Cost Marrakech",
          url: "https://latablemarrakech.com/private-chef-cost-marrakech",
        },
      ]),
      faqSchema([
        {
          question: "How much does a private chef cost in Marrakech?",
          answer:
            "Prices start from €85 per person. Final pricing depends on group size, menu selection, and special requirements.",
        },
        {
          question: "What is included in the price?",
          answer:
            "Menu planning, market sourcing, ingredients, cooking, service, mint tea and kitchen cleanup are included. Premium produce and drinks are quoted separately if requested.",
        },
        {
          question: "Is a private chef cheaper than a restaurant in Marrakech?",
          answer:
            "The price sits in the same range as Marrakech fine dining, but your table is private and the menu is planned around your group.",
        },
      ]),
    ],
  });

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-zinc-950 text-white">
        <img
          src="https://images.pexels.com/photos/5410419/pexels-photo-5410419.jpeg?auto=compress&cs=tinysrgb&w=1600&q=80"
          alt="Private chef dinner pricing in a Marrakech villa"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="relative z-10 container mx-auto px-6 py-32 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-5">
            Pricing Guide 2026
          </p>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
            Private chef cost in Marrakech
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            From EUR85 per person for a private multi-course dinner at your
            villa or riad, including ingredients, cooking, service and cleanup.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-3 bg-amber-600 hover:bg-amber-700 px-8 py-4 text-sm uppercase tracking-[0.2em] text-white"
            >
              Ask For A Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              data-cta-label="Request a quote on WhatsApp"
              data-cta-position="pricing_hero"
              className="inline-flex items-center justify-center border border-white/50 px-8 py-4 text-sm uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black"
            >
              Request a quote on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-14">
            <div>
              <h2 className="font-serif text-4xl mb-6">One clean number: EUR85 per person</h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                That puts a La Table Marrakech dinner in the same band as the
                city&apos;s better restaurants, with one major difference: the
                room is yours, the menu is made for your group, and you do not
                need taxis, reservations or a public dining room.
              </p>
              <div className="overflow-x-auto border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-stone-100 text-left uppercase tracking-[0.18em] text-xs">
                    <tr>
                      <th className="p-4">Group size</th>
                      <th className="p-4">Typical total</th>
                      <th className="p-4">Best for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceRows.map(([size, total, best]) => (
                      <tr key={size} className="border-t border-border">
                        <td className="p-4 font-medium">{size}</td>
                        <td className="p-4">{total}</td>
                        <td className="p-4 text-muted-foreground">{best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-stone-100 p-8">
              <h2 className="font-serif text-3xl mb-6">Included</h2>
              <ul className="space-y-4">
                {included.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-amber-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm text-muted-foreground leading-relaxed">
                Wine, luxury produce such as lobster or truffle, and large
                event rentals are quoted separately before you confirm.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
