import React from "react";
import * as S from "./styles";
import { useAuth } from "../../hooks/useAuth";
import { RiEditFill } from "react-icons/ri";

const profileIcons = [
	"robot-icon.png",
	"girl-icon.png",
	"boy-icon.png",
	"cat-icon.png",
	"dog-icon.png",
];

const Dashboard = () => {
	const { user } = useAuth();

	return (
		<>
			<S.Container>
				<div className="background"></div>
				<div className="profile-container">
					<img
						src={`/assets/${profileIcons[1]}`}
						alt=""
						className="profile-image__image"
					/>
					<RiEditFill className="profile-image__edit" />
				</div>
				<h3>{`@${user && user.username}`}</h3>
				<span>Membro desde: 20/05/2023</span>
				<h3>Nome</h3>
				<span>{`${user && user.name}`}</span>
				<h3>Email</h3>
				<span>{`${user && user.email}`}</span>
			</S.Container>
		</>
	);
};

export default Dashboard;
