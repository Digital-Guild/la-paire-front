import { motion } from "framer-motion";
import { cn } from "../../../lib/utils";
type ProgressBarProps = {
  page: number;
  handleChangePage: (type: "prev" | "next") => void;
};
function ProgressBar({ page, handleChangePage }: ProgressBarProps) {
  return (
    <div className="flex items-center justify-between gap-x-1 mb-6">
      <button
        onClick={() => handleChangePage("prev")}
        className="rounded-full bg-primary-500 size-4"
      />
      <div className="bg-secondary-100 relative flex-1 h-[1px] shrink-0 ">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
          className="absolute bg-primary-500 h-full w-1/2"
        />
      </div>
      <div
        className={cn(
          "rounded-full bg-secondary-100 size-4 transition-[background-color] ",
          page === 0 && "delay-1000",
          page === 1 && "bg-primary-500"
        )}
      />

      <div className="bg-secondary-100 relative flex-1 h-[1px] shrink-0 ">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: page === 1 ? "100%" : "0%" }}
          transition={{ duration: 1 }}
          className="absolute bg-primary-500 h-full w-1/2"
        />
      </div>
      <div className="rounded-full bg-secondary-100 size-4" />
    </div>
  );
}

export default ProgressBar;
