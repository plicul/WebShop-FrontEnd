'use client'
import { useEffect, useState } from 'react';
import {Divider, Drawer, IconButton, Link, List, ListItem, ListItemText, Menu} from "@mui/material";
import {AccountCircle, Home, MenuOutlined} from "@mui/icons-material";
import styles from '../../styles/menuDrawer.module.scss';
import {MenuItem} from "@/consts/types";

interface MenuDrawerProps {
    className? : string
    drawerOpen : boolean
    handleDrawerToggle: () => void
    menuListParam: MenuItem[]
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ className, drawerOpen,handleDrawerToggle,menuListParam }) => {

    const [menuList, setMenuList] = useState<MenuItem[]>(menuListParam)

    return (
        <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
            <div className={styles.drawerHeader}>
                <IconButton onClick={handleDrawerToggle}>
                    <MenuOutlined />
                </IconButton>
            </div>
            <Divider />
            <List>
                {menuList.map((value, index) => (
                    <ListItem key={index}>
                        <Link style={{ textDecoration: 'none', color:"inherit" }} href={`${value.routePath}`}>
                            {value.name}
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};
export default MenuDrawer
