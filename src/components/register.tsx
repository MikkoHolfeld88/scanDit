import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {registerWithEmailAndPassword} from "../firebase/authentication";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import {Link as RouterLink, useNavigate} from "react-router-dom";
import {ROUTE_PATHS} from "../routing/routePaths";
import {useEffect} from "react";

export default function Register() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [alreadyRegisteredError, setAlreadyRegisteredError] = React.useState(false);
    const [invalidEmailError, setInvalidEmailError] = React.useState(false);
    const [requiredFieldErrorName, setRequiredFieldErrorName] = React.useState(false);
    const [requiredFieldErrorMail, setRequiredFieldErrorMail] = React.useState(false);
    const [requiredFieldErrorPassword, setRequiredFieldErrorPassword] = React.useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (alreadyRegisteredError) {
            setAlreadyRegisteredError(false);
        }

        if (invalidEmailError) {
            setInvalidEmailError(false);
        }

        if (requiredFieldErrorMail) {
            setRequiredFieldErrorMail(false);
        }
    }, [email]);

    useEffect(() => {
        if (requiredFieldErrorPassword) {
            setRequiredFieldErrorPassword(false);
        }
    }, [password]);

    useEffect(() => {
        if (requiredFieldErrorName) {
            setRequiredFieldErrorName(false);
        }
    }, [name]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!name) {
            setRequiredFieldErrorName(true);
            return;
        }

        if (!email) {
            setRequiredFieldErrorMail(true);
            return;
        }

        if (!password) {
            setRequiredFieldErrorPassword(true);
            return;
        }

        const error = await registerWithEmailAndPassword(name, email, password);

        if(error && error.message.includes('email-already-in-use')) {
            setInvalidEmailError(false);
            setAlreadyRegisteredError(true);
            return;
        }

        if (error && error.message.includes('invalid-email')){
            setInvalidEmailError(true);
            setAlreadyRegisteredError(false);
            return;
        }

        navigate(ROUTE_PATHS.SIGN_IN);
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        error={requiredFieldErrorName}
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoFocus
                        helperText={requiredFieldErrorName && 'Name is required!'}
                    />
                    <TextField
                        error={alreadyRegisteredError || invalidEmailError || requiredFieldErrorMail}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        helperText={
                            alreadyRegisteredError && 'Email already in use!' ||
                            invalidEmailError && 'Email invalid!' ||
                            requiredFieldErrorMail && 'Email is required!'
                        }
                    />
                    <TextField
                        error={requiredFieldErrorPassword}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        helperText={requiredFieldErrorPassword && 'Password is required!'}
                    />
                    <FormControlLabel
                        control={<Checkbox value="infoMail" color="primary"/>}
                        label="I want to receive development updates via email"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}>
                        Register
                    </Button>
                    <Grid container>
                        <Grid item>
                            <RouterLink to={ROUTE_PATHS.SIGN_IN}>
                                <Link variant="body2">
                                    {"Already have an account? Sign in"}
                                </Link>
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
