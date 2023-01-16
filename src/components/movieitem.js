import styled from "styled-components";

export const Movie = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  height: 100%;
  text-align: center;
  aspect-ratio: 9 / 16;
  width: calc((100vw - 105px) / 6);
  transition: all ease 200ms;
  &:hover {
    scale: 1.05;
    .vote-average{
      top: .75rem
    }
  }
  :last-child {
    margin-right: 0px;
  }
  .vote-average{
    position: absolute;
    top: 0;
    right: 1rem;
    margin: 0 auto;
    width: 48px;
    color: #fff;
    border-radius: 0 0 3px 3px;
    background-color: #001b80;
    transition: all ease 200ms;

    p{
      font-size: .7rem;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .moviePoster {
    background-color: #262626;
    min-width: calc((100vw - 105px) / 6);
    aspect-ratio: 9 / 16;
  }

  span {
    font-size: 1.25rem;
    line-height: 1.25rem;
    color: #fff;
    font-weight: bold;
    vertical-align: top;
    margin-block: 10px;
  }
//mobile portrait
  @media screen and (max-width: 768px) {
    width: calc((100vw - 30px) / 3);
    aspect-ratio: 9 / 16;
      &:hover {
      scale: 1.05;
      .vote-average{
        top: .45rem
      }
      }

    .moviePoster {
      aspect-ratio: 9 / 16;
      min-width: calc((100vw - 30px) / 3);
    }

    .vote-average{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 1rem;
    position: absolute;
    top: 0;
    margin: 0 auto;
    width: 75%;
    color: #fff;
    border-radius: 0 0 3px 3px;
    background-color: #001b80;
    z-index: 1;
    }
    
    span {
      font-size: 1rem;
    }
  }
  //mobile landscape
  @media screen and (max-width: 900px) and (max-height: 768px) and (orientation: landscape) {
    width: calc((100vw - 105px) / 4);
      aspect-ratio: 9 / 16;
    .moviePoster {
      min-width: calc((100vw - 105px) / 4);
      aspect-ratio: 9 / 16;
    }

    span {
      max-width: calc((100vw - 105px) / 4);
    }
  }
`;
