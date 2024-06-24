import { GetServerSideProps } from 'next';
import {CategoryComponent, CategoryComposite, MenuItem} from '../../consts/types';
import Typography from "@mui/material/Typography";
import {Box, IconButton, Link} from "@mui/material";
import {AccountCircle, Home, MenuOutlined} from "@mui/icons-material";
import styles from '../../styles/layout.module.scss';
import MenuDrawer from "@/components/menu/menuDrawer";
import AccountIconPopperMenu from "@/components/menu/accountIcon/accountIconPopperMenu";
import AccountIcon from "@/components/menu/accountIcon/accountIcon";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
interface ToolbarProps {
    className? : string
    menuListParam: MenuItem[]
}

const Toolbar: React.FC<ToolbarProps> = ({ className, menuListParam}) => {
    return (
        <div>
            <Box className={className}>
                <div className={styles.toolbarContent}>
                    <MenuDrawer menuListParam={menuListParam}/>
                    <Typography variant="h6" className={styles.title}>
                        WEB SHOP
                    </Typography>
                    <Typography variant="h6" >
                        SEARCH BAR PLACE HOLDER
                    </Typography>
                    <Link style={{ textDecoration: 'none', color:"inherit" }} href={`/cart`}>
                        <IconButton color="inherit">
                            <ShoppingCartIcon/>
                        </IconButton>
                    </Link>
                    <Link style={{ textDecoration: 'none', color:"inherit" }} href={`/`}>
                        <IconButton color="inherit">
                            <Home />
                        </IconButton>
                    </Link>
                    <AccountIcon/>

                </div>

            </Box>
        </div>
    );
};
export default Toolbar