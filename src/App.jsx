import React, { useContext, useState } from "react";

import CartContext from "./context/CartContext";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Cart from "./components/Cart";
import { AnimatePresence } from "framer-motion";

const App = () => {
	const { toggleCart } = useContext(CartContext);

	return (
		<div className="h-full text-gray-600 font-extralight">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/products" element={<Products />} />
			</Routes>

			<AnimatePresence>{toggleCart && <Cart />}</AnimatePresence>
		</div>
	);
};

export default App;
