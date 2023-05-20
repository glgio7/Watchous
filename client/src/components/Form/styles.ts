import styled from "styled-components";

export const Form = styled.form`
	background-color: rgba(20, 20, 20, 0.95);
	padding: 1rem;

	position: relative;

	border-radius: 10px;

	display: flex;
	flex-direction: column;

	width: 40%;
	min-height: 50vh;

	input[type="submit"] {
		cursor: pointer;

		height: 40px;

		margin-bottom: 2rem;
		padding: 9px 15px;

		background-color: #0040ff;
		color: #fff;

		font-weight: bold;

		transition: all 300ms;

		&:hover {
			background-color: #ffa400;
			color: #000;
		}
	}

	.loading-submit {
		display: flex;
		align-items: center;
		justify-content: center;

		background-color: #000;
		color: #fff;

		height: 40px;

		margin-bottom: 2rem;
		padding: 9px 15px;

		cursor: default;

		font-weight: bold;

		transition: all 300ms;
	}

	.loader {
		border: 3px solid #ffa400;
		background-color: #000;
		border-radius: 50%;
		width: 1.75rem;
		height: 1.75rem;
		position: relative;
		animation: spin 1s linear infinite;

		&::after {
			position: absolute;
			content: "";
			background: #000;
			top: 0px;
			right: 0px;
			width: 3px;
			height: 6px;
		}

		@keyframes spin {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
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

	.advice {
		color: #ff0000;
		margin-top: -2rem;
		margin-bottom: 2rem;
	}

	@media screen and (max-width: 900px) {
		width: 90%;
	}
`;
