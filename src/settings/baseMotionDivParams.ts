export const baseMotionDivParams = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const baseSelectMotionDivParams = (reverse = false) => {
  return {
    ...baseMotionDivParams,
    initial: { opacity: 0, y: reverse ? 20 : 0 },
    animate: { opacity: 1, y: reverse ? 10 : 10 },
    exit: { opacity: 0, y: reverse ? 20 : 0 },
  };
};

export const baseSelectOptionMotionSpanParams = {
  ...baseMotionDivParams,
  initial: { width: 0 },
  animate: { width: 4 },
  exit: { width: 0 },
};
