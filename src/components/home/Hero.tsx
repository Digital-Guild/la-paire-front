import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../constants/environnements";
import { getHeroData } from "../../controllers/product";
import Basket from "../../icons/Basket";
import { cn } from "../../lib/utils";
import { useModularRQuery } from "../../services/ModularReactQueryService";
import { Product } from "../../types/product";

function Hero() {
  const [dataProduct, setDataProduct] = useState<Array<Product>>([]);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const {
    data,
    isLoading: loader,
    isError,
  } = useModularRQuery({
    queryKey: "hero",
    queryFn: getHeroData,
    staleTime: 10,
  });
  const isLoading = loader || isError || !data;

  const changeCurrentProduct = (index: number) => {
    const nextProduct = dataProduct[index];
    setCurrentProduct(nextProduct);
    if (interval.current) clearInterval(interval.current);
    interval.current = setInterval(() => {
      const nextIndex = index + 1;
      if (nextIndex === dataProduct.length) {
        changeCurrentProduct(0);
      } else {
        changeCurrentProduct(nextIndex);
      }
    }, 3000);
  };
  const getIndexCurrenProduct = () => {
    return dataProduct.findIndex(
      (product) => product.id === currentProduct?.id
    );
  };
  useEffect(() => {
    if (!data) return;
    setDataProduct(data);
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [data]);

  useEffect(() => {
    if (dataProduct.length > 0) {
      changeCurrentProduct(0);
    }
  }, [dataProduct]);
  return (
    <section className="p-4 flex gap-x-5">
      <div className="relative flex justify-center gap-y-4 flex-col items-start flex-1">
        {isLoading && (
          <div className="animate-pulse absolute flex gap-y-4 items-start flex-col w-full">
            <span className="w-2/3 rounded-2xl h-14 bg-secondary-50"></span>
            <span className="w-1/2 rounded-2xl h-14 bg-secondary-50"></span>
            <span className="w-3/4 rounded-xl h-6 mt-4 bg-secondary-50"></span>
            <span className="w-2/3 rounded-2xl h-14 bg-secondary-50 mt-4"></span>
          </div>
        )}
        {!isLoading &&
          currentProduct &&
          dataProduct.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -150 }}
              animate={{
                opacity: product.id === currentProduct.id ? 1 : 0,
                x: product.id === currentProduct.id ? 0 : -150,
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
              exit={{ opacity: 0, x: -150 }}
              className="absolute flex gap-y-4 items-start flex-col"
            >
              <h2 className="max-w-[374px] font-black text-[64px] text-primary-500 ">
                {product.name}
              </h2>
              <span className="max-w-[415px] line-clamp-3 text-ellipsis">
                {product.description}
              </span>
              <button className="btn btn-primary px-[24px] mt-4">
                <span>Acheter maintenant</span>
                <Basket color="#fff" />
              </button>
            </motion.div>
          ))}

        {!isLoading && (
          <div className="flex gap-x-2 absolute bottom-6 right-0">
            {Array.from({ length: 5 }).map((_, i) => (
              <button
                key={i + "dot"}
                onClick={() => changeCurrentProduct(i)}
                className={cn(
                  "rounded-full size-2 bg-secondary-100 transition-colors duration-300",
                  i === getIndexCurrenProduct() && "bg-primary-500"
                )}
              />
            ))}
          </div>
        )}
      </div>
      <div
        className={cn(
          "relative flex-1 rounded-3xl bg-secondary-50 h-[600px] flex justify-center items-center",
          isLoading && "animate-pulse"
        )}
      >
        {isLoading === false &&
          dataProduct.map((product) => (
            <motion.img
              key={product.id}
              initial={{ opacity: 0, scale: 0.2, rotate: 0 }}
              animate={{
                opacity: product.id === currentProduct?.id ? 1 : 0,
                scale: product.id === currentProduct?.id ? 1 : 0.2,
                rotate: product.id === currentProduct?.id ? -12 : 0,
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
              exit={{ opacity: 0, scale: 0.2, rotate: 0 }}
              // src={`/temp/shoe${index + 1}.png`}
              src={API_URL + product.medias[0].path}
              alt="hero"
              className="object-contain absolute w-full -rotate-12"
            />
          ))}
      </div>
    </section>
  );
}

export default Hero;
