// import styled from "styled-components"
import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { RiArrowLeftLine, RiCloseFill } from "react-icons/ri";
import { apiKey } from "../../api/api_key";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 60px;
  background-color: #000;

    iframe {
    opacity: 0;
    display: block;
    pointer-events: none;
    z-index: 9;
    top: 24px;
    bottom: 0;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 75%;
    border-left: 40px #000  solid;
    border-right: 40px #000 solid;
    border-top: 10px #000 solid;
    border-bottom: 10px #000 solid;
    border-radius: 10px;
    height: 85vh;
    transition: all ease 500ms;
  }

  iframe.active {
    pointer-events: all;
    opacity: 1;
  }
  .close-player {
    display: none;
    position: absolute;
    height: 36px;
   right: 0;
   left: 0;
   bottom: -1rem;
   margin: 0 auto;
    z-index: 10;
    width: 36px;
    border-radius: 50%;
    background-color: rgba(0, 174,255, .5);
    text-align: center;
    font-size: 2rem;
    font-family: 'Franklin Gothic Medium', sans-serif;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
  }
  .close-player.active {
    display: block;
  }
  
  .background {
    position: absolute;
    left: 0;
    right: 0;
    z-index: -1;
    width: 100%;
    object-fit: cover;
    min-height: calc(100vh - 60px);
    height: 100%;
  }
  .fade {
    position: absolute;
    left: 0;
    right: 0;
    z-index: -1;
    width: 100%;
    object-fit: cover;
    min-height: calc(100vh - 60px);
    height: 100%;
    background: rgb(32, 32, 32);
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 1) 70%
    );
  }

  section {
    position: relative;
    width: 100vw;
    z-index: 5;
    display: flex;
    justify-content: space-between;
    padding: 0 3rem;
}
  .container{
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    width: 360px; 
    height: 100%;

  }
  .poster {
    background-position: center;
    object-fit: cover;
    width: 360px;
    height: 480px;
  }

  button {
    width: 360px;
    height: 2.5rem;
    font-size: 1.25rem;
    font-weight: bold;
    font-family: 'Saira Condensed', sans-serif;
    color: #fff;
    border: none;
    border-radius: 0 0 10px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 60, 150, 1);
    cursor: pointer;
    transition: all 250ms ease;
      &:hover{
       opacity: .75;
      }
      &:active {
        scale: 1.075;
  }
}

  .back {
    font-size: 2rem;
    color: #fff;
    margin-left: 162px;
    margin-block: 9px;
    background-color: #000;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    padding: 3px;
    transition: all 250ms ease;
    &:hover {
      cursor: pointer;
      padding: 0px;
      color: #000;
      background-color: #fff;
    }
  }

  .overview {
    margin-top: 60px;
      text-align: center;
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: calc(480px + 5rem);
    height: 100%;
    overflow-y: auto;
    justify-content: space-between;
    
    h1 {
      font-size: 2rem;
      color: #fff;
      font-family: 'Saira Condensed', sans-serif;
    }
    p {
      color: #fff;
      font-family: 'Saira Condensed', sans-serif;
      font-size: 1.5rem;
      line-height: 2.5rem;
      padding: 0 2rem;
      text-align: center;
    }
  }
  .release-date{
    width: 100%;
    height: 2.5rem;
    font-size: 1.25rem;
    font-weight: bold;
    font-family: 'Saira Condensed', sans-serif;
    color: #ffa400;
    border: none;
    border-radius: 10px 10px 0 0 ;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: rgba(0, 60, 150, 1);

    h1{
      color: #fff;
    font-size: 1.25rem;
    }
  }
  .infos{
    width: 100%;
    height: 2.5rem;
    font-size: 1.25rem;
    font-weight: bold;
    font-family: 'Saira Condensed', sans-serif;
    color: #fff;
    border: none;
    border-radius: 10px 10px 0 0 ;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    background-color: rgba(0, 60, 150, 1);}
    #nota{
    border-radius: 0 0 10px 10px ;
    }

  #expand-overview{
    cursor: pointer;
    color: #ffa400;
    margin-block: 1rem;
    &:hover{
      opacity: .75;
    }
  }
  //mobile portrait
  @media screen and (max-width: 768px) {
  margin-top: 114px;
  align-items: center;
    .container{
      margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;

  }
  
  .poster {
      width: 65vw;
      height: 50vh;
    }
    button {
    width: 65vw;
    height: 2.5rem;
    font-size: 1.25rem;
    font-weight: bold;
    font-family: 'Saira Condensed', sans-serif;
    color: #fff;
    border: none;
    border-radius: 0 0 10px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 60, 150, 1);
    cursor: pointer;
    transition: all 250ms ease;
      &:hover{
       opacity: .75;
      }
      &:active {
        scale: 1.075;
  }
}
.release-date{
  width: 65vw;
  font-size: 1rem;
  h1{
      color: #fff;
    font-size: 1rem;
    }
}
.infos{
  width: 100%;
  font-size: 1rem;}
  #nota{
    border-radius:10px 10px 0 0;
    }
  .back {
    font-size: 2rem;
    color: #fff;
    margin-left: 0;
    font-size: 2.5rem;
      margin-top: .5rem;
    background-color: #000;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    padding: 3px;
    transition: all 250ms ease;
    &:hover {
      cursor: pointer;
      padding: 0px;
      color: #000;
      background-color: #fff;
    }
  }
  iframe {
    opacity: 0;
    display: block;
    pointer-events: none;
    border: none;
    top: 1rem;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 65vw;
      height: calc(50vh + 5rem);
  }
  .close-player{
    display: none;
    position: absolute;
    height: 36px;
    right: 0;
    left: 0;
    top: 3px;
    margin: 0 auto;
    z-index: 10;
    width: 36px;
  }

    .fade {
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 50%
      );
    }

    section {
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      height: 100%;
    }
    
    .overview {
      margin-top: 1rem;
      width: 90vw;
      height: 100%;
    min-height: calc(50vh + 5rem);
      h1 {
        text-align: center;
        margin-block: 1rem;
      }
      p {
        font-size: 1.25rem;
        line-height: 1.75rem;
      }
    }
  }
  //mobile landscape
  @media screen and (max-width: 900px) and (max-height: 768px) and (orientation: landscape) {
    margin-top: 72px;
    
     .fade {
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 1) 65%
      );
    }
    
    section {
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-around;
      width: 100vw;
      overflow: hidden;
      padding: 0 2rem;
    }
    .overview {
      width: 40vw;
      overflow-y: auto;
      text-align: center;
      justify-content: space-between;
    height: 100%;
    min-height: calc(50vh + 7.25rem);
    } 
    
    .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40vw;
    height: 100%;
  }
  
  .poster {
      width: 40vw;
      height: 60vh;
    }
    button {
    width: 40vw;
    height: 2.5rem;
    font-size: 1.25rem;
    font-weight: bold;
    font-family: 'Saira Condensed', sans-serif;
    border: none;
    border-radius: 0 0 10px 10px;
    color: #fff;
    background-color: rgba(0, 60, 150, 1);
    cursor: pointer;
    transition: all 250ms ease;
      &:hover{
       opacity: .75;
      }
      &:active {
        scale: 1.075;
  }
}
.release-date{
  width: 40vw;
  
  color: #ffa400;
    background-color: rgba(0, 60, 150, 1);
}
.infos{
  width: 40vw;}
  #nota{
    border-radius: 0 0 10px 10px ;
    }
  .back {
    margin-top: .5rem;
    font-size: 2rem;
    color: #fff;
    margin: .5rem auto;
    font-size: 2.5rem;
    background-color: #000;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    padding: 3px;
    transition: all 250ms ease;
    &:hover {
      cursor: pointer;
      padding: 0px;
      color: #000;
      background-color: #fff;
    }
  }
    
  iframe {
    opacity: 0;
    display: block;
    pointer-events: none;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: none;
    border-radius: 0px !important;
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
  .close-player{
    display: none;
    position: absolute;
    height: 36px;
    right: 0;
    left: 0;
    top: 3px;
    margin: 0 auto;
    z-index: 10;
    width: 36px;
  }
  }
