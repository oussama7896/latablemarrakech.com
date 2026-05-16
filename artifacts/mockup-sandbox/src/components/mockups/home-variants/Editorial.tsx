// D — Editorial Menu Grid
// Hypothesis: The menu IS the experience. Open on beautiful typography — no hero image.
// Information architecture: a physical menu / broadsheet newspaper. Dense, legible, refined.
// Interaction: browsing a curated menu. Photos appear small, as accompaniment — not centrepiece.
// Aesthetic: ink on cream, Playfair Display at large scale, ruled lines.

const MENU = [
  {
    section: "Les Entrées",
    en: "Starters",
    items: [
      { fr: "Bastilla au Poulet", en: "Pigeon & almond pastry, cinnamon dust", price: "—" },
      { fr: "Zaalouk", en: "Smoked aubergine, tomato, preserved lemon", price: "—" },
      { fr: "Briouats à la Kefta", en: "Spiced lamb cigars, harissa yogurt", price: "—" },
    ],
  },
  {
    section: "Les Plats",
    en: "Main Courses",
    items: [
      { fr: "Tagine d'Agneau Mrouzia", en: "Slow-cooked lamb, ras el hanout, prunes & almonds", price: "—" },
      { fr: "Pastilla au Poisson", en: "Sea bass, vermicelli, chermoula in warqa pastry", price: "—" },
      { fr: "Couscous Royal", en: "Seven vegetables, merguez, lamb shank, saffron broth", price: "—" },
      { fr: "Mechoui", en: "Whole-roasted lamb, cumin salt, Moroccan bread", price: "—" },
    ],
  },
  {
    section: "Les Douceurs",
    en: "Desserts",
    items: [
      { fr: "Chebakia", en: "Honey-sesame flower pastry, orange blossom", price: "—" },
      { fr: "M'hancha", en: "Almond coil pastry, cinnamon, rose water", price: "—" },
      { fr: "Café Marocain", en: "Spiced coffee, cardamom, ginger, ras el hanout", price: "—" },
    ],
  },
];

const GALLERY_STRIP = [
  "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=200&q=70",
  "https://images.pexels.com/photos/2260825/pexels-photo-2260825.jpeg?auto=compress&cs=tinysrgb&w=200",
  "https://images.pexels.com/photos/30560980/pexels-photo-30560980.jpeg?auto=compress&cs=tinysrgb&w=200",
  "https://images.pexels.com/photos/28730586/pexels-photo-28730586.jpeg?auto=compress&cs=tinysrgb&w=200",
];

