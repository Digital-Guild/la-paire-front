import React, { useEffect, useState } from "react";
import Basket from "../../icons/Basket";
import Stars from "../../icons/Stars";
import { cn } from "../../lib/utils";
import { useDataFlow } from "../../stores/dataFlow";
import { Product, Variant } from "../../types/product";
import { formatMoney } from "../../utils/formatManager";

type DetailsPartProps = {
  isFetching: boolean;
  product?: Product | null;
};
function DetailsPart({ isFetching, product }: DetailsPartProps) {
  const productsInCard = useDataFlow((state) => state.products);
  const [amImCard, setAmImCard] = useState(false);
  const [selectedSize, setSelectedSize] = useState<Variant | null>(null);

  const handleCheckMyVariantInCart = (variant: Variant) => {
    return useDataFlow.getState().myVariantInCart({
      ...product!,
      size: variant.size,
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize || !product) return;
    const newProd = {
      ...product,
      size: selectedSize.size,
    };
    useDataFlow.getState().addProduct(newProd);
  };

  const handleSelectSize = (id: string) => {
    const variant = product?.variants.find((item) => item.id === id) as Variant;
    setSelectedSize(variant);
    // if (amImCard) {
    //   useDataFlow.getState().updateProduct({
    //     ...product!,
    //     size: variant.size,
    //   });
    // }
  };
  const canSubmit = selectedSize !== null && !isFetching && !amImCard;
  useEffect(() => {
    const checkCard = useDataFlow.getState().amInCart(
      product && {
        ...product,
        size: selectedSize?.size,
      }
    );
    setAmImCard(checkCard);
  }, [productsInCard, selectedSize, product]);
  return (
    <div className="w-2/5 flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-10 w-full min-h-[533px]">
        <div className="flex flex-col gap-y-2">
          {isFetching ? (
            <span className="animate-pulse bg-secondary-50 rounded-2xl h-[42px] w-2/3" />
          ) : (
            <h4 className="text-[28px] font-bold line-clamp-2 text-ellipsis">
              {product?.name}
            </h4>
          )}
          <div className="flex items-center gap-x-2 ">
            {isFetching ? (
              <>
                <span className="animate-pulse bg-secondary-50 rounded-2xl h-[20px] w-[100px]" />
                <span className="animate-pulse bg-secondary-50 rounded-2xl h-[20px] w-[50px]" />
              </>
            ) : (
              <>
                <div className="flex gap-x-1 items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <React.Fragment key={index}>
                      <Stars
                        color={index < product?.stars! ? "#EFB82C" : "#E6E6E6"}
                      />
                    </React.Fragment>
                  ))}
                </div>

                <span className="text-secondary-600 font-medium text-sm">
                  ({product?.comments} avis)
                </span>
              </>
            )}
          </div>
          {isFetching ? (
            <span className="animate-pulse mt-2 bg-secondary-50 rounded-2xl h-[66px] w-1/3" />
          ) : (
            <span className="mt-2 font-bold text-[44px] text-secondary-500">
              {formatMoney(product?.price || 0, "fcfa")}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-y-2 py-2">
          <h4 className="font-bold">Taille</h4>

          <div className="grid grid-cols-6 gap-2 max-w-[90%]">
            {isFetching
              ? Array.from({ length: 8 }).map((_, index) => (
                  <span
                    key={index}
                    className="animate-pulse w-[60px] h-[50px] border border-secondary-100 rounded"
                  />
                ))
              : product &&
                product.variants.map((item) => (
                  <button
                    onClick={() => handleSelectSize(item.id)}
                    key={item.id}
                    className={cn(
                      "w-[60px] py-3 border border-secondary-100 rounded font-medium transition-[background-color,border] ",
                      selectedSize &&
                        item.id === selectedSize?.id &&
                        "border-primary-500 bg-primary-500 text-shade-white",
                      handleCheckMyVariantInCart(item) &&
                        "border border-shade-black"
                    )}
                  >
                    {item.size}
                  </button>
                ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-2 py-2">
          <h4 className="font-bold">Description</h4>
          {isFetching ? (
            <div className="flex flex-col gap-y-1">
              <span className="animate-pulse bg-secondary-50 rounded-2xl h-[18px] w-2/3" />
              <span className="animate-pulse bg-secondary-50 rounded-2xl h-[18px] w-full" />
              <span className="animate-pulse bg-secondary-50 rounded-2xl h-[18px] w-3/4" />
            </div>
          ) : (
            <p className="line-clamp-3 text-ellipsis">{product?.description}</p>
          )}
        </div>
      </div>
      <div className="flex gap-x-4">
        <button
          disabled={!canSubmit}
          onClick={handleAddToCart}
          className={cn(
            "btn flex-1 flex items-center gap-x-2 bg-primary-500 rounded-md text-shade-white justify-center py-6 transition-[background-color]",
            isFetching && "animate-pulse bg-secondary-50/50",
            !canSubmit && "cursor-not-allowed bg-secondary-100",
            amImCard && "bg-secondary-100"
          )}
        >
          <span className="font-bold text-lg">
            {amImCard ? "Dans le panier" : "Ajouter au panier"}
          </span>
          <Basket color="#fff" />
        </button>
      </div>
      <div className="flex gap-x-4 items-center">
        {isFetching ? (
          <span className="animate-pulse bg-secondary-50 rounded-2xl h-[18px] w-2/3" />
        ) : (
          <>
            <img src="/icons/car.svg" alt="car" className="size-6" />
            <span className="font-bold">
              Livraison gratuite a partir de 40.000 fcfa
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default DetailsPart;
