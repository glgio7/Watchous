import styled from "styled-components";

export const Container = styled.main`
	width: 100%;
	height: calc(100vh - 54px);

	z-index: 9;

	position: fixed;
	top: 54px;
	left: 0;

	display: flex;
	align-items: center;
	justify-content: center;

	background-color: #000;

	.svg-container {
		height: 50%;
		border-radius: 50%;
		aspect-ratio: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		box-shadow: 0px 0px 100px #0070ff;

		animation: loader 1s ease-in-out infinite forwards;
	}

	.svg-container::after {
		position: absolute;
		content: "";
		border: #fff 9px solid;
		height: calc(100% + 6px);
		width: calc(100% + 6px);
		border-radius: 50%;
		border-style: dotted;

		animation: rotate 10s linear infinite forwards;
	}

	svg {
		height: 80%;
		aspect-ratio: 1;
		stroke: #0070ff;
		z-index: 9;
		stroke-width: 0.01rem;
		opacity: 0.5;
		stroke-dasharray: 100;

		animation: loader 5s linear infinite forwards;
	}

	@keyframes loader {
		to {
			stroke-dasharray: 20;
		}
	}
	@keyframes rotate {
		to {
			transform: rotate(360deg);
		}
	}

	//mobile portrait
	@media screen and (max-width: 900px) {
		top: 114px;

		height: calc(100vh - 114px);

		.svg-container {
			height: 40%;
		}
	}
`;
