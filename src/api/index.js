import axios from "axios";
export const api_key = "16123ea1ebb67999ed7f73c1f9b846c4";
export const BASE_URL = "https://api.themoviedb.org/3"; 
export const AXIOS_BASE_URL = axios.create({baseURL: "https://api.themoviedb.org/3"})
export const fetchGenres = () => AXIOS_BASE_URL.get(`/genre/movie/list?api_key=${api_key}&language=en-US`)
export const fetchPopular = () => AXIOS_BASE_URL.get(`/movie/popular?api_key=${api_key}`)
export const fetchTrending = (time) => AXIOS_BASE_URL.get(`/trending/all/${time}?api_key=${api_key}`)
export const fetchDetail = (movieId) => AXIOS_BASE_URL.get(`movie/${movieId}?api_key=${api_key}`)
export const fetchSingleMovieCredits = (movieId) => AXIOS_BASE_URL.get(`movie/${movieId}/credits?api_key=${api_key}`)
export const fetchRecommendations = (movieId) => AXIOS_BASE_URL.get(`movie/${movieId}/recommendations?api_key=${api_key}`)
export const fetchReviews = (movieId) => AXIOS_BASE_URL.get(`/movie/${movieId}/reviews?api_key=${api_key}`)