export function Editorial() {
  return (
    <div style={{ minHeight: "100dvh", background: "#f9f5ed", fontFamily: "'Inter', system-ui, sans-serif", color: "#1a1208" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400;500&display=swap');
        .serif { font-family: 'Playfair Display', Georgia, serif; }
        body { margin: 0; }
        .rule { border: none; border-top: 1px solid #d4c8b0; margin: 0; }
      `}</style>

      {/* Masthead */}
      <div style={{ padding: "32px 20px 0", textAlign: "center", borderBottom: "3px solid #1a1208" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.35em", color: "#8a7050", marginBottom: 10 }}>MARRAKECH · CHEF PRIVÉ · DEPUIS 2019</div>
        <h1 className="serif" style={{ fontSize: 64, fontWeight: 700, lineHeight: 0.9, margin: "0 0 4px", letterSpacing: "-0.02em" }}>
          La Table
        </h1>
        <div className="serif" style={{ fontSize: 20, fontStyle: "italic", color: "#8a7050", marginBottom: 16, fontWeight: 400 }}>
          Marrakech
        </div>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#a09070", paddingBottom: 20 }}>
          A PRIVATE CHEF EXPERIENCE — FROM €85 PER PERSON
        </div>
      </div>

      {/* Pull quote */}
      <div style={{ padding: "20px", background: "#1a1208", textAlign: "center" }}>
        <p className="serif" style={{ fontSize: 18, fontStyle: "italic", color: "#f0e8d0", margin: 0, lineHeight: 1.4, fontWeight: 400 }}>
          "Not a restaurant. Not a caterer.<br />A chef who becomes yours for an evening."
        </p>
      </div>

      {/* Photo strip */}
      <div style={{ display: "flex", gap: 2, padding: "2px 0" }}>
        {GALLERY_STRIP.map((src, i) => (
          <img key={i} src={src} alt="" style={{ flex: 1, height: 80, objectFit: "cover" }} />
        ))}
      </div>

      {/* Menu header */}
      <div style={{ padding: "24px 20px 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <div style={{ flex: 1, height: 1, background: "#d4c8b0" }} />
          <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "#8a7050" }}>THE MENU</div>
          <div style={{ flex: 1, height: 1, background: "#d4c8b0" }} />
        </div>
        <p style={{ fontSize: 11, color: "#9a8060", textAlign: "center", margin: "4px 0 0" }}>All menus composed to your preferences · Seasonal · Locally sourced</p>
      </div>

      {/* Menu sections */}
      {MENU.map((section, si) => (
        <div key={si} style={{ padding: "0 20px" }}>
          {/* Section header */}
          <div style={{ padding: "16px 0 8px", borderBottom: "2px solid #1a1208", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span className="serif" style={{ fontSize: 22, fontWeight: 700 }}>{section.section}</span>
            <span style={{ fontSize: 11, color: "#9a8060", fontStyle: "italic" }}>{section.en}</span>
          </div>

          {/* Dishes */}
          {section.items.map((dish, di) => (
            <div key={di} style={{ padding: "10px 0", borderBottom: "1px solid #e4daca" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 3 }}>
                <span className="serif" style={{ fontSize: 15, fontWeight: 400, fontStyle: "italic" }}>{dish.fr}</span>
              </div>
              <span style={{ fontSize: 11, color: "#7a6850", lineHeight: 1.4 }}>{dish.en}</span>
            </div>
          ))}
          <div style={{ height: 8 }} />
        </div>
      ))}

      {/* Experiences as broadsheet columns */}
      <div style={{ padding: "24px 20px", borderTop: "3px solid #1a1208" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "#8a7050", textAlign: "center", marginBottom: 16 }}>OUR TABLES</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 12px" }}>
          {[
            { name: "Romantic Dinner", price: "€120/pp", guests: "2" },
            { name: "Villa Private Chef", price: "€85/pp", guests: "2–12" },
            { name: "Cooking Class", price: "€65/pp", guests: "2–8" },
            { name: "Desert Dining", price: "€180/pp", guests: "2–10" },
          ].map(e => (
            <div key={e.name} style={{ borderTop: "2px solid #1a1208", paddingTop: 10 }}>
              <div className="serif" style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{e.name}</div>
              <div style={{ fontSize: 11, color: "#7a6850", marginBottom: 2 }}>{e.guests} guests</div>
              <div style={{ fontSize: 13, color: "hsl(20,50%,40%)", fontWeight: 500 }}>{e.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Reservation box */}
      <div style={{ margin: "0 20px 32px", border: "2px solid #1a1208", padding: 20 }}>
        <div className="serif" style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Reserve Your Table</div>
        <div style={{ fontSize: 12, color: "#8a7050", marginBottom: 16, lineHeight: 1.5 }}>
          We compose your menu personally — no booking engine, just a conversation.
        </div>
        <button style={{ width: "100%", padding: "14px", background: "#1a1208", color: "#f0e8d0", border: "none", fontSize: 12, letterSpacing: "0.15em", cursor: "pointer", marginBottom: 10 }}>
          INQUIRE BY EMAIL
        </button>
        <button style={{ width: "100%", padding: "14px", background: "transparent", color: "#1a1208", border: "2px solid #1a1208", fontSize: 12, letterSpacing: "0.15em", cursor: "pointer" }}>
          WHATSAPP US DIRECTLY
        </button>
        <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", fontSize: 10, color: "#9a8060", borderTop: "1px solid #d4c8b0", paddingTop: 12 }}>
          <span>+212 721 354 757</span>
          <span>contact@latablemarrakech.com</span>
        </div>
      </div>
    </div>
  );
}
