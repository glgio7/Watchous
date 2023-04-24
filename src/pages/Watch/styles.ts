import styled from "styled-components";

export const Container = styled.main`
	width: 100%;
	min-height: calc(100vh - 54px);
	display: flex;
	flex-direction: column;
	align-items: center;

	background-image: url("/img/background.jpg");
	background-size: cover;

	padding: 2rem;

	ul {
		display: flex;
		flex-flow: row wrap;
	}

	a {
		margin-block: 1rem;
		margin-inline: 1rem;
	}

	.movie-box {
		&:hover img {
			scale: 1;
		}
	}

	.movie-box img {
		border-radius: 10px 10px 0 0;
	}

	button {
		cursor: pointer;

		width: inherit;
		height: 2.5rem;

		font-weight: bold;

		color: #fff;
		background-color: rgba(0, 60, 150, 1);

		border-radius: 0 0 10px 10px;

		color: rgba(0, 60, 150, 1);
		background-color: #fff;
		font-size: 1rem;

		transition: all 200ms;
		&:hover {
			background-color: #111;
			color: #fff;
		}
	}

	//mobile portrait
	@media screen and (max-width: 768px) {
		padding: 1rem;

		min-height: calc(100vh - 114px);

		ul {
			width: 90%;
			justify-content: space-between;
		}

		.movie-box {
			aspect-ratio: 3/4;
		}
	}
`;
