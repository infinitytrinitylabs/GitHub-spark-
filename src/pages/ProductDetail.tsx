import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../data/products';
import { ProductViewer } from '../scenes/ProductViewer';
import { useCart } from '../store/cart';

export function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);
  const add = useCart((s) => s.add);

  if (!product) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p className="eyebrow text-daffodil mb-4">404</p>
        <h1 className="display-lg lowercase mb-6">This piece has found a home.</h1>
        <Link to="/shop" className="eyebrow border-b border-daffodil pb-1">
          Back to archive →
        </Link>
      </section>
    );
  }

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id,
  ).slice(0, 3);

  return (
    <section className="relative z-10 min-h-screen bg-ink pt-28 pb-24">
      <div className="grid lg:grid-cols-2 gap-10 px-6 md:px-12">
        {/* Viewer */}
        <motion.div
          className="aspect-square lg:aspect-auto lg:h-[calc(100vh-9rem)] sticky top-28 rounded-sm overflow-hidden"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{
            background: `radial-gradient(circle at 30% 20%, ${product.palette[1]}33, transparent 60%), linear-gradient(160deg, ${product.palette[0]}22, ${product.palette[2]}22)`,
          }}
        >
          <ProductViewer product={product} />
          <div className="absolute bottom-4 left-4 eyebrow text-bone/70 bg-ink/40 backdrop-blur px-2 py-1">
            Drag · rotate · zoom
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          className="flex flex-col gap-8 lg:py-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <div>
            <Link to="/shop" className="eyebrow text-bone/50 hover:text-daffodil">
              ← back to archive
            </Link>
          </div>
          <div>
            <p className="eyebrow text-daffodil mb-4">{product.category}</p>
            <h1 className="display-lg lowercase leading-none">{product.name}</h1>
            <p className="mt-4 text-bone/70 text-xl">{product.tagline}</p>
          </div>

          <div className="grid grid-cols-3 gap-6 border-y border-bone/15 py-6">
            <Spec label="Era" value={product.era} />
            <Spec label="Material" value={product.material} />
            <Spec label="Price" value={`$${product.price}`} />
          </div>

          <p className="text-bone/70 text-lg leading-relaxed max-w-lg text-balance">
            {product.story}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => add(product)}
              className="bg-daffodil text-ink eyebrow py-4 px-10 hover:bg-bone transition-colors"
            >
              Add to basket · ${product.price}
            </button>
            <button className="eyebrow border border-bone/30 py-4 px-8 hover:border-daffodil hover:text-daffodil transition-colors">
              Request a closer look
            </button>
          </div>

          <ul className="text-bone/60 text-sm space-y-2 mt-6">
            <li>· One of one — when it's gone, it's gone.</li>
            <li>· Free mending for life at our workshop.</li>
            <li>· Considered shipping, packaged in recycled linen.</li>
          </ul>
        </motion.div>
      </div>

      {related.length > 0 && (
        <div className="mt-32 px-6 md:px-12">
          <h2 className="display-lg lowercase mb-10">In the same house.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {related.map((p) => (
              <Link to={`/product/${p.id}`} key={p.id} className="group">
                <div
                  className="aspect-[4/5] rounded-sm"
                  style={{
                    background: `linear-gradient(160deg, ${p.palette[0]}, ${p.palette[2]})`,
                  }}
                />
                <div className="mt-3 flex items-baseline justify-between">
                  <p className="font-display text-lg group-hover:text-daffodil transition-colors">
                    {p.name}
                  </p>
                  <span className="font-mono text-xs text-bone/60">${p.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow text-bone/50">{label}</p>
      <p className="font-display text-lg mt-2">{value}</p>
    </div>
  );
}
