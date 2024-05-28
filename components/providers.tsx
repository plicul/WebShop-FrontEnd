'use client'

import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {SessionProvider} from "next-auth/react";
import {ReactNode} from "react";

export default function Providers({ children } : {children: ReactNode}) {

    return (
        <SessionProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <>
                    {children}
                </>
            </LocalizationProvider>
        </SessionProvider>

    )
}