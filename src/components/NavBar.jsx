import React, { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export default function NavBar({ hotels=[], setHotels, originalHotels=[] }) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    const filteredHotels = hotels.filter(
      (hotel) =>
        hotel.address.toLowerCase().includes(searchValue.toLowerCase()) ||
        hotel.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setHotels(filteredHotels);
  };

  return (
    <>
      <AppBar position="static" color="inherit">
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingY: 1.2,
            }}
          >
            <Typography
              onClick={() => navigate("/")}
              sx={{ cursor: "pointer" }}
              variant="h6"
              color="inherit"
              component="div"
              fontWeight="bold"
            >
              BookStay
            </Typography>
            <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
              {originalHotels.length > 0 && (
                <>
                  <TextField
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      if (e.target.value === "") {
                        setHotels(originalHotels);
                      }
                    }}
                    variant="outlined"
                    label="Search Hotels"
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          disabled={!searchValue}
                          onClick={() => handleSearch()}
                        >
                          <SearchOutlinedIcon />
                        </IconButton>
                      ),
                    }}
                  />
                </>
              )}
              <Typography
                onClick={() => navigate("/")}
                sx={{ cursor: "pointer" }}
                fontSize="16px"
                variant="h6"
                color="black"
                fontWeight="bold"
              >
                Home
              </Typography>
              <IconButton size="small">
                <Avatar sx={{ width: 32, height: 32 }}>R</Avatar>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
