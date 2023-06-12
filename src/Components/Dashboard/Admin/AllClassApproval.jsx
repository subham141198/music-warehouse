import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import {Table, Alert,Spinner} from 'react-bootstrap'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useContext } from "react";


export default function AllClassApproval() {
    const [axiosSecure] = useAxiosSecure();
    const { data: classes = [], refetch, isLoading } = useQuery(['classes'], async () => {
        const res = await axiosSecure.get('/class/admin')
        return res.data;
    })
    console.log(classes);

    // const { user } = useContext(AuthContext)
    // const currentUser = user;
    const handleapprove = singleClass => {
        fetch(`http://localhost:5000/class/admin/${singleClass._id}`, {
            method: 'PATCH'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${singleClass.className} has been approved`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handlereject = singleClass => {
        Swal.fire({
            title: 'Submit Your Feedback Here',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Send Feedback',
            showLoaderOnConfirm: true,
            preConfirm: async (feedbackMsg) => {
                try {

                    await axiosSecure.put(`/class/admin/${singleClass._id}`, { adminFeedback: `${feedbackMsg}` }).then((response) => {
                        if (!response) {
                            throw new Error(response.statusText)
                        }
                        return response
                    });
                } catch (error) {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    );
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            console.log(result)
            if (result.isConfirmed) {
                refetch();
                Swal.fire({
                    title: `Feedback Sent`,
                })
            }
        })
    }
    return (
        <>
            <Table striped bordered hover size="sm">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">ClassName</th>
                        <th scope="col">Instructor Name</th>
                        <th scope="col">Instructor Email</th>
                        <th scope="col">Class Image</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                {isLoading && <td><Spinner animation="border" variant="primary" size="lg"/></td>}
                    {   classes ?
                        classes.map((eachClass, index) => <tr key={eachClass._id}>
                            <th>{index + 1}</th>
                            <td>{eachClass.className}</td>
                            <td>{eachClass.instructorName}</td>
                            <td>{eachClass.instructorEmail}</td>
                            <td> <img width={50} className="img-fluid" src={eachClass.classImage} /> </td>

                            <td>{
                                eachClass.approval === "pending" ?
                                    <><button className="btn btn-outline-success me-3" onClick={() => { handleapprove(eachClass) }} ><i className="fa-solid fa-thumbs-up fa-bounce"></i> Approve</button><button className="btn btn-outline-danger me-3" onClick={() => { handlereject(eachClass) }}><i className="fa-solid fa-ban fa-bounce"></i> Reject</button></> : (eachClass.approval === "accepted" && <Alert variant="success">Accepted</Alert>) || (eachClass.approval === "rejected" && <Alert variant="danger">Rejected</Alert>)

                            }</td>
                        </tr>)
                    : <p className="text-center">No User Found</p>}
                </tbody>
            </Table>
        </>
    );
}