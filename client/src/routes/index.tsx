import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import Home from "../pages/Home";
import Details from "../pages/Details";
import SeriesDetails from "../pages/Details/series";
import FreeToWatch from "../pages/Watch";
import Credits from "../pages/Credits";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
			<Route path="/details/:id" element={<Details />} />
			<Route path="/details/series/:id" element={<SeriesDetails />} />
			<Route
				path="/freetowatch"
				element={
					<PrivateRoute>
						<FreeToWatch />
					</PrivateRoute>
				}
			/>
			<Route
				path="/dashboard"
				element={
					<PrivateRoute>
						<Dashboard />
					</PrivateRoute>
				}
			/>
			<Route path="/credits" element={<Credits />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AppRoutes;
