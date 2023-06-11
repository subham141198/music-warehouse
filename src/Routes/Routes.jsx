import {
  createBrowserRouter,
} from "react-router-dom";

import LoginForm from "../Pages/Login";
import RegisterForm from "../Pages/Register";
import { HelmetProvider } from 'react-helmet-async';
import Main from "../Template/Main";
import Blog from "../Pages/Blog";
import AdminRoute from "./AdminRoute";
import Homepage from "../Pages/Home";
import AllUser from "../Components/Dashboard/Admin/AllUser";
import AddClass from "../Components/Dashboard/Instructor/AddClass";
import InstructorRoute from "./InstructorRoute";
import AllClassApproval from "../Components/Dashboard/Admin/AllClassApproval";
import AllClassOfInstructor from "../Components/Dashboard/Instructor/AllClass";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/register",
        element: <RegisterForm />,
      },
      {
        path: "allusers",
        element : <AdminRoute><AllUser></AllUser></AdminRoute>
      },
      {
        path: "allclassapproval",
        element : <AdminRoute><AllClassApproval></AllClassApproval></AdminRoute>
      },
      {
        path: "addclass",
        element : <InstructorRoute><AddClass></AddClass></InstructorRoute>
      },
      {
        path: "allclasses",
        element : <InstructorRoute><AllClassOfInstructor></AllClassOfInstructor></InstructorRoute>
      }
    ]
  }
  // {
  //   path: 'dashboard',
  //   element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
  //   children: [
  //     {
  //       path: 'mycart',
  //       element: <MyCart></MyCart>
  //     },
  //     {
  //       path: 'payment',
  //       element: <Payment></Payment>
  //     },
  //     // admin routes
  //     {
  //       path: 'allusers',
  //       element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
  //     },
  //     {
  //       path: 'addItem',
  //       element: <AdminRoute><AddItem></AddItem></AdminRoute>
  //     },
  //     {
  //       path: 'manageitems',
  //       element: <AdminRoute><ManageItems></ManageItems></AdminRoute>
  //     }
  //   ]
  // }
]);