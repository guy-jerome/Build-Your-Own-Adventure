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
      main: "#013e87"
    },
    secondary: {
      main: "#2e74c9"
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
