import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import NavBar from "./NavBar";

export default function BookingHistory() {
  const [tableData, setTableData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://hotelbookingapp-e0a8e-default-rtdb.firebaseio.com/hotel.json"
      );
      const data = await response.json();
      const bookings = Object.keys(data).map((key) => {
        const booking = data[key];
        return {
          id: key,
          hotelName: booking.hotelName,
          hotelAddress: booking.hotelAddress,
          checkin: booking.checkin,
          checkout: booking.checkout,
          numberOfGuests: booking.numberOfGuests,
          price: booking.price,
        };
      });

      setTableData(bookings);
    } catch (error) {
      console.error("Error fetching booking data: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(
        `https://hotelbookingapp-e0a8e-default-rtdb.firebaseio.com/hotel/${id}.json`,
        {
          method: "DELETE",
        }
      );
      fetchData(); // Fetch the updated data after deletion
    } catch (error) {
      console.error("Error deleting booking: ", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  return (
    <>
      <NavBar />
      <Typography variant="h4" gutterBottom sx={{ margin: "2% 40%" }}>
        Booking History
      </Typography>
      <TableContainer component={Paper} sx={{ width: "80%", margin: "0 5% " }}>
        <Table aria-label="booking history table">
          <TableHead>
            <TableRow>
              <TableCell>Hotel Name</TableCell>
              <TableCell>Hotel Address</TableCell>
              <TableCell>Check In</TableCell>
              <TableCell>Check Out</TableCell>
              <TableCell>Number of Guests</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((booking, index) => (
              <TableRow key={index}>
                <TableCell>{booking.hotelName}</TableCell>
                <TableCell>{booking.hotelAddress}</TableCell>
                <TableCell>{booking.checkin}</TableCell>
                <TableCell>{booking.checkout}</TableCell>
                <TableCell>{booking.numberOfGuests}</TableCell>
                <TableCell>{booking.price}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(booking.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
