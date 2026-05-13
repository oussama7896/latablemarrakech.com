// A — Cinematic Fullscreen
// Hypothesis: Immersive snap-scroll editorial. Each scene is a full-bleed image.
// The page IS the photography. Text is minimal, overlaid with restraint.
// Interaction model: vertical snap scrolling through 4 "acts".

export function Cinematic() {
  return (
    <div className="w-full overflow-y-scroll snap-y snap-mandatory" style={{ height: "100dvh", scrollbarWidth: "none" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400&display=swap');
        body { margin: 0; }
        ::-webkit-scrollbar { display: none; }
        .serif { font-family: 'Playfair Display', Georgia, serif; }
        .sans { font-family: 'Inter', system-ui, sans-serif; }
      `}</style>

      {/* Act I — Hero */}
      <section className="relative snap-start" style={{ height: "100dvh", flexShrink: 0 }}>
        <img
          src="https://images.pexels.com/photos/29125650/pexels-photo-29125650.jpeg?auto=compress&cs=tinysrgb&w=800&q=90"
          alt="Moroccan riad"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.55) 100%)" }} />
        <div className="absolute inset-0 flex flex-col justify-between p-8">
          {/* Top nav */}
          <div className="flex justify-between items-start">
            <div>
              <div className="sans text-white text-xs tracking-widest opacity-70 mb-1">LA TABLE</div>
              <div className="sans text-white text-xs tracking-widest opacity-50">MARRAKECH</div>
            </div>
            <button className="border border-white/40 text-white sans text-xs tracking-widest px-4 py-2 backdrop-blur-sm" style={{ letterSpacing: "0.15em" }}>
              RÉSERVER
            </button>
          </div>
          {/* Center text */}
          <div>
            <div className="sans text-white/60 text-xs tracking-widest mb-4" style={{ letterSpacing: "0.25em" }}>MARRAKECH — CHEF PRIVÉ</div>
            <h1 className="serif text-white leading-none mb-6" style={{ fontSize: "clamp(48px, 12vw, 72px)", fontWeight: 400 }}>
              Une Table<br /><em>Rien que<br />pour Vous</em>
            </h1>
            <p className="sans text-white/70 text-sm leading-relaxed max-w-xs mb-8">
              A private chef. Your riad. An evening that belongs only to you.
            </p>
            <div className="flex items-center gap-2 text-white/50 sans text-xs">
              <span>Scroll to explore</span>
              <div className="flex flex-col gap-1">
                <div className="w-px h-8 bg-white/30 mx-auto animate-bounce" />
              </div>
            </div>
          </div>
        </div>
        {/* Progress dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {[0,1,2,3].map(i => (
            <div key={i} className="rounded-full" style={{ width: 4, height: i === 0 ? 20 : 4, background: i === 0 ? "white" : "rgba(255,255,255,0.3)" }} />
          ))}
        </div>
      </section>

      {/* Act II — The Food */}
      <section className="relative snap-start" style={{ height: "100dvh", flexShrink: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=800&q=85"
          alt="Moroccan tagine"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)" }} />
        <div className="absolute top-0 left-0 p-8 pt-16">
          <div className="sans text-white/50 text-xs tracking-widest mb-3" style={{ letterSpacing: "0.2em" }}>ACT II</div>
          <h2 className="serif text-white mb-4" style={{ fontSize: 40, fontWeight: 400, lineHeight: 1.1 }}>
            The Menu<br /><em>Is Yours</em>
          </h2>
          <p className="sans text-white/70 text-sm leading-relaxed" style={{ maxWidth: 240 }}>
            No fixed menu. Every dish is composed around your desires — allergies, memories, obsessions.
          </p>
        </div>
        {/* Bottom strip */}
        <div className="absolute bottom-0 left-0 right-0 p-6" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }}>
          <div className="flex gap-6">
            {["Tagine", "Pastilla", "Couscous", "Mechoui"].map(d => (
              <div key={d} className="text-white/60 sans text-xs" style={{ borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: 8 }}>{d}</div>
            ))}
          </div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {[0,1,2,3].map(i => (
            <div key={i} className="rounded-full" style={{ width: 4, height: i === 1 ? 20 : 4, background: i === 1 ? "white" : "rgba(255,255,255,0.3)" }} />
          ))}
        </div>
      </section>

      {/* Act III — The Chef */}
      <section className="relative snap-start" style={{ height: "100dvh", flexShrink: 0 }}>
        <img
          src="https://images.pexels.com/photos/14621560/pexels-photo-14621560.jpeg?auto=compress&cs=tinysrgb&w=800&q=85"
          alt="Chef cooking"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.5)" }} />
        <div className="absolute inset-0 flex flex-col justify-center p-8">
          <div className="sans text-white/50 text-xs tracking-widest mb-3" style={{ letterSpacing: "0.2em" }}>ACT III</div>
          <h2 className="serif text-white mb-6" style={{ fontSize: 40, fontWeight: 400, lineHeight: 1.1 }}>
            <em>The Artist<br /></em>Behind<br />the Flame
          </h2>
          <div className="w-8" style={{ height: 1, background: "rgba(201,163,84,0.8)", marginBottom: 20 }} />
          <p className="sans text-white/70 text-sm leading-relaxed" style={{ maxWidth: 260 }}>
            Chef Youssef trained in Lyon and Paris before returning to Marrakech to honor his grandmother's recipes.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
              <img src="https://images.pexels.com/photos/30560980/pexels-photo-30560980.jpeg?auto=compress&cs=tinysrgb&w=80" alt="Chef" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="sans text-white text-sm">Chef Youssef M.</div>
              <div className="sans text-white/50 text-xs">Marrakech, Morocco</div>
            </div>
          </div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {[0,1,2,3].map(i => (
            <div key={i} className="rounded-full" style={{ width: 4, height: i === 2 ? 20 : 4, background: i === 2 ? "white" : "rgba(255,255,255,0.3)" }} />
          ))}
        </div>
      </section>

      {/* Act IV — Reserve */}
      <section className="relative snap-start flex flex-col justify-between" style={{ height: "100dvh", flexShrink: 0, background: "#0d0904" }}>
        <img
          src="https://images.pexels.com/photos/28730586/pexels-photo-28730586.jpeg?auto=compress&cs=tinysrgb&w=800&q=85"
          alt="Lanterns"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 flex flex-col justify-center p-8">
          <div className="sans text-white/50 text-xs tracking-widest mb-6" style={{ letterSpacing: "0.25em" }}>ACT IV — FIN</div>
          <h2 className="serif text-white mb-3" style={{ fontSize: 48, fontWeight: 400, lineHeight: 1 }}>
            Your<br /><em>Evening<br />Awaits</em>
          </h2>
          <p className="sans text-white/50 text-sm leading-relaxed mb-10" style={{ maxWidth: 260 }}>
            From 2 to 20 guests. In your riad, villa, or under the stars.
          </p>
          <button className="w-full py-4 sans text-sm tracking-widest" style={{ background: "hsl(20,50%,40%)", color: "white", letterSpacing: "0.15em", border: "none" }}>
            BOOK YOUR EVENING
          </button>
          <div className="mt-4 flex items-center justify-center gap-2 text-white/30 sans text-xs">
            <span>or WhatsApp</span>
            <span>+212 600 000 000</span>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            {[["150+", "Dinners"], ["4.9★", "Rating"], ["12", "Experiences"]].map(([n, l]) => (
              <div key={l}>
                <div className="serif text-white text-xl" style={{ color: "hsl(45,40%,65%)" }}>{n}</div>
                <div className="sans text-white/40 text-xs mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {[0,1,2,3].map(i => (
            <div key={i} className="rounded-full" style={{ width: 4, height: i === 3 ? 20 : 4, background: i === 3 ? "white" : "rgba(255,255,255,0.3)" }} />
          ))}
        </div>
      </section>
    </div>
  );
}
