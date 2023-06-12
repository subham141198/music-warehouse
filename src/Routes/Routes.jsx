import {
  createBrowserRouter,
} from "react-router-dom";

import LoginForm from "../Pages/Login";
import RegisterForm from "../Pages/Register";
import { HelmetProvider } from 'react-helmet-async';
import Main from "../Template/Main";
import AdminRoute from "./AdminRoute";
import Homepage from "../Pages/Home";
import AllUser from "../Components/Dashboard/Admin/AllUser";
import AddClass from "../Components/Dashboard/Instructor/AddClass";
import InstructorRoute from "./InstructorRoute";
import AllClassApproval from "../Components/Dashboard/Admin/AllClassApproval";
import AllClassOfInstructor from "../Components/Dashboard/Instructor/AllClass";
import Instructor from "../Pages/Instructor";
import ErrorPage from "../Pages/404";
import Classes from "../Pages/MusicClass";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Homepage />,

      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "instructors",
        element: <Instructor />,
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
      },
      {
        path: "classes",
        element : <Classes></Classes>
      }
    ]
  }
]);