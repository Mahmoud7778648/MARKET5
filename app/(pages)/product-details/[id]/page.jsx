import React from "react";
import ProductDetails from "../[id]";
import Header from "../../../../components/header/Header";
import { Footer } from "../../../../components/footer/Footer";

export const Details = ({ params }) => {
  return (
    <div>
      <Header />
      <ProductDetails id={params.id} />
      <Footer />
    </div>
  );
};
export default Details;
