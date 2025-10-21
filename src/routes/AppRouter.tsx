import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import ProductDetailWrapper from "../pages/ProductDetailWrapper";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/detalle/:productId" element={<ProductDetailWrapper/>} />

      </Route>
    </Routes>
  );
}
