import { motion } from "framer-motion";
import { FormEvent, useRef, useState } from "react";
import { sendOrder } from "../../../controllers/order";
import { cn } from "../../../lib/utils";
import { apiLoaderRequest } from "../../../services/apiLoaderRequest";
import { useDataFlow } from "../../../stores/dataFlow";
import { usePageStore } from "../../../stores/pageStore";
import { OrderedProduct } from "../../../types/orderedProduct";
import { ProductCard } from "../../../types/product";

type LastPartProps = {
  page: number;
  currentCardProduct: Array<ProductCard>;
};
function LastPart({ page, currentCardProduct }: LastPartProps) {
  const [canSend, setCanSend] = useState(false);
  const refForm = useRef<HTMLFormElement>(null);
  const handleFormChange = () => {
    const data = new FormData(refForm.current!);
    const values = Object.fromEntries(data.entries());
    const isFilled = Object.values(values).every((val) => val !== "");
    setCanSend(isFilled);
  };
  const handleGoPaiement = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSend) return;
    const form = new FormData(refForm.current!);
    const orderedProduct: OrderedProduct[] = currentCardProduct.map(
      (product) => ({
        product_variant_id: product.variants.find(
          (variant) => variant.size === product.size
        )!.id,
        quantity: product.quantity!,
      })
    );
    const response = await apiLoaderRequest({
      asyncVoidFunction: async () => sendOrder(form, orderedProduct),
    });
    if (!response) {
      //on peut afficher une notification d'erreur ici...
      console.log("erreur lors de l'envoi de la commande");
      return;
    }
    //on peut afficher une notification de succès ici...
    usePageStore.getState().setBasketIsOpen(false);
    refForm.current!.reset();
    setCanSend(false);
    useDataFlow.getState().clearCart();
  };
  return (
    <motion.div
      initial={{ x: page === 1 ? 0 : "100%" }}
      animate={{
        x: page === 1 ? 0 : "100%",
        opacity: page === 1 ? 1 : 0,
        transition: { duration: 0.2, ease: "linear" },
      }}
      className="inline-flex min-w-full flex-col size-full justify-between absolute"
    >
      <div className="flex flex-col gap-y-8 flex-1">
        <div className="flex items-start gap-y-4 flex-col">
          <label className="text-[28px] font-semibold w-full">
            Renseignez vos informations de paiement
          </label>
        </div>
        <div className="flex flex-col gap-y-2 justify-between flex-1">
          <div className="flex-col gap-y-2 items-end hidden">
            <h3 className="text-lg font-semibold self-start">
              informations de paiement
            </h3>
            <div className="flex w-full justify-between items-center bg-background-primary rounded-md px-6 py-[18px] border-secondary-100 border cursor-not-allowed">
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-2">
                  <img src="/icons/wave.svg" alt="wave" />
                  <span className="text-secondary-500 font-semibold">
                    Wave mobile money
                  </span>
                </div>
                <p className="text-[#5D5A88] font-medium">
                  <span>Numéro : </span>
                  <strong className="font-semibold text-secondary-500">
                    070 707 0707
                  </strong>
                </p>
              </div>
              <span className="text-[#00E04C] bg-[#D2FFE1] py-[3px] px-4 rounded-lg font-bold">
                Valide
              </span>
            </div>
            <button className="btn flex items-center gap-x-2 text-primary-500 py-[10px] cursor-not-allowed">
              <img src="/icons/plus.svg" alt="plus" className="size-[20px]" />
              <span className="font-bold">Ajouter un moyen de paiement</span>
            </button>
          </div>
          <form
            ref={refForm}
            onSubmit={handleGoPaiement}
            onChange={handleFormChange}
            className="flex flex-col gap-y-2 flex-1"
          >
            <label className="font-semibold text-lg my-2">
              Informations personnelles
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Nom et prenoms"
              className="bg-background-primary font-medium placeholder:text-[#BCBCBC] border border-secondary-100 rounded-md py-[18px] px-6"
            />
            <input
              type="tel"
              name="contact"
              placeholder="Numero de téléphone"
              className="bg-background-primary font-medium placeholder:text-[#BCBCBC] border border-secondary-100 rounded-md py-[18px] px-6"
            />
            <input
              type="email"
              name="delivery_place"
              placeholder="Adresse mail"
              className="bg-background-primary font-medium placeholder:text-[#BCBCBC] border border-secondary-100 rounded-md py-[18px] px-6"
            />
            <input
              type="text"
              name="delivery_place"
              placeholder="Lieu de livraison"
              className="bg-background-primary font-medium placeholder:text-[#BCBCBC] border border-secondary-100 rounded-md py-[18px] px-6"
            />
            <button
              type="submit"
              disabled={page === 0 || !canSend}
              className={cn(
                "btn bg-primary-500 text-background-primary flex gap-x-2 font-bold w-full py-[18px] justify-center rounded-md mt-auto",
                !canSend && "cursor-not-allowed opacity-60"
              )}
            >
              <span>Payer</span>
              <img src="/icons/arrow.svg" alt="arrow" className="size-[20px]" />
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}

export default LastPart;
