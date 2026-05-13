import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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

  const navLinks = [
    { href: "/experiences", label: "Experiences" },
    { href: "/chef", label: "The Chef" },
    { href: "/gallery", label: "Gallery" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/faq", label: "FAQ" },
  ];

  const isHome = location === "/";
  const navBackground = scrolled || !isHome ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent";
  const textColor = scrolled || !isHome ? "text-foreground" : "text-white";
  const logoColor = scrolled || !isHome ? "text-primary" : "text-white";

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBackground}`}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className={`font-serif text-2xl tracking-widest uppercase ${logoColor} transition-colors`}>
          La Table<span className="block text-[0.6rem] tracking-[0.3em] font-sans opacity-80 mt-1">Marrakech</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide uppercase hover:text-primary transition-colors ${
                location === link.href ? "text-primary" : textColor
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`px-6 py-2 border ${
              scrolled || !isHome
                ? "border-primary text-primary hover:bg-primary hover:text-white"
                : "border-white text-white hover:bg-white hover:text-black"
            } transition-colors uppercase tracking-wider text-xs`}
          >
            Reserve
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className={`md:hidden ${textColor}`}
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
              href="/contact"
              className="mt-8 px-12 py-4 bg-primary text-white hover:bg-primary/90 transition-colors uppercase tracking-widest text-sm"
            >
              Reserve Your Experience
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
