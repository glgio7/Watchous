import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import SearchProvider from "./contexts/SearchContext";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement!).render(
	<BrowserRouter>
		<SearchProvider>
			<App />
		</SearchProvider>
	</BrowserRouter>
);
