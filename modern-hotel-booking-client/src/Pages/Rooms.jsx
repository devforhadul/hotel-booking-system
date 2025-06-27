import React from "react";
import RoomCard from "../Components/RoomCard";
import { useLoaderData, useNavigation } from "react-router";
import { Helmet } from "react-helmet";

const Rooms = () => {
  const rooms = useLoaderData();
  const navigation = useNavigation();

  if (navigation.state == "loading") {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Explore Rooms</title>
        <link rel="canonical" href="https://modern-hotel-booking-63402.web.app/
rooms" />
      </Helmet>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5 w-11/12 mx-auto">
        {rooms.map(
          (room, idx) =>
             <RoomCard key={idx} room={room}></RoomCard>
        )}
      </div>
    </div>
  );
};

export default Rooms;
