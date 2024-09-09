import React, { useEffect, useState } from "react";
import { getMostPopularData } from "../../controllers/product";
import { useModularRQuery } from "../../services/ModularReactQueryService";
import { Product } from "../../types/product";
import CardProduct from "../ui/CardProduct";
import SkeletonProduct from "../ui/SkeletonProduct";

function Indispensable() {
  const [dataProduct, setDataProduct] = useState<Array<Product>>([]);
  const {
    data,
    isLoading: loader,
    isError,
  } = useModularRQuery({
    queryKey: "indispensable",
    queryFn: getMostPopularData,
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
        <h3 className="text-lg font-bold">Les indispensables</h3>
        <button className="btn text-primary-500 flex self-start items-center font-bold gap-x-2 py-3">
          <span>Voir plus</span>
          <img src="/icons/arrow.svg" className="size-4" />
        </button>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {isLoading &&
          Array.from({ length: 6 }).map((_, index) => (
            <React.Fragment key={index + "indispensable"}>
              <SkeletonProduct />
            </React.Fragment>
          ))}
        {dataProduct.map((item) => (
          <React.Fragment key={item.id}>
            <CardProduct product={item} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export default Indispensable;
