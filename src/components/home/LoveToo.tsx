import React, { useEffect, useState } from "react";
import { getbestRatedData } from "../../controllers/product";
import { useModularRQuery } from "../../services/ModularReactQueryService";
import { Product } from "../../types/product";
import CardProduct from "../ui/CardProduct";
import SkeletonProduct from "../ui/SkeletonProduct";

type LoveTooProps = {
  title: string;
  idComponent?: string;
};
function LoveToo({ title, idComponent }: LoveTooProps) {
  const [dataProduct, setDataProduct] = useState<Array<Product>>([]);
  const {
    data,
    isLoading: loader,
    isError,
  } = useModularRQuery({
    queryKey: "best-rated",
    queryFn: getbestRatedData,
    staleTime: 10,
  });
  const isLoading = loader || isError || !data;

  useEffect(() => {
    if (!data) return;
    setDataProduct(data);
  }, [data]);
  return (
    <section className="flex flex-col mt-8 gap-y-6">
      <div className="flex justify-between py-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <button className="btn text-primary-500 flex self-start items-center font-bold gap-x-2 py-3">
          <span>Voir plus</span>
          <img src="/icons/arrow.svg" className="size-4" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-x-5">
        {isLoading &&
          Array.from({ length: 3 }).map((_, index) => (
            <React.Fragment key={index + "best-rated"}>
              <SkeletonProduct />
            </React.Fragment>
          ))}
        {dataProduct.map((item) => (
          <React.Fragment key={item.id}>
            <CardProduct product={item} idComponent={idComponent} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default LoveToo;
