import { Link, useNavigate } from "react-router-dom";
import * as S from "./styles";
import React, { useContext, useState } from "react";
import { handleSignIn } from "../../api/auth";
import { AuthContext } from "../../contexts/AuthContext";
import Form from "../../components/Form";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { setAuthenticated, setUser } = useContext(AuthContext);

	const navigate = useNavigate();

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSignIn({ email, password, navigate, setAuthenticated, setUser });
	};

	return (
		<S.Container>
			<div className="fade"></div>
			<h2>Login</h2>
			<Form
				handler={(e) => handleLogin(e)}
				spanTip={["Ainda não tem uma conta?", "Registre-se aqui"]}
				route={"/"}
			>
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
			</Form>
		</S.Container>
	);
};

export default Login;
