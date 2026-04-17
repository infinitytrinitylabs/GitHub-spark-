import { motion } from 'framer-motion';

export function Story() {
  return (
    <section className="relative z-10 min-h-screen bg-ink pt-36 pb-24 px-6 md:px-12">
      <div className="max-w-4xl">
        <motion.p
          className="eyebrow text-daffodil mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          The story
        </motion.p>
        <motion.h1
          className="display-xl lowercase text-balance leading-none"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          A <span className="italic text-daffodil">daffodil</span> comes back every
          spring, in the same place, wearing the same yellow.
        </motion.h1>
      </div>

      <div className="grid md:grid-cols-2 gap-16 mt-24 max-w-6xl">
        <motion.p
          className="text-bone/70 text-xl leading-relaxed text-balance"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          dephodile was founded on a stubborn hunch: that clothes and objects, like
          daffodils, deserve to return. Not in a new colourway, not as a copy, but as
          themselves — older, gentler, still worth the light they catch.
        </motion.p>
        <motion.p
          className="text-bone/70 text-xl leading-relaxed text-balance"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.15 }}
          viewport={{ once: true }}
        >
          We source from estate sales across Rajasthan, Antwerp and the south of France.
          We mend, re-dye, and re-line. Then we render every piece in 3D, because a
          photograph flattens what a second-hand object really is: a thing with a back,
          a seam, a story you can turn in your hand.
        </motion.p>
      </div>

      <div className="mt-32 grid md:grid-cols-3 gap-10">
        {[
          {
            n: '01',
            t: 'Find',
            d: 'We walk markets. We listen. We buy only what could survive another generation.',
          },
          {
            n: '02',
            t: 'Restore',
            d: 'Our Jaipur workshop mends, re-lines and, occasionally, leaves the past visible on purpose.',
          },
          {
            n: '03',
            t: 'Render',
            d: 'Each object is 3D-captured and published here, rotating quietly, waiting for its next owner.',
          },
        ].map((b) => (
          <motion.div
            key={b.n}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="border-t border-bone/20 pt-6"
          >
            <p className="eyebrow text-daffodil">{b.n}</p>
            <h3 className="font-display text-3xl mt-4">{b.t}</h3>
            <p className="text-bone/60 mt-4 text-balance">{b.d}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
