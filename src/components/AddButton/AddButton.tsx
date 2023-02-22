import type { IconType } from "react-icons/lib";
import { motion } from "framer-motion";

const variants = {
  add: "fixed bottom-8 right-8 ring-1 ring-indigo-200/5 bg-indigo-800",
  default: "bg-transparent",
};

export function CircleButton({
  variant = "default",
  Icon,
  onClick,
}: {
  Icon: IconType;
  onClick: () => void;
  variant?: keyof typeof variants;
}) {
  const classes = variants[variant];
  return (
    <motion.button
      onClick={onClick}
      className={`${classes} rounded-full p-2 text-white`}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Icon size={32} />
    </motion.button>
  );
}
