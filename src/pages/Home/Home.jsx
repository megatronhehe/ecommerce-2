import React, { useContext } from "react";

import ProductCard from "../../components/ProductCard";

import ProductsContext from "../../context/productsContext";

import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
	const { products, isFetching, error } = useContext(ProductsContext);

	const productsArray = products ? products : [];

	const productsElement = productsArray.map((product) => (
		<ProductCard key={product.id} product={product} />
	));

	return (
		<main className="flex justify-center ">
			<div className="w-full max-w-4xl p-2">
				<h1 className="pb-4 mb-4 text-xl border-b">Featured Products</h1>

				<AnimatePresence mode="wait">
					{isFetching ? (
						<motion.p
							key={isFetching}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="my-32 text-center"
						>
							Loading ...
						</motion.p>
					) : error ? (
						<motion.div
							key={error}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="flex flex-col items-center w-full my-40"
						>
							<p>{error}</p>
							<p>Try again later..</p>
						</motion.div>
					) : (
						<motion.ul
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="grid grid-cols-2 gap-2 md:grid-cols-3"
						>
							{productsElement}
						</motion.ul>
					)}
				</AnimatePresence>
			</div>
		</main>
	);
};

export default Home;
