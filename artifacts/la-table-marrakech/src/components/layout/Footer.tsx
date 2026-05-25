import { Link, useLocation } from "wouter";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const [location] = useLocation();
  const isFR = location === "/fr" || location.startsWith("/fr/");
  const currentYear = new Date().getFullYear();

  const t = isFR
    ? {
        home: "/fr",
        tagline: "Expériences de chef privé de niveau Michelin dans des villas, riads et lieux d'exception à Marrakech et dans le désert d'Agafay.",
        experiences: "Expériences",
        romantic: { href: "/fr/romantic-dinner-marrakech", label: "Dîner romantique" },
        villa: { href: "/fr/villa-chef-marrakech", label: "Chef privé en villa" },
        cooking: { href: "/fr/moroccan-cooking-experience", label: "Cours de cuisine marocaine" },
        allExperiences: { href: "/fr/experiences", label: "Toutes les expériences" },
        information: "Information",
        pricing: { href: "/fr/private-chef-cost-marrakech", label: "Tarifs" },
        cookingClass: { href: "/fr/marrakech-cooking-class", label: "Cours de cuisine" },
        compare: { href: "/fr/marrakech-cooking-class-vs-private-chef", label: "Cours vs Chef" },
        testimonials: { href: "/fr/testimonials", label: "Témoignages" },
        faq: { href: "/fr/faq", label: "FAQ" },
        contact: "Contact",
        whatsAppLabel: "Demandez un devis sur WhatsApp",
        reserve: { href: "/fr/contact", label: "Faire une réservation" },
        rights: "Tous droits réservés.",
        contactShort: { href: "/fr/contact", label: "Contact" },
        faqShort: { href: "/fr/faq", label: "FAQ" },
      }
    : {
        home: "/",
        tagline: "Michelin-level private dining experiences in villas, riads, and exclusive locations across Marrakech and the Agafay Desert.",
        experiences: "Experiences",
        romantic: { href: "/romantic-dinner-marrakech", label: "Romantic Dinner" },
        villa: { href: "/villa-chef-marrakech", label: "Villa Private Chef" },
        cooking: { href: "/moroccan-cooking-experience", label: "Moroccan Cooking Class" },
        allExperiences: { href: "/experiences", label: "All Experiences" },
        information: "Information",
        pricing: { href: "/private-chef-cost-marrakech", label: "Pricing" },
        cookingClass: { href: "/marrakech-cooking-class", label: "Cooking Class" },
        compare: { href: "/marrakech-cooking-class-vs-private-chef", label: "Cooking Class vs Chef" },
        testimonials: { href: "/testimonials", label: "Testimonials" },
        faq: { href: "/faq", label: "FAQ" },
        contact: "Contact",
        whatsAppLabel: "Request a quote on WhatsApp",
        reserve: { href: "/contact", label: "Make a Reservation" },
        rights: "All rights reserved.",
        contactShort: { href: "/contact", label: "Contact" },
        faqShort: { href: "/faq", label: "FAQ" },
      };

  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 md:py-24 border-t border-zinc-900">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <Link href={t.home} className="font-serif text-2xl tracking-widest uppercase text-white mb-4 block">
            La Table<span className="block text-[0.6rem] tracking-[0.3em] font-sans opacity-60 mt-1">Marrakech</span>
          </Link>
          <p className="text-sm leading-relaxed mt-6 max-w-xs">{t.tagline}</p>
        </div>

        <div>
          <h4 className="text-white font-serif uppercase tracking-widest text-sm mb-6">{t.experiences}</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href={t.romantic.href} className="hover:text-primary transition-colors">{t.romantic.label}</Link></li>
            <li><Link href={t.villa.href} className="hover:text-primary transition-colors">{t.villa.label}</Link></li>
            <li><Link href={t.cooking.href} className="hover:text-primary transition-colors">{t.cooking.label}</Link></li>
            <li><Link href={t.allExperiences.href} className="hover:text-primary transition-colors">{t.allExperiences.label}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif uppercase tracking-widest text-sm mb-6">{t.information}</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href={t.pricing.href} className="hover:text-primary transition-colors">{t.pricing.label}</Link></li>
            <li><Link href={t.cookingClass.href} className="hover:text-primary transition-colors">{t.cookingClass.label}</Link></li>
            <li><Link href={t.compare.href} className="hover:text-primary transition-colors">{t.compare.label}</Link></li>
            <li><Link href={t.testimonials.href} className="hover:text-primary transition-colors">{t.testimonials.label}</Link></li>
            <li><Link href={t.faq.href} className="hover:text-primary transition-colors">{t.faq.label}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif uppercase tracking-widest text-sm mb-6">{t.contact}</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="mailto:reservations@latablemarrakech.com" className="hover:text-primary transition-colors">reservations@latablemarrakech.com</a></li>
            <li><a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-cta-label="Request a quote on WhatsApp" data-cta-position="footer_contact" className="hover:text-primary transition-colors">{t.whatsAppLabel}</a></li>
            <li className="pt-4">
              <Link href={t.reserve.href} className="inline-block border border-zinc-700 hover:border-primary hover:text-primary transition-colors px-4 py-2 uppercase tracking-wider text-xs">
                {t.reserve.label}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-zinc-900 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {currentYear} La Table Marrakech. {t.rights}</p>
        <div className="flex gap-4">
          <Link href={t.contactShort.href} className="hover:text-white transition-colors">{t.contactShort.label}</Link>
          <Link href={t.faqShort.href} className="hover:text-white transition-colors">{t.faqShort.label}</Link>
        </div>
      </div>
    </footer>
  );
}
