import { motion, easeOut, easeInOut, backOut } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const images = [
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80", alt: "Elegant dinner table setting Marrakech" },
  { src: "https://images.pexels.com/photos/5737365/pexels-photo-5737365.jpeg?auto=compress&cs=tinysrgb&w=800&q=85", alt: "Moroccan tagine private chef" },
  { src: "https://images.pexels.com/photos/28730586/pexels-photo-28730586.jpeg?auto=compress&cs=tinysrgb&w=800&q=85", alt: "Luxury food presentation" },
  { src: "https://images.pexels.com/photos/36209321/pexels-photo-36209321.jpeg?auto=compress&cs=tinysrgb&w=800&q=85", alt: "Desert dining Agafay Marrakech" },
  { src: "https://images.pexels.com/photos/2260825/pexels-photo-2260825.jpeg?auto=compress&cs=tinysrgb&w=800&q=85", alt: "Moroccan spices and herbs" },
  { src: "https://images.pexels.com/photos/30769609/pexels-photo-30769609.jpeg?auto=compress&cs=tinysrgb&w=800&q=85", alt: "Private dining candlelight Marrakech" },
  { src: "https://images.pexels.com/photos/5410419/pexels-photo-5410419.jpeg?auto=compress&cs=tinysrgb&w=800&q=85", alt: "Family feast Moroccan cuisine" },
  { src: "https://images.pexels.com/photos/30560980/pexels-photo-30560980.jpeg?auto=compress&cs=tinysrgb&w=800&q=85", alt: "Luxury breakfast Riad Marrakech" },
  { src: "https://images.pexels.com/photos/30769609/pexels-photo-30769609.jpeg?auto=compress&cs=tinysrgb&w=800&q=85", alt: "Rooftop dinner Marrakech medina" },
  { src: "https://images.pexels.com/photos/30356249/pexels-photo-30356249.jpeg?auto=compress&cs=tinysrgb&w=800&q=85", alt: "Moroccan cooking class experience" },
  { src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=80", alt: "Private chef at work Marrakech" },
  { src: "https://images.pexels.com/photos/29125650/pexels-photo-29125650.jpeg?auto=compress&cs=tinysrgb&w=800&q=85", alt: "Intimate private dining room" },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <title>Gallery — La Table Marrakech Private Chef Experiences</title>
      <meta name="description" content="Browse the gallery of La Table Marrakech private chef experiences — from candlelit romantic dinners to Moroccan feasts, rooftop evenings, and desert dining in the Agafay." />
      <link rel="canonical" href="https://latablemarrakech.com/gallery" />

      {/* Hero */}
      <section className="relative h-72 flex items-end justify-center overflow-hidden">
        <img
          src="https://images.pexels.com/photos/30769609/pexels-photo-30769609.jpeg?auto=compress&cs=tinysrgb&w=1920&q=90"
          alt="Gallery La Table Marrakech"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 pb-14 text-center text-white">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-3">Visual Stories</p>
          <h1 className="font-serif text-4xl md:text-6xl">Gallery</h1>
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {images.map((img, i) => (
              <motion.button
                key={i}
                variants={fadeUp}
                onClick={() => setSelected(i)}
                data-testid={`gallery-image-${i}`}
                className="overflow-hidden aspect-square block group"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-amber-300 transition-colors"
            onClick={() => setSelected(null)}
            data-testid="btn-close-lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            src={images[selected].src.replace("w=900", "w=1400")}
            alt={images[selected].alt}
            className="max-w-5xl max-h-[85vh] object-contain w-full"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}

      {/* CTA */}
      <section className="py-20 bg-zinc-950 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">Imagine Your Own Evening Here</h2>
          <p className="text-zinc-300 mb-10 max-w-xl mx-auto">Every dinner is a photograph waiting to be taken, a memory waiting to be made.</p>
          <Link
            href="/contact"
            data-testid="btn-gallery-cta"
            className="inline-block px-12 py-4 bg-amber-600 hover:bg-amber-700 text-white uppercase tracking-[0.2em] text-sm transition-colors"
          >
            Reserve Your Experience
          </Link>
        </div>
      </section>
    </>
  );
}




