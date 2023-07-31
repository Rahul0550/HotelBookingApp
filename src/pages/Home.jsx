import React, { useState } from "react";
import { getHotels } from "../api/request";
import { useQuery } from "react-query";
import LoadingSkeleton from "../components/LoadingSkeleton";
import NavBar from "../components/NavBar";
import HotelCard from "../components/HotelCard";
import { Container, Grid, Pagination } from "@mui/material";

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [page, setPage] = useState(1);
  const hotelLimitPerPage = 8;

  const fetchHotels = async () => {
    const { data } = await getHotels();
    setHotels(data);
    setFilteredHotels(data);
    return data;
  };

  const { isLoading } = useQuery("hotels", fetchHotels);
  const startIndex = (page - 1) * hotelLimitPerPage;
  const endIndex = page * hotelLimitPerPage - 1;
  const paginatedHotels = filteredHotels.slice(startIndex, endIndex + 1);
  const totalHotels = filteredHotels.length;
  const totalPages = Math.ceil(totalHotels / hotelLimitPerPage);

  return isLoading ? (
    <LoadingSkeleton />
  ) : (
    <>
      <NavBar
        hotels={filteredHotels}
        setHotels={setFilteredHotels}
        originalHotels={hotels}
      />
      <Container maxWidth="lg">
        <Grid container spacing={2} padding={3}>
          {paginatedHotels.length > 0 ? (
            <>
              {paginatedHotels.map((hotel) => (
                <Grid key={hotel.id} item xs={12} sm={6} md={4} lg={3}>
                  <HotelCard key={hotel.id} hotel={hotel} />
                </Grid>
              ))}
            </>
          ) : (
            <h2>No hotels found</h2>
          )}
        </Grid>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        />
      </Container>
    </>
  );
}
