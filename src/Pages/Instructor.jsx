//image name email
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, Button, Spinner } from "react-bootstrap"

export default function Instructor() {

    const { data: instructor = [], refetch, isLoading } = useQuery(['instructor'], async () => {
        const res = await axios.get(`http://localhost:5000/users/instructor`)
        return res.data;
    })
    console.log(instructor)

    return (
        <>

            <div className="container">
                <h1 className="text-center">Our Instructors</h1>
                <div className="row row-col-md-5">
                    {
                        isLoading && <div className="spinnercontainer"><Spinner animation="border" variant="primary" size="lg" /></div>
                    }
                    {
                        instructor ?
                            instructor.map((singleInstructor, index) =>

                                <div className="col">
                                    <Card>
                                        <div className="cardimagewrapper">
                                            <Card.Img variant="top" src={singleInstructor.userPhotoUrl ? singleInstructor.userPhotoUrl : "https://i.ibb.co/kXCt4Pd/avatar-1577909-960-720.webp"} />
                                        </div>
                                        <Card.Body>
                                            <Card.Title>{singleInstructor.username}</Card.Title>
                                            <Card.Text>
                                                <span className="fw-bold">Email Id :</span><br />{singleInstructor.usermailID}
                                            </Card.Text>
                                            <Button variant="primary">View Classes</Button>
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