//image name instname seat price select
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, Button, Spinner, ListGroup } from "react-bootstrap"
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";

export default function Classes() {
    const  isAdmin  = useAdmin();
    const  isInstructor  = useInstructor();

    console.log(isAdmin,isInstructor)

    const { data: classes = [], refetch, isLoading } = useQuery(['classes'], async () => {
        const res = await axios.get(`http://localhost:5000/class/accepted`)
        return res.data;
    })
    console.log(classes)

    return (
        <>

            <div className="container">
                <h1 className="text-center">Classes Offered By Us</h1>
                <div className="row row-col-md-5">
                    {
                        isLoading && <div className="spinnercontainer"><Spinner animation="border" variant="primary" size="lg" /></div>
                    }
                    {
                        classes ?
                            classes.map((singleClass, index) =>

                                <div className="col">
                                    <Card>
                                        <div className="cardimagewrapper">
                                            <Card.Img className="img-fluid" variant="top" src={singleClass.classImage ? singleClass.classImage : "https://i.ibb.co/kXCt4Pd/avatar-1577909-960-720.webp"} />
                                        </div>
                                        <Card.Header><h1>{singleClass.className}</h1></Card.Header>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item><span className="fw-bold"> Instructor Name: </span>{singleClass.instructorName}</ListGroup.Item>
                                            <ListGroup.Item><span className="fw-bold"> Available Seats: </span> {singleClass.classAvailableSeats}</ListGroup.Item>
                                            <ListGroup.Item><span className="fw-bold"> Price: </span>{singleClass.classPrice}</ListGroup.Item>
                                        </ListGroup>

                                        <Card.Body>

                                                <Button variant="primary" {...isAdmin && "disabled"}>View Classes</Button>

                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                            : <div className="min-vh-100 d-flex justify-content-center align-items-center"><p className="text-center">No Instrutors Yet</p></div>
                    }
                </div>
            </div>
        </>
    );
}