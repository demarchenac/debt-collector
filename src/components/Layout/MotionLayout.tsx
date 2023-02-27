import { motion } from "framer-motion";
import { Layout } from "./Layout";

export function MotionLayout({
  children,
}: {
  key: string;
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Layout>{children}</Layout>
    </motion.div>
  );
}
