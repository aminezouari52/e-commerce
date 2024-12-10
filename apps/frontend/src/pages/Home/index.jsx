// COMPONENTS
import BestSellers from "./BestSellers";
import NewArrivals from "./NewArrivals";
import Statistics from "./Statistics";
import Hero from "./Hero";
import { motion, useScroll, useTransform } from "framer-motion";
import CheckoutGuide from "./CheckoutGuide";
import CategoryList from "@/components/CategoryList";

// STYLE
import { Box } from "@chakra-ui/react";
import { useRef } from "react";
import Header from "@/components/nav/Header";
import Footer from "@/components/nav/Footer";

const Home = () => {
  const statsRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: statsRef,
    offset: ["0 1.7", "1 1"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <>
      <Header />
      <Box overflowX="hidden">
        <Hero />
        <motion.div
          style={{
            scale: progress,
            opacity: progress,
          }}
          ref={statsRef}

          /* initial={{ opacity: 0, x: -400 }}
         transition={{ duration: 0.8 }}
         whileInView={{
           opacity: 1,
           x: 0,
         }} */
        >
          <Statistics />
        </motion.div>

        {/* <Jumbotron
        text={["New Arrivals", "Best Sellers", "Categories", "Sub Categories"]}
      /> */}

        <motion.div
          initial={{ opacity: 0, x: 400 }}
          transition={{ duration: 0.8 }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
        >
          <CheckoutGuide />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -400 }}
          transition={{ duration: 0.8 }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
        >
          <BestSellers />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          transition={{ duration: 0.8 }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
        >
          <NewArrivals />
        </motion.div>

        <CategoryList />

        {/* <SubList /> */}
      </Box>
      <Footer />
    </>
  );
};

export default Home;
