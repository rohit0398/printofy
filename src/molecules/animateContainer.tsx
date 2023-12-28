/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export function AnimateContainer({
  children,
  width = "w-fit",
  runAgain,
}: {
  children: React.ReactNode;
  width?: string;
  runAgain?: any;
}) {
  const divRef = useRef(null);
  const isInView = useInView(divRef, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  useEffect(() => {
    if (runAgain || runAgain === 0) {
      mainControls.set("hidden");
      mainControls.start("visible");
    }
  }, [runAgain]);

  return (
    <div ref={divRef} className={` relative overflow-hidden ${width}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -45, scaleY: 0.6, transformOrigin: "top" },
          visible: { opacity: 1, y: 0, scaleY: 1 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.6, staggerChildren: 0.8 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function AnimateButtonContainer({
  children,
  width = "w-fit",
}: {
  children: React.ReactNode;
  width?: string;
}) {
  const divRef = useRef(null);
  const isInView = useInView(divRef, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    runAsync();
  }, [isInView]);

  async function runAsync() {
    if (isInView) {
      await mainControls.start("stage1");
      await mainControls.start("stage2");
    }
  }

  return (
    <div ref={divRef} className={` relative ${width}`}>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            scaleX: 0.5,
            scaleY: 0.5,
            originX: 0.5,
            originY: 0.5,
          },
          stage1: { opacity: 0.7, scaleX: 1.1, scaleY: 1.1 },
          stage2: { opacity: 1, scaleX: 1, scaleY: 1 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function AnimateSlideContainer({
  children,
  width = "w-fit",
  runAgain,
}: {
  children: React.ReactNode;
  width?: string;
  runAgain?: any;
}) {
  const divRef = useRef(null);
  const isInView = useInView(divRef, { once: true });
  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);

  useEffect(() => {
    if (runAgain || runAgain === 0) {
      mainControls.set("hidden");
      mainControls.start("visible");
    }
  }, [runAgain]);

  return (
    <div
      ref={divRef}
      className={` relative overflow-hidden ${width} flex justify-end`}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, x: "-30%", transformOrigin: "left" },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.6, staggerChildren: 0.8 }}
        className=" flex justify-end"
      >
        {children}
      </motion.div>
    </div>
  );
}
