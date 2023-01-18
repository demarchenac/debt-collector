import type { IconType } from "react-icons/lib";
import { motion } from "framer-motion";

export function AddButton({
  onClick,
  Icon,
}: {
  Icon: IconType;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-8 right-8 rounded-full bg-indigo-800 p-2 text-white ring-1 ring-indigo-200/5"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Icon size={32} />
    </motion.button>
  );
}
