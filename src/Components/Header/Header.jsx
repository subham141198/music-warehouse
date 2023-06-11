import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar, NavDropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useContext } from "react";
import { Form, Button } from "react-bootstrap";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";



function Header(props) {
  const { user } = useContext(AuthContext);
  const { LogOut } = useContext(AuthContext);
  const location = useLocation();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();


  const navigate = useNavigate();

  const tooltip = (
    <Tooltip id="tooltip" placement="left">
      {user?.displayName || null}
    </Tooltip>
  );



  const handleLogout = () => {
    LogOut().then(() => {
      navigate("/");
      console.log("Signed out successfully")
    }).catch((error) => {
      console.log(error)
    });
  };

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/"><img
            src="https://i.ibb.co/TMq8PPy/Pngtree-cartoon-hand-drawn-toy-convenience-5781180.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          /></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-between">
            <Nav className="mr-auto"></Nav>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {user && !isAdmin && !isInstructor && <>
                <Nav.Link href="/new">Add a Toy</Nav.Link>
                <Nav.Link href="/mytoys">My Toys</Nav.Link>
              </>
              }
              {user && !isAdmin && !isInstructor &&
                <>
                  <NavDropdown title="Dashboard" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/all">All Users</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/allclassapproval">All Course</NavDropdown.Item>
                  </NavDropdown>
                </>
              }
              {user && isAdmin &&
                <>
                  <NavDropdown title="Dashboard" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/allusers">All Users</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/allclassapproval">All Course</NavDropdown.Item>
                  </NavDropdown>
                </>
              }
              {user && isInstructor &&
                <>
                  <NavDropdown title="Dashboard" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="/addclass">Add Class</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/allclasses">All Class</NavDropdown.Item>
                  </NavDropdown>
                </>
              }

            </Nav>
            <Nav className="mr-auto"></Nav>
            <Nav>
              {
                user ? <><NavDropdown title={<OverlayTrigger placement="left" overlay={tooltip}><img className="rounded-circle" src={user.photoURL} alt="Profile" width={35} /></OverlayTrigger>} id="collasible-nav-dropdown">
                  <NavDropdown.Item>{user.email}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Sign Out</NavDropdown.Item>
                </NavDropdown></>
                  : <Nav.Link href="/login">Login Here</Nav.Link>
              }
            </Nav>
            {
              location.pathname === '/alltoys' &&
              <>
                <Form onSubmit={(e) => props.handleSubmit(e)} className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(e) => props.setsearch(e.target.value.toLowerCase())}
                  />
                  <Button type="submit" variant="outline-success">Search</Button>
                </Form>
              </>
            }


          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
