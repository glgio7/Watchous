import React, { useState } from "react";
import styled from "styled-components";
import { RiMenu3Fill } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";

const StyledHeader = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  background-color: #101010;
  position: fixed;
  top: 0;
  z-index: 99;
  padding: 0 15px;
  .masterHead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #101010;
    height: 60px;
    width: 100%;
    display: flex;
  }

  .menu {
    color: #fff;
    font-weight: bold;
    font-size: 2rem;
    cursor: pointer;
  }
  
  img{
    width: 100%;
  }

  .logo-box {
    width: 15vw;
    height: 60px;
    display: flex;
    align-items: center;
  }

  .logo{
    height: 42px;
    width: 210px;
    object-fit: cover;
  }
 
  .searchBar {
    display: flex;
    align-items: center;
    width: 30vw;
    margin-right: 15vw;
    justify-content: space-between;
  }

  input {
    width: 30vw;
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
  .searchIcon {
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
  nav.active {
    pointer-events: all;
    opacity: 1;
  }
  nav {
    pointer-events: none;
    opacity: 0;
    position: absolute;
    z-index: 99;
    right: 0;
    height: calc(100vh - 60px);
    margin-top: 60px;
    width: 20vw;
    background-color: #202020;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    transition: all 0.5s;
    a,
    li {
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
      background-color: rgba(0, 60, 150, 0.5);
      border-radius: 5px;
      text-align: center;
      width: max-content;
      padding: 0 0.5rem;
    }
    .closeMenu {
      display: none;
    }
  }

  @media screen and (max-width: 768px) {
  width: 100%;
  height: 114px;
  display: flex;
  justify-content: center;
  background-color: #101010;
  padding: 0 5px;
    .masterHead {
      justify-content: center;
      align-items: center;
      display: flex;
      flex-direction: column;
      height: 114px;
    }
    .logo-box {
      width: 100%;
      padding-bottom: 10px;
    }
    .logo{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .searchBar {
      width: 100%;
      margin-right: 0vw;
      justify-content: center;
    }
    input {
      width: 50vw;
      border-radius: 3px 0 0 3px;
    }
    .searchIcon {
      margin-left: 0.1rem;
      border-radius: 0 3px 3px 0;
    }

    .menu {
      color: #fff;
      font-weight: bold;
      font-size: 2rem;
      position: absolute;
      right: .25rem;
      bottom: .75rem;
      display: flex;
    }
    nav {
      position: fixed;
      width: 100vw;
      pointer-events: none;
      opacity: 0;
      height: 100vh;
      overflow: hidden;
      margin-top: 0;
      background: rgb(32, 32, 32);
      background: linear-gradient(
        180deg,
        rgba(32, 32, 32, 0) 0%,
        rgba(48, 48, 48, 1) 15%,
        rgba(16, 16, 16, 1) 100%
      );
      backdrop-filter: blur(6px);
      transition: all 0.5s;

      .closeMenu {
        display: flex;
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: #fff;
        font-size: 2rem;
        cursor: pointer;
      }
    }
    
    nav.active {
      pointer-events: all;
      opacity: 1;
    }
  }
  @media screen and (max-width: 900px) and (min-width: 480px) and (orientation: landscape) {
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
  background-color: #101010;
  padding: 0 15px;
    .masterHead {
      display: flex;
      flex-direction: row ;
      justify-content: space-around;
      height: 72px;
      position: relative;
    }
    .logo-box {
      padding-bottom: 0px;
      width: 100%;
      height: 72px;
    }
    .logo{
    height: 42px;
    width: 210px;
    object-fit: cover;
  }
    input {
    width: 30vw;}
    
    .searchBar {
      width: 100%;
      align-items: center;
      justify-content: center;
    }
    nav {
      position: fixed;
      width: 100vw;
      height: 100vh;
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
    .menu {
      font-size: 2.5rem;
      color: #fff;
      font-weight: bold;
      position: static;
    }
    }
`;

export default function Header({ setValorDoFiltro, reset }) {
  const [navOpen, setNavOpen] = useState(false);
  const toggleMenu = () => setNavOpen(!navOpen);
  const hideNav = () => setNavOpen(false);
  const [input, setInput] = useState("")
  const setBusca = setValorDoFiltro;
  const clearLists = reset;
  const searchOnEnter = props => { if (props.keyCode === 13) setBusca(input);};
  const clear = props => props.keyCode === 13 ? setInput('') : null;

  return (
    <>
      <StyledHeader>
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
              onFocus={clearLists}
              onKeyDown={(props) => { searchOnEnter(props); clear(props) }}
            />
            <RiSearchLine className="searchIcon" onClick={() => { setBusca(input); setInput('') }} />
          </div>
          <RiMenu3Fill className="menu" onClick={toggleMenu} />
        </div>
        <nav className={navOpen ? "active" : "null"} onMouseLeave={hideNav}>
          <RiCloseFill className="closeMenu" onClick={toggleMenu} />
          <a href="/">
            <li>Página Inicial</li>
          </a>
          <a href="/">
            <li>Minha conta</li>
          </a>
          <a href="/">
            <li>Grátis para Assistir</li>
          </a>
          <a href="/">
            <li>Créditos</li>
          </a>
        </nav>
      </StyledHeader>
    </>
  );
}
