import React, { useState, useEffect, useContext } from "react";
import { RiMenuFill } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import * as S from "./styles";
import { SearchContext } from "../../contexts/SearchContext";

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
				{/* <RiCheckboxBlankCircleFill className="notification" /> */}
			</S.Header>
			<S.Navigation active={navOpen} onMouseLeave={() => setNavOpen(false)}>
				<RiCloseFill className="closeMenu" onClick={toggleMenu} />
				<a
					href="/"
					onClick={() => {
						setNavOpen(false), setSearchValue("");
					}}
				>
					<li>Página Inicial</li>
				</a>
				<Link
					to={"/login"}
					onClick={() => {
						setNavOpen(false), setSearchValue("");
					}}
				>
					<li>Minha conta</li>
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
