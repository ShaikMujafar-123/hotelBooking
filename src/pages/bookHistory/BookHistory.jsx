import React, { useState, useEffect } from "react";
import "./bookHistory.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

const HotelBookingHistory = () => {
  // Initialize booking history from local storage
  const [bookingHistoryData, setBookingHistoryData] = useState(
    JSON.parse(localStorage.getItem("hotelBookingHistory")) || []
  );

  const handleCancel = (roomName) => {
   
    const updatedBookingHistory = bookingHistoryData.filter(
      (booking) => booking.rooms.roomName !== roomName
    );

    
    setBookingHistoryData(updatedBookingHistory);
    localStorage.setItem(
      "hotelBookingHistory",
      JSON.stringify(updatedBookingHistory)
    );
  };
  const users = JSON.parse(localStorage.getItem("Users")) ?? [];
  const loggedInUser = users.find((user) => user.login_status === "login");
  const username = loggedInUser.username

  const bookFilteredData = bookingHistoryData.filter((Data) => username === Data.username)

  return (
    <>
      <Navbar />
      <Header type="list" />
      <div className="hotel-booking-history">
        <div className="historyHeader" >Booking History</div>

        {bookFilteredData.map((booking, index) => (
          <div className="booking-entries" key={index}>
            <div className="hotelData">
              <div className="hotelName">{booking.hotelName}</div>
              <div className="roomName">{booking.rooms.roomName}</div>
              <div className="roomDesc">{booking.rooms.features}</div>
            </div>
            <div className="hotelPrice">
              <div className="price">₹ {booking.rooms.price}</div>
              <button
                onClick={() => handleCancel(booking.rooms.roomName)}
                className="canBtn"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HotelBookingHistory;
