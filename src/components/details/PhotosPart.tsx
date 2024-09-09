import { id } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "../../constants/environnements";
import { cn } from "../../lib/utils";
import { Media, Product } from "../../types/product";

type PhotosPartProps = {
  slug: string;
  isFetching: boolean;
  product?: Product | null;
};
function PhotosPart({ slug, isFetching, product }: PhotosPartProps) {
  const [imgSelected, setImgSelected] = useState<Media>();
  const [currentImg, setCurrentImg] = useState<number>(0);
  const [previousImg, setPreviousImg] = useState<number>(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const handleAutoChangeImage = () => {
    if (!product) return;
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      const index = product?.medias.findIndex(
        (item) => item.id === imgSelected?.id
      );
      const nextIndex = index === product.medias.length - 1 ? 0 : index! + 1;
      setPreviousImg(currentImg);
      setCurrentImg(nextIndex);
      setImgSelected(product?.medias[nextIndex]);
    }, 5000);
  };
  useEffect(() => {
    if (!product) return;
    handleAutoChangeImage();
    return () => {
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [imgSelected, product]);
  useEffect(() => {
    if (!product) return;
    setImgSelected(product.medias[0]);
  }, [product]);
  return (
    <div className="w-3/5 flex flex-col gap-y-4">
      <motion.div
        layoutId={slug}
        className={cn(
          "h-[533px] relative bg-secondary-50 rounded-3xl flex items-center justify-center overflow-hidden",
          isFetching && "animate-pulse"
        )}
      >
        <AnimatePresence mode="sync">
          {product && isFetching === false && (
            <motion.div
              key={imgSelected?.id}
              initial={{
                x:
                  (previousImg < currentImg && currentImg !== 0) ||
                  currentImg == product?.medias.length - 1
                    ? 250
                    : -250,
                opacity: 0,
              }}
              animate={{ x: 0, opacity: 1 }}
              exit={{
                x:
                  (previousImg < currentImg &&
                    currentImg != product?.medias.length - 1) ||
                  currentImg === 0
                    ? -250
                    : 250,
                opacity: 0,
                transition: { duration: 0.15 },
              }}
              className="absolute flex justify-center items-center size-full"
            >
              <img
                src={API_URL + imgSelected?.path}
                alt="shoe"
                className="size-full object-contain absolute"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        //stager
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
        className="grid grid-cols-4 h-[146px] gap-x-[10px]"
      >
        {isFetching &&
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index + "productinfo" + id}
              className="bg-secondary-50 rounded-2xl h-full animate-pulse"
            ></div>
          ))}
        {isFetching === false &&
          product?.medias.map((image, index) => (
            <motion.button
              key={image.id}
              onClick={() => setImgSelected(image)}
              className={cn(
                "btn relative bg-secondary-50 rounded-2xl flex items-center justify-center border-2 border-secondary-50 transition-[border]",
                imgSelected?.id === image.id && "border-2 border-primary-500"
              )}
            >
              <img
                src={API_URL + image.path}
                alt={`shoe${index}`}
                className="size-full object-contain absolute"
              />
            </motion.button>
          ))}
      </motion.div>
    </div>
  );
}

export default PhotosPart;
