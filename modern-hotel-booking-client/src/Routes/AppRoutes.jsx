import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import MyBooking from "../Pages/MyBooking";
import Rooms from "../Pages/Rooms";

import axios from "axios";
import { createBrowserRouter } from "react-router";
import Login from "../Features/Auth/Login";
import Register from "../Features/Auth/Register";
import RoomDetails from "../Features/Booking/RoomDetails";
import NotFound from "../Pages/NotFound";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "rooms",
        loader: () => fetch("https://modern-hotel-booking-server-nine.vercel.app/rooms"),
        element: <Rooms></Rooms>,
      },
      {
        path: "rooms/:id",
        loader: ({params}) => axios.get(`https://modern-hotel-booking-server-nine.vercel.app/rooms/${params.id}`),
        element: <RoomDetails></RoomDetails>,
      },
      {
        path: "my-booking",
        element: (
          <PrivateRoute>
            <MyBooking></MyBooking>
          </PrivateRoute>
        ),
        loader: ()=> axios.get("https://modern-hotel-booking-server-nine.vercel.app/rooms"),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);

export default router;
