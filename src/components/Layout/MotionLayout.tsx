import { motion } from "framer-motion";
import React from "react";
import { Layout } from "./Layout";

function MotionLayout({
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

export const MemoizedMotionLayout = React.memo(MotionLayout);
