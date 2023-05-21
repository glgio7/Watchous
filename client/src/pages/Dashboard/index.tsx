import { useEffect, useState } from "react";
import * as S from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { RiEditFill } from "react-icons/ri";
import Form from "../../components/Form";
import InputContainer from "../../components/InputForm";
import { handleUpdateUser } from "../../api/users/update";

const profileIcons = [
	"robot-icon.png",
	"girl-icon.png",
	"boy-icon.png",
	"cat-icon.png",
	"dog-icon.png",
];

const Dashboard = () => {
	const { user, setUser } = useAuth();

	const [newName, setNewName] = useState({
		value: "",
		readOnly: true,
	});
	const [newEmail, setNewEmail] = useState({
		value: "",
		readOnly: true,
	});

	useEffect(() => {
		if (user) {
			setNewName({
				value: user.name,
				readOnly: true,
			});
			setNewEmail({
				value: user.email,
				readOnly: true,
			});
		}
	}, [user]);

	return (
		<>
			<S.Container>
				<Form
					handler={() => {
						handleUpdateUser({
							updateData: {
								id: user!.id,
								password: window.prompt("Confirme sua senha") || "",
								name: newName.value,
								email: newEmail.value,
							},
							setUser,
						});
					}}
					spanSubmit="Salvar alterações"
					route=""
					spanTip={["Sair sem salvar descartará as alterações realizadas!"]}
				>
					<>
						<div className="background"></div>
						<div className="profile-container">
							<img
								src={`/assets/${profileIcons[1]}`}
								alt=""
								className="profile-image__image"
							/>
							<RiEditFill className="profile-image__edit" />
							<h3>{`@${(user && user.username) || ""}`}</h3>
							<span>{`Membro desde: ${(user && user.createdAt) || ""}`}</span>
						</div>
						<InputContainer
							label="Nome"
							type="text"
							id="Nome"
							value={newName.value}
							required
							readonly={newName.readOnly}
							onChange={(e) =>
								setNewName((prevState) => {
									return { ...prevState, value: e.target.value };
								})
							}
						>
							<RiEditFill
								className="edit-input"
								onClick={() =>
									setNewName((prevState) => {
										return { ...prevState, readOnly: false };
									})
								}
							/>
						</InputContainer>
						<InputContainer
							label="Email"
							type="text"
							id="Email"
							value={newEmail.value}
							required
							readonly={newEmail.readOnly}
							onChange={(e) =>
								setNewEmail((prevState) => {
									return { ...prevState, value: e.target.value };
								})
							}
						>
							<RiEditFill
								className="edit-input"
								onClick={() =>
									setNewEmail((prevState) => {
										return { ...prevState, readOnly: false };
									})
								}
							/>
						</InputContainer>
					</>
				</Form>
			</S.Container>
		</>
	);
};

export default Dashboard;
