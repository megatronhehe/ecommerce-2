import React, { useContext, useState } from "react";

import CartContext from "./context/CartContext";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Cart from "./components/Cart";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

import { AnimatePresence } from "framer-motion";

const App = () => {
	const { toggleCart } = useContext(CartContext);

	return (
		<div className="h-full text-gray-600 font-extralight">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<Products />} />
				<Route path="/products/:id" element={<ProductDetails />} />
			</Routes>

			<AnimatePresence>{toggleCart && <Cart />}</AnimatePresence>
		</div>
	);
};

export default App;
