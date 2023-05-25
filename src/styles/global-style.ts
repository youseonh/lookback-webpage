import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  html, body { 
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    /* font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI; */
    font-size : 16px;
    color: rgb(58, 58, 58);
  }

  ul, ol {
    list-style: none;
  }
`;
