import React from "react";
import * as S from "./styles";
import { useAuth } from "../../hooks/useAuth";

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
				<div className="profile-container">
					<img
						src={`/assets/${profileIcons[0]}`}
						alt=""
						className="profile-image__image"
					/>
				</div>
				<h3>{`@${user && user.username}`}</h3>
				<span>Membro desde: </span>
			</S.Container>
		</>
	);
};

export default Dashboard;
