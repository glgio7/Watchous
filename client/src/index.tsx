import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import SearchProvider from "./contexts/SearchContext";
import AuthProvider from "./contexts/AuthContext";
import App from "./app";

const rootElement = document.getElementById("root");

ReactDOM.createRoot(rootElement!).render(
	<BrowserRouter>
		<SearchProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</SearchProvider>
	</BrowserRouter>
);
