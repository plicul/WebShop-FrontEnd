'use client'
import React, { useState} from "react";
import {signIn, useSession} from "next-auth/react";
//import { signIn } from "@/auth";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Alert, Link } from "@mui/material";
import {useRouter} from "next/navigation";

export function SignInPage() {
    const router = useRouter()
    const [error, setError] = useState<string | undefined>(undefined);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        try {
            const res = await signIn("credentials", {
                username,
                password,
                redirect: false
            });
            if(res?.error == "" || res?.error == undefined) {
                setTimeout(() => {
                    router.push("/")
                }, 1500)
            } else {
                //showError("Incorrect username or password")
            }

        } catch (e) {
            setError("Login Unsuccessful!");
        }
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
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    {error && (
                        <Alert severity="error">{error}</Alert>
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
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
                <Link href="/register" variant="body2">
                    {"Don't Have An Account? Click Here!"}
                </Link>
            </Box>
        </Container>
    );
}
