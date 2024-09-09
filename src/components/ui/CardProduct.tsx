import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../constants/environnements";
import Stars from "../../icons/Stars";
import { Product } from "../../types/product";
import { formatMoney, upperFirstLetter } from "../../utils/formatManager";
type CardProductProps = {
  product: Product;
  idComponent?: string;
};
function CardProduct({ product }: CardProductProps) {
  return (
    <Link to={`/product/${product?.slug}`} className="flex flex-col gap-y-2">
      <motion.div
        layoutId={product.slug}
        className="relative flex justify-center items-center h-[255px] bg-secondary-50 rounded-lg"
      >
        <img
          src={API_URL + product.medias[0].path}
          alt="shoe"
          className="size-full object-contain absolute"
        />
      </motion.div>
      <div className="flex flex-col gap-y-2 pb-4 px-2">
        <h4 className="text-lg font-bold line-clamp-1 text-ellipsis">
          {upperFirstLetter(product.name)}
        </h4>
        <div className="flex items-center gap-x-2 ">
          <div className="flex gap-x-1 items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <React.Fragment key={index}>
                <Stars color={index < product.stars ? "#EFB82C" : "#E6E6E6"} />
              </React.Fragment>
            ))}
          </div>
          <span className="text-secondary-600 font-medium text-sm">
            ({product.comments} avis)
          </span>
        </div>
        <span className="mt-2 font-bold text-[28px] text-secondary-500">
          {formatMoney(product.price, "fcfa").toLocaleLowerCase()}
        </span>
      </div>
    </Link>
  );
}

export default CardProduct;
