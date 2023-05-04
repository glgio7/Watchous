import styled from "styled-components";

export const Container = styled.div<{
	background: string;
}>`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-around;
	position: relative;

	width: 100%;
	min-height: calc(100vh - 54px);

	background-image: ${({ background }) => `url('${background}')`};
	background-size: cover;
	background-position: center;
	padding: 2rem;

	.fade {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;

		background: rgb(32, 32, 32);
		background: linear-gradient(
			90deg,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 1) 70%
		);
	}

	button {
		background-color: transparent;

		font-size: 1.25rem;
		font-weight: bold;

		cursor: pointer;
		color: rgb(255, 164, 0);
	}

	a {
		color: #fff;

		transition: all 300ms;

		&:hover {
			color: rgb(255, 164, 0);
		}
	}

	section {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		background-color: rgba(0, 0, 0, 0.5);

		border-radius: 10px;

		z-index: 5;

		height: 480px;

		margin-block: 1rem;
	}

	.container-info__top,
	.container-info__bottom {
		width: 100%;
		height: 2rem;

		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 1.25rem;
		text-align: center;

		background-color: #0010ff;
		color: rgb(255, 164, 0);

		font-weight: bold;
		strong {
			margin-right: 10px;

			color: #fff;
		}

		span {
			color: #fff;
		}
	}

	.container-info__top {
		border-radius: 10px 10px 0 0;
	}
	.container-info__bottom {
		border-radius: 0 0 10px 10px;
	}

	.fav-btn,
	.unfav-btn {
		background-color: #262626;
		color: #fff;

		padding: 6px;
		position: absolute;
		left: .5rem;

		border-radius: 50%;

		cursor: pointer;

		font-size: 1.75rem;

		transition: all 300ms;
		&:hover {
			color: firebrick;
		}
	}

	.unfav-btn {
		color: firebrick;

		&:hover {
			color: rgba(255, 255, 255, 0.5);
		}
	}

	.card-container {
		aspect-ratio: 3/4;

		position: relative;

		margin-right: 2rem;
	}

	.card-container img {
		object-fit: cover;

		height: calc(100% - 4rem);
	}

	.overview-container {
		aspect-ratio: 4/3;
	}

	.overview-body {
		display: flex;

		overflow-y: auto;

		height: 100%;
		width: 100%;

		aspect-ratio: 4/3;

		padding: 1rem 0;
	}

	p {
		height: 100%;
		width: 50%;
		padding: 0 1rem;
		overflow-y: auto;
		font-size: 1.2rem;
		text-align: center;
		color: #fff;
	}

	.overview-list {
		width: 50%;
		overflow-y: auto;
	}

	.overview-list li {
		width: 100%;
		padding: 1rem;
		background-color: #111;
		color: #fff;

		margin-bottom: 0.5rem;
	}

	.overview-list h3 {
		width: 100%;
		color: rgb(255, 164, 0);
	}

	.sinopse-btn {
		width: 100%;
		height: 4rem;

		font-size: 1rem;
		text-align: center;

		background-color: transparent;
		color: rgb(255, 164, 0);
	}
	.related-movies {
		display: flex;
		overflow-x: auto;
	}

	.related-movies__movie {
		display: flex;
		flex-direction: column;
		align-items: center;

		cursor: pointer;

		margin-right: 1rem;
		margin-top: 1rem;
	}

	.related-movies img {
		height: 96px;
		width: 72px;
		object-fit: cover;
	}

	@media screen and (max-width: 900px) {
		.card-container {
			margin-right: 0rem;
		}

		.fade {
			background: linear-gradient(
				0deg,
				rgba(0, 0, 0, 0) 0%,
				rgba(0, 0, 0, 1) 90%
			);
		}
	}

	@media screen and (max-width: 768px) {
		flex-direction: column;
		justify-content: flex-start;
		padding: 1rem;
		min-height: calc(100vh - 114px);

		section {
			height: auto;
		}

		.card-container {
			width: 90%;
		}

		.overview-container {
			width: 90%;
			min-height: 360px;
		}

		.overview-body {
			height: 100%;
			flex-direction: column;
			align-items: center;
			padding: 1rem;
		}

		.overview-list,
		p {
			width: 100%;
		}

		.overview-list li {
			border-radius: 10px;
			background-color: #000;
		}
	}
`;

export const IframeContainer = styled.div<{ active: boolean }>`
	position: fixed;
	top: 0;
	margin-top: 54px;
	height: calc(100vh - 54px);
	left: 0;
	right: 0;

	z-index: 9;

	opacity: ${({ active }) => (active ? "1" : "0")};
	pointer-events: ${({ active }) => (active ? "all" : "none")};

	transition: all 600ms;

	.close-btn {
		background-color: #0040ff;
		color: #fff;

		height: 3rem;
		width: 100%;

		position: absolute;
		top: 0;
	}

	iframe {
		width: 100%;
		height: 100%;
	}

	@media screen and (max-width: 768px) {
		margin-top: 114px;
		height: calc(100vh - 114px);
	}
`;
