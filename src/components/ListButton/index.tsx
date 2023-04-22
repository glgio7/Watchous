import React from "react";
import * as S from "./styles";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

type ListButtonProps = {
	direction: string;
	onClick?: () => void;
};

const ListButton: React.FC<ListButtonProps> = ({ direction, onClick }) => {
	return (
		<S.ListButton direction={direction} onClick={onClick}>
			{direction === "left" ? <RiArrowLeftSLine /> : <RiArrowRightSLine />}
		</S.ListButton>
	);
};

export default ListButton;
