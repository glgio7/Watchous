import styled from "styled-components";

export const Header = styled.header`
	width: 100%;
	height: 54px;

	position: sticky;
	top: 0;

	z-index: 99;

	background-color: #101010;

	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 0 2rem;

	.logo-container {
		width: 30%;
		height: 60px;
		display: flex;
		align-items: center;
	}

	.logo {
		height: 42px;
		width: 210px;
	}

	.search-container {
		display: flex;
		align-items: center;
		width: 30vw;
		justify-content: center;
	}

	input {
		height: 2rem;
		width: 100%;

		background-color: #202020;
		color: #fff;

		border-radius: 3px 0px 0px 3px;
		border: none;

		font-size: 1rem;

		padding-inline: 15px;
		::placeholder {
			font-size: 0.9rem;
		}
		&:focus {
			outline: #0030ff solid thin;
		}
	}
	.search-container__icon {
		color: #fff;
		background-color: #202020;
		width: 1.5rem;
		height: 2rem;
		border-radius: 0px 3px 3px 0px;
		font-size: 1rem;
		margin-left: 0.1rem;
		cursor: pointer;
		&:active {
			outline: cornflowerblue solid thin;
		}
	}

	.menu-container {
		width: 30%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.menu {
		display: block;

		background-color: #fff;
		color: #0070ff;

		padding: 0.25rem;

		border-radius: 10px;

		font-size: 2rem;
		width: 2rem;
		height: 2rem;
		font-weight: bold;

		cursor: pointer;
	}
	.profile-icon {
		display: block;

		background-color: #fff;
		color: #0070ff;

		border-radius: 50%;

		width: 2rem;
		height: 2rem;

		cursor: pointer;
	}

	@media screen and (max-width: 768px) {
		height: 114px;
		padding: 0 1rem;

		flex-direction: column;
		justify-content: center;

		.logo-container,
		.search-container {
			align-items: center;
			justify-content: center;
			width: 100%;
		}

		.logo-container {
			width: 80%;
		}

		.menu-container {
			width: auto;
			position: absolute;
			top: 1.5rem;
			left: 1rem;
		}
	}
`;

export const Navigation = styled.nav<{ active: boolean }>`
	pointer-events: ${({ active }) => (active ? "all" : "none")};
	opacity: ${({ active }) => (active ? "1" : "0")};

	position: fixed;
	top: 54px;
	right: 0;
	padding: 1rem 0;

	z-index: 99;

	height: calc(100vh - 54px);
	width: 20vw;

	background-color: #202020;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;

	transition: all 0.5s;
	a,
	li {
		position: relative;
		color: #fff;
		font-size: 1.2rem;
		font-weight: bold;
		display: flex;
		text-align: center;
		justify-content: center;
		transition: all ease 75ms;
		line-height: 2rem;
	}
	a:hover {
		background-color: rgba(0, 60, 150, 0.75);
		box-shadow: 0px 0px 10px rgba(0, 60, 150, 1);
		border-radius: 5px;
		text-align: center;
		width: max-content;
		padding: 0 0.5rem;
	}

	.logout-btn {
		display: block;

		background-color: #fff;
		color: #0070ff;

		padding: 0.25rem;

		border-radius: 10px;

		font-size: 2rem;
		font-weight: bold;

		cursor: pointer;

		transition: all 250ms;

		&:hover {
			opacity: 0.8;
		}
	}

	@media screen and (max-width: 768px) {
		top: 114px;
		width: 100%;
		height: calc(100vh - 114px);
		backdrop-filter: blur(6px);
		background: rgb(32, 32, 32);
		background: linear-gradient(
			180deg,
			rgba(32, 32, 32, 0) 0%,
			rgba(48, 48, 48, 1) 15%,
			rgba(16, 16, 16, 1) 100%
		);
	}
`;
