import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { cn } from "../../lib/utils";

const images = [
  "/logos/logo1.png",
  "/logos/logo2.png",
  "/logos/logo3.png",
  "/logos/logo4.png",
  "/logos/logo5.png",
];
function ScrollContent() {
  const controls = useAnimation();
  useEffect(() => {
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      },
    });
  }, [controls]);
  return (
    <section
      style={{
        whiteSpace: "nowrap",
      }}
      className="relative inline-flex h-[100px] overflow-hidden items-center "
    >
      {Array.from({ length: 2 }).map((_, index) => (
        <motion.div
          key={index}
          className="inline-flex w-full shrink-0 justify-between"
          animate={controls}
          initial={{ x: 0 }}
        >
          {images.map((image, index) => (
            <img
              key={index + "logo"}
              src={image}
              alt="logo"
              className={cn("w-[155px] h-[78px]", index === 0 && "ml-[60px]")}
            />
          ))}
        </motion.div>
      ))}
      <div className="absolute inset-y-0 left-0 w-[100px] bg-gradient-to-r from-shade-white to-transparent" />
      <div className="absolute inset-y-0 right-0 w-[100px] bg-gradient-to-l from-shade-white to-transparent" />
    </section>
  );
}

export default ScrollContent;
