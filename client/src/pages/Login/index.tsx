import * as S from "./styles";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { handleSignIn } from "../../api/users/auth";
import Form from "../../components/Form";
import InputContainer from "../../components/InputForm";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { setAuthenticated, setUser } = useAuth();

	const navigate = useNavigate();

	const [loading, setLoading] = useState<boolean>(false);

	const handleLogin = async () => {
		setLoading(true);
		await handleSignIn({
			email,
			password,
			navigate,
			setAuthenticated,
			setUser,
		});
		setLoading(false);
	};

	return (
		<S.Container>
			<div className="fade"></div>
			<h2>Login</h2>
			<Form
				handler={() => handleLogin()}
				spanTip={["Ainda não tem uma conta?", "Registre-se aqui"]}
				route={"/register"}
				spanSubmit="Entrar"
				loading={loading}
			>
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
			</Form>
		</S.Container>
	);
};

export default Login;
