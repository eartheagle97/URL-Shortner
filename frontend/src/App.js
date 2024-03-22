// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShortenPage from "./Pages/ShortenPage";
import RedirectionPage from "./Pages/RedirectionPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';


const defaultTheme = createTheme();

function App() {
  return (
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Routes>
          <Route exact path="/" element={<ShortenPage />} />
          <Route path="/:code" element={<RedirectionPage />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
