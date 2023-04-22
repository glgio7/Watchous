import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 54px;
	background-color: #000;

	.loading {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0;
		bottom: -30px;
		left: 0;
		right: 0;
		z-index: 90;
		background-color: #000;
	}

	.loading img {
		width: 25%;
		object-fit: contain;
	}

	iframe {
		opacity: 0;
		display: block;
		pointer-events: none;
		z-index: 9;
		top: 24px;
		bottom: 0;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 75%;
		border-left: 40px #000 solid;
		border-right: 40px #000 solid;
		border-top: 10px #000 solid;
		border-bottom: 10px #000 solid;
		border-radius: 10px;
		height: 82vh;
		transition: all ease 500ms;
	}

	iframe.active {
		pointer-events: all;
		opacity: 1;
	}

	.video-unavailable {
		object-fit: cover;
		opacity: 0;
		display: block;
		pointer-events: none;
		z-index: 9;
		top: 24px;
		bottom: 0;
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 75%;
		border-left: 40px #000 solid;
		border-right: 40px #000 solid;
		border-top: 10px #000 solid;
		border-bottom: 10px #000 solid;
		border-radius: 10px;
		height: 82vh;
		transition: all ease 500ms;
	}

	.video-unavailable.active {
		pointer-events: all;
		opacity: 1;
	}
	.close-player {
		display: none;
		position: absolute;
		height: 36px;
		right: 0;
		left: 0;
		top: 0;
		margin: 0 auto;
		z-index: 10;
		width: 36px;
		border-radius: 50%;
		background-color: rgba(0, 174, 255, 0.5);
		text-align: center;
		font-size: 2rem;
		font-family: "Franklin Gothic Medium", sans-serif;
		font-weight: bold;
		color: #fff;
		cursor: pointer;
	}
	.close-player.active {
		display: block;
	}

	.background {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: -1;
		width: 100%;
		object-fit: cover;
		min-height: calc(100vh - 54px);
	}
	.fade {
		position: absolute;
		left: 0;
		right: 0;
		z-index: -1;
		width: 100%;
		object-fit: cover;
		min-height: calc(100vh - 54px);
		height: 100%;
		background: rgb(32, 32, 32);
		background: linear-gradient(
			90deg,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 1) 70%
		);
	}

	section {
		position: relative;
		width: 100%;
		z-index: 5;
		display: flex;
		justify-content: space-around;
	}

	.container {
		margin-top: 60px;
		display: flex;
		flex-direction: column;
		width: 360px;
		height: 100%;
	}
	.poster {
		background-position: center;
		object-fit: cover;
		width: 360px;
		height: 480px;
	}

	button {
		width: 360px;
		height: 2.5rem;
		font-size: 1.25rem;
		font-weight: bold;
		font-family: "Saira Condensed", sans-serif;
		color: #fff;
		border: none;
		border-radius: 0 0 10px 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 60, 150, 1);
		cursor: pointer;
		transition: all 250ms ease;
		&:hover {
			opacity: 0.75;
		}
		&:active {
			scale: 1.075;
		}
	}

	.back {
		font-size: 2rem;
		color: #fff;
		margin-left: 162px;
		margin-block: 9px;
		background-color: #000;
		border-radius: 50%;
		width: 36px;
		height: 36px;
		padding: 3px;
		transition: all 250ms ease;
		&:hover {
			cursor: pointer;
			padding: 0px;
			color: #000;
			background-color: #fff;
		}
	}

	.overview {
		margin-top: 60px;
		text-align: center;
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: calc(480px + 5rem);
		justify-content: space-between;

		h1 {
			font-size: 2rem;
			color: #fff;
			font-family: "Saira Condensed", sans-serif;
		}
		p {
			color: #fff;
			font-family: "Saira Condensed", sans-serif;
			font-size: 1.5rem;
			line-height: 2.5rem;
			padding: 0 2rem;
			text-align: center;
			&:nth-child(3) {
				overflow-y: auto;
			}
		}
	}
	.release-date {
		width: 100%;
		height: 2.5rem;
		font-size: 1.25rem;
		font-weight: bold;
		font-family: "Saira Condensed", sans-serif;
		color: #ffa400;
		border: none;
		border-radius: 10px 10px 0 0;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		background-color: rgba(0, 60, 150, 1);

		h1 {
			color: #fff;
			font-size: 1.25rem;
		}
	}
	.infos {
		width: 100%;
		height: 2.5rem;
		min-height: 2.5rem;
		font-size: 1.25rem;
		font-weight: bold;
		font-family: "Saira Condensed", sans-serif;
		color: #fff;
		border: none;
		border-radius: 10px 10px 0 0;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		background-color: rgba(0, 60, 150, 1);
	}

	#nota {
		border-radius: 0 0 10px 10px;
	}

	#expand-overview {
		cursor: pointer;
		color: #ffa400;
		margin-block: 1rem;
		&:hover {
			opacity: 0.75;
		}
	}

	.search-results {
		max-width: 100vw;
		overflow-x: scroll;
		scrollbar-width: thin;
		::-webkit-scrollbar {
			width: thin;
			background-color: #000;
		}
		::-webkit-scrollbar-thumb {
			background-color: #111;
		}
	}

	//mobile portrait
	@media screen and (max-width: 768px) {
		margin-top: 114px;
		align-items: center;
		.container {
			margin-top: 0.5rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 100%;
			height: 100%;
		}
		.poster {
			width: 65vw;
			height: 50vh;
		}
		button {
			width: 65vw;
			height: 2.5rem;
			font-size: 1.25rem;
			font-weight: bold;
			font-family: "Saira Condensed", sans-serif;
			color: #fff;
			border: none;
			border-radius: 0 0 10px 10px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: rgba(0, 60, 150, 1);
			cursor: pointer;
			transition: all 250ms ease;
			&:hover {
				opacity: 0.75;
			}
			&:active {
				scale: 1.075;
			}
		}

		.release-date {
			width: 65vw;
			font-size: 1rem;
			h1 {
				color: #fff;
				font-size: 1rem;
			}
		}

		.infos {
			width: 100%;
			line-height: 1rem;
			font-size: 1rem;
		}
		#nota {
			border-radius: 10px 10px 0 0;
		}

		.back {
			font-size: 2rem;
			color: #fff;
			margin-left: 0;
			font-size: 2.5rem;
			margin-top: 0.5rem;
			background-color: #000;
			border-radius: 50%;
			width: 36px;
			height: 36px;
			padding: 3px;
			transition: all 250ms ease;
			&:hover {
				cursor: pointer;
				padding: 0px;
				color: #000;
				background-color: #fff;
			}
		}
		iframe {
			opacity: 0;
			display: block;
			pointer-events: none;
			border: none;
			top: 1rem;
			bottom: 0;
			left: 0;
			right: 0;
			margin: 0 auto;
			width: 65vw;
			height: calc(50vh + 5rem);
		}
		.video-unavailable {
			opacity: 0;
			display: block;
			pointer-events: none;
			border: none;
			top: 1rem;
			bottom: 0;
			left: 0;
			right: 0;
			margin: 0 auto;
			width: 65vw;
			height: calc(50vh + 5rem);
		}
		.close-player {
			display: none;
			position: absolute;
			height: 36px;
			right: 0;
			left: 0;
			top: 3px;
			margin: 0 auto;
			z-index: 10;
			width: 36px;
		}

		.fade {
			background: linear-gradient(
				180deg,
				rgba(0, 0, 0, 0) 0%,
				rgba(0, 0, 0, 1) 50%
			);
		}

		section {
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			height: 100%;
		}

		.overview {
			margin-top: 1rem;
			width: 90vw;
			height: 100%;
			min-height: calc(50vh + 5rem);

			h1 {
				text-align: center;
				margin-block: 1rem;
			}
			p {
				font-size: 1.25rem;
				line-height: 1.75rem;
			}
		}
	}
	//mobile landscape
	@media screen and (max-width: 900px) and (min-width: 480px) and (orientation: landscape) {
		margin-top: 72px;

		.fade {
			background: linear-gradient(
				90deg,
				rgba(0, 0, 0, 0) 0%,
				rgba(0, 0, 0, 1) 65%
			);
		}

		section {
			flex-direction: row;
			align-items: flex-start;
			justify-content: space-around;
			width: 100vw;
			overflow: hidden;
			padding: 0 2rem;
		}

		.overview {
			width: 40vw;
			overflow-y: auto;
			text-align: center;
			justify-content: space-between;
			height: calc(60vh + 5rem);
			margin-top: 1rem;
		}

		.container {
			margin-top: 1rem;
			display: flex;
			flex-direction: column;
			align-items: center;
			width: 40vw;
			height: 100%;
		}

		.poster {
			width: 40vw;
			height: 60vh;
		}

		button {
			width: 40vw;
			height: 2.5rem;
			font-size: 1.25rem;
			font-weight: bold;
			font-family: "Saira Condensed", sans-serif;
			border: none;
			border-radius: 0 0 10px 10px;
			color: #fff;
			background-color: rgba(0, 60, 150, 1);
			cursor: pointer;
			transition: all 250ms ease;
			&:hover {
				opacity: 0.75;
			}
			&:active {
				scale: 1.075;
			}
		}

		.release-date {
			width: 40vw;
			color: #ffa400;
			background-color: rgba(0, 60, 150, 1);
		}

		.infos {
			width: 40vw;
			line-height: 1.25rem;
		}

		#nota {
			border-radius: 0 0 10px 10px;
		}

		.back {
			margin-top: 0.5rem;
			font-size: 2rem;
			color: #fff;
			margin: 0.5rem auto;
			font-size: 2.5rem;
			background-color: #000;
			border-radius: 50%;
			width: 36px;
			height: 36px;
			padding: 3px;
			transition: all 250ms ease;
			&:hover {
				cursor: pointer;
				padding: 0px;
				color: #000;
				background-color: #fff;
			}
		}

		iframe {
			opacity: 0;
			display: block;
			pointer-events: none;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			border: none;
			border-radius: 0px !important;
			margin: 0 auto;
			width: 100%;
			height: 100%;
		}

		.video-unavailable {
			opacity: 0;
			display: block;
			pointer-events: none;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			border: none;
			border-radius: 0px !important;
			margin: 0 auto;
			width: 100%;
			height: 100%;
		}
		.close-player {
			display: none;
			position: absolute;
			height: 36px;
			right: 0;
			left: 0;
			top: 3px;
			margin: 0 auto;
			z-index: 10;
			width: 36px;
		}
	}
`;
