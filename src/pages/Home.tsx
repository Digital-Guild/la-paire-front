import { motion } from "framer-motion";
import Banniere from "../components/home/Banniere";
import Banniere2 from "../components/home/Banniere2";
import BestSeller from "../components/home/BestSeller";
import Hero from "../components/home/Hero";
import Indispensable from "../components/home/Indispensable";
import LoveToo from "../components/home/LoveToo";
import ScrollContent from "../components/home/ScrollContent";

function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-y-8 px-[100px]"
    >
      <Hero />
      <ScrollContent />
      <BestSeller />
      <Indispensable />
      <Banniere />
      <LoveToo title="Vous aimerez aussi" idComponent="home-page" />
      <Banniere2 />
    </motion.main>
  );
}

export default Home;
