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
      background-color: transparent;
      width: 0px;
  }
    
`;
