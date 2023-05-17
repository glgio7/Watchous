import styled from "styled-components";

export const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
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
`;
