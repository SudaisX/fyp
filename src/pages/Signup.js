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

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { register, user, loading, error, token } = useAuth();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    // if (password !== confirmPassword) {
    //   //   setError([...error, { msg: "Passwords do not match" }]);
    //   return;
    // }
    // Simulate API registration process
    register(name, email, password);
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
          //   boxShadow: 3,
          //   borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <Typography component='h1' variant='h5'>
          Register
        </Typography>
        {error &&
          error.length > 0 &&
          //   <Alert severity='error'>{error.value}</Alert>

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
              id='name'
              label='Name'
              name='name'
              autoComplete='name'
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              autoComplete='new-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              name='confirmPassword'
              label='Confirm Password'
              type='password'
              id='confirmPassword'
              autoComplete='new-password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2, bgcolor: blue[600] }}>
              Register
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link to='/login' style={{ textDecoration: "none" }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default SignupScreen;
