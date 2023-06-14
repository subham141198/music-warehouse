import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Table from 'react-bootstrap/Table'
import axios from "axios";
function mySelectedClasses(){
    const { user } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure();
    const { data: selectedClasses = [], refetch, isLoading } = useQuery(['selectedClasses'], async () => {
        const res = await axiosSecure.get(`/users/student/selectedclass/${user.uid}`)
        return res.data;
    })

    console.log(selectedClasses)

    function handlePurchase()
    {
            
    }

    return(
        <>
            <Table striped bordered hover size="sm">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Class Name</th>
                        <th scope="col">Class Image</th>
                        <th scope="col">Instructor Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        selectedClasses.map((selectedClass, index) => <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{selectedClass.className}</td>
                            <td> <img width={50} className="img-fluid" src={selectedClass.classImage} alt="" /></td>
                            <td>{selectedClass.instructorName}</td>
                            <td><button className="btn btn-primary" onClick={handlePurchase}>Buy the class</button></td>

                        </tr>)
                    }
                </tbody>
            </Table>
        </>
    );
}
export default mySelectedClasses