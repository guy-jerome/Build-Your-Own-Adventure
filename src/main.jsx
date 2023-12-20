import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'

import { UserProvider } from './context/UserContext.jsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createTheme, ThemeProvider } from "@mui/material"

const theme = createTheme({
  palette:{
    primary:{
      main: "#DDD2C6"
    },
    secondary: {
      main: "#DDD2C6"
    },
    accent:{
      main: "#C9A07A"
    },
    background:{
      main: "#8E4739"
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>,
)
