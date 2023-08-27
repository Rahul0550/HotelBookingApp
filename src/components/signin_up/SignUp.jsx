import React, { useState } from "react";
import { TextField, Button, Container, Box, Typography } from "@mui/material";
import NavBar from "../NavBar";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log(formData); // You can replace this with your actual submission logic
  };

  const handleClear = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      age: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
    <NavBar/>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          border: "2px solid black",
          borderRadius: "10px",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4">Hotel Booking SignUp</Typography>
          <hr />
        </Box>
        <Box mt={4} sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              type="email"
            />
            <TextField
              label="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              type="number"
            />
            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              type="password"
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              type="password"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="text"
              color="secondary"
              onClick={handleClear}
              sx={{ mt: 2 }}
            >
              Clear
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}
