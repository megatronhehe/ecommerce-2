import React, { useContext } from "react";

import CartContext from "../context/CartContext";

import NavbarButton from "./NavbarButton";
import CartButton from "./CartButton";

import {
	PiShoppingCartLight,
	PiInstagramLogoLight,
	PiTShirtLight,
	PiTwitterLogoLight,
	PiDiamondsFourFill,
	PiHouseLight,
	PiInfoLight,
	PiDiamondLight,
} from "react-icons/pi";

const Navbar = () => {
	const { setToggleCart } = useContext(CartContext);

	return (
		<header className="sticky top-0 z-10 bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm">
			{/* <div className="bg-black bg-white bg-gray-600 bg-blue-800 bg-rose-900"></div> */}

			<div className="flex items-center justify-center w-full text-2xl bg-rose-400 text-rose-900 ">
				<nav className="flex justify-between w-full max-w-4xl px-3 ">
					<h1 className="flex items-center gap-2 p-2">
						<PiDiamondsFourFill className="text-base" />
					</h1>
					<ul className="flex items-center">
						<li className="p-2">
							<PiTwitterLogoLight />
						</li>
						<li className="p-2">
							<PiInstagramLogoLight />
						</li>
						<li className="p-2">
							<PiInfoLight />
						</li>
					</ul>
				</nav>
			</div>

			<div className="flex items-center justify-center w-full h-16 text-4xl text-gray-500 border-b rounded-b-3xl">
				<h1 className="flex items-center gap-2 ">
					whatevs <PiDiamondsFourFill className="text-base" />
				</h1>
			</div>

			<div className="flex items-center justify-center w-full pb-2 text-3xl rounded-b-xl">
				<nav className="flex justify-center w-full max-w-3xl px-3">
					<ul className="flex items-center gap-2">
						<li className="p-3 text-sm">
							<PiDiamondLight />
						</li>

						<NavbarButton name="Home" icon={<PiHouseLight />} path="/" />

						<NavbarButton
							name="Products"
							icon={<PiTShirtLight />}
							path="/products"
						/>

						<CartButton setToggleCart={setToggleCart} />

						<li className="p-3 text-sm">
							<PiDiamondLight />
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};

export default Navbar;
