import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import ProductsContextProvider from "./context/ProductsContextProvider.jsx";
import CartContextProvider from "./context/CartContextProvider.jsx";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<ProductsContextProvider>
		<CartContextProvider>
			<BrowserRouter>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</BrowserRouter>
		</CartContextProvider>
	</ProductsContextProvider>
);
