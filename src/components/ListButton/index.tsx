import React from "react";
import * as S from "./styles";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

type ListButtonProps = {
	direction: string;
};

const ListButton: React.FC<ListButtonProps> = ({ direction }) => {
	return (
		<S.ListButton>
			{direction === "left" ? <RiArrowLeftSLine /> : <RiArrowRightSLine />}
		</S.ListButton>
	);
};

export default ListButton;
