'use client'
import {useEffect, useRef, useState} from 'react';
import { GetServerSideProps } from 'next';
import {CategoryComponent, CategoryComposite, MenuItem} from '../../consts/types';
import Typography from "@mui/material/Typography";
import {IconButton, Link} from "@mui/material";
import {AccountCircle, Home, MenuOutlined} from "@mui/icons-material";
import styles from '../../styles/layout.module.scss';
import MenuDrawer from "@/components/menu/menuDrawer";
import AccountIconPopperMenu from "@/components/menu/accountIconPopperMenu";

interface ToolbarProps {
    className? : string
    menuListParam: MenuItem[]
}

const Toolbar: React.FC<ToolbarProps> = ({ className, menuListParam}) => {
    //const [categories, setCategories] = useState<CategoryComposite[]>(initialCategories);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const accountIconRef = useRef<HTMLButtonElement>(null);
    const [accountIconMenuOpen, setAccountIconMenuOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };
    const handleAccountIconMenuToggle = () => {
        setAccountIconMenuOpen(!accountIconMenuOpen);
    };

    return (
        <div>
            <MenuDrawer handleDrawerToggle={handleDrawerToggle} drawerOpen={drawerOpen} menuListParam={menuListParam}/>
            <div className={className}>
                <div className={styles.toolbarContent}>
                    <IconButton color="inherit" aria-label="menu" onClick={() => handleDrawerToggle ? handleDrawerToggle() : ""}>
                        <MenuOutlined />
                    </IconButton>
                    <Typography variant="h6" className={styles.title}>
                        WEB SHOP
                    </Typography>
                    <Typography variant="h6" >
                        SEARCH BAR PLACE HOLDER
                    </Typography>
                    <Link style={{ textDecoration: 'none', color:"inherit" }} href={`/`}>
                        <IconButton color="inherit">
                            <Home />
                        </IconButton>
                    </Link>
                    <IconButton ref={accountIconRef} color="inherit" onClick={() => handleAccountIconMenuToggle()}>
                        <AccountCircle />
                    </IconButton>
                    <AccountIconPopperMenu anchorRef={accountIconRef} open={accountIconMenuOpen} handleClose={handleAccountIconMenuToggle}/>
                </div>

            </div>
        </div>
    );
};
export default Toolbar