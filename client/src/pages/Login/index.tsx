import { Link, useNavigate } from "react-router-dom";
import * as S from "./styles";
import React, { useState } from "react";
import { handleAuth } from "../../api/auth";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleAuth({ email, password, navigate });
	};

	return (
		<S.Container>
			<div className="fade"></div>
			<h2>Login</h2>
			<form onSubmit={(e) => handleLogin(e)}>
				<label htmlFor="email">Email</label>
				<input
					type="text"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<input type="submit" value="Entrar" />
				<span>
					Ainda não tem uma conta? <Link to={"/"}>Registre-se aqui</Link>
				</span>
			</form>
		</S.Container>
	);
};

export default Login;
