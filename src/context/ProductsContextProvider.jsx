import React, { useEffect, useState } from "react";

import ProductsContext from "./productsContext";

const ProductsContextProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState(false);

	useEffect(() => {
		setIsFetching(true);
		setError("");
		fetch(" http://localhost:8000/products")
			.then((res) => {
				if (!res.ok) {
					setError(`${res.status} | ${res.statusText}`);
				} else {
					return res.json();
				}
			})
			.then((data) => setProducts(data))
			.catch((err) => setError(err.message))
			.finally(() => {
				setIsFetching(false);
			});
	}, []);

	return (
		<ProductsContext.Provider value={{ products, isFetching, error }}>
			{children}
		</ProductsContext.Provider>
	);
};

export default ProductsContextProvider;
