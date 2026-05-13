// B — Concierge Booking-First
// Hypothesis: The page IS the reservation. Lead with "tell us about your evening".
// Information architecture flips entirely — booking widget first, storytelling second.
// Interaction: 3-step wizard surfaced immediately. Experience imagery unlocks after selection.

import { useState } from "react";

const OCCASIONS = ["Romantic Anniversary", "Birthday Celebration", "Family Reunion", "Business Dinner", "Just Because"];
const SIZES = ["2", "3–4", "5–8", "9–12", "12+"];
const EXPERIENCES = [
  { id: "romantic", name: "Romantic Dinner", price: "from €120/pp", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80", desc: "Candlelit intimacy for two" },
  { id: "villa", name: "Villa Private Chef", price: "from €85/pp", img: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=400&q=80", desc: "Full evening for your group" },
  { id: "cooking", name: "Cooking Class", price: "from €65/pp", img: "https://images.pexels.com/photos/14621560/pexels-photo-14621560.jpeg?auto=compress&cs=tinysrgb&w=400", desc: "Learn Moroccan culinary secrets" },
  { id: "desert", name: "Desert Dining", price: "from €180/pp", img: "https://images.pexels.com/photos/36209321/pexels-photo-36209321.jpeg?auto=compress&cs=tinysrgb&w=400", desc: "Stars, silence, and tagine" },
];

export function Concierge() {
  const [step, setStep] = useState(0);
  const [occasion, setOccasion] = useState<string | null>(null);
  const [size, setSize] = useState<string | null>(null);
  const [exp, setExp] = useState<string | null>(null);

  const progress = step === 0 ? 33 : step === 1 ? 66 : 100;

  return (
    <div style={{ minHeight: "100dvh", background: "#faf8f4", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,400&family=Inter:wght@300;400;500&display=swap');
      .serif { font-family: 'Playfair Display', Georgia, serif; }`}</style>

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-5" style={{ borderBottom: "1px solid #e8e0d4" }}>
        <div>
          <div style={{ fontSize: 13, letterSpacing: "0.15em", color: "#8a6c50", fontWeight: 500 }}>LA TABLE</div>
          <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#c4a882" }}>MARRAKECH</div>
        </div>
        <div style={{ fontSize: 11, color: "#aaa", letterSpacing: "0.1em" }}>CONCIERGE</div>
      </div>

      {/* Step indicator */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-3">
          {["The Occasion", "Your Party", "The Experience"].map((label, i) => (
            <div key={i} className="flex items-center gap-2" style={{ opacity: i <= step ? 1 : 0.35 }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: i <= step ? "hsl(20,50%,40%)" : "#e0d8cd", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "white", fontWeight: 500 }}>
                {i < step ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: 10, color: "#8a7060", letterSpacing: "0.05em" }}>{label}</span>
              {i < 2 && <div style={{ flex: 1, height: 1, background: i < step ? "hsl(20,50%,40%)" : "#e0d8cd", width: 20 }} />}
            </div>
          ))}
        </div>
        <div style={{ height: 2, background: "#e8e0d4", borderRadius: 1 }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "hsl(20,50%,40%)", borderRadius: 1, transition: "width 0.4s ease" }} />
        </div>
      </div>

      <div className="px-6 py-4">
        {/* Step 0 — Occasion */}
        {step === 0 && (
          <div>
            <h2 className="serif mb-1" style={{ fontSize: 26, color: "#2a1f14", fontWeight: 400 }}>
              Tell us about<br /><em>your evening</em>
            </h2>
            <p style={{ fontSize: 13, color: "#9a8070", lineHeight: 1.6, marginBottom: 24 }}>
              We'll match you with the perfect experience.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {OCCASIONS.map(o => (
                <button
                  key={o}
                  onClick={() => { setOccasion(o); setTimeout(() => setStep(1), 300); }}
                  style={{
                    textAlign: "left", padding: "14px 16px", borderRadius: 2,
                    border: `1px solid ${occasion === o ? "hsl(20,50%,40%)" : "#e0d8cd"}`,
                    background: occasion === o ? "hsl(20,50%,96%)" : "white",
                    color: occasion === o ? "hsl(20,50%,30%)" : "#5a4535",
                    fontSize: 14, cursor: "pointer", transition: "all 0.2s",
                    display: "flex", alignItems: "center", justifyContent: "space-between"
                  }}
                >
                  {o}
                  {occasion === o && <span style={{ color: "hsl(20,50%,40%)" }}>✓</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 1 — Party size */}
        {step === 1 && (
          <div>
            <button onClick={() => setStep(0)} style={{ fontSize: 12, color: "#aaa", marginBottom: 16, background: "none", border: "none", cursor: "pointer" }}>← Back</button>
            <h2 className="serif mb-1" style={{ fontSize: 26, color: "#2a1f14", fontWeight: 400 }}>
              How many<br /><em>guests?</em>
            </h2>
            <p style={{ fontSize: 13, color: "#9a8070", lineHeight: 1.6, marginBottom: 24 }}>
              Every table is sized perfectly.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 28 }}>
              {SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => { setSize(s); setTimeout(() => setStep(2), 300); }}
                  style={{
                    padding: "20px 8px", borderRadius: 2, border: `1px solid ${size === s ? "hsl(20,50%,40%)" : "#e0d8cd"}`,
                    background: size === s ? "hsl(20,50%,40%)" : "white",
                    color: size === s ? "white" : "#5a4535",
                    fontSize: 16, fontFamily: "'Playfair Display', Georgia, serif",
                    cursor: "pointer", transition: "all 0.2s"
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            <div style={{ background: "#f5f0e8", borderRadius: 4, padding: "12px 14px" }}>
              <div style={{ fontSize: 11, color: "#9a7050", letterSpacing: "0.1em" }}>YOUR OCCASION</div>
              <div style={{ fontSize: 13, color: "#5a3520", marginTop: 4 }}>{occasion}</div>
            </div>
          </div>
        )}

        {/* Step 2 — Experience */}
        {step === 2 && (
          <div>
            <button onClick={() => setStep(1)} style={{ fontSize: 12, color: "#aaa", marginBottom: 16, background: "none", border: "none", cursor: "pointer" }}>← Back</button>
            <h2 className="serif mb-1" style={{ fontSize: 26, color: "#2a1f14", fontWeight: 400 }}>
              Choose your<br /><em>experience</em>
            </h2>
            <p style={{ fontSize: 13, color: "#9a8070", lineHeight: 1.5, marginBottom: 20 }}>
              For {size} guests · {occasion}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
              {EXPERIENCES.map(e => (
                <button
                  key={e.id}
                  onClick={() => setExp(e.id)}
                  style={{
                    display: "flex", gap: 12, textAlign: "left", padding: 12, borderRadius: 2,
                    border: `2px solid ${exp === e.id ? "hsl(20,50%,40%)" : "#e0d8cd"}`,
                    background: exp === e.id ? "hsl(20,50%,97%)" : "white",
                    cursor: "pointer", transition: "all 0.2s"
                  }}
                >
                  <img src={e.img} alt={e.name} style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 1, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 500, color: "#3a2010", marginBottom: 2 }}>{e.name}</div>
                    <div style={{ fontSize: 12, color: "#9a8070", marginBottom: 4 }}>{e.desc}</div>
                    <div style={{ fontSize: 12, color: "hsl(20,50%,40%)", fontWeight: 500 }}>{e.price}</div>
                  </div>
                </button>
              ))}
            </div>
            <button
              style={{
                width: "100%", padding: "16px", background: exp ? "hsl(20,50%,40%)" : "#e0d8cd",
                color: "white", border: "none", fontSize: 13, letterSpacing: "0.15em", cursor: exp ? "pointer" : "default", transition: "all 0.3s"
              }}
            >
              {exp ? "CONFIRM & CONTINUE →" : "SELECT AN EXPERIENCE"}
            </button>
          </div>
        )}
      </div>

      {/* Bottom social proof — always visible */}
      <div className="px-6 py-4" style={{ borderTop: "1px solid #e8e0d4", background: "white", position: "sticky", bottom: 0 }}>
        <div className="flex items-center gap-3">
          <div className="flex" style={{ marginRight: 4 }}>
            {["30560980", "28730586"].map(id => (
              <img key={id} src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=60`} alt="" style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid white", marginLeft: -6, objectFit: "cover" }} />
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#5a3520" }}>Joined by 150+ guests</div>
            <div style={{ fontSize: 11, color: "#aaa" }}>⭐⭐⭐⭐⭐ 4.9 average</div>
          </div>
        </div>
      </div>
    </div>
  );
}
