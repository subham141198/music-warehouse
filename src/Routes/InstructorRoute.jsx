import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import useInstructor from "../hooks/useInstructor";
import Spinner from 'react-bootstrap/Spinner';


const InstructorRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isInstructor, isInstructorLoading] = useInstructor();
    const location = useLocation();

    if(loading || isInstructorLoading){
        return <div className="row vh-100 justify-content-center align-items-center"><Spinner animation="border" variant="primary" size="lg"/></div>
    }

    if (user && isInstructor) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default InstructorRoute;