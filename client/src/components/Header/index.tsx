import React, { useState, useEffect } from "react";
import { RiMenuFill, RiSearchLine, RiLogoutBoxLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import * as S from "./styles";
import { handleSignOut } from "../../api/users/auth";
import { useAuth } from "../../hooks/useAuth";
import { useFromSearch } from "../../hooks/useFromSearch";

export default function Header() {
	const [profileIcon, setProfileIcon] = useState("robot-icon.png");

	const [navOpen, setNavOpen] = useState(false);

	const [input, setInput] = useState("");

	const toggleMenu = () => setNavOpen(!navOpen);

	const {
		setSeriesFromSearch,
		setMoviesFromSearch,
		searchValue,
		setSearchValue,
	} = useFromSearch();

	const { authenticated, setAuthenticated, setUser, user } = useAuth();

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
	useEffect(() => {
		if (user) {
			setProfileIcon(user.profileIcon!);
		}
	}, [user]);

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
					{authenticated == false ? (
						<RiMenuFill className="menu" onClick={toggleMenu} />
					) : (
						<img
							src={`/assets/${profileIcon}`}
							alt=""
							className="profile-icon"
							onClick={toggleMenu}
						/>
					)}
				</div>
			</S.Header>
			<S.Navigation active={navOpen} onMouseLeave={() => setNavOpen(false)}>
				{authenticated && (
					<RiLogoutBoxLine
						className="logout-btn"
						onClick={() => {
							handleSignOut({ setAuthenticated, setUser });
							setNavOpen(false);
						}}
					/>
				)}
				{authenticated ? (
					<Link
						to={"/dashboard"}
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
					<li id="new">Grátis no Youtube</li>
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
