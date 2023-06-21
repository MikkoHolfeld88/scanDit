import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {logInWithEmailAndPassword} from '../firebase/signin';
import {ROUTE_PATHS} from "../routing/routePaths";
import {useEffect} from "react";

export default function SignIn() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [userNotFoundError, setUserNotFoundError] = React.useState(false);
    const [wrongPasswordError, setWrongPasswordError] = React.useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (userNotFoundError) {
            setUserNotFoundError(false);
        }
        if (wrongPasswordError) {
            setWrongPasswordError(false);
        }
    }, [email, password]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        setWrongPasswordError(false);
        setUserNotFoundError(false);

        const error = await logInWithEmailAndPassword(email, password);

        if(error && error.message.includes('user-not-found')){
            setUserNotFoundError(true);
            setWrongPasswordError(false);
        } else if(error && error.message.includes('wrong-password')){
            setWrongPasswordError(true);
            setUserNotFoundError(false);
        }

        if (error){
            return;
        }

        console.log("here");

        navigate(ROUTE_PATHS.DASHBOARD, {replace: true});
    };

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
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        error={userNotFoundError}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        helperText={userNotFoundError && 'User not found!'}
                    />
                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        error={wrongPasswordError}
                        helperText={wrongPasswordError && 'Wrong password!'}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}>
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <RouterLink to={ROUTE_PATHS.REGISTER} style={{ textDecoration: 'none' }}>
                                <Link variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </RouterLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
