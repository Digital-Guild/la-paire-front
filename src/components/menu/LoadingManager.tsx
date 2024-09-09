import { AnimatePresence, motion } from "framer-motion";
import { usePageStore } from "../../stores/pageStore";
import "../../styles/loader.css";
function LoadingManager() {
  const isLoading = usePageStore((state) => state.loader);
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="block-loader"
        >
          <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingManager;
