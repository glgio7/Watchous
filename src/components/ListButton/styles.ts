import styled from "styled-components";

export const ListButton = styled.button<{ direction: string }>`
	width: 48px;

	cursor: pointer;

	border: none;
	font-size: 2rem;

	z-index: 90;

	position: absolute;
	top: 0;
	bottom: 0;
	left: ${({ direction }) => (direction === "left" ? "0" : "")};
	right: ${({ direction }) => (direction === "right" ? "0" : "")};

	background-color: rgba(0, 0, 0, 0.85);
	color: #0070ff;

	transition: all 250ms;

	&:hover {
		color: #fff;
	}

	@media screen and (max-width: 768px) {
		position: static;
	}
	/*		cursor: pointer;
		border: none;
		display: flex;
		background-color: rgba(0, 0, 0, 0.75);
		z-index: 9;
		min-width: 42px;
		font-size: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		pointer-events: all;
	} */
`;
