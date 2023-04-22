import styled from "styled-components";

export const Container = styled.div<{
	background: string;
}>`
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;

	width: 100%;
	min-height: calc(100vh - 54px);

	background-image: ${({ background }) => `url('${background}')`};
	background-size: cover;
	background-position: center;
	padding: 0 2rem;

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

	section {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		background-color: rgba(0, 0, 0, 0.5);

		border-radius: 10px;

		z-index: 5;

		height: 480px;
	}

	.container-info__top,
	.container-info__bottom {
		width: 100%;
		height: 2rem;

		font-size: 1.25rem;
		text-align: center;

		background-color: #0040ff;
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

	.card-container {
		aspect-ratio: 9/16;
	}

	.overview-container {
		width: 60%;
	}

	p {
		height: 100%;
		padding: 1rem 2rem;
		font-size: 1.2rem;
		text-align: center;
		color: #fff;
	}

	button {
		background-color: transparent;

		font-size: 1.25rem;
		font-weight: bold;

		cursor: pointer;
	}

	.sinopse-btn {
		width: 100%;
		height: 4rem;

		font-size: 1rem;
		text-align: center;

		background-color: transparent;
		color: rgb(255, 164, 0);
	}

	@media screen and (max-width: 768px) {
		flex-direction: column;
		padding: 2rem;

		section {
			margin-block: 1rem;
		}

		.card-container {
			min-width: 60%;
		}

		.overview-container {
			width: 100%;
		}
	}
`;

export const IframeContainer = styled.div<{ active: boolean }>`
	position: absolute;
	top: 0;
	bottom: 0;
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
`;
