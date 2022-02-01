import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import styledComponents from "styled-components"
import { logout } from "../reduxStore/userAction"
import { isLogin } from "../reduxStore/userAction"
const NavItemOfItem = styled.ul`
  display: none;
`
const NavItem = styled.li`
  &:hover {
    .dropdown-menu{
      display: block;    
    }
  }
`
function Navbar(props){
  const dispatch = useDispatch();

  return <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light p-4">
  <div className="container-fluid">
    <Link className="navbar-brand mx-5" to="/">T H E M O V I E</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        
        <NavItem className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="/">Movies</Link>
          <NavItemOfItem className="dropdown-menu">
            <li><Link className="dropdown-item" to="/movies/top_rated">Top Rated Movies</Link></li>
            <li><Link className="dropdown-item" to="/movies/popular">Popular Movies</Link></li>
          </NavItemOfItem >
        </NavItem>
      </ul> 
    </div>
    {(localStorage.getItem('user') ? 
      <ul className="navbar-nav profile-link">
        <NavItem className="nav-item dropdown">
        <Link className="nav-link float-end text-dark dropdown-toggle" to="/profile">Profile</Link> 
        <br />
        <br />
        <NavItemOfItem className="dropdown-menu">
          <li><Link className="dropdown-item" to="/" onClick={() => {
            dispatch(logout());
            }}>Log Out</Link></li>
        </NavItemOfItem >
      </NavItem>
      </ul> 
      : <Link className="nav-link nav-item float-end text-dark" to="/login">Login</Link>)}
  </div>
</nav>
</>
}

export {Navbar}