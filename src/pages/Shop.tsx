import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES, PRODUCTS, type Category } from '../data/products';
import { ProductCardCanvas } from '../scenes/ProductCardCanvas';

export function Shop() {
  const [params, setParams] = useSearchParams();
  const active = (params.get('category') as Category | null) ?? 'all';

  const list = useMemo(() => {
    if (active === 'all') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === active);
  }, [active]);

  const setCat = (c: Category | 'all') => {
    if (c === 'all') setParams({});
    else setParams({ category: c });
  };

  return (
    <section className="relative z-10 min-h-screen px-6 md:px-12 pt-36 pb-20 bg-ink">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <p className="eyebrow text-daffodil mb-4">The archive</p>
          <h1 className="display-lg lowercase">Every piece, turning in light.</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <FilterPill active={active === 'all'} onClick={() => setCat('all')}>
            All
          </FilterPill>
          {CATEGORIES.map((c) => (
            <FilterPill
              key={c.id}
              active={active === c.id}
              onClick={() => setCat(c.id)}
            >
              {c.label}
            </FilterPill>
          ))}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {list.map((p, i) => (
          <motion.article
            layout
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (i % 6) * 0.06 }}
            className="group"
          >
            <Link to={`/product/${p.id}`} className="block">
              <div
                className="aspect-[4/5] relative overflow-hidden rounded-sm"
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${p.palette[1]}33, transparent 55%), linear-gradient(160deg, ${p.palette[0]}, ${p.palette[2]})`,
                }}
              >
                <ProductCardCanvas product={p} />
                <div className="absolute top-4 left-4 eyebrow text-bone/90 bg-ink/30 backdrop-blur px-2 py-1">
                  {p.category}
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-bone/90 text-sm bg-ink/40 backdrop-blur px-2 py-1">
                  ${p.price}
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h2 className="font-display text-xl group-hover:text-daffodil transition-colors">
                  {p.name}
                </h2>
                <span className="eyebrow text-bone/40">{p.era}</span>
              </div>
              <p className="text-bone/50 text-sm mt-1">{p.tagline}</p>
            </Link>
          </motion.article>
        ))}
      </motion.div>

      {list.length === 0 && (
        <p className="text-bone/60 mt-12">No pieces match this filter — yet.</p>
      )}
    </section>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`eyebrow px-4 py-2 border rounded-full transition-colors ${
        active
          ? 'bg-daffodil text-ink border-daffodil'
          : 'border-bone/30 text-bone hover:border-daffodil hover:text-daffodil'
      }`}
    >
      {children}
    </button>
  );
}
