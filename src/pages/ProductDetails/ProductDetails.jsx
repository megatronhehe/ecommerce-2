import React, { useContext, useEffect, useState } from "react";

import ImageItem from "./ImagesItem";
import ColorItem from "./ColorItem";
import SizeItem from "./SizeItem";
import SectionNav from "./SectionNav";
import ModifySection from "./ModifySection";
import AddToCartButton from "./AddToCartButton";
import BreadCrumbs from "./BreadCrumbs";

import ProductsContext from "../../context/ProductsContext";
import CartContext from "../../context/CartContext";

import { AnimatePresence, motion } from "framer-motion";

import { useNavigate, useParams } from "react-router-dom";

import { PiCaretLeftLight } from "react-icons/pi";

const ProductDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();

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
				img: img[0],
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
			<ImageItem
				key={i}
				selectedImage={selectedImage}
				setSelectedImage={setSelectedImage}
				image={item}
			/>
		));

	const colorElement =
		isProductsExist &&
		color.map((color, i) => (
			<ColorItem
				key={i}
				color={color}
				selectColor={selectColor}
				thisProduct={thisProduct}
			/>
		));

	const sizeElement =
		isProductsExist &&
		size.map((size, i) => (
			<SizeItem
				key={i}
				size={size}
				selectSize={selectSize}
				thisProduct={thisProduct}
			/>
		));

	return (
		<main className="flex justify-center ">
			<section className="w-full max-w-4xl p-2">
				<button
					onClick={() => navigate(-1)}
					className="flex items-center gap-1 mb-2 text-sm text-gray-400"
				>
					<PiCaretLeftLight />
					back
				</button>
				<BreadCrumbs name={name} />

				<section className="flex flex-col gap-4 sm:flex-row">
					{isFetching ? (
						<p className="flex items-center justify-center w-full h-full mt-24">
							loading
						</p>
					) : (
						<>
							<section className="flex gap-2 sm:w-3/5">
								<motion.div
									key={selectedImage}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									className="w-5/6 overflow-hidden rounded-xl"
								>
									<img src={`../${selectedImage}`} className="w-full" />
								</motion.div>
								<ul className="flex flex-col w-1/6 gap-2">{imagesElement}</ul>
							</section>

							<section className="flex flex-col items-center justify-between p-4 border sm:w-2/5 rounded-xl">
								<div className="w-full ">
									<h1 className="text-2xl text-center">{name}</h1>
									<h2 className="pb-2 text-center border-b ">{type}</h2>
								</div>

								<SectionNav
									selectedSection={selectedSection}
									setSelectedSection={setSelectedSection}
								/>

								<div className="flex flex-col items-center justify-around h-full gap-4 py-4">
									<AnimatePresence>
										{selectedSection === "modify" ? (
											<ModifySection
												price={price}
												colorElement={colorElement}
												sizeElement={sizeElement}
												addQty={addQty}
												subQty={subQty}
												thisProduct={thisProduct}
											/>
										) : (
											<motion.p
												initial={{ opacity: 0 }}
												animate={{ opacity: 1 }}
												className="p-4 text-center"
											>
												{description}
											</motion.p>
										)}
									</AnimatePresence>
								</div>

								<AddToCartButton
									isLoading={isLoading}
									addToCart={addToCart}
									thisProduct={thisProduct}
								/>
							</section>
						</>
					)}
				</section>
			</section>
		</main>
	);
};

export default ProductDetails;
