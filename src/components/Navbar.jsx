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
  const {theme, setThemeName} = props;
  const dispatch = useDispatch();
  return <>
  <nav className={`navbar navbar-expand-lg ${theme.navbar} p-4`}>
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
    <div className="form-check form-switch">
      <input className="form-check-input " type="checkbox" id="flexSwitchCheckDefault" onChange={(e) => 
        setThemeName(prev => prev === 'light' ? 'dark' : 'light')} checked={theme.backgroundColor == 'bg-dark' ? true : false}/>
      <label className="form-check-label" for="flexSwitchCheckDefault" ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
      <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
    </svg> / <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16">
      <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
    </svg></label>
    </div>
    {(localStorage.getItem('user') ? 
      <ul className="navbar-nav profile-link">
        <NavItem className="nav-item dropdown">
        <Link className={`nav-link float-end dropdown-toggle ${theme.color}`} to="/profile">Profile</Link> 
        <br />
        <br />
        <NavItemOfItem className="dropdown-menu">
          <li><Link className="dropdown-item" to="/" onClick={() => {
            dispatch(logout());
            }}>Log Out</Link></li>
        </NavItemOfItem >
      </NavItem>
      </ul> 
      : <Link className={`nav-link nav-item float-end ${theme.color}`} to="/login">Login</Link>)}
  </div>
</nav>
</>
}

export {Navbar}