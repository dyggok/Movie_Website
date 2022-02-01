import { useState } from 'react';
import initUser from '../init_user.json'
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const ADD_SEENLIST = "ADD_SEENLIST";
const ADD_FAVLIST = "ADD_FAVLIST";

export const login = (username, password) => ({
  type: LOGIN,
  payload: {username, password}
})

export const logout = () => ({
  type: LOGOUT,
  payload: {}
})

export const addFavList = (movieId, title, genre) => ({
  type: ADD_FAVLIST,
  payload: {movieId, title, genre}
})

export const addSeenListMovie = (movieId, title, genre) => ({
  type: ADD_SEENLIST,
  payload: {movieId, title, genre}
})

const userReducer = (user = [], action) => {
  switch(action.type){
    case LOGIN:
      if(action.payload.username == initUser[0].username && 
        action.payload.password == initUser[0].password){
          localStorage.setItem('isLogin', true)
          localStorage.setItem('user', JSON.stringify(initUser))
          return initUser;
        }else{
          user= [];
          return user;
      }
    case LOGOUT:
      localStorage.setItem('user', [])
      localStorage.setItem('isLogin', false)
      user = [];
      return user;
    case ADD_SEENLIST:
      initUser[0]['seenList'].seenFilms.push({movieId: action.payload.movieId, title: action.payload.title, genre: action.payload.genre});
      initUser[0]['seenList'].totalCount ++; 
      localStorage.setItem('user', JSON.stringify(initUser));
      return initUser;
    case ADD_FAVLIST:
      initUser[0]['favorites'].favoriteFilms.push({movieId: action.payload.movieId, title: action.payload.title, genre: action.payload.genre});
      initUser[0]['favorites'].totalCount ++;
      localStorage.setItem('user', JSON.stringify(initUser));
      return initUser;
    default:
      return user;    
  }
}

export default userReducer