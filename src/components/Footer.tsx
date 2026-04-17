export function Footer() {
  return (
    <footer className="relative z-10 bg-ink text-bone border-t border-bone/10 mt-32">
      <div className="overflow-hidden py-6 border-b border-bone/10">
        <div className="marquee-track font-display text-6xl md:text-8xl lowercase whitespace-nowrap">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="px-8 text-bone/70">
              dephodile&nbsp;·&nbsp;worn stories, reborn
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-6 md:px-12 py-16">
        <div>
          <p className="eyebrow mb-4 text-bone/60">Shop</p>
          <ul className="space-y-2 font-display text-xl">
            <li>Thrifted</li>
            <li>Jewellery</li>
            <li>Accessories</li>
            <li>New arrivals</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 text-bone/60">Studio</p>
          <ul className="space-y-2 font-display text-xl">
            <li>Story</li>
            <li>Journal</li>
            <li>Sourcing</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 text-bone/60">Care</p>
          <ul className="space-y-2 font-display text-xl">
            <li>Shipping</li>
            <li>Returns</li>
            <li>Repair</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 text-bone/60">Newsletter</p>
          <p className="text-bone/60 text-sm mb-4">
            Monthly letters from the archive. No noise.
          </p>
          <form
            className="flex border-b border-bone/40"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="your@address"
              className="flex-1 bg-transparent py-2 outline-none placeholder:text-bone/30"
              aria-label="email"
            />
            <button type="submit" className="eyebrow text-daffodil">
              Join →
            </button>
          </form>
        </div>
      </div>

      <div className="px-6 md:px-12 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-bone/40 border-t border-bone/10">
        <p>© {new Date().getFullYear()} dephodile studio. All garments once loved.</p>
        <p className="font-mono">v0.1 · rendered in real-time</p>
      </div>
    </footer>
  );
}
