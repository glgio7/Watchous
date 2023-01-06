import styled from "styled-components";

export const MovieList = styled.ul`
  overflow-x: scroll;
  position: relative;
  display: flex;
  width: max-content;
  height: 100%;
  transition: all ease 250ms;
  scrollbar-width: none;

  ::-webkit-scrollbar{
    width: thin;
    background-color: #000;
  }
  ::-webkit-scrollbar-thumb{
    background-color: #111;
  }
  
  @media screen and (max-width: 900px){
  ::-webkit-scrollbar{
      background-color: transparent;
      width: 0px;
  }
    
  ::-webkit-scrollbar-thumb{
    background-color: transparent;
  }
  }
`;
