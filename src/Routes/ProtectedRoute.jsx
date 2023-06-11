/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import Spinner from 'react-bootstrap/Spinner';
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <>
        <div className="row vh-100 justify-content-center align-items-center"><Spinner animation="border" variant="primary" size="lg"/></div>
      </>
    );
  }
  if (!user) {
    return <Navigate state={{ from: location }} to="/login" replace/>;
  }
  return children;
};
export default ProtectedRoute;
