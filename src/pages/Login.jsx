import { useContext, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../reduxStore/userAction";
import { store } from "../reduxStore";
import { useNavigate } from "react-router";
import { Alert } from "bootstrap";
import { isLogin } from "../reduxStore/userAction";

function Login(props){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();

  function loginHandler(e){
    e.preventDefault();
    dispatch(login(username, password))
    try{
      if(store.getState().user[0].username == username){
      navigate('/')}
    }catch{
      return <div class="alert alert-warning" role="alert">
            This is a warning alert—check it out!
            </div>
    }
  }

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  return <>
  <Container>
    <Row>
    <div className="card col-md-4 mx-auto my-5">
      <form className="m-5" onSubmit={(e) => loginHandler(e)}>
        <h3 className="my-5 text-center">Login</h3>
        <div className="form-group" >
          <label htmlFor="exampleInputEmail1" className="my-2">Email address</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={(e) => onChangeUsername(e)}/>
        </div>
        <div className="form-group ">
          <label htmlFor="exampleInputPassword1" className="my-2">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={(e) => onChangePassword(e)}/>
        </div>
        <button type="submit" className="btn btn-secondary my-3">Submit</button>
      </form>
    </div>

    </Row>
  </Container>
  </>
}

export {Login};