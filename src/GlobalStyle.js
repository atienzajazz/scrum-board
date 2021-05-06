import React from 'react';
import { createGlobalStyle } from 'styled-components';
import "@fontsource/poppins"


const Style = createGlobalStyle`
    *{
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        font-family: "Poppins", 'Courier New';
        
    }
    body {
        background: #faeee7;
        height: 100%;
    }
`

function GlobalStyle() {
    return (
        <>
            <Style />
            {/* <Reset /> */}
        </>
    );
}

export default GlobalStyle;