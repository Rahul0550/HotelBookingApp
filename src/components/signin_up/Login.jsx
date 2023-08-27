import React from 'react'
import {
    Button,
    Container,
    TextField,
    Checkbox,
    Grid,
    Typography,
    Link,
    Box,
  } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import NavBar from '../NavBar';

export default function Login() {
    const navigate = useNavigate();
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
          height: "75vh",
          marginTop: "5vh",
          border: "2px solid black",
          borderRadius: "10px",
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4">Hotel Booking</Typography>
          <hr />
        </Box>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="userName"
                placeholder="Enter username"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Checkbox name="remember" />
              <label htmlFor="remember">Remember me</label>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary">
                Sign in
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography>Need help signing in?</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                Don't have an account? <Link onClick={() => navigate("/signup")}>Sign up</Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  )
}
