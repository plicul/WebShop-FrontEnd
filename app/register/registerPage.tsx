'use client'
import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { registerNewUser } from "@/lib/auth/utils";
import {Alert} from "@mui/material";
import {useRouter} from "next/navigation";

export function RegisterPage() {
    const router = useRouter()

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        const result = await registerNewUser(username as string, password as string, confirmPassword as string);

        if (result) {
            setError(result);
            return
        } else {
            setError("");
        }
        setSuccess("Registration Complete!")

        setTimeout(() => {
            router.push("/")
        }, 1500)
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <PersonAddAltOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    {error && (
                        <Alert severity="error">{error}</Alert>
                    )}
                    {success && (
                        <Alert severity="success">{success}</Alert>
                    )}
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
                <Link href="/login" variant="body2">
                    {"Already have an account? Sign in!"}
                </Link>
            </Box>
        </Container>
    );
}
