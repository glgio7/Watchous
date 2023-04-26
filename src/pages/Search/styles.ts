import styled from "styled-components";

export const SearchContainer = styled.div`
	padding: 2rem;

	h1 {
		font-size: 1.5rem;
		color: #fff;
		text-shadow: 0px 1px 3px #0070ff;

		&::first-letter {
			text-transform: uppercase;
			color: #0040ff;
		}
	}

	@media screen and (max-width: 768px) {
		padding: 1rem;
	}
`;
