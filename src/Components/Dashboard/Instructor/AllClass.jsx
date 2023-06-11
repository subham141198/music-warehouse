import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Table from 'react-bootstrap/Table'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { Button, Modal,Spinner } from 'react-bootstrap';
import UpdateClassModal from "../../UpdateClassModal";
import Swal from "sweetalert2";


export default function AllClassOfInstructor() {

    const [updatingdata, setupdatingdata] = useState(false)
    const [modalShow, setModalShow] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_UPLOAD_TOKEN}`

    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], refetch, isLoading } = useQuery(['classes'], async () => {
        const res = await axiosSecure.get('/class/instructor')
        return res.data;
    })
    if(isLoading) return <Spinner animation="border" variant="primary" size="lg"/>


    const openModal = (singleClass) => {
        setSelectedClass(singleClass);
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
    }

    const handleClassUpdate = (data) => {
            setupdatingdata(true);
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
                    const { _id,className, classImage, instructorName, instructorEmail, classAvailableSeats, classPrice } = data;
                    const newItem = { className, classImage: imgURL, classAvailableSeats: parseInt(classAvailableSeats), classPrice: parseFloat(classPrice)}
                    console.log(newItem)
                    axiosSecure.put(`/class/instructor/${_id}`, newItem)
                        .then(data => {
                            console.log('after posting new menu item', data.data)
                            if (data.data.modifiedCount>0) {
                                setupdatingdata(false);
                                reset();
                                refetch();
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
        <>
            <Table striped bordered hover size="sm">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Class Name</th>
                        <th scope="col">Class Image</th>
                        <th scope="col">Class Price</th>
                        <th scope="col">Class Seact Availability</th>
                        <th scope="col">Status</th>
                        <th scope="col">Feedback</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        classes.map((eachClass, index) => <tr key={eachClass._id}>
                            <th>{index + 1}</th>
                            <td>{eachClass.className}</td>
                            <td> <img width={50} className="img-fluid" src={eachClass.classImage} /> </td>
                            <td>{eachClass.classPrice}</td>
                            <td>{eachClass.classAvailableSeats}</td>
                            <td>{eachClass.approval === "pending" && <button className="btn btn-warning" disabled><i class="fa-solid fa-triangle-exclamation"></i> Pending</button>}
                                {eachClass.approval === "accepted" && <button className="btn btn-success" disabled><i class="fa-solid fa-check"></i> Approved</button>}
                                {eachClass.approval === "rejected" && <button className="btn btn-danger" disabled><i class="fa-solid fa-ban"></i> Rejected</button>}
                            </td>
                            <td>{
                                eachClass.feedback ? eachClass.feedback : ""
                            }</td>
                            <td>{
                                <button className="btn btn-outline-primary" onClick={() => openModal(eachClass)}>Update</button>
                            }</td>

                        </tr>)
                    }
                    {
                            selectedClass && (

                                <UpdateClassModal
                                    updatingdata={updatingdata}
                                    show={modalShow}
                                    onHide={closeModal}
                                    singleClass={selectedClass}
                                    handleClassUpdate={handleClassUpdate}
                                />
                            )}
                </tbody>
            </Table>

        </>
    );
}