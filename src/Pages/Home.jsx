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
import Comments from '../Components/Comments/Comments'




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
      <Comments></Comments>



    </>
  );

}

export default Home;
