import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import ProductDetailWrapper from "../pages/ProductDetailWrapper";
import ProductCategories from "../pages/ProductCategories";
import Checkout from "../pages/Checkout";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home/" element={<Home />} />
        <Route path="/detalle/:productId" element={<ProductDetailWrapper />} />
        <Route path="/categorias/:categoryId" element={<ProductCategories />} />
        <Route path="/checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
}
