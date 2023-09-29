import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import { PropertyTypes } from "../../config";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination);
  console.log(destination,"destination")
  const [date, setDate] = useState(location.state?.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state?.options);
  console.log("options",options.adult , options.children)

  const HOTELS_dATA = JSON.parse(localStorage.getItem("inventory")) ?? [];

 const existingBookingHistory = JSON.parse(localStorage.getItem("hotelBookingHistory")) || [];
 

  const filterHotelsAndRooms = () => {
    if (destination && options && date) {
      // Initialize an array to store filtered rooms with hotel names
      const filteredRooms = [];
      HOTELS_dATA.forEach((property) => {
        if (property.hotels) { 
          property.hotels.forEach((hotel) => {
            if (hotel.location === destination) {
              if (hotel.roomsData) { 
                hotel.roomsData.forEach((room) => {
                  
                  if (room.adults >= options.adult && room.childrens <= options.children) {
                    
                    filteredRooms.push({
                      hotelName: hotel.hotelName,
                      hotelDesc: hotel.hotelDesc,
                      roomName: room,
                    });
                  }
                });
              }
            }
          });
        }
      });
  
      return filteredRooms;
    }
    return [];
  };
  
  
  const filteredRooms = filterHotelsAndRooms();
 
  
  console.log(filteredRooms,"filteredRooms")

  const filteredData1 = filteredRooms.filter((item1) => {
   
    return !existingBookingHistory.some((item2) =>
        item1.hotelName === item2.hotelName &&
        item1.roomName.roomName === item2.rooms.roomName
    );
});

console.log(filteredData1,"TTTTTTTT");


  

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button>Search</button>
          </div>
          <div className="listResult">
          {filteredData1.map((hotelRoomData, index) => (
              <SearchItem
                key={index}
                hotelName = {hotelRoomData.hotelName}
                hotelDesc = {hotelRoomData.hotelDesc}
                room={hotelRoomData.roomName}
                
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;