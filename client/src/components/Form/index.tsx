import { Link } from "react-router-dom";
import * as S from "./styles";
import React from "react";

type FormProps = {
	children: React.ReactNode;
	handler: (e: React.FormEvent<HTMLFormElement>) => void;
	spanTip: string[];
	route: string;
	spanSubmit: string;
};

const Form = ({ children, handler, spanTip, route, spanSubmit }: FormProps) => {
	return (
		<S.Form onSubmit={handler}>
			{children}
			<input type="submit" value={spanSubmit} />
			<span>
				{spanTip[0]}
				<Link to={route}>{spanTip[1]}</Link>
			</span>
		</S.Form>
	);
};

export default Form;
