import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ProductsInfo from "../components/details/ProductsInfo";
import LoveToo from "../components/home/LoveToo";

function DetailsProduct() {
  const { slug } = useParams();
  const [pageLoad, setPageLoad] = useState<boolean>(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageLoad(true);
  }, []);
  useEffect(() => {
    if (!pageLoad) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug]);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-y-8 px-[100px]"
    >
      <ProductsInfo />
      <LoveToo
        title="Nous vous recommandons aussi"
        idComponent="details-page"
      />
    </motion.main>
  );
}

export default DetailsProduct;
