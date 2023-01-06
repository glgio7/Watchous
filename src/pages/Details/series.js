import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { useParams } from "react-router-dom";
import { RiArrowLeftLine } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
import { series } from "../../api/movies";
import { Container } from "./styles";


export function SeriesDetails() {
  const { id } = useParams();
  const image_path = "https://themoviedb.org/t/p/original";
  const [movie, setMovie] = useState({});
  const [player, setPlayer] = useState(false);
  const [fullDescription, setFullDescription] = useState(false);
  const goBack = () => window.history.back()
  const onTop = () => window.scrollTo(0, 0);
  const togglePlayer = () => {setPlayer(!player); onTop()}
  const showFull = () => setFullDescription(!fullDescription);
  
  
  useEffect(() => {
    const response = series.filter((movie) => { return movie.imdb === id; })
    const i = 0;
    const movie = {
      id,
      title: response[i].title,
      poster: response[i].image_path,
      background: response[i].backdrop_path,
      fullSinopse: response[i].overview,
      sinopse: response[i].overview.substring(0, 49) + '...',
      link: response[i].link,
      genres: response[i].genres,
      key: response[i].key,
      release: response[i].release_date,
      nota: Math.round(response[i].vote_average),
    };
    setMovie(movie);
  }
    , [id]);

    return (
      <>
        <Header />
        <Container onLoad={onTop}>
          <section>
            <iframe key={id} title={movie.title} className={player ? "active" : ""} src={`https://www.youtube.com/embed/${movie.key}`} frameBorder="0" allowFullScreen></iframe>
            <RiCloseFill className={player ? "close-player active" : "close-player"} onClick={togglePlayer} />
            <img
              className="background"
              src={`${image_path}${movie.background}`}
              alt=""
            />
            <div className="fade"></div>
            <div className="container">
            <div className="release-date"><h1>Data de Lançamento: </h1>{movie.release}</div>
              <img className="poster" src={`${image_path}${movie.poster}`} alt="" />
              <button onClick={togglePlayer}>Assistir Trailer</button>
              <RiArrowLeftLine className="back" onClick={goBack} />
              </div>
            <div className="overview">
              <div className="infos" style={{color: "white"}}>{movie.genres}</div>
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
  