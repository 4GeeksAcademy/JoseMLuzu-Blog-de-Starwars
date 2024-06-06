// src/layout.js

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./views/home";
import { Demo } from "./views/demo";
import { Single } from "./views/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import DetailCharacters from "./views/detailCharacter";
import DetailPlanets from "./views/detailPlanet";
import DetailSpecies from "./views/detailSpecies";
import DetailStarships from "./views/detailStarships";
import DetailVehicles from "./views/detailvehicles";

import { FavoritesProvider } from "./component/FavoritesContext";

//create your first component
const Layout = () => {
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<FavoritesProvider>
						<Navbar />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/demo" element={<Demo />} />
							<Route path="/single/:theid" element={<Single />} />
							<Route path="/detailCharacters/:theid" element={<DetailCharacters />} />
							<Route path="/detailPlanets/:theid" element={<DetailPlanets />} />
							<Route path="/detailSpecies/:theid" element={<DetailSpecies />} />
							<Route path="/detailStarships/:theid" element={<DetailStarships />} />
							<Route path="/detailVehicles/:theid" element={<DetailVehicles />} />

							<Route path="*" element={<h1>Not found!</h1>} />
						</Routes>
						<Footer />
					</FavoritesProvider>
				</ScrollToTop>
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