`;

export function Details() {
  const { id } = useParams();
  const image_path = "https://themoviedb.org/t/p/original";
  const [movie, setMovie] = useState({});
  const [trailer, setTrailer] = useState({});
  const [fullDescription, setFullDescription] = useState(false);
  const [player, setPlayer] = useState(false);

  const goBack = () => window.history.back();
  const showFull = () => setFullDescription(!fullDescription);
  const onTop = () => window.scrollTo(0, 0);
  const togglePlayer = () => { setPlayer(!player); onTop() }

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos&language=pt-BR`
    )
      .then((response) => response.json())
      .then((data) => {
        const movie = {
          id,
          title: data.title,
          video: data.video,
          fullSinopse: data.overview,
          sinopse: data.overview.substring(0, 199) + "...",
          poster: data.poster_path,
          background: data.backdrop_path,
          release: data.release_date.split("-").reverse().join().replaceAll(',', '/'),
          genres: data.genres.map(value => value.name).join(' / ').replace('Thriller', 'Suspense'),
          nota: Math.round(data.vote_average),
        };
        console.log(data)
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
          key: data.results?[0].key : ''
        };
        setTrailer(trailer);
      });
  }, [id]);
  return (
    <>
      <Header />
      <Container onLoad={onTop}>

        <section><img
          className="background"
          src={`${image_path}${movie.background}`}
          alt=""
        />
          <div className="fade"></div>
          <iframe key={id} title={movie.title} className={player ? "active" : ""} src={`https://www.youtube.com/embed/${trailer.key}`} frameBorder="0" allowFullScreen></iframe>
          <RiCloseFill className={player ? "close-player active" : "close-player"} onClick={togglePlayer} />

          <div className="container">
            <div className="release-date"><h1>Data de Lançamento: </h1>{movie.release}</div>
            <img className="poster" src={movie.poster ? `${image_path}${movie.poster}` : '/img/movie.jpg'} alt="" />
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
