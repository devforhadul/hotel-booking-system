import axios from "axios";
import {
  Calendar,
  CalendarDays,
  DatabaseBackup,
  DollarSign,
  Hotel,
  Star,
  XCircle,
} from "lucide-react";
import moment from "moment/moment";
import { use, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import toast, { Toaster } from "react-hot-toast";
import { MdRateReview } from "react-icons/md";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const MyBooking = () => {
  // Mock booking data
  const { user } = use(AuthContext);
  const [bookings, setBookings] = useState([]);
  const { data } = useLoaderData();
  const [openModal, setOpenModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [textReview, setTextReview] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [loading, setLoading] = useState(true);
  // const [roomCheckIn, setRoomCheckIn] = useState('');

  const bookedRooms = bookings?.map((booking) => {
    const room = data?.find((room) => room._id == booking.roomId);
    return {
      booked: booking,
      room: room,
    };
  });




  // https://modern-hotel-booking-server-nine.vercel.app

  //Get bookings from the serverghjm
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("token");
    axios
      .get(
        `https://modern-hotel-booking-server-nine.vercel.app/booked?email=${user?.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setBookings(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching bookings:", error);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  // Handle Cancel button click
  const handleCancel = (bookingId, roomId, checkInDate) => {
    const today = moment();
    const bookingDate = moment(checkInDate, "YYYY-MM-DD");
    const cancelationDeadline = bookingDate.clone().subtract(2, "days");
    const finalDeadline = today.isSameOrBefore(cancelationDeadline, "day");

    const availability = {
      isAvailable: true,
    };

    if (finalDeadline) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, cancel it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(
              `https://modern-hotel-booking-server-nine.vercel.app/booked/${bookingId}`
            )
            .then((res) => {
              if (res.data.deletedCount > 0) {
                setBookings((prev) =>
                  prev.filter((booking) => booking._id !== bookingId)
                );
                // after cancla availability is true
                axios
                  .patch(
                    `https://modern-hotel-booking-server-nine.vercel.app/rooms/cancel/${roomId}`,
                    availability
                  )
                  .then((res) => {
                    //console.log("Room availability updated:", res.data);
                  })
                  .catch((error) => {
                    console.error("Error updating room availability:", error);
                  });

                Swal.fire({
                  title: "Deleted!",
                  text: "Your Booking has been deleted.",
                  icon: "success",
                });
              }
            })
            .catch((error) => {
              console.error("Error cancelling booking:", error);
            });
        }
      });
    } else {
      toast.error("The cancellation period has expired.");
    }
  };

  // Handle Review submission
  const handleSubmitReview = (e) => {
    e.preventDefault();
    const reviews = {
      name: user?.displayName || "Anonymous",
      email: user?.email,
      photo:
        user?.photoURL || "https://placehold.co/50x50/CCCCCC/666666?text=User",
      reviewRating: rating,
      description: textReview,
    };

    axios
      .patch(
        `https://modern-hotel-booking-server-nine.vercel.app/rooms/${reviewId}/review`,
        reviews
      )
      .then((res) => {
        console.log(res.data);
        setReviewModal(false);
        toast.success("Review submitted successfully!");
        setRating(0);
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        toast.error("Failed to submit review. Please try again.");
        setReviewModal(false);
        setRating(0);
      });
  };

  // Handle Update button click
  const handleUpdateDate = (e) => {
    e.preventDefault();
    const updateDate = {
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
    };

    axios
      .patch(
        `https://modern-hotel-booking-server-nine.vercel.app/booked/update/${updateId}`,
        updateDate
      )
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          //  Update UI instantly
          setBookings((prev) =>
            prev.map((booking) =>
              booking._id === updateId
                ? { ...booking, checkInDate, checkOutDate }
                : booking
            )
          );
          setOpenModal(false);
          toast.success("Booking updated successfully!");
          setCheckInDate("");
          setCheckOutDate("");
          setUpdateId("");
        }
      })
      .catch((error) => {
        console.error("Error updating booking:", error);
        toast.error("Failed to update booking. Please try again.");
        setOpenModal(false);
        setCheckInDate("");
        setCheckOutDate("");
        setUpdateId("");
      });
  };

  return (
    <div className="bg-gray-100 p-4">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Your Booking Rooms</title>
        <link
          rel="canonical"
          href="https://modern-hotel-booking-63402.web.app/my-booking"
        />
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-10 text-center drop-shadow-lg">
          {/* <Hotel className="inline-block mr-3 text-blue-600" size={48} /> */}
          My Bookings
        </h1>

        {bookedRooms.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center text-gray-600 text-lg">
            No bookings found. Start planning your next trip!
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {" "}
            {/* Changed to flex-col for vertical stacking and added gap */}
            {bookedRooms.map((booking) => (
              <div
                key={booking.room._id}
                className="grid grid-cols-12  bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01] hover:shadow-3xl border border-gray-100" // Removed fixed width and flex-shrink-0
              >
                <div className="col-span-4 relative">
                  <img
                    src={booking.room.images[0]}
                    alt="acb"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/400x250/F8FAFC/0F172A?text=${encodeURIComponent(
                        booking.hotelName
                      )}`;
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                    {booking.room.name}
                  </div>
                </div>

                <div className="col-span-8 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {booking.hotelName}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4">
                    <Hotel
                      className="inline-block mr-1 text-blue-500"
                      size={16}
                    />
                    {booking.room.location}
                  </p>

                  <div className="flex items-center text-gray-700 mb-2">
                    <Calendar className="mr-2 text-blue-500" size={20} />
                    Check-in:{" "}
                    <span className="font-medium ml-1">
                      {booking.booked.checkInDate}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-700 mb-4">
                    <Calendar className="mr-2 text-blue-500" size={20} />
                    Check-out:{" "}
                    <span className="font-medium ml-1">
                      {booking.booked.checkOutDate}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm mb-4">
                    <div>
                      Guests:{" "}
                      <span className="font-semibold">
                        {booking.booked.numberOfGuests}
                      </span>
                    </div>
                    {/* <div>
                      Rooms:{" "}
                      <span className="font-semibold">{booking.rooms}</span>
                    </div> */}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 md:gap-4 mb-3 md:mb-6">
                    <div className="flex items-center text-green-700 text-2xl font-extrabold">
                      <DollarSign className="mr-1 text-green-600" size={24} />
                      {booking.room.pricePerNight}
                    </div>

                    <div
                      onClick={() => {
                        setUpdateId(booking.booked._id), setOpenModal(true);
                      }}
                      className="flex items-center text-gray-500 gap-2 cursor-pointer"
                    >
                      Update Date
                      <DatabaseBackup />
                    </div>
                    {/* Review button */}
                    <div
                      onClick={() => {
                        setReviewId(booking.room._id);
                        setReviewModal(true);
                      }}
                      className="flex items-center text-gray-500 gap-2 cursor-pointer"
                    >
                      Give Review
                      <MdRateReview />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    {/* {booking.status === "Pending Payment" && (
                      <button
                        onClick={() => handlePay(booking._id)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
                      >
                        <CreditCard className="mr-2" size={20} /> Pay Now
                      </button>
                    )} */}

                    <button
                      onClick={() =>
                        handleCancel(
                          booking.booked._id,
                          booking.room._id,
                          booking.booked.checkInDate
                        )
                      }
                      className={`flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-0.5 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 flex items-center justify-center cursor-pointer`}
                    >
                      <XCircle className="mr-2" size={20} /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mofal for Update  */}
      {openModal && (
        <>
          {/* Modal for update */}
          <dialog id="my_modal_1" className="modal modal-open">
            <div className="modal-box">
              <div>
                <form onSubmit={handleUpdateDate} className="space-y-4">
                  <div>
                    <label
                      htmlFor="check-in"
                      className="block text-sm font-semibold mb-2"
                    >
                      <CalendarDays size={16} className="inline-block mr-2" />{" "}
                      Check-in Date
                    </label>
                    <input
                      type="date"
                      id="check-in"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="check-out"
                      className="block text-sm font-semibold mb-2"
                    >
                      <CalendarDays size={16} className="inline-block mr-2" />{" "}
                      Check-out Date
                    </label>
                    <input
                      type="date"
                      id="check-out"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={
                        checkInDate || new Date().toISOString().split("T")[0]
                      }
                      className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors duration-200"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  >
                    Update Booking
                  </button>
                </form>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button onClick={() => setOpenModal(false)} className="btn">
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </>
      )}

      {/* Mofal for Review  */}
      {reviewModal && (
        <>
          {/* Modal for review */}
          <dialog id="my_modal_1" className="modal modal-open">
            <div className="modal-box">
              <h1 className="text-lg font-medium mb-3">{user?.displayName}</h1>
              <div>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label
                      htmlFor="review"
                      className="block text-sm font-semibold mb-2"
                    >
                      <MdRateReview size={16} className="inline-block mr-2" />{" "}
                      Write a Review
                    </label>
                    <textarea
                      id="review"
                      rows="4"
                      placeholder="Write your review here..."
                      className="w-full p-3 rounded-lg bg-white text-gray-800 focus:outline-none ring-2 ring-blue-200 transition-colors duration-200"
                      required
                      onChange={(e) => setTextReview(e.target.value)}
                    ></textarea>
                  </div>

                  {/* star rating */}
                  <div className="flex space-x-2 text-yellow-400 text-3xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHovered(star)}
                        onMouseLeave={() => setHovered(0)}
                        className="transition transform hover:scale-110"
                      >
                        <Star
                          fill={
                            (hovered || rating) >= star ? "#facc15" : "none"
                          }
                          stroke="#facc15"
                        />
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button onClick={() => setReviewModal(false)} className="btn">
                    Close
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </>
      )}

      <Toaster></Toaster>
    </div>
  );
};

export default MyBooking;
