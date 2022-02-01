import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchPopular, fetchTrending, fetchDetail, BASE_URL, api_key} from "../api";
import { Search } from "../components/Search";
import "../index.css";
import { addFavList, addSeenListMovie } from "../reduxStore/userAction";


function Home(){
  const [movieId, setMovieId] = useState(0)
  const [userAction, setUserAction] = useState('');
  const [time, setTime] = useState('day');
  const [discover, setDiscover] = useState(false);
  const {data} = useQuery("popular", fetchPopular);
  const trendingData = useQuery(["trending", time], () => fetchTrending(time))
  const dispatch = useDispatch();

  function addFilmListHandler(e){
    if(e.target.name == 'likeButton'){
      setUserAction(e.target.name)
    }else{
      setUserAction(e.target.name)
    }
    setMovieId(e.target.id)
  }

  useEffect(() => {
    (movieId !== 0 &&
      fetch(`${BASE_URL}/movie/${movieId}?api_key=${api_key}`)
      .then(res => res.json())
      .then(data => {
        if(userAction == 'likeButton'){
          dispatch(addFavList(data?.id, data?.original_title, data?.genres))
        }else{
          dispatch(addSeenListMovie(data?.id, data?.original_title, data?.genres))
        }
      })
      )  }, [movieId])

  const LikeButton = styled.input`
    &:checked + label{
      svg {
        fill: #c51350;
      }
    }        
    &:not(:checked) + label {
      svg {
        fill: grey;
      }        
    }
  `
  const WatchedButton = styled.input`
    &:checked + label{
      svg{
        fill: #fda403;
      }        
    }
    &:not(:checked) + label{
      svg{
       fill: grey;
      }
    }
  `

  function timeHandler(e){
    if(e.target.name == "Today"){
      setTime('day')
    }else{
      setTime('week')
    }
  }
 const onHoverChange = (e) => {
   if(localStorage.getItem('user')){
    document.getElementsByClassName(`card-img-top ${e.target.className}`)[0].classList.remove('opacity-100');
    document.getElementsByClassName(`card-img-top ${e.target.className}`)[0].classList.add('opacity-25')
   }
  }
  const onLeaveChange = (e) => {
    if(localStorage.getItem('user')){
      document.getElementsByClassName(`card-img-top ${e.target.className}`)[0].classList.remove('opacity-25')
      document.getElementsByClassName(`card-img-top ${e.target.className}`)[0].classList.add('opacity-100')
     }
  }
  return<>
    <Search/>
  
    <Container>
    <h3 className="text-center text-secondary">P o p u l a r M o v i e s</h3>
    <div className="d-flex flex-row flex-nowrap overflow-auto">
      {data?.data?.results.map(p => {
        return <div className="card card-block col-md-2 mx-4" onMouseLeave={(e) => onLeaveChange(e)} onMouseEnter={(e) => onHoverChange(e)}>
        <Link to={`/movies/${p.id}`}><img src={`https://image.tmdb.org/t/p/w500/${p.poster_path}`}  className={`card-img-top ${p.id}`} alt="..."  /></Link>
        <div className="card-body">
          <p className="card-title">{p.title}</p>
          <p className="card-text">{p.release_date}</p>
          {(localStorage.getItem('user') && 
          <div className="profile-action">
            <LikeButton className="d-none" name="likeButton" type="checkbox" id={p.id} onChange={(e) => addFilmListHandler(e)}/>
            <label className="btn btn-flat border border-dark m-1 w-75" htmlFor={p.id}><b>favorite </b> <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            </svg></label>
            <WatchedButton className="d-none" name="watchedButton" type="checkbox" id={p.id + 'watch'} onChange={(e) => addFilmListHandler(e)}/> 
            <label className="btn btn-flat border border-dark m-1 w-75" htmlFor={p.id + 'watch'}><b>watched </b><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
            </svg></label>
          </div>
          )}
        </div>
      </div>
      
      })}
      </div>
      </Container>
      <br />
    <Container>
    <h3 className="text-center text-secondary">T r e n d i n g M o v i e s</h3>
    <div className="btn-group m-3" role="group" aria-label="Basic example">
      <button type="button" name="Today" className="btn btn-secondary" onClick={(e) => timeHandler(e)}>Today</button>
      <button type="button" name="Last-Week" className="btn btn-secondary" onClick={(e) => timeHandler(e)}>Last Week</button>
    </div>
    <div className="d-flex flex-row flex-nowrap overflow-auto">
      {trendingData.data?.data?.results.map(p => {
        return <div className="card card-block col-md-2 mx-4" id="home-block">
        <Link to={`/movies/${p.id}`}><img src={`https://image.tmdb.org/t/p/w500/${p.poster_path}`} className="card-img-top" alt="..."/></Link>
        <div className="card-body">
          <p className="card-title">{p.title}</p>
          <p className="card-text">{p.release_date}</p>
        </div>
      </div>
      
      })}
      </div>
    </Container>
  </>


}

export {Home};

