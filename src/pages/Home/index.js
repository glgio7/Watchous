import {
  RiCloseFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import {
  fantasy,
  horror,
  drama,
  series,
  suspense,
} from "../../api/movies";

import { useEffect } from "react";
import { Container } from "./styles";
import { Movie } from "../../components/movieitem";
import { MovieList } from "../../components/movielist";
import React, { useState, useRef } from "react";
import { apiKey } from "../../api"
import Header from "../../components/header";
import { Link } from "react-router-dom";
import { PreviousPage } from "../../components/previouspage";
import { NextPage } from "../../components/nextpage";

export default function Home() {
  const [valorDoFiltro, setValorDoFiltro] = useState("");
  const searchNormalized = valorDoFiltro.toLowerCase();
  const [disclaimer, setDisclaimer] = useState(false);
  const handleDisclaimer = () => setDisclaimer(!disclaimer);
  const [upcoming, setUpcoming] = useState([]);
  const [fromSearch, setFromSearch] = useState([]);
  const [page, setPage] = useState(1)
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        setUpcoming(data.results)
      });
  }, [page]);

  /////////////////////////////////////////////////// search
  const serverSearch = valorDoFiltro.replaceAll(' ', '+')
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${serverSearch}&language=pt-BR&page=${page}`
    )
      .then((response) => response.json())
      .then((data) => {
        setFromSearch(data.results)
      });
  }, [serverSearch]);

  // HANDLE LISTS DIRECTIONS /////////////////////////////////////
  const [slideRecent, setSlideRecent] = useState(0);
  const [slideSearch, setSlideSearch] = useState(0);
  const [slideSuspense, setSlideSuspense] = useState(0);
  const [slideHorror, setSlideHorror] = useState(0);
  const [slideFantasy, setSlideFantasy] = useState(0);
  const [slideDrama, setSlideDrama] = useState(0);
  const [slideSeries, setSlideSeries] = useState(0);
  const searchList = useRef();
  const recentList = useRef();
  const suspenseList = useRef();
  const horrorList = useRef();
  const fantasyList = useRef();
  const dramaList = useRef();
  const seriesList = useRef();

  const loadMore = () => {
    setPage(page + 1);
    setSlideRecent(0);
    recentList.current.scrollLeft -= recentList.current.scrollWidth;
  }
  const handlePages = (item) => {
    return Math.ceil(
      item.length < 10 ? item.length / 1 :
        item.length <= 20
          ? item.length / 4
          : item.length < 30
            ? item.length / 4
            : item.length / 8
    );
  };

  const handleDirection = (list, direction) => {
    /// offset screen of container
    //FROM SEARCH/////////////////////////////////////////////////////
    if (direction === "left" && list === "search") {
      setSlideSearch(slideSearch - 1);
      searchList.current.scrollLeft -= (searchList.current.scrollWidth / (handlePages(fromSearch) - 1));
    }
    if (
      direction === "right" &&
      list === "search" &&
      slideSearch < handlePages(fromSearch)
    ) {
      setSlideSearch(slideSearch + 1);
      searchList.current.scrollLeft += (searchList.current.scrollWidth / (handlePages(fromSearch) - 1));
    }
    //RECENT ADDED/////////////////////////////////////////////////////
    if (direction === "left" && list === "recent") {
      setSlideRecent(slideRecent - 1);
      recentList.current.scrollLeft -= (recentList.current.scrollWidth / (handlePages(upcoming) - 1));
    }
    if (
      direction === "right" &&
      list === "recent" &&
      slideRecent < handlePages(upcoming) &&
      searchNormalized.length < 1
    ) {
      setSlideRecent(slideRecent + 1);
      recentList.current.scrollLeft += (recentList.current.scrollWidth / (handlePages(upcoming) - 1));
    }
    //SUSPENSE/////////////////////////////////////////////////////
    if (direction === "left" && list === "suspense") {
      setSlideSuspense(slideSuspense - 1);
      suspenseList.current.scrollLeft -= (suspenseList.current.scrollWidth);
    }
    if (
      direction === "right" &&
      list === "suspense" &&
      slideSuspense < handlePages(suspense) &&
      searchNormalized.length < 1
    ) {
      setSlideSuspense(slideSuspense + 1);
      suspenseList.current.scrollLeft += (suspenseList.current.scrollWidth);
    }
    //HORROR///////////////////////////////////////////////////////////
    if (direction === "left" && list === "horror") {
      setSlideHorror(slideHorror - 1);
      horrorList.current.scrollLeft -= (horrorList.current.scrollWidth / handlePages(horror));
    }
    if (
      direction === "right" &&
      list === "horror" &&
      slideHorror < handlePages(horror) &&
      searchNormalized.length < 1
    ) {
      setSlideHorror(slideHorror + 1);
      horrorList.current.scrollLeft += (horrorList.current.scrollWidth / handlePages(horror));;
    }
    //FANTASY////////////////////////////////////////////////////////////
    if (direction === "left" && list === "fantasy") {
      setSlideFantasy(slideFantasy - 1);
      fantasyList.current.scrollLeft -= (fantasyList.current.scrollWidth / handlePages(fantasy));
    }
    if (
      direction === "right" &&
      list === "fantasy" &&
      slideFantasy < handlePages(fantasy) &&
      searchNormalized.length < 1
    ) {
      setSlideFantasy(slideFantasy + 1);
      fantasyList.current.scrollLeft += (fantasyList.current.scrollWidth / handlePages(fantasy));
    }
    //DRAMA//////////////////////////////////////////////////////////
    if (direction === "left" && list === "drama") {
      setSlideDrama(slideDrama - 1);
      dramaList.current.scrollLeft -= (dramaList.current.scrollWidth / (handlePages(drama) - 1));
    }
    if (
      direction === "right" &&
      list === "drama" &&
      slideDrama < handlePages(drama) &&
      searchNormalized.length < 1
    ) {
      setSlideDrama(slideDrama + 1);
      dramaList.current.scrollLeft += (dramaList.current.scrollWidth / (handlePages(drama) - 1));
    }
    //SERIES/////////////////////////////////////////////////////////
    if (direction === "left" && list === "series" && slideSeries > 0) {
      setSlideSeries(slideSeries - 1);
      seriesList.current.scrollLeft -= (seriesList.current.scrollWidth / (handlePages(series) - 1));
    }
    if (
      direction === "right" &&
      list === "series" &&
      slideSeries < handlePages(series) &&
      searchNormalized.length < 1
    ) {
      setSlideSeries(slideSeries + 1);
      seriesList.current.scrollLeft += (seriesList.current.scrollWidth / (handlePages(series) - 1));
    }
  };

  return (
    <>
      <Header
        valorDoFiltro={valorDoFiltro}
        setValorDoFiltro={setValorDoFiltro}
      />
      <Container onLoad={() => window.scrollTo(0, 0)} style={{ overflow: 'hidden' }}>
        {upcoming.length < 20 &&
          <div className="loading">
            <img src="/img/loading.gif" alt="Loading" />
          </div>}
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
        {fromSearch && <>
          <h1>Da sua pesquisa</h1>
          <div className="wrapper">
            <RiArrowLeftSLine
              className="move-left"
              onClick={() => { handleDirection("search", "left"); if (page > 1 && searchList.current.scrollLeft === 0) { setPage(page - 1) } }}
            />
            <MovieList ref={searchList}>
              <PreviousPage backPage={() => { if (page > 1) setPage(page - 1) }} />
              {fromSearch
                .map((movie) => (
                  <Movie key={movie.id}>
                    <Link to={`/details/${movie.id}`}>
                      <img
                        src={movie.poster_path ? `https://www.themoviedb.org/t/p/w500${movie.poster_path}` : '/img/movie.jpg'}
                        alt={""}
                        className="moviePoster"
                      />
                    </Link>
                    <span>{movie.title}</span>
                  </Movie>
                ))}
              <NextPage/>
            </MovieList>
            <RiArrowRightSLine
              className="move-right"
              onClick={() => { handleDirection("search", "right"); }}
            />
          </div>
        </>
        }
        {/* ///////////// */}
        {!fromSearch &&
        <>
        <h1>Novos no Watchous</h1>
        <div className="wrapper">
          <RiArrowLeftSLine
            className="move-left"
            onClick={() => { handleDirection("recent", "left"); if (page > 1 && recentList.current.scrollLeft === 0) { setPage(page - 1) } }}
          />
          <MovieList ref={recentList}>
            <PreviousPage backPage={() => { if (page > 1) setPage(page - 1) }} />
            {upcoming
              .filter((movie) => {
                const titleNormalized = movie.title.toLowerCase();
                return titleNormalized.includes(searchNormalized);
              })
              .map((movie) => (
                <Movie key={movie.id}>
                  <Link to={`/details/${movie.id}`}>
                    <img
                      src={`https://www.themoviedb.org/t/p/w500${movie.poster_path}`}
                      alt={""}
                      className="moviePoster"
                    />
                  </Link>
                  <span>{movie.title}</span>
                </Movie>
              ))}
            <NextPage loadMore={loadMore} />
          </MovieList>
          <RiArrowRightSLine
            className="move-right"
            onClick={() => { handleDirection("recent", "right"); if (slideRecent === 3) { loadMore() } }}
          />
        </div>
        <h1>Suspense</h1>
        <div className="wrapper">
          <RiArrowLeftSLine
            className="move-left"
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
            onClick={() => handleDirection("suspense", "right")}
          />
        </div>
        <h1>Terror</h1>
        <div className="wrapper">
          <RiArrowLeftSLine
            className="move-left"
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
            onClick={() => handleDirection("horror", "right")}
          />
        </div>
        <h1>Ficção / Fantasia</h1>
        <div className="wrapper">
          <RiArrowLeftSLine
            className="move-left"
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
            onClick={() => handleDirection("fantasy", "right")}
          />
        </div>
        <h1>Drama</h1>
        <div className="wrapper">
          <RiArrowLeftSLine
            className="move-left"
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
            onClick={() => handleDirection("drama", "right")}
          />
        </div>
        <h1>Séries</h1>
        <div className="wrapper">
          <RiArrowLeftSLine
            className="move-left"
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
            onClick={() => handleDirection("series", "right")}
          />
        </div>
        </>
        }
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
