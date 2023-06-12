import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ChefNavbar from "../Components/Header/Header";
import { Alert,FloatingLabel } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import { updateProfile } from "firebase/auth";
import Swal from 'sweetalert2'


function RegisterForm() {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [image, setimage] = useState("")
  const [error, seterror] = useState("")
  const [makingImgURL, setmakingImgURL] = useState(false)
  const { SignUp } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleImage = async (e) => {
    setmakingImgURL(true)
    const formData = new FormData();
    formData.append('image', e.target.files[0])
    fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_TOKEN}`, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(imgResponse => {
        if (imgResponse.success) {
          const imgURL = imgResponse.data.display_url;
          setimage(imgURL)
          setmakingImgURL(false)
        }
      })
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror("")
    try {
      await SignUp(email, password)
        .then((result) => {
          const user = result.user
          updateProfile(user, {
            photoURL: image,
            displayName: name
          })
          console.log(result)
          fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              userID: result.user.uid,
              username: name,
              usermailID: result.user.email,
              userPhotoUrl: image,
              userRole: "student"
            })
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
              if (data.insertedId) {
                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: `${name} has been registered`,
                  showConfirmButton: true,
                  timer: 1500
                })
              }
              else {
                Swal.fire({
                  position: 'top-end',
                  icon: 'error',
                  title: `There is come error in registering user`,
                  showConfirmButton: true,
                  timer: 1500
                })
              }
            })
        });
      navigate("/")
    }
    catch (err) {
      e.target.reset()
      seterror(err.message)
    }
  };
  return (
    <>
      <div className="container container-width">
        <div className="row min-vh-100 justify-content-center align-items-center">
          <div className="col-12 formContainer">
            <h1 className="text-center">Register Here</h1>
            {error && <Alert varient="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-3" controlId="formBasic">
                <FloatingLabel
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control type="text" placeholder="Enter your Name" onChange={(e) => { setname(e.target.value) }} />
                </FloatingLabel>

                <FloatingLabel
                  label="Email"
                  className="mb-3"
                >
                  <Form.Control type="email" placeholder="Enter email" onChange={(e) => { setemail(e.target.value) }} />
                </FloatingLabel>
                <FloatingLabel
                  label="Password"
                  className="mb-3"
                >
                  <Form.Control type="password" placeholder="Password" onChange={(e) => { setpassword(e.target.value) }} />
                </FloatingLabel>
                <Form.Control type="file" onChange={handleImage} />
              </Form.Group>
              <Button className="w-100" variant="primary" type="submit" disabled={makingImgURL}>
                Register
              </Button>
            </Form>

            <span className="text-center">Already Have an account </span>
            <Link to="/login">Login here</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
