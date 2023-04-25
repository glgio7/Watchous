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
	background-size: cover;

	padding: 2rem;

	.fade {
		z-index: -1;

		position: absolute;
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

	form {
		background-color: rgba(20, 20, 20, 0.95);
		padding: 1rem;

		border-radius: 10px;

		display: flex;
		flex-direction: column;

		width: 40%;
		min-height: 50vh;
	}

	label {
		color: #fff;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	input {
		background-color: #202020;
		color: #fff;

		height: 40px;

		margin-bottom: 2rem;
		padding: 9px 15px;

		caret-color: #ffa400;
		outline: none;
	}

	input:focus {
		border: #0040ff 1px solid;
	}

	input[type="submit"] {
		cursor: pointer;
		background-color: #0040ff;

		font-weight: bold;

		transition: all 300ms;

		&:hover {
			background-color: #ffa400;
			color: #000;
		}
	}

	span {
		margin: 0 auto;
		color: #fff;
	}

	a {
		margin-left: 0.25rem;

		color: #ffa400;

		transition: all 300ms;

		&:hover {
			opacity: 0.75;
		}
	}

	//mobile portrait
	@media screen and (max-width: 900px) {
		padding: 1rem;

		min-height: calc(100vh - 114px);

		h2,
		form {
			width: 90%;
		}
	}
`;
