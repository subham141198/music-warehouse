import React from "react";
import CountUp from "react-countup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ScrollTrigger from "react-scroll-trigger";
import { useState,useEffect } from "react";
import "./Counter.css";
import axios from "axios";

const Counter = () => {
  const [counterOn, setCounterOn] = useState(false);
  const [classesCount, setclassesCount] = useState(0)
  const [studentCount, setstudentCount] = useState(0)
  const [instructorCount, setinstructorCount] = useState(0)

  useEffect(() => {
    axios.get("http://localhost:5000/studentcount").then(data => setclassesCount(data.data.studentCount))
    axios.get("http://localhost:5000/instructorcount").then(data => setstudentCount(data.data.instructorCount))
    axios.get("http://localhost:5000/classescount").then(data => setinstructorCount(data.data.classCount))

  }, [])

  return (
    <>
      <ScrollTrigger
        onEnter={() => setCounterOn(true)}
        onExit={() => setCounterOn(false)}
      >
        <div className="container">
          <div className="row row-cols-sm-3 ">
            <div className="col col d-flex justify-content-center">
              <Card className="rounded-circle square-card">
                <Card.Body className="inside-content">
                  <p className="counter-value">
                    {counterOn && (
                      <CountUp start={0} end={classesCount} duration={2} delay={0} />
                    )}
                  </p>
                </Card.Body>
              </Card>
            </div>
            <div className="col col d-flex justify-content-center">
              <Card className="rounded-circle square-card">
                <Card.Body className="inside-content">
                  <p className="counter-value">
                    {counterOn && (
                      <CountUp start={0} end={studentCount} duration={2} delay={0} />
                    )}
                  </p>
                </Card.Body>
              </Card>
            </div>
            <div className="col d-flex justify-content-center">
              <Card className="rounded-circle square-card">
                <Card.Body className="inside-content">
                  <p className="counter-value">
                    {counterOn && (
                      <CountUp start={0} end={instructorCount} duration={2} delay={0} />
                    )}
                  </p>
                </Card.Body>
              </Card>
            </div>

          </div>
        </div>
      </ScrollTrigger>
    </>
  );
};

export default Counter;
