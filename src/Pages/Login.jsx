import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../Components/Header/Header";
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap"
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import Swal from 'sweetalert2'
import axios from "axios";







function LoginForm() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [error, seterror] = useState("")
  const { Login, signInWithGoogle, signInWithFacebook } = useContext(AuthContext);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    seterror("")
    try {
      await Login(email, password).then((result) => {
        if (result) {
          axios.post('http://localhost:5000/jwt', {
            userID: result.user.uid,
            username: result.user.displayName,
            usermailID: result.user.email,
            userRole: "student"
          })
            .then(data => {
              localStorage.setItem('access-token', data.data.token)
            })
        }
        else {
          localStorage.removeItem('access-token')
        }
      });
      navigate(from, { replace: true })
    }
    catch (err) {
      e.target.reset()
      seterror(err.message)

    }
  };


  const handleGoogleSignIn = async () => {
    seterror("")
    try {
      await signInWithGoogle().then((result) => {
        console.log(result)
        fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            userID: result.user.uid,
            username: result.user.displayName,
            usermailID: result.user.email,
            userRole: "student"
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if (data.insertedId || data.userID) {
              axios.post('http://localhost:5000/jwt', {
                userID: data.userID,
                username: data.username,
                usermailID: data.usermailID,
                userRole: data.userRole
              })
                .then(data => {
                  localStorage.setItem('access-token', data.data.token)
                })
            }
            else {
              localStorage.removeItem('access-token')
            }
          })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Welcome to Music WareHouse`,
            showConfirmButton: true,
            timer: 1500
          })
        navigate(from, { replace: true })
      })
    }
    catch (err) {
      seterror(err.message)
    }
  }

  const handleFacebookSignIn = async () => {
    seterror("")
    try {
      await signInWithFacebook()
      navigate(from, { replace: true })
    }
    catch (err) {
      seterror(err.message)

    }
  }


  // fetch('http://localhost:5000/student', {
  //   method: 'POST',
  //   headers: {
  //     'content-type': 'application/json'
  //   },
  //   body: JSON.stringify({
  //     userID: user.uid,
  //     username: user.displayName,
  //     usermailID: user.email,
  //     userRole: "student"
  //   })
  // })
  //   .then(res => res.json())
  //   .then(data => {
  //     if (data.insertedId) {
  //       console.log("hello working")
  //       Swal.fire({
  //         position: 'top-end',
  //         icon: 'success',
  //         title: 'User created successfully.',
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //       navigate(from, { replace: true })
  //     }
  //   })









  return (
    <>  <Header />
      <div className="container container-width ">
        <div className="row min-vh-100 justify-content-center align-items-center">


          <div className="col-12 formContainer card bg-dark">

            <h1 className="text-center text-white">Login Here</h1>
            {error && <Alert className="alert-danger" varient="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setemail(e.target.value) }} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control type="password" placeholder="Password" onChange={(e) => { setpassword(e.target.value) }} />
              </Form.Group>
              <Button className="w-100 loginbutton" variant="primary" type="submit">
                Login
              </Button>
            </Form>
            <div className="row">
              <div className="col-md-6">
                <Button className="w-100 mt-2 " variant="success" onClick={handleGoogleSignIn}>
                  <i className="fa-brands fa-google"></i>
                </Button>
              </div>
              <div className="col-md-6">
                <Button className="w-100 mt-2 " variant="success" onClick={handleFacebookSignIn}>
                  <i className="fa-brands fa-facebook"></i>
                </Button>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <span className="text-center text-white"> Dont Have an Account? </span>
                <Link to="/register">Create here</Link>
              </div>


            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default LoginForm;

