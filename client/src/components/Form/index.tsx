import { Link } from "react-router-dom";
import * as S from "./styles";
import React from "react";
import Loading from "../Loading";

type FormProps = {
	children: React.ReactNode;
	handler: (e: React.FormEvent<HTMLFormElement>) => void;
	spanTip: string[];
	route: string;
	spanSubmit: string;
	loading?: boolean;
};

const Form = ({
	children,
	handler,
	spanTip,
	route,
	spanSubmit,
	loading,
}: FormProps) => {
	return (
		<S.Form onSubmit={handler}>
			{children}
			{!loading && <input type="submit" value={spanSubmit} />}
			{loading && (
				<div className="loading-submit">
					<div className="loader"></div>
				</div>
			)}
			<span>
				{spanTip[0]}
				<Link to={route}>{spanTip[1]}</Link>
			</span>
		</S.Form>
	);
};

export default Form;
