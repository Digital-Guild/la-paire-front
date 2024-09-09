import { useEffect, useState } from "react";

const useCheckOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  handleClickOutside?: () => void,
  isActive = true,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCheckOutsideClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      if (!isActive) return;
      if (handleClickOutside) handleClickOutside();
      setIsOpen(false);
    }
  };
  useEffect(() => {
    if (!isActive) {
      document.removeEventListener("mousedown", handleCheckOutsideClick);
      return;
    }
    document.addEventListener("mousedown", handleCheckOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleCheckOutsideClick);
    };
  }, [isActive]);
  return [isOpen, setIsOpen] as const;
};

export default useCheckOutsideClick;
