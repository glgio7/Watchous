import React, { useState, useRef, useEffect } from "react";
import Header from "../../components/Header";
import dataMovies from "../../api/movies_list.json"
import { Link } from "react-router-dom";
import { Container } from "./styles";
import { MovieList } from "../../components/movielist";
import { Movie } from "../../components/movieitem";
import { apiKey } from "../../api"
import { PreviousPage } from "../../components/previouspage";
import { NextPage } from "../../components/nextpage";
import {
  RiCloseFill,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";

export default function Home() {
  const [disclaimer, setDisclaimer] = useState(false);
  const handleDisclaimer = () => setDisclaimer(!disclaimer);
  const [valorDoFiltro, setValorDoFiltro] = useState("");
  const [pageUpcoming, setPageUpcoming] = useState(1)
  const [pageSeries, setPageSeries] = useState(1)
  const [slideUpcoming, setSlideUpcoming] = useState(0);
  const [slideSeries, setSlideSeries] = useState(0);
  const [upcoming, setUpcoming] = useState([]);
  const [series, setSeries] = useState([]);
  const [fromSearch, setFromSearch] = useState([]);
  const [seriesFromSearch, setSeriesFromSearch] = useState([]);
  const serverSearch = valorDoFiltro.replaceAll(' ', '+')


  //////////////////// upcoming
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR&page=${pageUpcoming}`)
      .then((response) => response.json())
      .then((data) => setUpcoming(data.results))
      .catch((err) => console.log(err));
  }, [pageUpcoming]);
  //////////////////// series
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=pt-BR&page=${pageSeries}`)
      .then((response) => response.json())
      .then((data) => setSeries(data.results))
      .catch((err) => console.log(err));
  }, [pageSeries]);
  //////////////////// search
  useEffect(() => {
    const movies = () => {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${serverSearch}&language=pt-BR`)
        .then((response) => response.json())
        .then((data) => setFromSearch(data.results))
        .catch((err) => console.log(err));
    }

    const series = () => {
      fetch(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${serverSearch}&language=pt-BR`)
        .then((response => response.json()))
        .then((data) => setSeriesFromSearch(data.results))
        .catch((err) => console.log(err));
    };
    Promise.all([movies(), series()])

  }, [serverSearch]);

  //////////////////// HANDLE LISTS DIRECTIONS 
  const searchMoviesList = useRef();
  const searchSeriesList = useRef();
  const upcomingList = useRef();
  const suspenseList = useRef();
  const horrorList = useRef();
  const fantasyList = useRef();
  const dramaList = useRef();
  const seriesList = useRef();

  const loadMoreSeries = () => {
    setSlideSeries(0)
    setPageSeries(pageSeries + 1);
    seriesList.current.scrollLeft -= seriesList.current.scrollWidth;

  }
  const loadMore = () => {
    setSlideUpcoming(0)
    setPageUpcoming(pageUpcoming + 1);
    upcomingList.current.scrollLeft -= upcomingList.current.scrollWidth;
  }
  const handleDirection = (list, direction) => {
    //MOVIES FROM SEARCH ///////////////////////////////////////////
    if (direction === "left" && list === "fromSearchMovies") {
      searchMoviesList.current.scrollLeft -= (searchMoviesList.current.scrollWidth / 6);
    }
    if (direction === "right" && list === "fromSearchMovies") {
      searchMoviesList.current.scrollLeft += (searchMoviesList.current.scrollWidth / 6);

    }
    //SERIES FROM SEARCH ///////////////////////////////////////////
    if (direction === "left" && list === "fromSearchSeries") {
      searchSeriesList.current.scrollLeft -= (searchSeriesList.current.scrollWidth / 6);
    }
    if (direction === "right" && list === "fromSearchSeries") {
      searchSeriesList.current.scrollLeft += (searchSeriesList.current.scrollWidth / 6);
    }
    //UPCOMING/////////////////////////////////////////////////////
    if (direction === "left" && list === "upcoming" && upcomingList.current.scrollLeft > 0) {
      upcomingList.current.scrollLeft -= (upcomingList.current.scrollWidth / 5);
      setSlideUpcoming(slideUpcoming - 1);
    }
    if (direction === "right" && list === "upcoming") {
      upcomingList.current.scrollLeft += (upcomingList.current.scrollWidth / 5);
      setSlideUpcoming(slideUpcoming + 1);
    }
    //SERIES/////////////////////////////////////////////////////
    if (direction === "left" && list === "series" && seriesList.current.scrollLeft > 0) {
      seriesList.current.scrollLeft -= (seriesList.current.scrollWidth / 6);
      setSlideSeries(slideSeries - 1);
    }
    if (direction === "right" && list === "series") {
      seriesList.current.scrollLeft += (seriesList.current.scrollWidth / 6);
      setSlideSeries(slideSeries + 1);
    }
    //SUSPENSE/////////////////////////////////////////////////////
    if (direction === "left" && list === "suspense") {
      suspenseList.current.scrollLeft -= (suspenseList.current.scrollWidth / 6);
    }
    if (direction === "right" && list === "suspense") {
      suspenseList.current.scrollLeft += (suspenseList.current.scrollWidth / 6);
    }
    //HORROR///////////////////////////////////////////////////////////
    if (direction === "left" && list === "horror") {
      horrorList.current.scrollLeft -= (horrorList.current.scrollWidth / 6);
    }
    if (direction === "right" && list === "horror") {
      horrorList.current.scrollLeft += (horrorList.current.scrollWidth / 6);;
    }
    //FANTASY////////////////////////////////////////////////////////////
    if (direction === "left" && list === "fantasy") {
      fantasyList.current.scrollLeft -= (fantasyList.current.scrollWidth / 6);
    }
    if (direction === "right" && list === "fantasy") {
      fantasyList.current.scrollLeft += (fantasyList.current.scrollWidth / 6);
    }
    //DRAMA//////////////////////////////////////////////////////////
    if (direction === "left" && list === "drama") {
      dramaList.current.scrollLeft -= (dramaList.current.scrollWidth / 6);
    }
    if (direction === "right" && list === "drama") {
      dramaList.current.scrollLeft += (dramaList.current.scrollWidth / 6);
    }
  };

  const checkStars = value =>
    value.vote_average > 8 ? '★★★★★' :
    value.vote_average > 6 ? '★★★★' :
    value.vote_average > 4 ? '★★★' :
    value.vote_average > 2 ? '★★' : '★';
  
  

  return (
    <>
      <Header
        valorDoFiltro={valorDoFiltro}
        setValorDoFiltro={setValorDoFiltro}
      />
      <Container>
        {upcoming.length < 10 &&
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
            <h1>Filmes da sua pesquisa</h1>
            <div className="wrapper">
              <RiArrowLeftSLine className="move-left" onClick={() => { handleDirection("fromSearchMovies", "left") }} />
              <MovieList ref={searchMoviesList}>
                <PreviousPage />
                {fromSearch
                  .map((movie) => (
                    <Movie key={movie.id}>
                      <Link to={`/details/${movie.id}`}>
                        <img
                          src={movie.poster_path ? `https://www.themoviedb.org/t/p/w500${movie.poster_path}` : '/img/movie_placeholder.jpg'}
                          alt={""}
                          className="moviePoster"
                        />
                      </Link>
                      <span>{movie.title}</span>
                    </Movie>
                  ))}
                <NextPage />
              </MovieList>
              <RiArrowRightSLine className="move-right" onClick={() => { handleDirection("fromSearchMovies", "right"); }} />
            </div>
          </>
        }
        {seriesFromSearch &&
          <>
            <h1>Séries da sua pesquisa</h1>
            <div className="wrapper">
              <RiArrowLeftSLine className="move-left" onClick={() => { handleDirection("fromSearchSeries", "left") }} />
              <MovieList ref={searchSeriesList}>
                <PreviousPage />
                {seriesFromSearch
                  .map((movie) => (
                    <Movie key={movie.id}>
                      <Link to={`/details/serie/${movie.id}`}>
                        <img
                          src={movie.poster_path ? `https://www.themoviedb.org/t/p/w500${movie.poster_path}` : '/img/movie_placeholder.jpg'}
                          alt={""}
                          className="moviePoster"
                        />
                      </Link>
                      <span>{movie.name}</span>
                    </Movie>
                  ))}
                <NextPage />
              </MovieList>
              <RiArrowRightSLine className="move-right" onClick={() => { handleDirection("fromSearchSeries", "right"); }} />
            </div>
          </>
        }
        {!fromSearch &&
          <>
            <h1>Novos no Watchous</h1>
            <div className="wrapper">
              <RiArrowLeftSLine className="move-left" onClick={() => {
                handleDirection("upcoming", "left");
                if (pageUpcoming > 1 && slideUpcoming < 1) setPageUpcoming(pageUpcoming - 1)
              }}
              />
              <MovieList ref={upcomingList}>
                <PreviousPage backPage={() => { if (pageUpcoming > 1) setPageUpcoming(pageUpcoming - 1) }} />
                {upcoming
                  .map((movie) => (
                    <Movie key={movie.id}>
                      <div className="vote-average"><span>{movie.vote_average}</span><p>{checkStars(movie)}</p></div>
                      <Link to={`/details/${movie.id}`}>
                        <img
                          src={movie.poster_path ? `https://www.themoviedb.org/t/p/w500${movie.poster_path}` : '/img/movie_placeholder.jpg'}
                          alt={""}
                          className="moviePoster"
                        />
                      </Link>
                      <span>{movie.title}</span>
                    </Movie>
                  ))}
                <NextPage loadMore={loadMore} />
              </MovieList>
              <RiArrowRightSLine className="move-right" onClick={() => {
                handleDirection("upcoming", "right");
                if (slideUpcoming === 4) loadMore()
              }}
              />
            </div>
            <h1>Suspense</h1>
            <div className="wrapper">
              <RiArrowLeftSLine
                className="move-left"
                onClick={() => handleDirection("suspense", "left")}
              />
              <MovieList ref={suspenseList}>
                {dataMovies.suspense
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
                {dataMovies.terror
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
                {dataMovies.fantasy
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
                {dataMovies.drama
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
                onClick={() => { handleDirection("series", "left"); if (pageSeries > 1 && slideSeries < 1) setPageSeries(pageSeries - 1) }}
              />
              <MovieList ref={seriesList}>
                <PreviousPage backPage={() => { if (pageSeries > 1) setPageSeries(pageSeries - 1) }} />
                {series
                  .map((movie) => (
                    <Movie key={movie.id}>
                      <Link to={`/details/serie/${movie.id}`}>
                        <div className="vote-average"><span>{movie.vote_average}</span><p>{checkStars(movie)}</p></div>
                        <img
                          src={`https://www.themoviedb.org/t/p/w500${movie.poster_path}`}
                          alt={""}
                          className="moviePoster"
                        />
                      </Link>
                      <span>{movie.name}</span>
                    </Movie>
                  ))}
                <NextPage loadMore={loadMoreSeries} />
              </MovieList>
              <RiArrowRightSLine
                className="move-right"
                onClick={() => { handleDirection("series", "right"); if (slideSeries === 4) loadMoreSeries() }}
              />
            </div>
          </>
        }
        {/* ----------------------- Disclaimer/Advices --------------------------- */}
        <div className={disclaimer ? "disclaimer active" : "disclaimer"}>
          <RiCloseFill className="closeDisclaimer" onClick={handleDisclaimer} />
          <h2>
            Novidade: lista de filmes gratuitos do Youtube.
          </h2>
          <h2>
            Em breve: cadastro e lista de interesse.
          </h2>
        </div>
        <button className="buttonDisclaimer" onClick={handleDisclaimer}>
          ?
        </button>
      </Container>
    </>
  );
}
