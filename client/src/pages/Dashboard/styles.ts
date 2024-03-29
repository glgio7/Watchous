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
	justify-content: center;

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

	.pop-up {
		position: absolute;
		z-index: 9;

		width: 280px;

		border-radius: 10px;

		padding: 0.5rem;

		background-color: #000;

		display: flex;
		flex-direction: column;
		align-items: center;

		span {
			font-weight: bold;

			color: #ffa400;
		}

		select {
			margin-top: 0.5rem;
			width: 100%;

			text-align: center;
			background-color: #000;
			color: #fff;
		}
	}

	.profile-container {
		position: relative;

		display: flex;
		flex-direction: column;
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

	.profile-container h3,
	.profile-container span {
		text-align: center;
		margin-block: initial;
	}

	.edit-input {
		color: #0070ff;

		cursor: pointer;

		font-size: 1.15rem;

		margin-right: 0.25rem;
	}

	@media screen and (max-width: 768px) {
		padding: 1rem;
	}
`;
