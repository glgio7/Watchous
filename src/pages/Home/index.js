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


  const loadMoreSeries = (mobile) => {
    listRefs.series.scrollLeft -= listRefs.series.scrollWidth;
    if (listRefs.series.current.scrollLeft >= (listRefs.series.current.scrollLeftMax - 60) || mobile === true) {
      setPageSeries(pageSeries + 1);
      listRefs.series.current.scrollLeft = 0;
    }
  }

  const loadMore = (mobile) => {
    listRefs.upcoming.scrollLeft -= listRefs.upcoming.scrollWidth;
    if (listRefs.upcoming.current.scrollLeft >= (listRefs.upcoming.current.scrollLeftMax - 60) || mobile === true) {
      setPageUpcoming(pageUpcoming + 1);
      listRefs.upcoming.current.scrollLeft = 0;
    }
  }

  const checkStars = value =>
    value.vote_average > 8 ? '★★★★★' :
      value.vote_average > 6 ? '★★★★' :
        value.vote_average > 4 ? '★★★' :
          value.vote_average > 2 ? '★★' : '★';

  const listRefs = {
    searchMovies: useRef(),
    searchSeries: useRef(),
    upcoming: useRef(),
    suspense: useRef(),
    horror: useRef(),
    fantasy: useRef(),
    drama: useRef(),
    series: useRef(),
  };

  const handleDirection = (list, direction) => {
    const listRef = listRefs[list];

    if (!listRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth } = listRef.current;
    const distance = scrollWidth / 6;

    if (direction === "left") {
      listRef.current.scrollLeft = Math.max(scrollLeft - distance, 0);
    } else if (direction === "right") {
      listRef.current.scrollLeft = Math.min(scrollLeft + distance, scrollWidth - listRef.current.clientWidth);
    }
  };

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
        {fromSearch.length > 0 &&
          <>
            <h1>Filmes da sua pesquisa</h1>
            <div className="wrapper">
              <RiArrowLeftSLine className="move-left" onClick={() => { handleDirection("searchMovies", "left") }} />
              <MovieList ref={listRefs.searchMovies}>
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
              <RiArrowRightSLine className="move-right" onClick={() => { handleDirection("searchMovies", "right"); }} />
            </div>
          </>
        }
        {seriesFromSearch.length > 0 &&
          <>
            <h1>Séries da sua pesquisa</h1>
            <div className="wrapper">
              <RiArrowLeftSLine className="move-left" onClick={() => { handleDirection("searchSeries", "left") }} />
              <MovieList ref={listRefs.searchSeries}>
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
              <RiArrowRightSLine className="move-right" onClick={() => { handleDirection("searchSeries", "right"); }} />
            </div>
          </>
        }
        {fromSearch.length < 1 &&
          <>
            <h1>Novos no Watchous</h1>
            <div className="wrapper">
              <RiArrowLeftSLine className="move-left" onClick={() => {
                handleDirection("upcoming", "left");
                if (pageUpcoming > 1) setPageUpcoming(pageUpcoming - 1)
              }}
              />
              <MovieList ref={listRefs.upcoming}>
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
                <NextPage loadMore={() => loadMore(true)} />
              </MovieList>
              <RiArrowRightSLine className="move-right" onClick={() => {
                handleDirection("upcoming", "right"); loadMore()
              }}
              />
            </div>
            <h1>Suspense</h1>
            <div className="wrapper">
              <RiArrowLeftSLine
                className="move-left"
                onClick={() => handleDirection("suspense", "left")}
              />
              <MovieList ref={listRefs.suspense}>
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
              <MovieList ref={listRefs.horror}>
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
              <MovieList ref={listRefs.fantasy}>
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
              <MovieList ref={listRefs.drama}>
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
                onClick={() => { handleDirection("series", "left"); if (pageSeries > 1 ) setPageSeries(pageSeries - 1) }}
              />
              <MovieList ref={listRefs.series}>
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
                <NextPage loadMore={() => loadMoreSeries(true)} />
              </MovieList>
              <RiArrowRightSLine
                className="move-right"
                onClick={() => { handleDirection("series", "right"); loadMoreSeries() }}
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
