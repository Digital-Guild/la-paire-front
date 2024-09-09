import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { navbarData } from "../../data/NavbarData";
import { cn } from "../../lib/utils";
import { useDataFlow } from "../../stores/dataFlow";
import { usePageStore } from "../../stores/pageStore";

function Header() {
  const currentPathname = window.location.pathname;
  const control = useAnimation();
  const currentCardProduct = useDataFlow((state) => state.products);
  const shakeBasket = () => {
    control.start({
      x: [0, 10, -10, 10, -10, 10, -10, 0],
      transition: {
        duration: 0.2,
      },
    });
  };
  const handleOpenBasket = () => {
    usePageStore.getState().setBasketIsOpen(true);
  };
  useEffect(() => {
    if (currentCardProduct.length > 0) {
      shakeBasket();
    }
  }, [currentCardProduct]);
  return (
    <header className="flex left-1/2 -translate-x-1/2 items-center justify-between max-w-[1440px] mx-auto px-[100px] h-[100px] fixed w-full top-0 z-10 backdrop-blur-sm bg-shade-white/60">
      <img src="/logos/default.svg" className="w-[138px] h-[40px]" />
      <nav>
        <ul className="flex items-center gap-x-8">
          {navbarData.map((item, index) => (
            <li key={index + "nav"}>
              <Link
                to={item.path}
                className={cn(
                  "font-medium text-secondary-400",
                  currentPathname === item.path && "text-primary-500 font-bold"
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-x-4">
        <button className="btn">
          <img src="/icons/user.svg" alt="user-icon" className="size-6" />
        </button>
        <button className="btn">
          <img src="/icons/heart.svg" alt="heart-icon" className="size-6" />
        </button>
        <button className="btn">
          <img src="/icons/search.svg" alt="search-icon" className="size-6" />
        </button>
        <motion.button
          animate={control}
          onClick={handleOpenBasket}
          className="btn relative"
        >
          <img src="/icons/basket.svg" alt="basket-icon" className="size-6" />
          <AnimatePresence>
            {currentCardProduct.length > 0 && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-2 -right-2 bg-primary-500 font-semibold text-shade-white rounded-full size-4 flex items-center justify-center"
              >
                <span className="text-xs">{currentCardProduct.length}</span>
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </header>
  );
}

export default Header;
