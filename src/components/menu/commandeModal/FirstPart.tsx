import { motion } from "framer-motion";
import React from "react";
import { cn } from "../../../lib/utils";
import { useDataFlow } from "../../../stores/dataFlow";
import { ProductCard } from "../../../types/product";
import { formatMoney } from "../../../utils/formatManager";
import LineProduct from "./LineProduct";

type FirstPartProps = {
  page: number;
  handleChangePage: (type: "prev" | "next") => void;
  currentCardProduct: ProductCard[];
};
function FirstPart({
  page,
  handleChangePage,
  currentCardProduct,
}: FirstPartProps) {
  const handleLessQuantity = (product: ProductCard) => {
    if (product.quantity === 1) {
      useDataFlow.getState().removeProduct(product);
      return;
    }
    useDataFlow.getState().lessQuantity(product);
  };
  const handleCalculSubTotal = () => {
    return currentCardProduct.reduce(
      (acc, item) => acc + item.price! * item.quantity!,
      0
    );
  };
  const subtotal = handleCalculSubTotal();
  const fee = currentCardProduct.length * 1000;
  const total = subtotal + fee;
  return (
    <motion.div
      initial={{ x: page === 0 ? 0 : "-100%" }}
      animate={{
        x: page === 0 ? 0 : "-100%",
        opacity: page === 0 ? 1 : 0,
        transition: { duration: 0.2, ease: "linear" },
      }}
      className="inline-flex min-w-full flex-col size-full justify-between"
    >
      <div className="flex flex-col gap-y-8">
        <div className="flex items-start gap-y-4 flex-col">
          <label className="text-[28px] font-semibold w-full">
            Finalisez votre commande
          </label>
          <span className="text-[#5D5A88] font-medium w-full ">
            Vérifiez les détails de votre commande avant de continuer
          </span>
        </div>
        <div className="flex flex-col gap-y-4">
          {currentCardProduct.length > 0 && (
            <label className="font-semibold text-lg">Quantité</label>
          )}
          <div className="flex flex-col gap-y-2 ">
            {currentCardProduct.length === 0 && (
              <>
                <p className="text-secondary-500 font-bold">
                  Aucun produit dans le panier
                </p>
                <span className="text-secondary-500 font-medium">
                  Ajoutez des produits dans le panier pour continuer
                </span>
                <p className="text-secondary-500 font-bold">
                  Aucun produit dans le panier
                </p>
              </>
            )}
            <div className="flex flex-col gap-y-2 max-h-[200px] overflow-y-scroll">
              {currentCardProduct.map((product) => (
                <React.Fragment key={product.id + "-" + product.size}>
                  <LineProduct
                    product={product}
                    handleLessQuantity={handleLessQuantity}
                  />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <h3 className="text-[28px] font-semibold">Estimation</h3>
          <div className="mt-4 flex flex-col gap-y-4 pb-4 border-b border-b-secondary-100">
            <div className="flex justify-between items-center">
              <h4 className="text-secondary-600 font-medium">Sous-total</h4>
              <span className="text-secondary-500 font-bold">
                {formatMoney(subtotal, "fcfa")}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <h4 className="text-secondary-600 font-medium">
                Frais de livraison
              </h4>
              <span className="text-secondary-500 font-bold">
                {formatMoney(fee, "fcfa")}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h4 className="text-secondary-600 font-medium">Total</h4>
            <span className="text-secondary-500 font-bold">
              {formatMoney(total, "fcfa")}
            </span>
          </div>
        </div>
      </div>
      <button
        disabled={page === 1 || currentCardProduct.length === 0}
        onClick={() => handleChangePage("next")}
        className={cn(
          "btn bg-primary-500 text-background-primary flex gap-x-2 font-bold w-full py-[18px] justify-center rounded-md",
          currentCardProduct.length === 0 && "cursor-not-allowed opacity-60"
        )}
      >
        <span>Continuer</span>
        <img src="/icons/arrow.svg" alt="arrow" className="size-[20px]" />
      </button>
    </motion.div>
  );
}

export default FirstPart;
