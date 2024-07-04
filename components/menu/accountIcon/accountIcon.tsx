'use client'
import {useEffect, useRef, useState} from 'react';
import {Divider, Drawer, IconButton, Link, List, ListItem, ListItemText, Menu} from "@mui/material";
import {AccountCircle, Home, MenuOutlined} from "@mui/icons-material";
import styles from '../../styles/menuDrawer.module.scss';
import {MenuItem} from "@/consts/types";
import AccountIconPopperMenu from "@/components/menu/accountIcon/accountIconPopperMenu";
import {useSession} from "next-auth/react";

interface AccountIconProps {

}

const AccountIcon: React.FC<AccountIconProps> = ({  }) => {
    const {data: session, status} = useSession()

    const accountIconRef = useRef<HTMLButtonElement>(null);
    const [accountIconMenuOpen, setAccountIconMenuOpen] = useState(false);


    const handleAccountIconMenuToggle = () => {
        const x = session
        setAccountIconMenuOpen(!accountIconMenuOpen);
    };

    return (
        <>
            <IconButton ref={accountIconRef} color="inherit" onClick={() => handleAccountIconMenuToggle()}>
                <AccountCircle/>
                {session && session.userName}
            </IconButton>
            <AccountIconPopperMenu anchorRef={accountIconRef} open={accountIconMenuOpen}
                                            handleClose={handleAccountIconMenuToggle}
            />
        </>);
};
export default AccountIcon

