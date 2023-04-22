import React, { useState } from "react";
import { RiCheckboxBlankCircleFill, RiMenu3Fill } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import * as S from "./styles";

type HeaderProps = {
	setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function Header({ setSearchValue }: HeaderProps) {
	const [navOpen, setNavOpen] = useState(false);
	const toggleMenu = () => setNavOpen(!navOpen);
	const hideNav = () => setNavOpen(false);
	const [input, setInput] = useState("");
	const setBusca = setSearchValue;
	// const clearLists = reset;
	const searchOnEnter = async (props: React.KeyboardEvent) => {
		if (props.key === "Enter") {
			setBusca(input);
			setInput("");
		}
	};
	return (
		<>
			<S.Header>
				<div className="masterHead">
					<a href="/">
						<h1 className="logo-box">
							<img src={"/img/logo.png"} className="logo" alt="Watchous" />
						</h1>
					</a>
					<div className="searchBar">
						<input
							type="text"
							placeholder="Pesquisar"
							onChange={(e) => setInput(e.target.value)}
							value={input}
							// onFocus={clearLists}
							onKeyDown={(props) => {
								searchOnEnter(props);
							}}
						/>
						<RiSearchLine
							className="searchIcon"
							onClick={() => {
								setBusca(input);
								setInput("");
							}}
						/>
					</div>
					<RiMenu3Fill className="menu" onClick={toggleMenu} />
					<RiCheckboxBlankCircleFill className="notification" />
				</div>
				<nav className={navOpen ? "active" : "null"} onMouseLeave={hideNav}>
					<RiCloseFill className="closeMenu" onClick={toggleMenu} />
					<a href="/">
						<li>Página Inicial</li>
					</a>
					<a href="/">
						<li>Minha conta</li>
					</a>
					<Link to={"/freetowatch"}>
						<li id="new">Grátis para Assistir</li>
					</Link>
					<Link to={"/credits"}>
						<li id="new">Créditos</li>
					</Link>
				</nav>
			</S.Header>
		</>
	);
}
