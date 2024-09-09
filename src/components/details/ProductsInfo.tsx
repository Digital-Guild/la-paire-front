import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getOneProduct } from "../../controllers/product";
import { useModularRQuery } from "../../services/ModularReactQueryService";
import { Product } from "../../types/product";
import DetailsPart from "./DetailsPart";
import PhotosPart from "./PhotosPart";

function ProductsInfo() {
  const [product, setProduct] = useState<Product>();

  const { slug } = useParams();
  const {
    data,
    isLoading,
    isFetching: loader,
    isError,
  } = useModularRQuery({
    queryKey: `product-${slug}`,
    queryFn: async () => getOneProduct(slug!),
    staleTime: 10,
  });

  useEffect(() => {
    if (!data) return;
    setProduct(data);
  }, [data]);

  const isFetching = isLoading || loader || !product || isError;

  return (
    <section className="flex gap-x-5 mt-3">
      <PhotosPart slug={slug!} isFetching={isFetching} product={product} />
      <DetailsPart isFetching={isFetching} product={product} />
    </section>
  );
}

export default ProductsInfo;
