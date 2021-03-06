import { Button, Col, Container, Row } from "react-bootstrap";
import { useQueries, useQuery} from "react-query";
import {fetchTopRatedMovies, BASE_URL, api_key} from "../../api"; 
import {Link} from "react-router-dom";
import {SortAndFilter} from "../../components"
import { useEffect, useState } from "react";
import Placeholder from 'react-bootstrap/Placeholder'

function TopRatedMovies(){
  const [page, setPage] = useState(1);
  const [playerData, setPlayerData] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortAction, setSortAction] = useState("")
  const [isSorting, setIsSorting] = useState(false)
  const [date, setDate] = useState([]);
  const [genres, setGenres] = useState([]);
  const [sample, setSample] = useState([])
  const [url, setUrl] = useState(`${BASE_URL}/movie/top_rated?api_key=${api_key}`)
  
  console.log(url)
  useEffect(() => {
    fetch(`${url}&page=${page}`)
    .then(res => res.json()).then(data => {
      setPlayerData(data?.results)
      setSample(data?.results)
    })
  }, [])

   useEffect(() => {
     fetch(`${url}&page=${page}`)
     .then(res => res.json()).then(data => {
       setPlayerData(playerData.concat(data?.results))
       setSample(sample.concat(data?.results))
     })
   }, [page])

   useEffect(() => {
     fetch(`${url}&page=${page}`)
     .then(res => res.json()).then(data => {
       setPlayerData(data?.results)
       setSample(sample.concat(data?.results));
     })
   }, [url])
  
   
  console.log(playerData)
  useEffect(() => {
    if(sortAction == 'Sort by A-Z'){
      setPlayerData(playerData.sort((a,b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase())))
      setIsSorting(false)
    }else if(sortAction == 'Sort by Z-A'){
      setPlayerData(playerData.sort((a,b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase())))
      setIsSorting(false)
    }else if(sortAction == 'Sort by Popularity Ascending'){
      setPlayerData(playerData.sort((a,b) => a.popularity - b.popularity))
      setIsSorting(false)
    }else if(sortAction == 'Sort by Popularity Descending'){
      setPlayerData(playerData.sort((a,b) => b.popularity - a.popularity))
      setIsSorting(false)
    }else if(sortAction == ""){
      setIsSorting(false)
    }
  }, [sortAction])

  function pageHandler(){
    setPage(page + 1)
  }

  return (isSorting == false && 
    <>
      <Col md={3} className="m-5">
        <SortAndFilter setSortAction={setSortAction} sortAction={sortAction} setIsSorting={setIsSorting} date={date} setDate={setDate} setGenres={setGenres} url={url} setUrl={setUrl}/>
      </Col>
      <Row>
      {playerData.map(item => {
          return<>
          <Col  md={2} key={item.id} >
          <div className="card col mt-3" >
          <Link to={`/movies/${item.id}`}><img src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} className="card-img-top" alt="poster"/></Link>
        </div>
        </Col>
        <Col></Col>
        </>
        })} 
         <Button onClick={
           () => {
            setPage(page + 1);
            }
           } className="btn-lg my-4 btn-secondary">Load More..</Button>
      </Row>
    </>
  )
  
}

export default TopRatedMovies