import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES, PRODUCTS } from '../data/products';

export function Home() {
  return (
    <>
      {/* Hero section — the 3D HeroScene renders behind this as a fixed canvas */}
      <section className="relative z-10 min-h-[120vh] flex flex-col justify-between px-6 md:px-12 pt-36 pb-20 pointer-events-none">
        <div className="max-w-4xl pointer-events-auto">
          <motion.p
            className="eyebrow text-daffodil mb-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            est. 2026 · a living archive
          </motion.p>
          <motion.h1
            className="display-xl lowercase text-balance"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          >
            worn stories,
            <br />
            <span className="italic text-daffodil">reborn.</span>
          </motion.h1>
        </div>

        <motion.div
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mt-20 pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1 }}
        >
          <p className="max-w-md text-bone/70 text-lg leading-relaxed text-balance">
            dephodile is a 3D marketplace for thrifted clothes, heirloom jewellery and
            considered accessories. Every piece is rendered in real-time, so you meet it
            the way you would in a shop — turning, catching the light, breathing.
          </p>
          <Link
            to="/shop"
            className="eyebrow text-bone border-b border-daffodil pb-1 hover:text-daffodil transition-colors"
          >
            Enter the archive →
          </Link>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="relative z-10 bg-ink/70 backdrop-blur-sm border-t border-bone/10">
        <div className="px-6 md:px-12 py-24">
          <p className="eyebrow text-bone/60 mb-8 reveal">Three houses, one archive</p>
          <div className="grid md:grid-cols-3 gap-10">
            {CATEGORIES.map((c, i) => (
              <Link
                to={`/shop?category=${c.id}`}
                key={c.id}
                className="group block border-t border-bone/20 pt-8 reveal"
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-4xl md:text-5xl lowercase group-hover:text-daffodil transition-colors">
                    {c.label}
                  </h2>
                  <span className="eyebrow text-bone/40">0{i + 1}</span>
                </div>
                <p className="text-bone/60 mt-5 max-w-sm text-balance">{c.blurb}</p>
                <span className="inline-block mt-6 eyebrow text-daffodil opacity-0 group-hover:opacity-100 transition-opacity">
                  Browse →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="relative z-10 bg-ink px-6 md:px-12 py-32">
        <div className="max-w-5xl">
          <p className="eyebrow text-daffodil mb-10 reveal">A quiet manifesto</p>
          <h2 className="display-lg lowercase text-balance reveal">
            Nothing here was made for this season. Every piece is older than the&nbsp;
            <span className="italic text-daffodil">trend</span> you&rsquo;d buy it for.
          </h2>
          <div className="grid md:grid-cols-3 gap-10 mt-20">
            {[
              {
                t: 'Sourced, not stocked',
                d: 'We walk estate sales, village markets, and studios we were told not to visit.',
              },
              {
                t: 'Rendered, not photographed',
                d: 'Every product you see turns in real 3D, so you know the form before the post.',
              },
              {
                t: 'Repaired, not replaced',
                d: 'Free lifetime mending from our Jaipur workshop on any piece bought here.',
              },
            ].map((b, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                <p className="font-display text-2xl">{b.t}</p>
                <p className="text-bone/60 mt-3 text-balance">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured picks */}
      <section className="relative z-10 bg-ink px-6 md:px-12 pb-32">
        <div className="flex items-end justify-between mb-10">
          <h2 className="display-lg lowercase reveal">This week&rsquo;s picks.</h2>
          <Link to="/shop" className="eyebrow text-daffodil reveal">
            All pieces →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 3).map((p, i) => (
            <Link
              to={`/product/${p.id}`}
              key={p.id}
              className="group block reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className="aspect-[4/5] rounded-sm relative overflow-hidden"
                style={{
                  background: `linear-gradient(160deg, ${p.palette[0]}, ${p.palette[1]} 55%, ${p.palette[2]})`,
                }}
              >
                <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors" />
                <span className="absolute bottom-4 left-4 eyebrow text-bone/90">
                  {p.era}
                </span>
                <span className="absolute bottom-4 right-4 font-mono text-bone/90 text-sm">
                  ${p.price}
                </span>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <p className="font-display text-xl">{p.name}</p>
                <span className="eyebrow text-bone/40 group-hover:text-daffodil">
                  View →
                </span>
              </div>
              <p className="text-bone/50 text-sm mt-1">{p.tagline}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
