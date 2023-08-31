import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import defaultImg from "../../assets/defaultimg.jpg";

import { PiDotOutlineLight } from "react-icons/pi";

const ProductDetails = () => {
	const { id } = useParams();

	const [thisProduct, setThisProduct] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		setIsFetching(true);
		setError("");
		fetch(`http://localhost:8000/products/${id}`)
			.then((res) => {
				if (!res.ok) {
					setError(`${res.status} | ${res.statusText}`);
				} else {
					return res.json();
				}
			})
			.then((data) => setThisProduct(data))
			.catch((err) => setError(err.message))
			.finally(() => {
				setIsFetching(false);
			});
	}, [id]);

	const colorElement =
		Array.isArray(thisProduct.color) && thisProduct.color.length > 0
			? thisProduct.color.map((item) => (
					<li
						key={item}
						className={`bg-${item} h-12 w-12 rounded-full shadow-md border`}
					></li>
			  ))
			: null;

	const sizeElement =
		Array.isArray(thisProduct.size) && thisProduct.size.length > 0
			? thisProduct.size.map((item) => (
					<li
						key={item}
						className={`bg-${item} w-10 h-10 flex items-center justify-center rounded-md shadow-md border`}
					>
						{item}
					</li>
			  ))
			: null;

	return (
		<main className="flex justify-center ">
			<section className="w-full max-w-4xl p-2">
				<h1 className="pb-4 mb-4 text-xl border-b">Product Details</h1>
				{isFetching ? (
					<p className="flex items-center justify-center w-full h-1/2">
						loading ...{" "}
					</p>
				) : (
					<>
						<nav className="mb-4">
							<ul className="flex items-center gap-2">
								<Link to="/products">products</Link>
								<PiDotOutlineLight />
								<Link>{thisProduct.name}</Link>
							</ul>
						</nav>

						<div className="flex flex-col gap-4 sm:flex-row">
							<img
								src={defaultImg}
								className="w-full border rounded-xl sm:w-1/2"
							/>

							<div className="flex flex-col justify-between sm:w-1/2">
								<h1 className="pb-2 text-2xl text-center border-b">
									{thisProduct.name}
								</h1>
								<h2 className="text-center">{thisProduct.type}</h2>
								<ul className="flex justify-center gap-2">{colorElement}</ul>
								<ul className="flex justify-center gap-2">{sizeElement}</ul>
								<div className="flex items-center justify-center text-2xl">
									<button className="px-2 py-2">+</button>
									<p className="px-2 py-2">{thisProduct.quantity}</p>
									<button className="px-2 py-2">-</button>
								</div>
								<button className="py-2 bg-rose-900 text-rose-100">
									add to cart
								</button>
							</div>
						</div>

						<ul className="flex items-center gap-2 mb-4 text-sm"></ul>
					</>
				)}
			</section>
		</main>
	);
};
export default ProductDetails;
