import React, { useState } from "react";
import { Box, Button, Container, ListItem, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getHotelBySlug } from "../api/request";
import NavBar from "../components/NavBar";
import LoadingSkeleton from "../components/LoadingSkeleton";
import Gallery from "../components/Gallery";
import BookingModal from "../components/BookingModal";

export default function HotelInfo() {
  const [open, setOpen] = useState(false);

  const { slug } = useParams();

  const fetchHotelData = async () => {
    const { data } = await getHotelBySlug(slug);
    return data;
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { isLoading, data } = useQuery("hotel-slug", fetchHotelData);

  return (
    <>
      <NavBar />
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <Container maxWidth="lg">
          <Typography variant="h6" fontWeight={"bold"} sx={{ margin: "3px 0" }}>
            {data?.name}
          </Typography>
          <Gallery images={data?.images} />

          <Box sx={{ margin: "3px 0", display: "flex" }}>
            {data?.rooms.map((room) => (
              <Typography
                variant="h6"
                fontWeight={"bold"}
                key={room.id}
                sx={{ margin: "3px 20px 5px 0px", color: "grey" }}
              >
                {room.content}
              </Typography>
            ))}
          </Box>

          <Typography
            variant="p"
            fontSize={"1rem"}
            fontWeight={"bold"}
            sx={{ lineHeight: "1.5rem", margin: "10px 0" }}
          >
            {data?.aboutThePlace}
          </Typography>

          <Typography
            variant="h4"
            fontWeight={"bold"}
            sx={{ margin: "3rem 0 1.5rem" }}
          >
            What this place offers!!!
          </Typography>

          <Box
            sx={{
              margin: "3px 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ maxWidth: "70%" }}>
              {data?.features.map((feature) => (
                <ListItem key={feature.id}>{feature.text}</ListItem>
              ))}
            </Box>
            <Button onClick={handleOpen} variant="outlined">Reserve</Button>
          </Box>

          <BookingModal data={data} open={open} handleClose={handleClose} />
        </Container>
      )}
    </>
  );
}
