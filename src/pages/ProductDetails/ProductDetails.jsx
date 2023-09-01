import React, { useContext, useEffect, useState } from "react";

import ProductsContext from "../../context/ProductsContext";
import CartContext from "../../context/CartContext";

import { Link, useParams } from "react-router-dom";

import { motion } from "framer-motion";

import defaultImg from "../../assets/defaultimg.jpg";

import {
	PiDotOutlineLight,
	PiCircleDashed,
	PiShoppingCartLight,
} from "react-icons/pi";

const ProductDetails = () => {
	const { id } = useParams();

	const { addToCart, isLoading } = useContext(CartContext);
	const { products, isFetching } = useContext(ProductsContext);

	const isProductsExist = products.length > 0;

	const product = isProductsExist
		? products.find((product) => product.id == id)
		: {};

	const { name, price, color, type, size, description, img } = product;

	const [thisProduct, setThisProduct] = useState(product);
	const [selectedImage, setSelectedImage] = useState("");
	const [selectedSection, setSelectedSection] = useState("modify");

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
			setSelectedImage(img[0]);
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

	const imagesElement =
		isProductsExist &&
		img.map((item, i) => (
			<li key={i} onClick={() => setSelectedImage(item)}>
				<img
					src={`../${item}`}
					className={`border-2 rounded-xl ${
						selectedImage === item ? "border-rose-900" : "border-white"
					}`}
				/>
			</li>
		));

	const colorElement =
		isProductsExist &&
		color.map((item) => (
			<li
				key={item}
				onClick={() => selectColor(item)}
				className={`relative bg-${item} w-10 h-10 rounded-full border flex items-center justify-center`}
			>
				{thisProduct.color === item && (
					<div className="absolute w-8 h-8 border-2 border-gray-300 rounded-full"></div>
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
				<section className="flex flex-col gap-4 sm:flex-row">
					{isFetching ? (
						<p>loading</p>
					) : (
						<>
							<section className="flex gap-2 sm:w-3/5">
								<img src={`../${selectedImage}`} className="w-5/6 rounded-xl" />
								<ul className="flex flex-col w-1/6 gap-2">{imagesElement}</ul>
							</section>

							<section className="flex flex-col items-center justify-between p-4 border sm:w-2/5 rounded-xl">
								<div className="w-full ">
									<h1 className="text-2xl text-center">{name}</h1>
									<h2 className="pb-2 text-center border-b ">{type}</h2>
								</div>

								<nav className="w-full">
									<ul className="flex w-full">
										<li
											onClick={() => setSelectedSection("modify")}
											className={`w-1/2 py-1 text-center border-b-4 ${
												selectedSection === "modify"
													? "border-rose-900"
													: "border-white"
											}`}
										>
											Modify
										</li>
										<li
											onClick={() => setSelectedSection("description")}
											className={`w-1/2 py-1 text-center border-b-4 ${
												selectedSection === "description"
													? "border-rose-900"
													: "border-white"
											}`}
										>
											Description
										</li>
									</ul>
								</nav>

								<div className="flex flex-col items-center justify-around h-full gap-4">
									{selectedSection === "modify" ? (
										<>
											<h3 className="text-xl">${price - 0.01}</h3>
											<ul className="flex gap-2">{colorElement}</ul>

											<ul className="flex gap-2">{sizeElement}</ul>
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
										</>
									) : (
										<p className="p-4 text-center">{description}</p>
									)}
								</div>

								<button
									disabled={isLoading}
									onClick={() => addToCart(thisProduct)}
									className="w-full px-2 py-1 rounded-lg bg-rose-900 text-rose-100"
								>
									{isLoading ? (
										<motion.div
											key={isLoading}
											animate={{ rotate: 360 }}
											transition={{ repeat: "loop", duration: 1 }}
											className="flex items-center justify-center h-8 gap-2"
										>
											<PiCircleDashed className="text-2xl" />
										</motion.div>
									) : (
										<div className="flex items-center justify-center h-8 gap-2">
											add to cart <PiShoppingCartLight />
										</div>
									)}
								</button>
							</section>
						</>
					)}
				</section>
			</section>
		</main>
	);
};

export default ProductDetails;
