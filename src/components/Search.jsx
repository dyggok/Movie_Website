import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { BASE_URL, api_key} from "../api"
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router";
import { Col, Row, Container } from "react-bootstrap";
import { Paginate } from ".";
import { Link } from "react-router-dom";
const List = styled.ul`
  position: absolute;
  z-index: 999;
  margin-top: 38px;
`
function Search(props){
  const location = useLocation();
  const navigate = useNavigate();
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(5);
  const urlParams = new URLSearchParams(location.search);
  const [q, setQ] = useState(urlParams.get('query'));
  const [page, setPage] = useState(1)
  const [searchData, setSearchData] = useState([]);
  const [sample, setSample] = useState([])
  const [inputBoolean, setInputBoolean] = useState(false);
  const [query, setQuery] = useState("");
  const {theme, setThemeName} = props;
  
  function inputHandler(e){
    console.log(e.target.value)
    setSearchData([])
    setTimeout(() => {
      setQuery(e.target.value);
      setInputBoolean(true); 
    }, 2000)
  }
  function formHandler(event){
    setInputBoolean(false);
    event.preventDefault();
    setQ(event.target[1].value)
    navigate(`/search-movies?query=${event.target[1].value}`)
  }

  useEffect(() => {
    (query!=="" && 
      fetch(`${BASE_URL}/search/movie?query=${query}&api_key=${api_key}&page=${page}`)
      .then(res => res.json())
      .then(data => {
        setSearchData(searchData.concat(data?.results))
        if(page <= data?.total_pages){
          setPage(page + 1)
        }
      })
    
  )}, [query, page])
      
  useEffect(() => {
    ((location.pathname=='/search-movies' && q!=="") &&
    fetch(`${BASE_URL}/search/movie?query=${q}&api_key=${api_key}&page=${page}`)
      .then(res => res.json())
      .then(data => {
        setSearchData(searchData.concat(data?.results))
        if(page <= data?.total_pages){
          setPage(page + 1)
        }
      }))
  }, [location.pathname])

  return<>
  <form className="input-group w-50 mx-auto my-5" onSubmit={(e) => formHandler(e)}>
    <button className="input-group-text" type="submit" id="basic-addon1" >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path></svg>
      </button>
    <input type="text" className="form-control" onChange={(e) => inputHandler(e)} defaultValue={query}/>
    <List className="col-12 list-group">
      {((!!searchData && inputBoolean) && searchData.slice(0,10).map(s => <Link to={`/movies/${s.id}`}><li className="list-group-item">{s.title}</li></Link>))}
    </List>
  </form>
  {
   (location.pathname === '/search-movies' && <>
    <Container className="py-5">
    <h3 className="mb-5">Search Results: </h3>
     <Row> {
      searchData?.slice(offset, offset + perPage).map(s => {
      return <Col md={2} className="mx-auto">
      <div className={`card card-block h-100 ${theme.backgroundColor}`}>
        {(s.poster_path!==null && <Link to={`/movies/${s.id}`}><img src={`https://image.tmdb.org/t/p/w500/${s.poster_path}`} class="card-img-top" alt="..."/></Link>)}
        <div className={`card-body ${theme.color}`}>
          <p className="card-title">{s.title}</p>
        </div>
      </div>
      </Col>
   })}</Row>
   </Container>
   <br/>

   <Paginate searchData={searchData} setSearchData={setSearchData} offset={offset} setOffset={setOffset} perPage={perPage}/>
   </>
   )
  }
  
  </>}

export {Search}