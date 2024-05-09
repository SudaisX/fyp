import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { CircularProgress, Alert } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useAuth } from "../authContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login, user, loading, error, token } = useAuth();

  // Dummy variables for loading and error state simulation
  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState([]);

  const submitHandler = (e) => {
    e.preventDefault();
    // setLoading(true);
    login(email, password);
  };

  useEffect(() => {
    if (token) {
      return navigate("/");
    }
  }, [token]);

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          //   boxShadow: 3, // Shadows to create depth
          //   borderRadius: 2, // Rounded corners
          backgroundColor: "background.paper", // Theme-based background color
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign In
        </Typography>
        {error &&
          error.length > 0 &&
          error.map((err, index) => (
            <Alert key={index} severity='error'>
              {err.msg}
            </Alert>
          ))}
        {loading ? (
          <CircularProgress color='primary' />
        ) : (
          <Box component='form' onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2, bgcolor: blue[600] }} // Customize button color
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/register' style={{ textDecoration: "none" }}>
                  {"Don't have an account? Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default LoginScreen;
