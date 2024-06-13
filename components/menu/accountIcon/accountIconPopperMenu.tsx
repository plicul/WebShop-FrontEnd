'use client'
import {RefObject, useEffect, useState} from 'react';
import {ClickAwayListener, Grow, MenuList, Paper, Popper, MenuItem, Link} from "@mui/material";
import {useSession} from "next-auth/react";
import { signOut } from "next-auth/react"


interface MenuDrawerProps {
    className? : string
    anchorRef:  RefObject<HTMLButtonElement>
    open: boolean
    handleClose: () => void

}

const accountIconPopperMenu: React.FC<MenuDrawerProps> = ({ className, anchorRef,open, handleClose }) => {
    const {data: session, status} = useSession()


    return (
        <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                        transformOrigin: 'center bottom',
                        transform: 'translateY(5%)',

                    }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                            >
                                {status == "authenticated" && <MenuItem>
                                    <Link style={{ textDecoration: 'none', color:"inherit" }} href={`/account`}>
                                        {"Account"}
                                    </Link>
                                </MenuItem>}
                                {status == "authenticated" && <MenuItem onClick={() => {signOut({callbackUrl: "/"})}}>Logout</MenuItem>}
                                {status != "authenticated" &&
                                    <MenuItem >
                                        <Link style={{ textDecoration: 'none', color:"inherit" }} href={`/login`}>
                                            {"Login"}
                                        </Link>
                                    </MenuItem>
                                }
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    );
};
export default accountIconPopperMenu


