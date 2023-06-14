/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import Spinner from 'react-bootstrap/Spinner';
import useAdmin from "../hooks/useAdmin";
import useInstructor from "../hooks/useInstructor";
const ProtectedRoute = ({ children }) => {
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <>
        <div className="row vh-100 justify-content-center align-items-center"><Spinner animation="border" variant="primary" size="lg"/></div>
      </>
    );
  }
  if ((user && !isAdmin) || (user && !isInstructor)) {
    return children;
  }
  return <Navigate state={{ from: location }} to="/login" replace/>;
};
export default ProtectedRoute;
