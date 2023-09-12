import React from "react";

import { Link } from "react-router-dom";

import { PiDotOutlineLight } from "react-icons/pi";

const BreadCrumbs = ({ name = ". . ." }) => {
	return (
		<nav className="mb-4">
			<ul className="flex items-center gap-2">
				<Link to="/products">products</Link>
				<li>
					<PiDotOutlineLight />
				</li>
				<li>hoodie</li>
				<li>
					<PiDotOutlineLight />
				</li>
				<li>{name}</li>
			</ul>
		</nav>
	);
};
export default BreadCrumbs;
