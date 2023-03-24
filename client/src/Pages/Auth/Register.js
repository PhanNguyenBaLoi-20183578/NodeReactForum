import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { dataImg } from '../../Apis/dataImg';
const theme = createTheme();

export default function SignUp() {
  const navigate=useNavigate();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState(null);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setPasswordConfirmationError(null);
    let errors = 0;

    if (!name) {
      setNameError('Name is requirer');
      errors++;
    }
    if (!validator.isEmail(email)) {
      setEmailError('Email error');
      errors++;
    }
    if (password !== passwordConfirmation) {
      setPasswordError("Passwords don't match");
      errors++;
    }
    if (errors) return;

    const data = {
      name,
      email,
      password,
      image,
    };

    try {
      await axios.post('/api/auth/register', data);
      alert("Đăng ký thành công");
      navigate('/auth/login');

      //console.log(data);
    } catch (e) {
      const message = e.response.data.message;
      if (message === 'email_exists') {
        setEmailError('User with this email already exists');
      }
    }
  };
  const [image, setImage] = React.useState(dataImg[0]);

  const handleChange = (event) => {
    setImage(dataImg[event.target.value]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={image}
            style={{
              width: 80,
              height: 80,
              backgroundColor: 'skyblue',
            }}
          ></img>
          <Typography component="h1" variant="h5">
            Đăng ký
          </Typography>
          <Box sx={{ minWidth: 140 }}>
            <FormControl fullWidth>
              <InputLabel>Chọn Avartar</InputLabel>
              <Select value={image} label="image" onChange={handleChange}>
                {dataImg.map(({ url }, index) => (
                  <MenuItem key={index} value={index}>
                    <img
                      src={dataImg[index]}
                      style={{
                        width: 80,
                        height: 80,
                        backgroundColor: 'skyblue',
                      }}
                    ></img>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box
            component="form"
            noValidate
            onSubmit={handleOnSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="Name"
                  required
                  fullWidth
                  label="First Name"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!nameError}
                  helperText={nameError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password Confirmation"
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  helperText={passwordConfirmationError}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
