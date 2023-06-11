import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from "sweetalert2";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useContext, useState } from "react";
import { Button, Row, Col, FloatingLabel, Card, Spinner, Form } from "react-bootstrap";

const AddClass = () => {
    const [addingClass, setaddingClass] = useState(false)
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_TOKEN}`

    const onSubmit = data => {
        setaddingClass(true)
        console.log(data)
        const formData = new FormData();
        formData.append('image', data.classImage[0])
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { className, classImage, instructorName, instructorEmail, classAvailableSeats, classPrice } = data;
                    const newItem = { className, classImage: imgURL, instructorName, instructorEmail, instructorID: user.uid, classAvailableSeats: parseInt(classAvailableSeats), classPrice: parseFloat(classPrice), approval: "pending" }
                    console.log(newItem)
                    axiosSecure.post('/class', newItem)
                        .then(data => {
                            console.log('after posting new menu item', data.data)
                            if (data.data.insertedId) {
                                setaddingClass()
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Item added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })
    };


    return (
        <section className="add-new-bg-img glossy-bg">
            <h1 className="text-center mt-3">Add Class Here</h1>
            <Row className="justify-content-center m-auto glossy-bg" style={{ width: "50%" }}>
                <Col>
                    <h1 className="text-center text-white p-3">Add New Toy</h1>
                    <Card.Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col>
                                    <FloatingLabel
                                        controlId="floatingClassName"
                                        label="Class Name"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            name="classname"
                                            size="lg"
                                            type="text"
                                            placeholder="Class Name"
                                            {...register("className", { required: true })}
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>

                                    <Form.Control
                                        name="classImage"
                                        size="lg"
                                        type="file"
                                        placeholder="Class Image"
                                        {...register("classImage", { required: true })}
                                    />

                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FloatingLabel
                                        controlId="floatingInstructorName"
                                        label="Instructor Name"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            name="instructorName"
                                            size="lg"
                                            type="text"
                                            value={user.displayName}
                                            placeholder="Instructor Name"
                                            {...register("instructorName", { required: true })}
                                        />
                                    </FloatingLabel>


                                    <FloatingLabel
                                        controlId="floatingEmail"
                                        label="Instructor Email"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            name="instructorEmail"
                                            size="lg"
                                            type="email"
                                            value={user.email}
                                            placeholder="Instructor Email"
                                            {...register("instructorEmail", { required: true })}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FloatingLabel
                                        controlId="floatingCategory"
                                        label="Available Seats"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            name="classAvailableSeats"
                                            size="lg"
                                            type="number"
                                            placeholder="Available Seats"
                                            {...register("classAvailableSeats", { required: true })}

                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col>
                                    <FloatingLabel
                                        controlId="floatingPrice"
                                        label="Price"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            name="classPrice"
                                            size="lg"
                                            type="number"
                                            placeholder="Price"
                                            {...register("classPrice", { required: true })}
                                        />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Button
                                    className="mb-3 px-3 rounded-bottom"
                                    type="submit"
                                    variant="outline-primary"
                                    disabled={addingClass ? "disabled" : ""}> {addingClass ? <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    /> :
                                        "Add Class"}
                                </Button>
                            </Row>
                        </Form>
                    </Card.Body>
                </Col>
            </Row>
        </section>
    );
};

export default AddClass;