//image name instname seat price select
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, Button, Spinner, ListGroup } from "react-bootstrap"
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";

export default function Classes() {
    const [axiosSecure] = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const isAdmin = useAdmin();
    const isInstructor = useInstructor();
    const [selecting, setselecting] = useState(false)
    const [selectedButtons, setSelectedButtons] = useState([]);

    console.log(isAdmin, isInstructor)

    const { data: classes = [], refetch, isLoading } = useQuery(['classes'], async () => {
        const res = await axios.get(`http://localhost:5000/class/accepted`)
        return res.data;
    })
    console.log(classes)



    const handleSelectedClass = (singleClass,index) => {

        setSelectedButtons((prevState) => {
            const updatedButtons = [...prevState];
            updatedButtons[index] = true; // Activate the spinner for the selected button
            return updatedButtons;
        });
        setselecting(true)
        axiosSecure.put(`/student/selectedclass/${singleClass._id}`, { userID: user.uid })
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    setSelectedButtons((prevState) => {
                        const updatedButtons = [...prevState];
                        updatedButtons[index] = false; // Activate the spinner for the selected button
                        return updatedButtons;
                    });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `You have selected this class`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    setSelectedButtons((prevState) => {
                        const updatedButtons = [...prevState];
                        updatedButtons[index] = false; // Activate the spinner for the selected button
                        return updatedButtons;
                    });
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: `You have already selected this class`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }



    return (
        <>

            <div className="container">
                <h1 className="text-center">Classes Offered By Us</h1>
                <div className="row  row-col-sm-3">
                    {
                        isLoading && <div className="spinnercontainer"><Spinner animation="border" variant="primary" size="lg" /></div>
                    }
                    {
                        classes ?
                            classes.map((singleClass, index) =>

                                <div className="col" key={index}>
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
                                            <Button
                                                className="mb-3 px-3 rounded-bottom"
                                                type="submit"
                                                onClick={() => { handleSelectedClass(singleClass, index) }} // Pass the index to the handler
                                                variant="outline-primary"
                                                disabled={isAdmin || isInstructor || selectedButtons[index]}
                                            >
                                                {selectedButtons[index] ? (
                                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                                ) : (
                                                    "Select Class"
                                                )}
                                            </Button>
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