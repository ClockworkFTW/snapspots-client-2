import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createGlobalStyle } from "styled-components";

import { initUser } from "pages/Auth/userSlice";
import { RouterConfig } from "navigation/RouterConfig";

// CSS imports
import "mapbox-gl/dist/mapbox-gl.css";
import "mapboxgl-spiderifier/index.css";
import "swiper/swiper-bundle.css";

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
  }
  *, *:before, *:after {
    box-sizing: inherit;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  return (
    <>
      <GlobalStyle />
      <RouterConfig />
    </>
  );
}

export default App;
