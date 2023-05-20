import styled from "styled-components";

export const Container = styled.main`
	width: 100%;
	padding: 2rem;

	color: #fff;

	display: flex;
	flex-direction: column;
	align-items: center;

	.profile-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.profile-image__image {
		width: 240px;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: 50%;
	}

	.profile-image__edit {
	}

	@media screen and (max-width: 768px) {
		padding: 1rem;
	}
`;
