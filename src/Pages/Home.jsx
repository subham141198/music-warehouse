import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Button, Container, Modal, Row, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Spinner from 'react-bootstrap/Spinner';
import ReactStars from "react-rating-stars-component";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from "react-router-dom";
import Banner from '../Components/Banner/Banner';




function Home() {
  const [loadingdata, setloadingdata] = useState(false)
  const [alltoys, setalltoys] = useState([])
  const [activeTab, setActiveTab] = useState("all")
  const [categoryToys, setcategoryToys] = useState([])
  const [modalShow, setModalShow] = useState(false);
  let allcategory = [];


  useEffect(() => {
    setloadingdata(true);
    fetch(`https://toyserver-debabratachakraborty880-gmailcom.vercel.app/alltoys`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setalltoys(data);
        setloadingdata(false);
      })
      .catch((error) => {
        setloadingdata(false);
      });
  }, []);


  useEffect(() => {
    setloadingdata(true);
    const url = `https://toyserver-debabratachakraborty880-gmailcom.vercel.app/categorytoys/${activeTab}`
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setcategoryToys(data);
        setloadingdata(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        setloadingdata(false);

      });
  }, [activeTab]);

  alltoys.map(alltoy => (
    allcategory = allcategory.includes(alltoy.category) ? [...allcategory] : [...allcategory, alltoy.category]
  ))
  return (
    <>
      <Banner></Banner>
      {/* {
        <Container>
          <h1 className="p-4 text-center ">Shop By Category</h1>
          <Tabs defaultActiveKey={allcategory[0]} id="fill-tab-example" className="mb-3" fill onClick={(e) => { console.log(e); setActiveTab(e.target.innerText.toLowerCase()) }}
          >
            {
              allcategory.map((category, index) => (
                <Tab key={index} eventKey={category} title={category.charAt(0).toUpperCase() + category.slice(1)} >
                  <div className="row row-cols-lg-5">
                    {loadingdata ? <div className="row  justify-content-center align-items-center"><Spinner animation="border" variant="primary" size="lg" /></div> :
                      <>
                        {categoryToys.map((singleToy, index) => (

                          <div className="col" key={index}>
                            <Card  >
                              <Card.Img height={300} variant="top" src={singleToy.imageurl} />
                              <Card.Body>
                                <Card.Title>{singleToy.toyName}</Card.Title>
                                <ReactStars count={5} edit={false} value={parseInt(singleToy.rating)} size={24} activeColor="#ffd700"
                                />
                                <Link className="btn btn-outline-primary" to="/view" state={singleToy} >View Detail</Link>
                              </Card.Body>
                            </Card>
                          </div>
                        ))}
                      </>
                    }
                  </div>
                </Tab>
              ))
            }
          </Tabs>
        </Container>
      }
      <hr />
      <h2 className="p-4 text-center" >Gallery</h2>
      <Container>
        <div className="row">
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <Card>
                  <Card.Img height={300} width={200} variant="top" src="https://i.ibb.co/PxcHKd8/Screenshot-2023-05-21-162927.png" />
                </Card>
              </div>
              <div className="col-6">
                <Card>
                  <Card.Img height={300} width={200} variant="top" src="https://i.ibb.co/VtBrMK9/Screenshot-2023-05-21-163127.png" />
                </Card>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <Card>
                  <Card.Img height={300} width={200} variant="top" src="https://i.ibb.co/0t3nHdv/6795656-R-SET.jpg" />
                </Card>
              </div>
              <div className="col-6">
                <Card>
                  <Card.Img height={300} width={200} variant="top" src="https://i.ibb.co/WFhs1Sx/Mc-Farlane-Toys-DC-Multiverse-January-2023-Featured-01.webp" />
                </Card>
              </div>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-center flex-column border-start ">
            <h1 className="text-center">Fasinating Toys</h1>
            <p className="text-center">An action figure is a poseable character model figure made most commonly of plastic, and often based upon characters from a film, comic book, military, video game or television program; fictional or historical.</p>
          </div>
        </div>
      </Container> */}
      <hr />
      <Footer></Footer>

    </>
  );

}

export default Home;
