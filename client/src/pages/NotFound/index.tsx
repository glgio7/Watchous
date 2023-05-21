import { Link } from "react-router-dom";
import * as S from "./styles";

const NotFound = () => {
	return (
		<S.Container>
			<div className="background">
				<img src="/img/background.jpg" alt="Página não encontrada" />
			</div>
			<h2>404</h2>
			<span>Página não encontrada</span>
			<Link to={"/"}>Voltar para página inicial</Link>
		</S.Container>
	);
};

export default NotFound;
