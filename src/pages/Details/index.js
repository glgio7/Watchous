import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { Link, useParams } from "react-router-dom";
import { RiArrowLeftLine, RiCloseFill } from "react-icons/ri";
import { MovieList } from "../../components/movielist";
import { Movie } from "../../components/movieitem";
import { Container } from "./styles";
import { apiKey } from "../../api"



export function Details() {
  const [valorDoFiltro, setValorDoFiltro] = useState("");
  const { id } = useParams();
  const image_path = "https://themoviedb.org/t/p/original";
  const [movie, setMovie] = useState({});
  const [trailer, setTrailer] = useState({});
  const [fullDescription, setFullDescription] = useState(false);
  const [player, setPlayer] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const goBack = () => window.history.back();
  const showFull = () => setFullDescription(!fullDescription);
  const Load = () => window.scrollTo(0, 0);
  const togglePlayer = () => { setPlayer(!player); Load() }


  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        const movie = {
          id,
          title: data.title,
          search: data.title.replaceAll(' ', '+'),
          fullSinopse: data.overview,
          sinopse: data.overview.substring(0, 49) + "...",
          poster: data.poster_path,
          background: data.backdrop_path,
          release: data.release_date.split("-").reverse().join().replaceAll(',', '/'),
          genres: data.genres.map(value => value.name).join(' / ').replace('Thriller', 'Suspense'),
          nota: Math.round(data.vote_average),
        };
        setMovie(movie);
      });
    }, [id]);
    useEffect(() => {
      fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
        )
        .then((response) => response.json())
        .then((data) => {
          const trailer = {
            id,
            key: data.results.length > 0 ? data.results[0].key : '',
          };
          setTrailer(trailer);
        })
        .then(() => setLoaded(true));
  }, [id]);
  /////////////////////////////////////////////////// search
  const [fromSearch, setFromSearch] = useState([]);
  const serverSearch = valorDoFiltro.replaceAll(' ', '+')
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${serverSearch}&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        setFromSearch(data.results)
      });
  }, [serverSearch]);
  ///////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <Header valorDoFiltro={valorDoFiltro}
        setValorDoFiltro={setValorDoFiltro} />
      <Container onLoad={Load}>
        {fromSearch &&
          <>
              <MovieList className="search-results">
                {fromSearch
                  .map((movie) => (
                    <Movie key={movie.id} onClick={() => setFromSearch()}>
                      <Link to={`/details/${movie.id}`}>
                        <img
                          src={movie.poster_path ? `https://www.themoviedb.org/t/p/w500${movie.poster_path}` : '/img/loading.gif'}
                          alt={""}
                          className="moviePoster"
                        />
                      </Link>
                      <span>{movie.title}</span>
                    </Movie>
                  ))}
              </MovieList>
          </>
        }
        {/* ///////////// */}
        {loaded === false &&
          <div className="loading">
            <img src="/img/loading.gif" alt="Loading" />
          </div>}
        <section>
          <img
            className="background"
            src={movie.background ? `${image_path}${movie.background}` : '/img/tmdb.jpg'}
            alt=""
          />
          <div className="fade"></div>
          <iframe key={id} title={movie.title} className={player ? "active" : ""} src={trailer.key ? `https://www.youtube.com/embed/${trailer.key}` : `/img/unavailable.jpg`} frameBorder="0" allowFullScreen></iframe>
          <RiCloseFill className={player ? "close-player active" : "close-player"} onClick={togglePlayer} />

          <div className="container">
            <div className="release-date"><h1>Data de Lançamento: </h1>{movie.release}</div>
            <img className="poster" src={movie.poster ? `${image_path}${movie.poster}` : 'https://media0.giphy.com/media/3osxYzUOBRWEg5S5q0/giphy.gif'} alt="" />
            <button onClick={togglePlayer}>Assistir Trailer</button>
            <RiArrowLeftLine className="back" onClick={goBack} />
          </div>
          <div className="overview">
            <div className="infos" style={{ color: "white" }}>{movie.genres}</div>
            <h1>{movie.title}</h1>
            <p>{fullDescription ? movie.fullSinopse : movie.sinopse}</p>
            <p onClick={showFull} id="expand-overview">{fullDescription ? 'Ver menos' : 'Ver mais'}</p>
            <div className="infos" id="nota"><span>Nota da audiência:</span><span>{movie.nota}/10</span></div>
          </div>
        </section>
      </Container>
    </>
  );
}
