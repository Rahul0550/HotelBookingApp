import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";

import {
  Box,
  FormControl,
  MenuItem,
  InputLabel,
  Modal,
  Typography,
  Select,
  Button,
} from "@mui/material";
import React, { useState } from "react";

export default function BookingModal({ open, handleClose, data }) {
  const navigate = useNavigate();
  const [selectedCount, setSelectedCount] = useState(2);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const [dates, setDates] = useState([
    {
      startDate: today,
      endDate: tomorrow,
      key: "selection",
    },
  ]);

  const getTotalNights = () => {
    const { startDate, endDate } = dates[0];
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getGuests = () => {
    return Number(data?.rooms[0].content.split(' ')[0]);
  };

  const submitButton = async () => {

    const start = new Date(dates[0].startDate);
    const end = new Date(dates[0].endDate);
    const diffDays = getTotalNights();

    const details = JSON.stringify({
      hotelName: data.name,
      hotelAddress: data.address,
      numberOfGuests: selectedCount,
      price :  `$${data.pricePerNight * diffDays}`,
      checkin: start.toISOString(),//done
      checkout: end.toISOString(),//done
      
    });

    console.log('details', details);

    //fetch 
    try {
      const response = await fetch(
        "https://hotelbookingapp-e0a8e-default-rtdb.firebaseio.com/hotel.json",
        {
          method: "POST",
          body: details,
        }
      );

      if (response.ok) {
        console.log("Booking successful!");
        
      } else {
        console.error("Booking failed.");
      }
    } catch (error) {
      console.error("Error during booking:", error);
    }
  navigate("/bookingHistory")

  };


  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
            position: 'absolute',
          width: "360",
          top: "50%",
          left: "50%",
          transform: 'translate(-50%, -50%)',
          bgcolor: "white",
          margin: "auto",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          borderRadius: "2px",
          p: 3,
        }}
      >
        <Typography variant="h6" fontWeight={"bold"} sx={{ margin: "3px 0" }}>
          ${data?.pricePerNight} / night
        </Typography>

        <FormControl fullWidth sx={{ margin: "100px 0" }}>
          <InputLabel>Number of Guests</InputLabel>
          <Select
            label="Number of Guests"
            value={selectedCount}
            onChange={(e) => setSelectedCount(e.target.value)}
          >
            {[...Array(getGuests())].map((guest, index) => (
              <MenuItem value={index + 1}>{index + 1}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="h6" fontWeight={"bold"} color={"gray"}>
          Select Dates
        </Typography>
        <DateRange
          onChange={({ selection }) => setDates([selection])}
          ranges={dates}
          minDate={new Date()}
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" fontWeight={"bold"}>
            ${data?.pricePerNight} x {getTotalNights()} nights
          </Typography>

          <Typography variant="h6" fontWeight={"bold"}>
            ${data?.pricePerNight * getTotalNights()} nights
          </Typography>
        </Box>

        <Typography variant="h6" fontWeight={"bold"}>
          Subtotal : ${data?.pricePerNight * getTotalNights()} nights
        </Typography>

        <Button variant="outlined" sx={{ width: "100%", marginTop: "10px" }} onClick={submitButton}>
          Reserve
        </Button>
      </Box>
    </Modal>
  );
}
