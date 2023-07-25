import { injectGlobal } from '@emotion/css';

injectGlobal`
  * {
    outline: none;

    box-sizing: border-box;
    font-family: 'Manrope', sans-serif;

    &::after,
    &::before {
      box-sizing: border-box;
    }
  } 

  html {
    font-size: 1rem;
    font-weight: 400;
  }

  body {
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    padding: 0;
  }

  #root {
    height: 100vh;
  }
  
`;
