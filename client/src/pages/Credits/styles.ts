import styled from "styled-components";

export const Container = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: calc(100vh - 60px);

	z-index: 5;
	position: relative;

	padding: 2rem;

	.background {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		z-index: -1;
		opacity: 0.25;

		background-image: url("/img/background.jpg");
		background-size: cover;
	}

	.image-container {
		width: 240px;
		margin-block: 2rem;
	}

	h1 {
		width: 100%;
		text-align: center;
		font-size: 3rem;
		color: #fff;

		text-shadow: #0070ff 0px 9px 30px;
	}

	p {
		width: 100%;
		margin-block: 1rem;
		text-align: center;
		color: #fff;
		font-size: 1.25rem;
	}

	a {
		text-decoration: none;
		color: #0070ff;
		font-weight: bold;
	}

	//mobile portrait
	@media screen and (max-width: 768px) {
		padding: 1rem;
	}
`;
