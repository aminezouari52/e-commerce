"use client";

// COMPONENTS
import Hero from "./_components/Hero";
import Statistics from "./_components/Statistics";
import CheckoutGuide from "./_components/CheckoutGuide";
import BestSellers from "./_components/BestSellers";
import NewArrivals from "./_components/NewArrivals";
import CategoryList from "../components/CategoryList";
import { HeroHeader } from "@/components/nav/hero-header";
import Footer from "../components/nav/Footer";
import { motion } from "motion/react";

// STYLE
import { Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <div>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <HeroHeader />
      </motion.div>
      <Box overflowX="hidden">
        <Hero />
        {/* <motion.div
          style={{
            scale: progress,
            opacity: progress,
          }}
          ref={statsRef}
        > */}
        <Statistics />
        {/* </motion.div> */}

        {/* <motion.div
          initial={{ opacity: 0, x: 400 }}
          transition={{ duration: 0.8 }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
        > */}
        <CheckoutGuide />
        {/* </motion.div> */}

        {/* <motion.div
          initial={{ opacity: 0, x: -400 }}
          transition={{ duration: 0.8 }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
        > */}
        <BestSellers />
        {/* </motion.div> */}
        {/* <motion.div
          initial={{ opacity: 0, x: 400 }}
          transition={{ duration: 0.8 }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
        > */}
        <NewArrivals />
        {/* </motion.div> */}

        <CategoryList />
      </Box>
      <Footer />
    </div>
  );
};

export default Home;
