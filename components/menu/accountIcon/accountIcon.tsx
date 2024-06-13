'use client'
import {useEffect, useRef, useState} from 'react';
import {Divider, Drawer, IconButton, Link, List, ListItem, ListItemText, Menu} from "@mui/material";
import {AccountCircle, Home, MenuOutlined} from "@mui/icons-material";
import styles from '../../styles/menuDrawer.module.scss';
import {MenuItem} from "@/consts/types";
import AccountIconPopperMenu from "@/components/menu/accountIcon/accountIconPopperMenu";

interface AccountIconProps {

}

const AccountIcon: React.FC<AccountIconProps> = ({  }) => {

    const accountIconRef = useRef<HTMLButtonElement>(null);
    const [accountIconMenuOpen, setAccountIconMenuOpen] = useState(false);


    const handleAccountIconMenuToggle = () => {
        setAccountIconMenuOpen(!accountIconMenuOpen);
    };

    return (
        <>
            <IconButton ref={accountIconRef} color="inherit" onClick={() => handleAccountIconMenuToggle()}>
                <AccountCircle/>
            </IconButton>
            <AccountIconPopperMenu anchorRef={accountIconRef} open={accountIconMenuOpen}
                                            handleClose={handleAccountIconMenuToggle}
            />
        </>);
};
export default AccountIcon

