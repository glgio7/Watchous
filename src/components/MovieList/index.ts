import styled from "styled-components";

export const MovieList = styled.ul`
	overflow-x: scroll;
	overflow-y: hidden;
	display: flex;
	height: 100%;
	transition: all ease 250ms;
	scrollbar-width: none;

	::-webkit-scrollbar {
		background-color: transparent;
		width: 0px;
	}

	@media screen and (max-width: 768px) {
		background-color: transparent;
	}
`;
