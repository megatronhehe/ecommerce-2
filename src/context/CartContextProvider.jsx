import React, { useEffect, useState } from "react";

import CartContext from "./CartContext";

const CartContextProvider = ({ children }) => {
	const [toggleCart, setToggleCart] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [cartItems, setCartItems] = useState([]);

	useEffect(() => {
		fetch("http://localhost:8000/cart")
			.then((res) => res.json())
			.then((data) => setCartItems(data));
	}, []);

	const addToCart = (thisProduct) => {
		setIsLoading(true);
		const isItemExist = cartItems.find((item) => item.id === thisProduct.id);

		if (isItemExist) {
			fetch(`http://localhost:8000/cart/${thisProduct.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(thisProduct),
			})
				.then((res) => {
					if (!res.ok) {
						console.log(res.status);
					} else {
						setCartItems((prev) =>
							prev.map((item) =>
								item.id === thisProduct.id
									? { ...item, quantity: item.quantity + thisProduct.quantity }
									: item
							)
						);
					}
				})
				.then(() => {
					setToggleCart(true);
				})
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			fetch("http://localhost:8000/cart", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(thisProduct),
			})
				.then((res) => {
					if (!res.ok) {
						console.log(res.status);
					} else {
						setCartItems((prev) => [...prev, thisProduct]);
					}
				})
				.then(() => {
					setToggleCart(true);
				})
				.finally(() => {
					setIsLoading(false);
				});
		}
	};

	const removeFromCart = (id) => {
		setIsLoading(true);
		fetch(`http://localhost:8000/cart/${id}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (!res.ok) {
					console.log(res.status);
				} else {
					setCartItems((prev) => prev.filter((item) => item.id !== id));
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const addQtyInCart = (id) => {
		const thisItem = cartItems.find((item) => item.id === id);

		fetch(`http://localhost:8000/cart/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...thisItem, quantity: thisItem.quantity + 1 }),
		})
			.then((res) => {
				if (!res.ok) {
					console.log(res.status);
				} else {
					setCartItems((prev) =>
						prev.map((item) =>
							item.id === id ? { ...item, quantity: item.quantity + 1 } : item
						)
					);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const subQtyInCart = (id) => {
		setIsLoading(true);
		const thisItem = cartItems.find((item) => item.id === id);

		fetch(`http://localhost:8000/cart/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...thisItem, quantity: thisItem.quantity - 1 }),
		})
			.then((res) => {
				if (!res.ok) {
					console.log(res.status);
				} else {
					setCartItems((prev) =>
						prev.map((item) =>
							item.id === id ? { ...item, quantity: item.quantity - 1 } : item
						)
					);
				}
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<CartContext.Provider
			value={{
				toggleCart,
				setToggleCart,
				cartItems,
				addToCart,
				removeFromCart,
				isLoading,
				addQtyInCart,
				subQtyInCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartContextProvider;
