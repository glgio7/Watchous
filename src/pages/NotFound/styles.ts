import styled from "styled-components";

export const Container = styled.main`
	width: 100%;
	height: calc(100vh - 54px);

	position: absolute;

	z-index: 5;

	display: flex;
	flex-direction: column;
	align-items: center;

	img {
		object-fit: cover;
	}

	.background {
		z-index: -1;

		opacity: 0.5;

		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	h2 {
		font-size: 12rem;
		font-family: "Ubuntu", sans-serif;

		text-shadow: 0px 6px 20px #0090ff;
		color: #fff;
	}

	span {
		color: #0060ff;
		background-color: #fff;

		border-radius: 4px;

		font-weight: bold;

		padding: 0.5rem;
	}

	a {
		color: #fff;

		margin-top: 2rem;

		border-bottom: #0060ff solid 2px;

		font-weight: bold;

		transition: all ease 300ms;

		&:hover {
			font-weight: normal;
			opacity: 0.8;
		}
	}

	@media screen and (max-width: 768px) {
		height: calc(100vh - 114px);

		h2 {
			font-size: 8rem;
		}
	}
`;
