import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../store/cart';

export function CartDrawer() {
  const { isOpen, close, lines, setQty, remove, subtotal, clear } = useCart();
  const total = subtotal();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[90] bg-ink/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.aside
            key="drawer"
            className="fixed top-0 right-0 bottom-0 z-[95] w-full sm:max-w-[460px] bg-cream text-ink flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between px-8 py-7 border-b border-ink/10">
              <h2 className="font-display text-3xl">Your basket</h2>
              <button onClick={close} className="eyebrow hover:text-rust" aria-label="Close cart">
                Close ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
              {lines.length === 0 && (
                <p className="text-ink/60 text-balance">
                  Nothing inside yet. Every piece in dephodile has a past — find the one that
                  belongs in your future.
                </p>
              )}

              {lines.map((l) => (
                <article
                  key={l.product.id}
                  className="flex gap-5 border-b border-ink/10 pb-6 last:border-none"
                >
                  <div
                    className="w-20 h-24 shrink-0 rounded-sm"
                    style={{
                      background: `linear-gradient(160deg, ${l.product.palette[0]}, ${l.product.palette[1]} 60%, ${l.product.palette[2]})`,
                    }}
                    aria-hidden
                  />
                  <div className="flex-1">
                    <div className="flex justify-between gap-4">
                      <div>
                        <h3 className="font-display text-lg leading-tight">{l.product.name}</h3>
                        <p className="text-ink/60 text-xs mt-1">{l.product.tagline}</p>
                      </div>
                      <p className="font-mono text-sm">${l.product.price * l.qty}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-ink/20">
                        <button
                          className="px-3 py-1 hover:bg-ink/5"
                          onClick={() => setQty(l.product.id, l.qty - 1)}
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 font-mono text-xs">{l.qty}</span>
                        <button
                          className="px-3 py-1 hover:bg-ink/5"
                          onClick={() => setQty(l.product.id, l.qty + 1)}
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="eyebrow text-ink/50 hover:text-rust"
                        onClick={() => remove(l.product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {lines.length > 0 && (
              <div className="px-8 py-6 border-t border-ink/10 space-y-4">
                <div className="flex items-end justify-between">
                  <span className="eyebrow text-ink/60">Subtotal</span>
                  <span className="font-display text-3xl">${total}</span>
                </div>
                <p className="text-xs text-ink/50">
                  Taxes & considered shipping calculated at checkout.
                </p>
                <button className="w-full bg-ink text-bone py-4 eyebrow hover:bg-rust transition-colors">
                  Checkout →
                </button>
                <button className="w-full eyebrow text-ink/50 hover:text-rust" onClick={clear}>
                  Clear basket
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
