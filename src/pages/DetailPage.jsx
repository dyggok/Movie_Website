import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router"
import styled from "styled-components";
import { fetchDetail, fetchRecommendations, fetchReviews, fetchSingleMovieCredits } from "../api";
import { Link } from "react-router-dom";
import "../index.css";

const Text = styled.p`
  font-size: 12px;
`
function DetailPage(props){
  const {movieId} = useParams();
  const {data} = useQuery(["details", movieId], () => fetchDetail(movieId));
  const cast = useQuery(["cast", movieId], () => fetchSingleMovieCredits(movieId));
  const recommendations = useQuery(["reData", movieId], () => fetchRecommendations(movieId));
  const reviews = useQuery(["review", movieId], () => fetchReviews(movieId));
  console.log(reviews)
  return <>
  <Container className="my-5">
    
    <Row className="d-flex">
      <Col md="auto">
      <img src={`https://image.tmdb.org/t/p/w400/${data?.data.poster_path}`} alt="poster" />
      </Col>
      <Col>
        <h3>{data?.data.title}</h3>
        <ul className="list-unstyled">
          <li className="my-3">
            <ul className="list-group list-group-horizontal">
              {data?.data?.genres.map(g => <li className="list-group-item">{g.name}</li>)}
            </ul>
          </li>
          <li className="my-3">Release Date: {data?.data?.release_date}</li>
          <li className="my-3">Director: {cast?.data?.data?.crew.filter(c => c.job == 'Director')[0].name}</li>
          <li className="my-3">Description: {data?.data?.overview}</li>
        </ul>
        <h5 className="my-3">Cast</h5>
        <div className="d-flex flex-row flex-nowrap overflow-auto">
      {cast?.data?.data?.cast.slice(0,15).map(c => {
        return <div class="card card-block col-md-2" >
        {(c.profile_path!==null && <img src={`https://image.tmdb.org/t/p/w500/${c.profile_path}`} className="card-img-top" alt="cast"/>)}
        <Text className="text-center my-1">{c.name} as {c.character}</Text>
      </div>    
      })}
      </div>
      </Col>
    </Row>
    <br />
    <Row>
      <Col className="my-5">
      <h3>Reviews</h3>
      {reviews.data?.data?.results.slice(0,1).map(s => 
          <div class="card">
          <div class="card-body">
            <Row>
            <Col md="auto">
            <img className="rounded-circle" src={`${s.author_details.avatar_path.slice(1)}`} alt="" />
            </Col>
            <Col>
            <h5 class="card-title">{s.author}</h5>
            <p class="card-text">{s.content.substring(0,400)}..</p>
            </Col>
            </Row>
          </div>
        </div>
        )}
      </Col>
      <Col className="my-5" md={7}>
      <h3>Recommendations</h3>
    <div className="d-flex flex-row flex-nowrap overflow-auto">
      {recommendations.data?.data?.results.map(r => {
        return <div class="card card-block col-md-2" >
        {(r.poster_path!==null && <Link to={`/movies/${r.id}`}><img src={`https://image.tmdb.org/t/p/w500/${r.poster_path}`} className="card-img-top" alt="cast"/></Link>)}
        <Text className="text-center my-1">{r.title} </Text>
      </div>    
      })}
      </div>
      </Col>
    </Row>
  </Container>
  </>
  
}

export {DetailPage}