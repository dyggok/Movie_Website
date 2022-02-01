import { Navbar, Footer, Search } from "./components";
import {Routes, Route} from "react-router-dom"
import { DetailPage, Home, Login, ProfilePage } from "./pages";
import PopularMovies from "./pages/MoviePages/PopularMovies";
import TopRatedMovies from "./pages/MoviePages/TopRatedMovies";
import { useState } from "react";
function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/movies/top_rated" element={<TopRatedMovies />}/>
        <Route path="/movies/popular" element={<PopularMovies />}/>
        <Route path="/search-movies" element={<Search />}/>
        <Route path="movies/:movieId" element={<DetailPage/>}/> 
        <Route path="/profile" element={<ProfilePage/>}/> 
      </Routes>
      
    </div>
  );
}

export default App;
