import React from "react";
import CountUp from "react-countup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ScrollTrigger from "react-scroll-trigger";
import { useState } from "react";
import "./Counter.css";

const Counter = () => {
  const [counterOn, setCounterOn] = useState(false);

  return (
    <>
      <ScrollTrigger
        onEnter={() => setCounterOn(true)}
        onExit={() => setCounterOn(false)}
      >
        <div className="count">
          <Card style={{ width: "18rem" }}>
            <h1>
              {counterOn && (
                <CountUp start={0} end={100} duration={2} delay={0} />
              )}
              +
            </h1>
            <Card.Body>
              <h1>Student</h1>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <h1>
              {counterOn && (
                <CountUp start={0} end={100} duration={2} delay={0} />
              )}
              +
            </h1>
            <Card.Body>
              <h1>Instructor</h1>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <h1>
              {counterOn && (
                <CountUp start={0} end={100} duration={2} delay={0} />
              )}
              +
            </h1>
            <Card.Body>
              <h1>Courses</h1>
            </Card.Body>
          </Card>
        </div>
      </ScrollTrigger>
    </>
  );
};

export default Counter;
