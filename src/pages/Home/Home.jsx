import React, { useContext } from "react";

import ProductCard from "../../components/ProductCard";

import ProductsContext from "../../context/productsContext";

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

				{isFetching ? (
					<p className="my-32 text-center">Loading ...</p>
				) : error ? (
					<div className="flex flex-col items-center w-full my-40">
						<p>{error}</p>
						<p>Try again later..</p>
					</div>
				) : (
					<ul className="grid grid-cols-2 gap-2 md:grid-cols-3">
						{productsElement}
					</ul>
				)}
			</div>
		</main>
	);
};

export default Home;
