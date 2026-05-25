import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";


// Pages that have both EN and FR versions. Keys are the EN canonical paths.
const enToFr: Record<string, string> = {
  "/": "/fr",
  "/experiences": "/fr/experiences",
  "/testimonials": "/fr/testimonials",
  "/faq": "/fr/faq",
  "/contact": "/fr/contact",
  "/marrakech-cooking-class": "/fr/marrakech-cooking-class",
  "/private-chef-marrakech": "/fr/private-chef-marrakech",
};
const frToEn: Record<string, string> = Object.fromEntries(
  Object.entries(enToFr).map(([en, fr]) => [fr, en]),
);

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Language detection
  const isFR = location === "/fr" || location.startsWith("/fr/");
  const currentLang: "EN" | "FR" = isFR ? "FR" : "EN";
  const otherLang: "EN" | "FR" = isFR ? "EN" : "FR";
  const otherLangHref = isFR ? frToEn[location] : enToFr[location];

  // Localized nav strings
  const t = isFR
    ? {
        home: "/fr",
        experiences: { href: "/fr/experiences", label: "Expériences" },
        testimonials: { href: "/fr/testimonials", label: "Témoignages" },
        faq: { href: "/fr/faq", label: "FAQ" },
        contact: "/fr/contact",
        reserve: "Réserver",
        reserveLong: "Réservez votre expérience",
      }
    : {
        home: "/",
        experiences: { href: "/experiences", label: "Experiences" },
        testimonials: { href: "/testimonials", label: "Testimonials" },
        faq: { href: "/faq", label: "FAQ" },
        contact: "/contact",
        reserve: "Reserve",
        reserveLong: "Reserve Your Experience",
      };

  const navLinks = [t.experiences, t.testimonials, t.faq];

  const isHome = location === "/" || location === "/fr";
  const isTransparent = !scrolled && isHome;
  const navBackground = isTransparent
    ? "bg-gradient-to-b from-black/55 via-black/25 to-transparent"
    : "bg-background/95 backdrop-blur-md border-b border-border shadow-sm";
  const textColor = isTransparent ? "text-white" : "text-foreground";
  const logoColor = isTransparent ? "text-white" : "text-primary";
  const textShadow = isTransparent ? "[text-shadow:0_1px_6px_rgba(0,0,0,0.55)]" : "";

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBackground}`}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href={t.home} className={`font-serif text-2xl tracking-widest uppercase ${logoColor} ${textShadow} transition-colors`}>
          La Table<span className="block text-[0.6rem] tracking-[0.3em] font-sans opacity-80 mt-1">Marrakech</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide uppercase hover:text-primary transition-colors ${textShadow} ${
                location === link.href ? "text-primary" : textColor
              }`}
            >
              {link.label}
            </Link>
          ))}
          {otherLangHref && (
            <Link
              href={otherLangHref}
              data-testid="lang-toggle-desktop"
              className={`text-[11px] tracking-[0.25em] uppercase border px-3 py-1.5 transition-colors ${textShadow} ${
                isTransparent
                  ? "border-white/50 text-white hover:border-white hover:bg-white/10"
                  : "border-foreground/30 text-foreground hover:border-primary hover:text-primary"
              }`}
              aria-label={`Switch to ${otherLang === "FR" ? "Français" : "English"}`}
            >
              <span className="opacity-50">{currentLang}</span>
              <span className="mx-1.5 opacity-30">/</span>
              <span>{otherLang}</span>
            </Link>
          )}
          <Link
            href={t.contact}
            className={`px-6 py-2 border ${textShadow} ${
              isTransparent
                ? "border-white text-white hover:bg-white hover:text-black"
                : "border-primary text-primary hover:bg-primary hover:text-white"
            } transition-colors uppercase tracking-wider text-xs`}
          >
            {t.reserve}
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className={`md:hidden ${textColor} ${textShadow}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 top-20 bg-background z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-2xl font-serif tracking-widest uppercase hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={t.contact}
              className="mt-8 px-12 py-4 bg-primary text-white hover:bg-primary/90 transition-colors uppercase tracking-widest text-sm"
            >
              {t.reserveLong}
            </Link>
            {otherLangHref && (
              <Link
                href={otherLangHref}
                data-testid="lang-toggle-mobile"
                className="mt-4 text-xs tracking-[0.25em] uppercase border border-foreground/30 text-foreground hover:border-primary hover:text-primary transition-colors px-4 py-2"
              >
                <span className="opacity-50">{currentLang}</span>
                <span className="mx-1.5 opacity-30">/</span>
                <span>{otherLang}</span>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
