import styled from "styled-components";

export const Movie = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  height: 100%;
  text-align: center;
  aspect-ratio: 9 / 16;
  width: calc((100vw - 105px) / 5);
  :last-child {
    margin-right: 0px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .moviePoster {
    background-color: #262626;
    min-width: calc((100vw - 105px) / 5);
    aspect-ratio: 9 / 16;
    transition: all ease 200ms;
    &:hover {
      scale: 1.05;
    }
  }

  span {
    font-size: 1.25rem;
    color: #fff;
    font-weight: bold;
    vertical-align: top;
    margin-block: 10px;
  }
//mobile portrait
  @media screen and (max-width: 768px) {
    width: calc((100vw - 30px) / 2);
    aspect-ratio: 16 / 9;
    .moviePoster {
      aspect-ratio: 16 / 9;
      min-width: calc((100vw - 30px) / 2);
    }
    
    span {
      font-size: 1rem;
    }
  }
  //mobile landscape
  @media screen and (max-width: 900px) and (max-height: 768px) and (orientation: landscape) {
    width: calc((100vw - 105px) / 4);
      aspect-ratio: 16 / 9;
    .moviePoster {
      min-width: calc((100vw - 105px) / 4);
      aspect-ratio: 16 / 9;
    }
    span {
      max-width: calc((100vw - 105px) / 4);
    }
  }
`;

//BREAKPOINTS
// 768:
// moviesPerView: 3,
// 1024:
// moviesPerView: 5
