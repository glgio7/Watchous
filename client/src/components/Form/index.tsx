import { Link } from "react-router-dom";
import * as S from "./styles";
import React from "react";

type FormProps = {
	children: React.ReactNode;
	handler: (e: React.FormEvent<HTMLFormElement>) => void;
	spanTip: string[];
	route: string;
};

const Form = ({ children, handler, spanTip, route }: FormProps) => {
	return (
		<S.Form onSubmit={handler}>
			{children}
			<input type="submit" value="Entrar" />
			<span>
				{spanTip[0]}
				<Link to={route}>{spanTip[1]}</Link>
			</span>
		</S.Form>
	);
};

export default Form;
