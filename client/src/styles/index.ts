import { createGlobalStyle } from "styled-components";

export const GlobalCSS = createGlobalStyle`

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
  font-family: 'Saira Condensed', sans-serif;
  border: none;
}
img {
  width: 100%;
  height: 100%;
}
html, body {
  background-color: #000;
  height: 100%;
  width: 100%;
}

body{
  -webkit-tap-highlight-color: transparent;
}

a, li{
  text-decoration: none;
  list-style: none;
}



::selection{
    color:#00aeff;
  }

`;
