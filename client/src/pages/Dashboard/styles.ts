import styled from "styled-components";

export const Container = styled.main`
	width: 100%;
	padding: 2rem;

	position: relative;
	z-index: 5;

	color: #fff;

	display: flex;
	flex-direction: column;
	align-items: center;

	.background {
		z-index: -1;

		opacity: 0.5;

		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;

		background-image: url("/img/background.jpg");
		background-size: cover;
		background-position: bottom;
		background-attachment: fixed;
	}

	.profile-container {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-block: 1rem;
	}

	.profile-image__image {
		width: 240px;

		aspect-ratio: 1;
		object-fit: cover;

		border-radius: 50%;

		opacity: 1;

		transition: all 300ms;

		&:hover {
			opacity: 0.75;
		}
	}

	.profile-image__edit {
		font-size: 4rem;

		height: 4rem;
		width: 4rem;

		position: absolute;

		color: #0070ff;

		cursor: pointer;

		transition: all 300ms;

		opacity: 0.75;
		&:hover {
			opacity: 1;
		}
	}

	h3 {
		margin-top: 1rem;
	}

	@media screen and (max-width: 768px) {
		padding: 1rem;
	}
`;
