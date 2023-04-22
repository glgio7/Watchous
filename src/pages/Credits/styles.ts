import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  min-height: calc(100vh - 60px);
  padding: 0 1rem;

  img{
    width: 300px;
    margin-block: 1rem;
  }
  
  a:first-of-type img{
    border-radius: 9px;
    box-shadow: 0px 0px 20px #404040;
  }

  h1 {
    width: 100%;
    text-align: center;
    font-size: 3rem;
    color: #fff;
    margin-block: 2rem;
  }

  p{
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 1.25rem;
  }

  a{
    text-decoration: none;
    color: #0070ff;
    font-weight: bold;
  }
  
  //mobile portrait
  @media screen and (max-width: 768px) {
  margin-top: 114px;
 
  /* h1 {
    font-size: 1.25rem;
    color: #fff;
    margin: 1rem 3px;
  } */

  }
  //mobile landscape
  @media screen and (max-width: 900px) and (min-width: 460px) and (orientation: landscape) {
  margin-top: 72px;

  }
`;
