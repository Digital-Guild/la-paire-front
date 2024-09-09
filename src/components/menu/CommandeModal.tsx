import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useCheckOutsideClick from "../../hooks/handleCheckOusideClick";
import { useDataFlow } from "../../stores/dataFlow";
import { usePageStore } from "../../stores/pageStore";
import FirstPart from "./commandeModal/FirstPart";
import LastPart from "./commandeModal/LastPart";
import ProgressBar from "./commandeModal/ProgressBar";

function CommandeModal() {
  const refPanel = useRef<HTMLDivElement>(null);
  const panelIsOpen = usePageStore((state) => state.basketIsOpen);
  const currentCardProduct = useDataFlow((state) => state.products);

  const handleCloseModal = () => {
    usePageStore.getState().setBasketIsOpen(false);
  };
  useCheckOutsideClick(refPanel, handleCloseModal);

  const [page, setPage] = useState(0);

  const handleChangePage = (type: "prev" | "next") => {
    if (type === "prev") setPage(0);
    else setPage(1);
  };

  useEffect(() => {
    const body = document.querySelector("body");
    if (panelIsOpen) {
      body!.style.overflow = "hidden";
    }
    if (!panelIsOpen) {
      setPage(0);
      body!.style.overflow = "auto";
      return;
    }
  }, [panelIsOpen]);

  return (
    <AnimatePresence mode="sync">
      {panelIsOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            pointerEvents: "auto",
            userSelect: "auto",
          }}
          exit={{ opacity: 0, pointerEvents: "none", userSelect: "none" }}
          transition={{ duration: 0.3 }}
          className="fixed bg-shade-black/20 h-screen w-screen z-20 top-0 left-0 flex justify-center items-center p-[100px]"
        >
          <div
            ref={refPanel}
            className="bg-background-primary rounded-3xl size-full flex gap-x-5 max-w-[1280px]"
          >
            <div className="flex-1 p-5 flex-col justify-between items-start overflow-hidden">
              <div className="flex size-full flex-col rounded-2xl bg-secondary-50 px-20 justify-between py-10 overflow-y-scroll">
                <ProgressBar page={page} handleChangePage={handleChangePage} />
                <div
                  className={
                    "inline-flex flex-1 overflow relative overflow-hidden"
                  }
                >
                  <FirstPart
                    page={page}
                    handleChangePage={handleChangePage}
                    currentCardProduct={currentCardProduct}
                  />
                  <LastPart
                    page={page}
                    currentCardProduct={currentCardProduct}
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 relative overflow-hidden">
              <img
                src={"/images/finish-person.png"}
                alt="finish-person"
                className="h-2/3 object-contain bottom-0 absolute left-1/2 -translate-x-1/2"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CommandeModal;
