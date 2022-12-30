import { Container } from "./styles";
import { Movie } from "../../components/movieitem";
import { MovieList } from "../../components/movielist";
import React, { useState, useRef } from "react";
import Header from "../../components/header";
import { Link } from "react-router-dom";
import {
  recentAdded,
  fantasy,
  horror,
  drama,
  series,
  suspense,
} from "../../api/movies";
import {
  RiCloseFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";

export default function Home() {
  // console.log(window.screen)
  const [valorDoFiltro, setValorDoFiltro] = useState("");
  const searchNormalized = valorDoFiltro.toLowerCase();
  const [disclaimer, setDisclaimer] = useState(false);
  const handleDisclaimer = () => setDisclaimer(!disclaimer);

  // HANDLE LISTS DIRECTIONS /////////////////////////////////////
  const [slideRecent, setSlideRecent] = useState(0);
  const [slideSuspense, setSlideSuspense] = useState(0);
  const [slideHorror, setSlideHorror] = useState(0);
  const [slideFantasy, setSlideFantasy] = useState(0);
  const [slideDrama, setSlideDrama] = useState(0);
  const [slideSeries, setSlideSeries] = useState(0);
  const recentList = useRef();
  const suspenseList = useRef();
  const horrorList = useRef();
  const fantasyList = useRef();
  const dramaList = useRef();
  const seriesList = useRef();
  const resetLists = () => {
    setSlideRecent(0);
    recentList.current.style.transform = `translateX(0px)`;
    setSlideSuspense(0);
    suspenseList.current.style.transform = `translateX(0px)`;
    setSlideHorror(0);
    horrorList.current.style.transform = `translateX(0px)`;
    setSlideFantasy(0);
    fantasyList.current.style.transform = `translateX(0px)`;
    setSlideDrama(0);
    dramaList.current.style.transform = `translateX(0px)`;
    setSlideSeries(0);
    seriesList.current.style.transform = `translateX(0px)`;
  };
  const handlePages = (item) => {
    return Math.ceil(
      item.length < 15
        ? item.length / 5
        : item.length > 15
        ? item.length / 3
        : item.length / 4
    );
  };
  const [hideDirection, setHideDirection] = useState(false);
  const hideArrows = () => {
    setHideDirection(true);
  };

  const handleDirection = (list, direction) => {
    // console.log(
    //   `Recents ${recentAdded.length}, Horror ${horror.length}, Fantasy ${fantasy.length}, Drama ${drama.length}, Series ${series.length}`
    // );
    let distance = recentList.current.getBoundingClientRect().x - 15;
    //RECENT ADDED/////////////////////////////////////////////////////
    if (direction === "left" && list === "recent" && slideRecent > 0) {
      setSlideRecent(slideRecent - 1);
      recentList.current.style.transform = `translateX(${window.innerWidth / 2 -
        15 +
        distance}px)`;
    }
    if (
      direction === "right" &&
      list === "recent" &&
      slideRecent < handlePages(recentAdded) &&
      searchNormalized.length < 1
    ) {
      setSlideRecent(slideRecent + 1);
      recentList.current.style.transform = `translateX(${-(
        window.innerWidth / 2 -
        15
      ) + distance}px)`;
    }
    //SUSPENSE/////////////////////////////////////////////////////
    if (direction === "left" && list === "suspense" && slideSuspense > 0) {
      distance = suspenseList.current.getBoundingClientRect().x - 15;
      setSlideSuspense(slideSuspense - 1);
      suspenseList.current.style.transform = `translateX(${window.innerWidth /
        2 -
        15 +
        distance}px)`;
    }
    if (
      direction === "right" &&
      list === "suspense" &&
      slideSuspense < handlePages(suspense) &&
      searchNormalized.length < 1
    ) {
      distance = suspenseList.current.getBoundingClientRect().x - 15;
      setSlideSuspense(slideSuspense + 1);
      suspenseList.current.style.transform = `translateX(${-(
        window.innerWidth / 2 -
        15
      ) + distance}px)`;
    }
    //HORROR///////////////////////////////////////////////////////////
    if (direction === "left" && list === "horror" && slideHorror > 0) {
      distance = horrorList.current.getBoundingClientRect().x - 15;
      setSlideHorror(slideHorror - 1);
      horrorList.current.style.transform = `translateX(${window.innerWidth / 2 -
        15 +
        distance}px)`;
    }
    if (
      direction === "right" &&
      list === "horror" &&
      slideHorror < handlePages(horror) &&
      searchNormalized.length < 1
    ) {
      distance = horrorList.current.getBoundingClientRect().x - 15;
      setSlideHorror(slideHorror + 1);
      horrorList.current.style.transform = `translateX(${-(
        window.innerWidth / 2 -
        15
      ) + distance}px)`;
    }
    //FANTASY////////////////////////////////////////////////////////////
    if (direction === "left" && list === "fantasy" && slideFantasy > 0) {
      distance = fantasyList.current.getBoundingClientRect().x - 15;
      setSlideFantasy(slideFantasy - 1);
      fantasyList.current.style.transform = `translateX(${window.innerWidth /
        2 -
        15 +
        distance}px)`;
    }
    if (
      direction === "right" &&
      list === "fantasy" &&
      slideFantasy < handlePages(fantasy) &&
      searchNormalized.length < 1
      ) {
      distance = fantasyList.current.getBoundingClientRect().x - 15;
      setSlideFantasy(slideFantasy + 1);
      fantasyList.current.style.transform = `translateX(${-(
        window.innerWidth / 2 -
        15
      ) + distance}px)`;
    }
    //DRAMA//////////////////////////////////////////////////////////
    if (direction === "left" && list === "drama" && slideDrama > 0) {
      distance = dramaList.current.getBoundingClientRect().x - 15;
      setSlideDrama(slideDrama - 1);
      dramaList.current.style.transform = `translateX(${window.innerWidth / 2 -
        15 +
        distance}px)`;
    }
    if (
      direction === "right" &&
      list === "drama" &&
      slideDrama < handlePages(drama) &&
      searchNormalized.length < 1
    ) {
      distance = dramaList.current.getBoundingClientRect().x - 15;
      setSlideDrama(slideDrama + 1);
      dramaList.current.style.transform = `translateX(${-(
        window.innerWidth / 2 -
        15
      ) + distance}px)`;
    }
    //SERIES/////////////////////////////////////////////////////////
    if (direction === "left" && list === "series" && slideSeries > 0) {
      distance = seriesList.current.getBoundingClientRect().x - 15;
      setSlideSeries(slideSeries - 1);
      seriesList.current.style.transform = `translateX(${window.innerWidth / 2 -
        15 +
        distance}px)`;
    }
    if (
      direction === "right" &&
      list === "series" &&
      slideSeries < handlePages(series) &&
      searchNormalized.length < 1
    ) {
      distance = seriesList.current.getBoundingClientRect().x - 15;
      setSlideSeries(slideSeries + 1);
      seriesList.current.style.transform = `translateX(${-(
        window.innerWidth / 2 -
        15
      ) + distance}px)`;
    }
  };

  return (
    <>
      <Header
        valorDoFiltro={valorDoFiltro}
        setValorDoFiltro={setValorDoFiltro}
        reset={resetLists}
      />
      <Container>
        <div className="banner">
          <h2>
            <span>Sem</span> assinatura, <span>sem</span> fins-lucrativos.
          </h2>
          <h1>Atualizações semanais</h1>
          <h2><span>Confira</span> antes de assistir.</h2>
          <video autoPlay loop muted>
            <source src="/img/aurora.mp4" type="video/mp4" />
          </video>
        </div>

        <h1>Novos no Watchous</h1>
        <div className="wrapper" onScroll={hideArrows}>
          <RiArrowLeftSLine
            className="move-left"
            style={hideDirection ? {opacity: 0} : {opacity: ''}}
            onClick={() => handleDirection("recent", "left")}
          />
          <MovieList ref={recentList}>
            {recentAdded
              .filter((movie) => {
                const titleNormalized = movie.title.toLowerCase();
                return titleNormalized.includes(searchNormalized);
              })
              .map((movie) => (
                <Movie key={movie.imdb}>
                  <Link to={`/details/${movie.imdb}`}>
                    <img
                      src={`https://www.themoviedb.org/t/p/w500${movie.image_path}`}
                      alt={""}
                      className="moviePoster"
                    />
                  </Link>
                  <span>{movie.title}</span>
                </Movie>
              ))}
          </MovieList>
          <RiArrowRightSLine
            className="move-right"
            style={hideDirection ? { opacity: 0 } : { opacity: "" }}
            onClick={() => handleDirection("recent", "right")}
          />
        </div>
        <h1>Suspense</h1>
        <div className="wrapper" onScroll={hideArrows}>
          <RiArrowLeftSLine
            className="move-left"
            style={hideDirection ? {opacity: 0} : {opacity: ''}}
            onClick={() => handleDirection("suspense", "left")}
          />
          <MovieList ref={suspenseList}>
            {suspense
              .filter((movie) => {
                const titleNormalized = movie.title.toLowerCase();
                return titleNormalized.includes(searchNormalized);
              })
              .map((movie) => (
                <Movie key={movie.imdb}>
                  <Link to={`/details/${movie.imdb}`}>
                    <img
                      src={`https://www.themoviedb.org/t/p/w500${movie.image_path}`}
                      alt={""}
                      className="moviePoster"
                    />
                  </Link>
                  <span>{movie.title}</span>
                </Movie>
              ))}
          </MovieList>
          <RiArrowRightSLine
            className="move-right"
            style={hideDirection ? { opacity: 0 } : { opacity: "" }}
            onClick={() => handleDirection("suspense", "right")}
          />
        </div>
        <h1>Terror</h1>
        <div className="wrapper" onScroll={hideArrows}>
          <RiArrowLeftSLine
            className="move-left"
            style={hideDirection ? {opacity: 0} : {opacity: ''}}
            onClick={() => handleDirection("horror", "left")}
          />
          <MovieList ref={horrorList}>
            {horror
              .filter((movie) => {
                const titleNormalized = movie.title.toLowerCase();
                return titleNormalized.includes(searchNormalized);
              })
              .map((movie) => (
                <Movie key={movie.imdb}>
                  <Link to={`/details/${movie.imdb}`}>
                    <img
                      src={`https://www.themoviedb.org/t/p/w500${movie.image_path}`}
                      alt={""}
                      className="moviePoster"
                    />
                  </Link>
                  <span>{movie.title}</span>
                </Movie>
              ))}
          </MovieList>
          <RiArrowRightSLine
            className="move-right"
            style={hideDirection ? { opacity: 0 } : { opacity: "" }}
            onClick={() => handleDirection("horror", "right")}
          />
        </div>
        <h1>Ficção / Fantasia</h1>
        <div className="wrapper" onScroll={hideArrows}>
          <RiArrowLeftSLine
            className="move-left"
            style={hideDirection ? {opacity: 0} : {opacity: ''}}
            onClick={() => handleDirection("fantasy", "left")}
          />
          <MovieList ref={fantasyList}>
            {fantasy
              .filter((movie) => {
                const titleNormalized = movie.title.toLowerCase();
                return titleNormalized.includes(searchNormalized);
              })
              .map((movie) => (
                <Movie key={movie.imdb}>
                  <Link to={`/details/${movie.imdb}`}>
                    <img
                      src={`https://www.themoviedb.org/t/p/w500${movie.image_path}`}
                      alt={""}
                      className="moviePoster"
                    />
                  </Link>
                  <span>{movie.title}</span>
                </Movie>
              ))}
          </MovieList>
          <RiArrowRightSLine
            className="move-right"
            style={hideDirection ? { opacity: 0 } : { opacity: "" }}
            onClick={() => handleDirection("fantasy", "right")}
          />
        </div>
        <h1>Drama</h1>
        <div className="wrapper" onScroll={hideArrows}>
          <RiArrowLeftSLine
            className="move-left"
            style={hideDirection ? {opacity: 0} : {opacity: ''}}
            onClick={() => handleDirection("drama", "left")}
          />
          <MovieList ref={dramaList}>
            {drama
              .filter((movie) => {
                const titleNormalized = movie.title.toLowerCase();
                return titleNormalized.includes(searchNormalized);
              })
              .map((movie) => (
                <Movie key={movie.imdb}>
                  <Link to={`/details/${movie.imdb}`}>
                    <img
                      src={`https://www.themoviedb.org/t/p/w500${movie.image_path}`}
                      alt={""}
                      className="moviePoster"
                    />
                  </Link>
                  <span>{movie.title}</span>
                </Movie>
              ))}
          </MovieList>
          <RiArrowRightSLine
            className="move-right"
            style={hideDirection ? { opacity: 0 } : { opacity: "" }}
            onClick={() => handleDirection("drama", "right")}
          />
        </div>
        <h1>Séries</h1>
        <div className="wrapper" onScroll={hideArrows}>
          <RiArrowLeftSLine
            className="move-left"
            style={hideDirection ? {opacity: 0} : {opacity: ''}}
            onClick={() => handleDirection("series", "left")}
          />
          <MovieList ref={seriesList}>
            {series
              .filter((movie) => {
                const titleNormalized = movie.title.toLowerCase();
                return titleNormalized.includes(searchNormalized);
              })
              .map((movie) => (
                <Movie key={movie.imdb}>
                  <Link to={`/details/serie/${movie.imdb}`}>
                    <img
                      src={`https://www.themoviedb.org/t/p/w500${movie.image_path}`}
                      alt={""}
                      className="moviePoster"
                    />
                  </Link>
                  <span>{movie.title}</span>
                </Movie>
              ))}
          </MovieList>
          <RiArrowRightSLine
            className="move-right"
            style={hideDirection ? { opacity: 0 } : { opacity: "" }}
            onClick={() => handleDirection("series", "right")}
          />
        </div>
        {/* ----------------------- Disclaimer/Advices --------------------------- */}
        <div className={disclaimer ? "disclaimer active" : "disclaimer"}>
          <RiCloseFill className="closeDisclaimer" onClick={handleDisclaimer} />
          <h2>
            Cadastros em 2023.
          </h2>
          <h2>
            Em breve: lista de filmes gratuitos do Youtube.
          </h2>
        </div>
        <button className="buttonDisclaimer" onClick={handleDisclaimer}>
          ?
        </button>
      </Container>
    </>
  );
}
