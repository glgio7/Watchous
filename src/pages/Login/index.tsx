import { Link } from "react-router-dom";
import * as S from "./styles";
import React from "react";

const Login = () => {
	return (
		<S.Container>
			<div className="fade"></div>
			<h2>Login</h2>
			<form onSubmit={(e) => e.preventDefault()}>
				<label htmlFor="email">Email</label>
				<input type="text" id="email" />
				<label htmlFor="password">Password</label>
				<input type="password" id="password" />
				<input type="submit" value="Entrar" />
				<span>
					Ainda não tem uma conta? <Link to={"/"}>Registre-se aqui</Link>
				</span>
			</form>
		</S.Container>
	);
};

export default Login;
