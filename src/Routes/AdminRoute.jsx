import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import useAdmin from "../hooks/useAdmin";
import Spinner from 'react-bootstrap/Spinner';


const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <div className="row vh-100 justify-content-center align-items-center"><Spinner animation="border" variant="primary" size="lg"/></div>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default AdminRoute;