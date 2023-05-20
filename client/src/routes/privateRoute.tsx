import React from "react";
import { useAuth } from "../hooks/useAuth";
import Login from "../pages/Login";

type PrivateRouteProps = {
	children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const { authenticated } = useAuth();
	return <>{authenticated ? children : <Login />}</>;
};

export default PrivateRoute;
