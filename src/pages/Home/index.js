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
  const [disclaimer, setDisclaimer] = useState(false);
  const handleDisclaimer = () => setDisclaimer(!disclaimer);
  const [valorDoFiltro, setValorDoFiltro] = useState("");
  const searchNormalized = valorDoFiltro.toLowerCase();
  const [page, setPage] = useState(1)
  const [slideUpcoming, setSlideUpcoming] = useState(0);
  const [upcoming, setUpcoming] = useState([]);
  const [fromSearch, setFromSearch] = useState([]);
  const serverSearch = valorDoFiltro.replaceAll(' ', '+')


  /////////////////////////////////////////////////// upcoming
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR&page=${page}`)
      .then((response) => response.json())
      .then((data) => setUpcoming(data.results))
      .catch((err) => console.log(err));
  }, [page]);

  /////////////////////////////////////////////////// search
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${serverSearch}&language=pt-BR&page=${page}`)
      .then((response) => response.json())
      .then((data) => setFromSearch(data.results))
      .catch((err) => console.log(err));
  }, [serverSearch]);

  // HANDLE LISTS DIRECTIONS /////////////////////////////////////
  const searchList = useRef();
  const upcomingList = useRef();
  const suspenseList = useRef();
  const horrorList = useRef();
  const fantasyList = useRef();
  const dramaList = useRef();
  const seriesList = useRef();

  const handlePages = (list) => { return list.length <= 20 ? 5 : list.length <= 30 ? 6 : 8; };

  const loadMore = () => {
    setSlideUpcoming(0)
    setPage(page + 1);
    upcomingList.current.scrollLeft -= upcomingList.current.scrollWidth;
  }

  const handleDirection = (list, direction) => {
    //FROM SEARCH/////////////////////////////////////////////////////
    if (direction === "left" && list === "fromSearch") {
      searchList.current.scrollLeft -= (searchList.current.scrollWidth / handlePages(list));
    }
    if (direction === "right" && list === "fromSearch") {
      searchList.current.scrollLeft += (searchList.current.scrollWidth / handlePages(list));

    }
    //UPCOMING/////////////////////////////////////////////////////
    if (direction === "left" && list === "upcoming" && upcomingList.current.scrollLeft > 0) {
      upcomingList.current.scrollLeft -= (upcomingList.current.scrollWidth / handlePages(list));
      setSlideUpcoming(slideUpcoming - 1);
    }
    if (direction === "right" && list === "upcoming") {
      upcomingList.current.scrollLeft += (upcomingList.current.scrollWidth / handlePages(list));
      setSlideUpcoming(slideUpcoming + 1);
    }
    //SUSPENSE/////////////////////////////////////////////////////
    if (direction === "left" && list === "suspense") {
      suspenseList.current.scrollLeft -= (suspenseList.current.scrollWidth / handlePages(list));
    }
    if (direction === "right" && list === "suspense") {
      suspenseList.current.scrollLeft += (suspenseList.current.scrollWidth / handlePages(list));
    }
    //HORROR///////////////////////////////////////////////////////////
    if (direction === "left" && list === "horror") {
      horrorList.current.scrollLeft -= (horrorList.current.scrollWidth / handlePages(list));
    }
    if (direction === "right" && list === "horror") {
      horrorList.current.scrollLeft += (horrorList.current.scrollWidth / handlePages(list));;
    }
    //FANTASY////////////////////////////////////////////////////////////
    if (direction === "left" && list === "fantasy") {
      fantasyList.current.scrollLeft -= (fantasyList.current.scrollWidth / handlePages(list));
    }
    if (direction === "right" && list === "fantasy") {
      fantasyList.current.scrollLeft += (fantasyList.current.scrollWidth / handlePages(list));
    }
    //DRAMA//////////////////////////////////////////////////////////
    if (direction === "left" && list === "drama") {
      dramaList.current.scrollLeft -= (dramaList.current.scrollWidth / handlePages(list));
    }
    if (direction === "right" && list === "drama") {
      dramaList.current.scrollLeft += (dramaList.current.scrollWidth / handlePages(list));
    }
    //SERIES/////////////////////////////////////////////////////////
    if (direction === "left" && list === "series") {
      seriesList.current.scrollLeft -= (seriesList.current.scrollWidth / handlePages(list));
    }
    if (direction === "right" && list === "series") {
      seriesList.current.scrollLeft += (seriesList.current.scrollWidth / handlePages(list));
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
          </div>
        }
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
        {fromSearch &&
          <>
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
                <NextPage />
              </MovieList>
              <RiArrowRightSLine
                className="move-right"
                onClick={() => { handleDirection("fromSearch", "right"); }}
              />
            </div>
          </>
        }
        {!fromSearch &&
          <>
            <h1>Novos no Watchous</h1>
            <div className="wrapper">
              <RiArrowLeftSLine
                className="move-left"
                onClick={() => { handleDirection("upcoming", "left"); if (page > 1 && slideUpcoming < 1) setPage(page - 1) }}
              />
              <MovieList ref={upcomingList}>
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
                onClick={() => { handleDirection("upcoming", "right"); if (slideUpcoming === 4) loadMore() }}
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
