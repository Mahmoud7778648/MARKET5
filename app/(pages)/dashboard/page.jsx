import Image from "next/image";
import Header from "../../../components/header/Header";
import { Footer } from "../../../components/footer/Footer";
import Products from "./Product";
import Hero from "./hero";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="bg-gradient-to-tl mb-6 from-blue-700 h-full to-white dark:bg-gray-900">
        <Hero />
        <Products />
      </main>
      <Footer />
    </div>
  );
}
