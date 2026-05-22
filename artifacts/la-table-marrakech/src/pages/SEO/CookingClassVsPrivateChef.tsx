import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { breadcrumbSchema, faqSchema, useSEO } from "@/lib/seo";

const comparison = [
  ["Best for", "Hands-on food lovers", "Couples, families and groups who want to relax"],
  ["Typical time", "4 to 5 hours", "3 to 4 hours, usually dinner"],
  ["Effort", "You shop, prep and cook", "You sit down; the chef handles the evening"],
  ["Setting", "Class kitchen or your villa", "Your villa, riad, rooftop or rental"],
  ["Price range", "About EUR45 to EUR90 per person", "From EUR85 per person"],
];

export default function CookingClassVsPrivateChef() {
  useSEO({
    title: "Marrakech Cooking Class vs Private Chef | Which Should You Book?",
    description:
      "Compare Marrakech cooking classes with private chef dinners: prices, effort, setting, group fit and when each option makes sense for your trip.",
    canonical: "https://latablemarrakech.com/marrakech-cooking-class-vs-private-chef",
    ogType: "article",
    jsonLd: [
      breadcrumbSchema([
        { name: "Home", url: "https://latablemarrakech.com/" },
        {
          name: "Cooking Class vs Private Chef",
          url: "https://latablemarrakech.com/marrakech-cooking-class-vs-private-chef",
        },
      ]),
      faqSchema([
        {
          question: "Is a cooking class or private chef better in Marrakech?",
          answer:
            "A cooking class is better if you want to learn and participate. A private chef is better if you want a hosted dinner at your villa or riad with no work from your group.",
        },
        {
          question: "Do private chef dinners cost more than cooking classes?",
          answer:
            "They are often in a similar range. Cooking classes commonly run EUR45 to EUR90 per person, while La Table Marrakech private chef dinners start from EUR85 per person.",
        },
      ]),
    ],
  });

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-zinc-950 text-white">
        <img
          src="https://images.pexels.com/photos/30356249/pexels-photo-30356249.jpeg?auto=compress&cs=tinysrgb&w=1600&q=80"
          alt="Marrakech cooking class compared with private chef dinner"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="relative z-10 container mx-auto px-6 py-32 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300 mb-5">
            Trip Planning
          </p>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
            Cooking class or private chef dinner?
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
            Both are good Marrakech food experiences. They solve different
            problems. Here is the fast, honest comparison.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1fr] gap-14">
            <aside className="bg-stone-100 p-8 h-fit">
              <h2 className="font-serif text-3xl mb-5">Short answer</h2>
              <p className="text-muted-foreground leading-relaxed">
                Choose a cooking class if you want to shop, prep and learn.
                Choose a private chef if you want a restaurant-quality dinner
                at your own table while everyone stays in holiday mode.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-3 border border-foreground px-7 py-4 text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background"
              >
                Ask Which Fits <ArrowRight className="h-3 w-3" />
              </Link>
            </aside>
            <div>
              <h2 className="font-serif text-4xl mb-8">Side-by-side</h2>
              <div className="overflow-x-auto border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-stone-100 text-left uppercase tracking-[0.18em] text-xs">
                    <tr>
                      <th className="p-4">Question</th>
                      <th className="p-4">Cooking class</th>
                      <th className="p-4">Private chef</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map(([question, cooking, chef]) => (
                      <tr key={question} className="border-t border-border">
                        <td className="p-4 font-medium">{question}</td>
                        <td className="p-4 text-muted-foreground">{cooking}</td>
                        <td className="p-4 text-muted-foreground">{chef}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-serif text-2xl mb-3">Book the class if...</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    You want the souk visit, spice explanations, knife work and
                    the satisfaction of cooking the tagine yourself.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-2xl mb-3">Book the chef if...</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Your group wants privacy, a slow dinner, no logistics and a
                    table that feels designed for the night.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
