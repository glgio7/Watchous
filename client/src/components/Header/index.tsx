import React, { useState, useEffect, useContext } from "react";
import { RiMenuFill, RiSearchLine, RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import * as S from "./styles";
import { SearchContext } from "../../contexts/SearchContext";
import { AuthContext } from "../../contexts/AuthContext";
import { handleSignOut } from "../../api/auth";

export default function Header() {
	const [navOpen, setNavOpen] = useState(false);

	const [input, setInput] = useState("");

	const toggleMenu = () => setNavOpen(!navOpen);

	const {
		setSeriesFromSearch,
		setMoviesFromSearch,
		searchValue,
		setSearchValue,
	} = useContext(SearchContext);

	const { authenticated, setAuthenticated, setUser } = useContext(AuthContext);

	const search = (props: React.KeyboardEvent) => {
		if (props.key === "Enter") {
			setSearchValue(input.replaceAll(" ", "+"));
		}
	};

	if (navOpen) {
		document.body.style.overflow = "hidden";
	} else if (!navOpen) {
		document.body.style.overflow = "auto";
	}

	useEffect(() => {
		setInput("");
	}, [searchValue]);

	return (
		<>
			<S.Header>
				<Link
					to={"/"}
					className="logo-container"
					onClick={() => {
						setMoviesFromSearch([]);
						setSeriesFromSearch([]);
						setSearchValue("");
					}}
				>
					<h1 className="logo">
						<img src={"/img/logo.png"} alt="Watchous" />
					</h1>
				</Link>
				<div className="search-container">
					<input
						type="text"
						placeholder="Pesquisar"
						onChange={(e) => setInput(e.target.value)}
						value={input}
						onKeyDown={(props) => {
							search(props);
						}}
					/>
					<RiSearchLine
						className="search-container__icon"
						onClick={() => {
							setSearchValue(input);
						}}
					/>
				</div>
				<div className="menu-container">
					<RiMenuFill className="menu" onClick={toggleMenu} />
				</div>
			</S.Header>
			<S.Navigation active={navOpen} onMouseLeave={() => setNavOpen(false)}>
				{authenticated && (
					<RiLogoutBoxLine
						className="logout-btn"
						onClick={() => handleSignOut({ setAuthenticated, setUser })}
					/>
				)}
				{authenticated ? (
					<Link
						to={"/"}
						onClick={() => {
							setNavOpen(false), setSearchValue("");
						}}
					>
						<li>Minha conta</li>
					</Link>
				) : (
					<Link
						to={"/login"}
						onClick={() => {
							setNavOpen(false), setSearchValue("");
						}}
					>
						<li>Fazer login</li>
					</Link>
				)}
				<Link
					to="/"
					onClick={() => {
						setNavOpen(false), setSearchValue("");
					}}
				>
					<li>Página Inicial</li>
				</Link>
				<Link
					to={"/freetowatch"}
					onClick={() => {
						setNavOpen(false), setSearchValue("");
					}}
				>
					<li id="new">Grátis para Assistir</li>
				</Link>
				<Link
					to={"/credits"}
					onClick={() => {
						setNavOpen(false), setSearchValue("");
					}}
				>
					<li id="new">Créditos</li>
				</Link>
			</S.Navigation>
		</>
	);
}
