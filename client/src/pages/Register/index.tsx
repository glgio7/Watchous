import { useNavigate } from "react-router-dom";
import * as S from "./styles";
import React, { useState } from "react";
import Form from "../../components/Form";
import InputContainer from "../../components/InputForm";
import { handleSignUp } from "../../api/register";

const Register = () => {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");

	const navigate = useNavigate();

	const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSignUp({ name, username, email, password, navigate });
	};

	return (
		<S.Container>
			<div className="fade"></div>
			<h2>Criar conta</h2>
			<Form
				handler={(e) => handleRegister(e)}
				spanTip={["Já possui uma conta?", "Faça login aqui."]}
				route={"/login"}
				spanSubmit="Registrar"
			>
				<InputContainer
					label="Nome"
					type="text"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required={true}
				/>
				<InputContainer
					label="Username"
					type="text"
					id="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required={true}
				/>
				<InputContainer
					label="Email"
					type="text"
					id="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required={true}
				/>
				<InputContainer
					label="Password"
					type="password"
					id="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required={true}
				/>
				<InputContainer
					label="Confirm password"
					type="password"
					id="passwordConfirmation"
					value={passwordConfirmation}
					onChange={(e) => setPasswordConfirmation(e.target.value)}
					required={true}
				/>
				{password !== passwordConfirmation && (
					<span className="advice">As senhas ainda não conferem.</span>
				)}
			</Form>
		</S.Container>
	);
};

export default Register;
