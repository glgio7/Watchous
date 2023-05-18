import styled from "styled-components";

export const Container = styled.main`
	width: 100%;
	min-height: calc(100vh - 54px);

	z-index: 5;

	position: relative;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	background-image: url("/img/login-background.jpg");
	background-attachment: fixed;
	background-size: cover;

	padding: 2rem;

	.fade {
		z-index: -1;

		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;

		background: rgb(32, 32, 32);
		background: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 75%);
	}

	h2 {
		background-color: rgba(10, 10, 10, 1);
		color: #ffa400;

		margin-bottom: 1rem;

		border-radius: 10px;

		width: 40%;

		text-align: center;
	}

	//mobile portrait
	@media screen and (max-width: 900px) {
		padding: 1rem;

		min-height: calc(100vh - 114px);

		h2 {
			width: 90%;
		}
	}
`;
