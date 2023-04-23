import styled from "styled-components";

export const Header = styled.header`
	width: 100%;
	height: 54px;

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
		/* object-fit: cover; */
	}

	.search-container {
		display: flex;
		align-items: center;
		width: 30vw;
		justify-content: center;
	}

	input {
		width: 100%;
		border-radius: 3px 0px 0px 3px;
		background-color: #202020;
		color: #fff;
		border: none;
		font-size: 1rem;
		height: 2rem;
		text-align: center;
		::placeholder {
			font-size: 0.9rem;
		}
		&:focus {
			outline: cornflowerblue solid thin;
			::placeholder {
				opacity: 0;
			}
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
		color: #fff;
		font-weight: bold;
		font-size: 2rem;
		cursor: pointer;
	}

	@media screen and (max-width: 768px) {
		height: 114px;
		padding: 0 1rem;

		position: relative;

		flex-direction: column;
		justify-content: center;

		.logo-container,
		.search-container {
			align-items: center;
			justify-content: center;
			width: 100%;
		}

		.menu-container {
			width: auto;
			position: absolute;
			top: 1.5rem;
			right: 1rem;
		}
	}
`;

export const Navigation = styled.nav<{ active: boolean }>`
	pointer-events: ${({ active }) => (active ? "all" : "none")};
	opacity: ${({ active }) => (active ? "1" : "0")};

	position: absolute;
	right: 0;

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
	.closeMenu {
		display: none;
	}

	@media screen and (max-width: 768px) {
		position: fixed;
		width: 100%;
		height: calc(100vh - 114px);
		margin-top: 0;
		backdrop-filter: blur(6px);
		background: rgb(32, 32, 32);
		background: linear-gradient(
			180deg,
			rgba(32, 32, 32, 0) 0%,
			rgba(48, 48, 48, 1) 15%,
			rgba(16, 16, 16, 1) 100%
		);

		.closeMenu {
			display: flex;
			position: absolute;
			top: 20px;
			right: 20px;
			color: #fff;
			font-size: 2rem;
			cursor: pointer;
		}
	}
`;
