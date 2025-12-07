import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";

const MainLayout = () => {
  const [blur, setBlur] = useState(false);
  const location = useLocation();

  const pageFade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" } },
  };

  return (
    <>
      <Navbar />
      <Sidebar onExpand={setBlur} />

      <div className="mt-[50px] relative transition-all duration-300 min-h-screen flex flex-col">
        {blur && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 pointer-events-none"
          />
        )}

        <motion.div
          key={location.pathname} // allows fade for each route change
          variants={pageFade}
          initial="hidden"
          animate="visible"
          className="relative z-0 flex-1"
        >
          <Outlet />
        </motion.div>
      </div>
    </>
  );
};

export default MainLayout;
