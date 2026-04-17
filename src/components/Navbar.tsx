import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../store/cart';

export function Navbar() {
  const count = useCart((s) => s.count());
  const openCart = useCart((s) => s.open);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 mix-blend-difference">
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 text-bone">
        <Link to="/" className="flex items-center gap-2 group" aria-label="dephodile home">
          <span className="h-2.5 w-2.5 rounded-full bg-daffodil transition-transform group-hover:scale-125" />
          <span className="font-display text-xl tracking-tight lowercase">dephodile.co</span>
        </Link>

        <ul className="hidden md:flex items-center gap-10 eyebrow text-[0.7rem]">
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `transition-colors hover:text-daffodil ${isActive ? 'text-daffodil' : ''}`
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/story"
              className={({ isActive }) =>
                `transition-colors hover:text-daffodil ${isActive ? 'text-daffodil' : ''}`
              }
            >
              Story
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/journal"
              className={({ isActive }) =>
                `transition-colors hover:text-daffodil ${isActive ? 'text-daffodil' : ''}`
              }
            >
              Journal
            </NavLink>
          </li>
        </ul>

        <button
          onClick={openCart}
          className="eyebrow text-[0.7rem] flex items-center gap-2 hover:text-daffodil transition-colors"
          aria-label={`Open cart, ${count} items`}
        >
          <span>Cart</span>
          <span className="inline-flex items-center justify-center min-w-[1.4rem] h-[1.4rem] px-1 rounded-full border border-current text-[0.6rem]">
            {count.toString().padStart(2, '0')}
          </span>
        </button>
      </nav>
    </header>
  );
}
