import React, { useContext, useEffect, useState } from "react";

import ProductsContext from "../../context/ProductsContext";
import CartContext from "../../context/CartContext";

import { Link, useParams } from "react-router-dom";

import defaultImg from "../../assets/defaultimg.jpg";

import { PiDotOutlineLight } from "react-icons/pi";

const ProductDetails = () => {
	const { id } = useParams();

	const { addToCart } = useContext(CartContext);
	const { products, isFetching } = useContext(ProductsContext);

	const isProductsExist = products.length > 0;

	const product = isProductsExist
		? products.find((product) => product.id == id)
		: {};

	const { name, price, color, type, size, description } = product;

	const [thisProduct, setThisProduct] = useState(product);

	useEffect(() => {
		if (isProductsExist) {
			setThisProduct({
				id: "",
				name: name,
				type: type,
				color: color[0],
				size: size[0],
				quantity: 1,
				price: price,
			});
		}
	}, [isProductsExist]);

	const getAltId = () =>
		`${thisProduct.name}${thisProduct.type}${thisProduct.color}${thisProduct.size}`.replace(
			/\s+/g,
			""
		);

	useEffect(() => {
		setThisProduct((prev) => ({ ...prev, id: getAltId() }));
	}, [thisProduct.color, thisProduct.size]);

	const selectColor = (color) => {
		setThisProduct((prev) => ({ ...prev, color: color }));
	};

	const selectSize = (size) => {
		setThisProduct((prev) => ({ ...prev, size: size }));
	};

	const addQty = () => {
		setThisProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
	};

	const subQty = () => {
		setThisProduct((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
	};

	const colorElement =
		isProductsExist &&
		color.map((item) => (
			<li
				key={item}
				onClick={() => selectColor(item)}
				className={`relative bg-${item} w-8 h-8 rounded-full border flex items-center justify-center`}
			>
				{thisProduct.color === item && (
					<div className="absolute w-6 h-6 border border-gray-300 rounded-full"></div>
				)}
			</li>
		));

	const sizeElement =
		isProductsExist &&
		size.map((item) => (
			<li
				key={item}
				onClick={() => selectSize(item)}
				className={`flex items-center justify-center w-8 h-8 border border-lg ${
					thisProduct.size === item
						? "bg-rose-900 text-white border-rose-900"
						: "bg-white text-rose-900"
				}`}
			>
				{item}
			</li>
		));

	return (
		<main className="flex justify-center ">
			<section className="w-full max-w-4xl p-2">
				<h1 className="pb-4 mb-4 text-xl border-b">Product Details</h1>
				<section>
					{isFetching ? (
						<p>loading</p>
					) : (
						<>
							<div>
								<h1>{name}</h1>
								<h2>{type}</h2>
								<span>{price}</span>
								<ul className="flex gap-2">{colorElement}</ul>
								<ul className="flex gap-2">{sizeElement}</ul>
								<p>{description}</p>
								<div className="flex items-center">
									<button
										onClick={addQty}
										className="flex items-center justify-center w-12 h-12"
									>
										+
									</button>
									<span className="flex items-center justify-center w-12 h-12">
										{thisProduct.quantity}
									</span>
									<button
										onClick={subQty}
										disabled={thisProduct.quantity < 2}
										className="flex items-center justify-center w-12 h-12"
									>
										-
									</button>
								</div>
								<button
									onClick={() => addToCart(thisProduct)}
									className="px-2 py-1 bg-rose-900 text-rose-100"
								>
									add to cart
								</button>
							</div>
						</>
					)}
				</section>
			</section>
		</main>
	);
};

export default ProductDetails;
