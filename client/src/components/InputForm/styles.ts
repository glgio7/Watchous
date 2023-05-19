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
`;
