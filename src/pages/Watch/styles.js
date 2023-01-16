import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  margin-top: 60px;
  background-image: url('/img/background.jpg');
  background-size: cover;
  padding: 3rem;

  ul{
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  .movie-box{
    margin-block: 1rem;
    margin-inline: 1rem;
    cursor: pointer;
   
  }
  
  button{
    cursor: pointer;
    width: calc((100vw - 105px) / 6);
    border: none;
    height: 2.5rem;
    color: #fff;
    font-weight: bold;
    background-color: rgba(0, 60, 150, 1);
    border-radius: 0 0 10px 10px;
  }
  
  h1 {
    font-size: 1.5rem;
    color: #fff;
    margin-block: 20px;
    margin-left: 15px;
  }
  
  //mobile portrait
  @media screen and (max-width: 768px) {
  margin-top: 114px;
  padding: 3rem 2rem;
 
  h1 {
    font-size: 1.25rem;
    color: #fff;
    margin: 1rem 3px;
  }
  
  .movie-box{
    margin-block: 1rem;
    margin-inline: 1rem;
    cursor: pointer;
  }
  
  button{
    width: calc((100vw - 30px) / 3);
  }

  }
  //mobile landscape
  @media screen and (max-width: 900px) and (min-width: 460px) and (orientation: landscape) {
  margin-top: 72px;
  
  
  button{
    width: calc((100vw - 105px) / 4);
  }

  }
`;
