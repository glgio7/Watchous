import styled from "styled-components";

export const Movie = styled.li`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-right: 15px;
	height: 100%;
	text-align: center;
	aspect-ratio: 9 / 16;
	width: calc((100vw - 105px) / 7);

	:last-child {
		margin-right: 0px;
	}
	.vote-average {
		position: absolute;
		top: -15px;
		left: 1rem;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		z-index: 5;

		width: 60px;
		height: 84px;

		color: #fff;
		background-color: #001b80;

		border-radius: 0 9px 9px 9px;

		p {
			font-size: 0.8rem;
			color: #ffa400;
		}

		span {
			font-size: 1.25rem;
		}
	}

	.fav-btn,
	.unfav-btn {
		position: absolute;
		right: 0.5rem;
		top: 0;

		background-color: #262626;
		color: #fff;

		padding: 6px;

		border-radius: 50%;

		cursor: pointer;

		font-size: 2rem;

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

	.moviePoster {
		background-color: #262626;

		aspect-ratio: 9 / 16;

		min-width: calc((100vw - 105px) / 7);
		width: 100%;
		height: 100%;

		object-fit: cover;
		object-position: center;

		transition: scale ease-in 200ms;

		border-radius: 10px;

		&:hover {
			scale: 1.02;
		}
	}

	span {
		font-size: 1rem;
		line-height: 1.25rem;
		color: #fff;
		font-weight: bold;
		vertical-align: top;
		margin-top: 0.5rem;
	}

	//mobile portrait
	@media screen and (max-width: 768px) {
		width: calc((100vw - 30px) / 3);
		aspect-ratio: 9 / 16;

		.moviePoster {
			aspect-ratio: 9 / 16;
			min-width: calc((100vw - 30px) / 3);
		}

		.vote-average {
			width: 48px;
			height: 60px;

			left: 0.5rem;

			border-radius: 0 6px 6px 6px;

			p {
				font-size: 0.5rem;
			}
		}
	}
`;
