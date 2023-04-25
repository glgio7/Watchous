import React, { useState, useEffect, useContext } from "react";
import { RiCheckboxBlankCircleFill, RiMenuFill } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import * as S from "./styles";
import { SearchContext } from "../../contexts/SearchContext";

type HeaderProps = {
	searchValue: string;
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function Header({ searchValue, setSearchValue }: HeaderProps) {
	const [navOpen, setNavOpen] = useState(false);
	const toggleMenu = () => setNavOpen(!navOpen);
	const hideNav = () => setNavOpen(false);
	const { setSeriesFromSearch, setMoviesFromSearch } = useContext(
		SearchContext
	);

	const [input, setInput] = useState("");

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
				{/* <RiCheckboxBlankCircleFill className="notification" /> */}
			</S.Header>
			<S.Navigation active={navOpen} onMouseLeave={hideNav}>
				<RiCloseFill className="closeMenu" onClick={toggleMenu} />
				<a href="/" onClick={() => setNavOpen(false)}>
					<li>Página Inicial</li>
				</a>
				<Link to={"/login"} onClick={() => setNavOpen(false)}>
					<li>Minha conta</li>
				</Link>
				<Link to={"/freetowatch"} onClick={() => setNavOpen(false)}>
					<li id="new">Grátis para Assistir</li>
				</Link>
				<Link to={"/credits"} onClick={() => setNavOpen(false)}>
					<li id="new">Créditos</li>
				</Link>
			</S.Navigation>
		</>
	);
}
