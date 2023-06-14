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
import Counter from '../Components/Counter/Counter'




function Home() {

  return (
    <>
      <Banner></Banner>
        <Counter></Counter>
      <Comments></Comments>
    </>
  );

}

export default Home;
