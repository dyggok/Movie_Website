import { useState, useEffect} from "react"
import { Container, Row, Col } from "react-bootstrap"
import {store} from '../reduxStore/index'

function ProfilePage(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [seenMovie, setSeenMovie] = useState(user[0]?.seenList?.seenFilms.filter(({movieId: seenId}) => !user[0]?.favorites?.favoriteFilms.some(({movieId: favId}) => favId == seenId)).map(s => ({...s, action: "watched"})));
  const [favMovie, setFavMovie] = useState(user[0]?.favorites?.favoriteFilms.filter(({movieId: favId}) => !user[0]?.seenList?.seenFilms.some(({movieId: seenId}) => favId == seenId)).map(f => ({...f, action: "fav"})));
  const [duplicate, setDuplicate] = useState(user[0]?.seenList?.seenFilms.filter(({movieId: seenId}) => user[0]?.favorites?.favoriteFilms.some(({movieId: favId}) => favId == seenId)).map(d => ({...d, action: "duplicate"})));
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const {theme} = props;

  useEffect(() => {
    setTimeout(() => {
      setTable(seenMovie.concat(favMovie, duplicate));
      setLoading(false)}, 500)
  }, [])

  function renderAction(s){
    console.log(s)
    if(s.action == 'watched'){
      return <><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#fda403" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
      <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
      </svg> <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="grey" className="bi bi-heart-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
      </svg> 
      </>
    }else if(s.action == 'fav'){
      return <><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="grey" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
      <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
      </svg> <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#c51350" className="bi bi-heart-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
      </svg> 
      </>
    }else if(s.action == 'duplicate'){
      return <><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#fda403" className="bi bi-bookmark-fill" viewBox="0 0 16 16">
      <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
      </svg> <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="#c51350" className="bi bi-heart-fill" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
      </svg> 
      </>
    }
  }

  function optionHandler(e){
    if(e.target.value == 'fav'){
      setTable(user[0]?.favorites?.favoriteFilms.filter(({movieId: favId}) => !user[0]?.seenList?.seenFilms.some(({movieId: seenId}) => favId == seenId)).map(f => ({...f, action: "fav"})))
    }else if(e.target.value == 'watched'){
      setTable(user[0]?.seenList?.seenFilms.filter(({movieId: seenId}) => !user[0]?.favorites?.favoriteFilms.some(({movieId: favId}) => favId == seenId)).map(s => ({...s, action: "watched"})))
    }else if(e.target.value == 'all list'){
      setTable(seenMovie.concat(favMovie, duplicate));
    }
  }

  function renderActList(s){
    return <>
      <td>{s.movieId}</td>
      <td>{s.title}</td>
      <td>{s.genre.map(g => <ul className="list-group list-group-horizontal">{g.name}</ul>)}</td>
     <td>
       {renderAction(s)}
     </td>
      
    </>
  }
  if(loading){
    return <h1 className="m-5">Loading..</h1>
  }
  return <>
  <Container>
    {user.map(u => 
          <div class="card my-5">
          <div class={`card-body ${theme.backgroundColor} ${theme.color}`}>
            <Row>
            <Col md="auto">
            <img className="rounded-circle" src={u.avatarUrl} alt="" />
            </Col>
            <Col>
            <h3 class="card-title">{u.username}</h3>
            <p class="card-text"><b>Join Date:</b> {u.joinDate}</p>
            <p class="card-text"><b>twitter:</b> {u.socials.twitter}</p>
            <p class="card-text"><b>instagram:</b> {u.socials.instagram}</p>
            </Col>
            </Row>
          </div>
        </div>
        )}
  </Container>
  <Container>
    <div className="col-md-4 my-5">
    <h3>Filter By</h3>
    <select class="form-select" onChange={(e) => optionHandler(e)} >
      <option value="all list" selected>all list</option>
      <option value="fav">favorites</option>
      <option value="watched">seenlist</option>
    </select>
    </div>
  </Container>
  <Container>
    <table className={`table my-5  ${theme.backgroundColor} ${theme.color}`}>
  <thead>
    <tr>
      <th scope="col">Film ID</th>
      <th scope="col">Film Title</th>
      <th scope="col">Film Genre</th>
      <th scope="col">User Action</th>
    </tr>
  </thead>
  <tbody>
    {((table!==null && loading == false) && table?.map(t => { 
      return <tr>
        {renderActList(t)}
      </tr>
    }))}
  </tbody>
</table>
</Container>
  </>
}

export {ProfilePage}