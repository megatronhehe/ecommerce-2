import React, { useContext } from "react";

import defaultImg from "./../assets/defaultimg.jpg";

import CartContext from "../context/CartContext";

const Cart = () => {
	const { setToggleCart, cartItems, removeFromCart } = useContext(CartContext);

	const cartItemsElement = cartItems
		? cartItems.map((item) => (
				<li
					key={item.id}
					className="flex justify-between gap-2 p-2 bg-white rounded-lg"
				>
					<img src={defaultImg} className="w-2/5 border" />
					<div className="flex flex-col items-center w-full gap-2">
						<h1 className="pb-2 border-b">{item.name}</h1>
						<ul className="flex justify-around w-full">
							<li className={`w-6 h-6 rounded-full bg-${item.color}`}></li>
							<li className="text-sm">{item.type}</li>
						</ul>
						<ul className="flex items-center justify-around w-full">
							<li className="flex items-center gap-2">
								<button className="p-2">+</button>
								{item.quantity}
								<button className="p-2">-</button>
							</li>
							<li onClick={() => removeFromCart(item.id)} className="text-sm">
								x
							</li>
						</ul>
					</div>
				</li>
		  ))
		: [];

	return (
		<section
			onClick={() => setToggleCart(false)}
			className="fixed top-0 right-0 z-30 flex justify-end w-full h-full backdrop-filter backdrop-blur-sm"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="h-full bg-gray-100 w-72 rounded-l-xl"
			>
				<ul className="p-2">{cartItemsElement}</ul>
			</div>
		</section>
	);
};

export default Cart;
