// C — Story Scrollytelling
// Hypothesis: The page narrates a single evening from arrival to farewell.
// Information architecture: chronological story chapters, not product categories.
// Interaction: classic scroll. Left column = fixed chapter titles, right = scrolling story.
// As user reads, they live the experience before booking it.

const CHAPTERS = [
  {
    time: "19:00",
    act: "Arrival",
    title: "The Riad Awakens",
    body: "You cross the threshold of the medina. Candlelight shimmers on Zellige tile. The scent of rose water and orange blossom meets you at the door.",
    img: "https://images.pexels.com/photos/29125650/pexels-photo-29125650.jpeg?auto=compress&cs=tinysrgb&w=800&q=85",
    color: "#1a0f07",
  },
  {
    time: "19:30",
    act: "L'Accueil",
    title: "Mint Tea & Pastilla",
    body: "The chef greets you with a glass of fresh mint tea, poured from height. Warm bastilla bites, dusted with cinnamon and powdered sugar, arrive before a word is spoken.",
    img: "https://images.pexels.com/photos/30560980/pexels-photo-30560980.jpeg?auto=compress&cs=tinysrgb&w=800&q=85",
    color: "#0e1207",
  },
  {
    time: "20:15",
    act: "La Cuisine",
    title: "The Chef at Work",
    body: "In the kitchen, you can hear the sizzle of chermoula on lamb. You peek in — and Chef offers you a taste of tomorrow's spice blend straight from a terracotta bowl.",
    img: "https://images.pexels.com/photos/14621560/pexels-photo-14621560.jpeg?auto=compress&cs=tinysrgb&w=800&q=85",
    color: "#100a03",
  },
  {
    time: "21:00",
    act: "Le Festin",
    title: "The Table Is Set",
    body: "Dish after dish emerges: slow-cooked tagine, seven-vegetable couscous, mechoui lamb with cumin salt. Bread broken by hand. Stories exchanged. Time stops.",
    img: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=85",
    color: "#0c0907",
  },
  {
    time: "23:00",
    act: "La Nuit",
    title: "The Medina at Midnight",
    body: "As the lanterns dim and the muezzin calls, you realize this was not dinner. It was a memory — one you'll carry back across the world.",
    img: "https://images.pexels.com/photos/30356249/pexels-photo-30356249.jpeg?auto=compress&cs=tinysrgb&w=800&q=85",
    color: "#07090f",
  },
];

export function Scrollytell() {
  return (
    <div style={{ minHeight: "100dvh", background: "#0a0704", color: "white", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Inter:wght@300;400&display=swap');
        .serif { font-family: 'Playfair Display', Georgia, serif; }
        body { margin: 0; }
      `}</style>

      {/* Fixed header */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(to bottom, rgba(10,7,4,0.9), transparent)" }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(201,163,84,0.9)" }}>LA TABLE</div>
          <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)" }}>MARRAKECH</div>
        </div>
        <button style={{ fontSize: 10, letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)", background: "none", border: "1px solid rgba(255,255,255,0.2)", padding: "6px 14px", cursor: "pointer" }}>
          RÉSERVER
        </button>
      </div>

      {/* Opening title */}
      <div style={{ height: "100dvh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "40px 24px", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <img src="https://images.pexels.com/photos/28730586/pexels-photo-28730586.jpeg?auto=compress&cs=tinysrgb&w=800" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.3 }} />
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 10, letterSpacing: "0.3em", color: "rgba(201,163,84,0.7)", marginBottom: 16 }}>AN EVENING AT LA TABLE</div>
          <h1 className="serif" style={{ fontSize: 52, fontWeight: 400, lineHeight: 1, margin: "0 0 16px", fontStyle: "italic" }}>
            Une Soirée<br />Rien que<br />pour Vous
          </h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 280, marginBottom: 32 }}>
            Scroll through a single evening with Chef Youssef. Five acts. One table. Yours.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.3)", fontSize: 11 }}>
            <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.2)" }} />
            Scroll to begin
          </div>
        </div>
      </div>

      {/* Timeline chapters */}
      {CHAPTERS.map((ch, i) => (
        <div key={i} style={{ minHeight: "90dvh", display: "flex", flexDirection: "column", position: "relative" }}>
          {/* Full-bleed image */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <img src={ch.img} alt={ch.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.35 }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, ${ch.color} 0%, transparent 40%, ${ch.color} 100%)` }} />
          </div>

          {/* Chapter content */}
          <div style={{ position: "relative", padding: "60px 24px 40px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            {/* Time & act badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 28, color: "rgba(201,163,84,0.8)", fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}>{ch.time}</div>
              <div style={{ flex: 1, height: 1, background: "rgba(201,163,84,0.2)" }} />
              <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)" }}>ACT {i+1}</div>
            </div>

            {/* Story */}
            <div style={{ marginTop: 40 }}>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "rgba(201,163,84,0.6)", marginBottom: 12 }}>{ch.act.toUpperCase()}</div>
              <h2 className="serif" style={{ fontSize: 34, fontWeight: 400, lineHeight: 1.1, marginBottom: 20, fontStyle: "italic" }}>
                {ch.title}
              </h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: 320 }}>
                {ch.body}
              </p>
            </div>

            {/* Chapter nav dots */}
            <div style={{ display: "flex", gap: 6, paddingTop: 32 }}>
              {CHAPTERS.map((_, j) => (
                <div key={j} style={{ height: 2, width: j === i ? 24 : 8, background: j === i ? "rgba(201,163,84,0.8)" : "rgba(255,255,255,0.2)", borderRadius: 1, transition: "width 0.3s" }} />
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Final CTA */}
      <div style={{ padding: "60px 24px 80px", textAlign: "center", background: "#050302" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(201,163,84,0.6)", marginBottom: 20 }}>YOUR EVENING AWAITS</div>
        <h2 className="serif" style={{ fontSize: 40, fontWeight: 400, lineHeight: 1.1, marginBottom: 24, fontStyle: "italic", color: "white" }}>
          Write Your<br />Own Chapter
        </h2>
        <button style={{ width: "100%", maxWidth: 320, padding: "18px", background: "hsl(20,50%,40%)", color: "white", border: "none", fontSize: 12, letterSpacing: "0.2em", cursor: "pointer", marginBottom: 14 }}>
          RESERVE YOUR EVENING
        </button>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>From €85 per person · From 2 guests</div>
      </div>
    </div>
  );
}
