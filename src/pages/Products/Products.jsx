import React, { useContext } from "react";

import ProductCard from "../../components/ProductCard";

import { Link, useSearchParams } from "react-router-dom";

import { PiSquaresFourFill } from "react-icons/pi";
import ProductsContext from "../../context/ProductsContext";
import { AnimatePresence, motion } from "framer-motion";

const Products = () => {
	const { products, isFetching, error } = useContext(ProductsContext);

	const [searchParams, setSearchParams] = useSearchParams();

	const typeFilter = searchParams ? searchParams.get("type") : null;

	const filteredProductsArray =
		products && typeFilter
			? products.filter((product) => product.type === typeFilter)
			: products;

	const productsTypeArray = [
		...new Set(products.map((product) => product.type)),
	];

	const productsElement =
		filteredProductsArray &&
		filteredProductsArray.map((product) => (
			<ProductCard key={product.id} product={product} />
		));

	const producsTypeElement = productsTypeArray.map((type) => (
		<Link
			to={`?type=${type}`}
			key={type}
			className={`px-2 py-1 border rounded-md 
			${
				typeFilter === type
					? "bg-rose-900 text-white border-rose-900"
					: "bg-white text-gray-500"
			}
			`}
		>
			{type}
		</Link>
	));

	return (
		<main className="flex justify-center ">
			<section className="w-full max-w-4xl p-2">
				<h1 className="pb-4 mb-4 text-xl border-b">Whatevs Products</h1>

				<ul className="flex items-center gap-2 mb-4 text-sm">
					<PiSquaresFourFill className="w-12 pr-2 mr-2 text-2xl border-r" />
					<Link
						to="."
						className={`px-2 py-1 border rounded-md 
						${
							!typeFilter
								? "bg-rose-900 text-white border-rose-900"
								: "bg-white text-gray-400"
						}`}
					>
						all
					</Link>
					{producsTypeElement}
				</ul>

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
							key={typeFilter}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="grid grid-cols-2 gap-4 md:grid-cols-3"
						>
							{productsElement}
						</motion.ul>
					)}
				</AnimatePresence>
			</section>
		</main>
	);
};

export default Products;
