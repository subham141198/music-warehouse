
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import Table from 'react-bootstrap/Table'
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useContext } from "react";


export default function AllUsers() {
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get('/users')
        return res.data;
    })

    const { user } = useContext(AuthContext)
    const currentUser = user;
    const handleMakeAdmin = user => {
        fetch(`http://localhost:5000/users/admin/${user.userID}`, {
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
                        title: `${user.username} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }
    const handleMakeInstructor = user => {
        fetch(`http://localhost:5000/users/instructor/${user.userID}`, {
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
                        title: `${user.username} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
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
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => <tr key={user.userID}>
                            <th>{index + 1}</th>
                            <td>{user.username}</td>
                            <td>{user.usermailID}</td>
                            <td>{user.userRole}</td>

                            <td>{
                                currentUser.uid != user.userID ?
                                    user.userRole === "student" ? <><button className="btn btn-primary me-3" onClick={() => { handleMakeAdmin(user) }}><i className="fa-solid fa-lock"></i> Make Admin</button><button className="btn btn-primary" onClick={() => { handleMakeInstructor(user) }}><i className="fa-solid fa-chalkboard-user"></i> Make Instructor</button></> :
                                        user.userRole === "instructor" ? <button className="btn btn-primary" onClick={() => { handleMakeAdmin(user) }}><i className="fa-solid fa-lock"></i> Make Admin</button> : <button className="btn btn-primary" onClick={() => { handleMakeInstructor(user) }}><i className="fa-solid fa-chalkboard-user"></i> Make Instructor</button> : ""
                            }</td>

                        </tr>)
                    }
                </tbody>
            </Table>
        </>
    );
}