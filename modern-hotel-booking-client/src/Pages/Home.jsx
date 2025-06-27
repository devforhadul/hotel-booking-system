import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "../Features/Home/Hero";
import MapSection from "../Features/Home/MapSection";
import RoomSection from "../Features/Home/RoomSection";
import Tesimonial from "../Features/Home/Tesimonial";
import SpecialOfferModal from "../Features/Home/SpecialOfferModal";
import TotalServe from "../Features/Home/TotalServe";
import TopCity from "../Features/Home/TopCity";

const slideUp = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Home = () => {
  const [showOffer, setShowOffer] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOffer(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <motion.div
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Hero />
      </motion.div>

      <motion.div
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <MapSection />
      </motion.div>

      <motion.div
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <RoomSection />
      </motion.div>

      <motion.div
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Tesimonial />
      </motion.div>

      <motion.div
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <TopCity></TopCity>
      </motion.div>

      <motion.div
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <TotalServe></TotalServe>
      </motion.div>

      
      <SpecialOfferModal
        isOpen={showOffer}
        onClose={() => setShowOffer(false)}
      ></SpecialOfferModal>

    </div>
  );
};

export default Home;
