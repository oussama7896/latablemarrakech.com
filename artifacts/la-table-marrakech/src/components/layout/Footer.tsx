import { Link } from "wouter";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 md:py-24 border-t border-zinc-900">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <Link href="/" className="font-serif text-2xl tracking-widest uppercase text-white mb-4 block">
            La Table<span className="block text-[0.6rem] tracking-[0.3em] font-sans opacity-60 mt-1">Marrakech</span>
          </Link>
          <p className="text-sm leading-relaxed mt-6 max-w-xs">
            Michelin-level private dining experiences in villas, riads, and exclusive locations across Marrakech and the Agafay Desert.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-serif uppercase tracking-widest text-sm mb-6">Experiences</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/romantic-dinner-marrakech" className="hover:text-primary transition-colors">Romantic Dinner</Link></li>
            <li><Link href="/villa-chef-marrakech" className="hover:text-primary transition-colors">Villa Private Chef</Link></li>
            <li><Link href="/moroccan-cooking-experience" className="hover:text-primary transition-colors">Moroccan Cooking Class</Link></li>
            <li><Link href="/experiences" className="hover:text-primary transition-colors">All Experiences</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif uppercase tracking-widest text-sm mb-6">Information</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/chef" className="hover:text-primary transition-colors">The Chef</Link></li>
            <li><Link href="/private-chef-cost-marrakech" className="hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link href="/marrakech-cooking-class-vs-private-chef" className="hover:text-primary transition-colors">Cooking Class vs Chef</Link></li>
            <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
            <li><Link href="/testimonials" className="hover:text-primary transition-colors">Testimonials</Link></li>
            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-serif uppercase tracking-widest text-sm mb-6">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="mailto:reservations@latablemarrakech.com" className="hover:text-primary transition-colors">reservations@latablemarrakech.com</a></li>
            <li><a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-cta-label="Request a quote on WhatsApp" data-cta-position="footer_contact" className="hover:text-primary transition-colors">Request a quote on WhatsApp</a></li>
            <li className="pt-4">
              <Link href="/contact" className="inline-block border border-zinc-700 hover:border-primary hover:text-primary transition-colors px-4 py-2 uppercase tracking-wider text-xs">
                Make a Reservation
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-16 pt-8 border-t border-zinc-900 text-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {currentYear} La Table Marrakech. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
        </div>
      </div>
    </footer>
  );
}
