import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  margin-top: 60px;

  .loading{
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 90;
    background-color: #000;
  }

  .loading img{
    width: 25%;
    object-fit: contain;
  }

  .banner {
    position: relative;
    height: 224px;
    overflow: hidden;
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #000;
    animation: sub;
    animation-duration: 1s;
    
    h1 {
      font-size: 1.75rem;
      max-width: 80%;
      margin-left: 0;
      text-align: center;
      margin-block: 0.25rem;
      font-weight: bold;
      animation: sub;
      animation-duration: 4s;
    }
    h2 {
      color: #fff;
      font-size: 1.25rem;
      text-align: center;
      font-weight: bold;
      animation: sub;
      animation-duration: 6.5s;
    }
    span {
      color: #00aeff;
    }
    video {
      position: absolute;
      z-index: -1;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100vw;
    }
  }

  .buttonDisclaimer {
    background-color: rgba(0, 174, 255, 0.65);
    font-weight: bold;
    color: #fff;
    font-size: 1.5rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    border: none;
    position: fixed;
    z-index: 99;
    bottom: 1rem;
    right: 1rem;
    cursor: pointer;
  }
  .disclaimer {
    display: none;
    opacity: 0;
    pointer-events: none;
  }

  .disclaimer.active {
    background: rgb(0,162,211);
    background: linear-gradient(0deg, rgba(0,162,211,1) 0%, rgba(0,174,255,.85) 25%, rgba(0,111,186,.85) 75%, rgba(0,58,147,1) 100%);
    display: flex;
    opacity: 1;
    pointer-events: all;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 99;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    animation: flash;
    animation-duration: 0.5s;
    
    h2 {
      color: #fff;
      font-size: 1.25rem;
      line-height: 2rem;
      text-align: center;
      width: 90%;
    }
    
    .closeDisclaimer {
      display: flex;
      position: absolute;
      top: 20px;
      right: 20px;
      color: #fff;
      font-size: 2rem;
      cursor: pointer;
    }
  }

  @keyframes flash {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes sub {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  
  h1 {
    font-size: 1.5rem;
    color: #fff;
    margin-block: 20px;
    margin-left: 15px;
  }

  .wrapper {
    display: flex;
    position: relative;
    overflow: hidden;
    scrollbar-width: none;
    margin-inline: 15px;
    height: 100%;

    &:hover .move-left {
      pointer-events: all;
      opacity: 1;
    }
    &:hover .move-right {
      pointer-events: all;
      opacity: 1;
    }

    ::-webkit-scrollbar {
      height: 0rem;
    }
    .move-left {
      left: 0;
    }
    .move-right {
      right: 0;
    }
  }

  .move-left,
  .move-right {
    width: 30px;
    background-color: rgba(0, 0, 0, 0.75);
    cursor: pointer;
    position: absolute;
    height: 100%;
    top: 0;
    bottom: 0;
    z-index: 9;
    pointer-events: none;
    opacity: 0;
    display: flex;
    transition: all ease 200ms;
    justify-content: center;
    align-items: center;
    color: #fff;
    &:hover {
    width: 42px;
    pointer-events: all;
    opacity: 1;
    }
    &:active{
      width: 36px;
    }
  }
  
  //mobile portrait
  @media screen and (max-width: 768px) {
    margin-top: 114px;
    
    .banner {
      h1 {
        font-size: 1.25rem;
      }
      h2 {
        font-size: 1rem;
      }
      video {
        width: initial;
      }
    }
    h1 {
      font-size: 1.25rem;
      color: #fff;
      margin: 1rem 3px;
    }
    .wrapper {
      margin-inline: 3px;
    }
    .move-left,
    .move-right {
      display: none;
    }
  }
  //mobile landscape
  @media screen and (max-width: 900px) and (min-width: 460px) and (orientation: landscape) {
    margin-top: 72px;
    .wrapper {
      height: max-content;
    }
  }
`;
