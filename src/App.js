import { Navbar, Footer, Search } from "./components";
import {Routes, Route} from "react-router-dom"
import { DetailPage, Home, Login, ProfilePage } from "./pages";
import PopularMovies from "./pages/MoviePages/PopularMovies";
import TopRatedMovies from "./pages/MoviePages/TopRatedMovies";
import { useState, useEffect } from "react";
function App() {
  const themes = {
    light: {
      backgroundColor: "bg-light",
      color: "text-dark",
      button: "btn-primary",
      navbar: "navbar-light bg-light"
    },
    dark: {
      backgroundColor: "bg-dark",
      color: "text-light",
      button: "btn-danger",
      navbar: "navbar-dark bg-dark"
    }
  }
  const [themeName, setThemeName] = useState("light");

  useEffect(() => {
    const localThemeName = localStorage.getItem("themeName") ? localStorage.getItem("themeName") : localStorage.setItem("themeName", themeName);
    setThemeName(localThemeName);
    const theme = themeName === "light" ? themes.light : themes.dark;
    document.body.classList.add(theme.backgroundColor, theme.color);
  }, []);

  useEffect(() => {
    localStorage.setItem("themeName", themeName)
    const theme = themeName === "light" ? themes.light : themes.dark;
    document.body.className = "";
    document.body.classList.add(theme.backgroundColor, theme.color);
  }, [themeName]);

  return (
    <div className="App">
      <Navbar theme={themeName == "light" ? themes.light : themes.dark} setThemeName={setThemeName}/>
      <Routes>
        <Route path="/" element={<Home theme={themeName == "light" ? themes.light : themes.dark} setThemeName={setThemeName}/>}/>
        <Route path="/login" element={<Login theme={themeName == "light" ? themes.light : themes.dark}/>}/>
        <Route path="/movies/top_rated" element={<TopRatedMovies />}/>
        <Route path="/movies/popular" element={<PopularMovies />}/>
        <Route path="/search-movies" element={<Search theme={themeName == "light" ? themes.light : themes.dark} setThemeName={setThemeName}/>}/>
        <Route path="movies/:movieId" element={<DetailPage theme={themeName == "light" ? themes.light : themes.dark} setThemeName={setThemeName}/>}/> 
        <Route path="/profile" element={<ProfilePage theme={themeName == "light" ? themes.light : themes.dark} />}/> 
      </Routes>
      
    </div>
  );
}

export default App;
