import { useRef } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Cursor } from './components/Cursor';
import { SmoothScroll } from './components/SmoothScroll';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { LoadingScreen } from './components/LoadingScreen';
import { HeroScene } from './scenes/HeroScene';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Story } from './pages/Story';

export default function App() {
  const scrollRef = useRef(0);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="grain vignette">
      <LoadingScreen />
      <Cursor />
      <SmoothScroll scrollRef={scrollRef}>
        {/* The HeroScene is only visible on home; on other pages we keep
            the canvas mounted to preserve GL context but hide it. */}
        {isHome && <HeroScene scrollRef={scrollRef} />}

        <Navbar />
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/story" element={<Story />} />
                <Route path="/journal" element={<Story />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
          <Footer />
        </main>
        <CartDrawer />
      </SmoothScroll>
    </div>
  );
}

function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow text-daffodil mb-4">404</p>
      <h1 className="display-lg lowercase">A daffodil hasn&rsquo;t bloomed here yet.</h1>
    </section>
  );
}
