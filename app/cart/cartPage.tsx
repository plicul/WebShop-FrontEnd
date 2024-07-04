// noinspection TypeScriptValidateTypes

'use client';

import {
    Box,
    Button,
    Container,
    Card,
    CardContent,
    Typography,
    IconButton,
    Alert,
    List,
    ListItem,
    ListItemText, makeStyles, Tabs, Chip, Tab
} from "@mui/material";
import {ExpandLess, ExpandMore, Save} from '@mui/icons-material';
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import {Cart, CartItem, CategoryComposite, Item, Price} from "@/consts/types";
import { revalidateTag } from "next/cache";
import styles from '../../styles/itemPage.module.scss';
import {ShoppingCartIcon} from "@heroicons/react/16/solid";
import {ItemCard} from "@/components/item/itemCard";
import {useLocalStorage} from "usehooks-ts";
import {API_BASE} from "@/consts/global";
import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";
import {useSession} from "next-auth/react";
import {checkout} from "@/lib/cart/utils";

interface CartPageProps {
}

//datagrid
export function CartPage({}: CartPageProps) {
    const {data: session, status} = useSession()

    const [cartId, setCartId, removeCartId] = useLocalStorage<number | undefined>('cartId',undefined)
    const [cart, setCart] = useState<Cart | undefined>();

    useEffect(() => {
        if(cartId != undefined){
            //fetch get
            fetch(API_BASE + `/cart/${cartId}`, {
                method: "GET"
            }).then(data => data.json())
                .then((cartTmp: Cart) => {
                    setCart(cartTmp)
                })
                .catch(error => {
                    console.log("error" + error + API_BASE)
                })
        }
    }, []);

    const rows: GridRowsProp = Array.isArray(cart?.cartItems) ? (cart?.cartItems as CartItem[]).map((row) => row) : [];

    const columns: GridColDef[] = [
        { field: 'itemItemTitle', headerName: 'Item', width: 100 , editable: false},
        { field: 'amount', headerName: 'Amount', width: 100 , editable: true, type:"number"},
        { field: 'itemPrice', headerName: 'Price', width: 100 , editable: false},
    ] ;

    async function updateRow(newRow: CartItem, oldRow: CartItem) {
        const x = cart
        x?.cartItems.splice(x?.cartItems.indexOf(oldRow),1,newRow)
        await fetch(API_BASE + `/cart/`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(x),
        }).then(data => data.json())
            .then((response: Boolean) => {
            })
            .catch(error => {
                console.log("error" + error)
            })
        return newRow
    }

    return (
        <Container maxWidth="md" className={styles.container}>
            {cart?.cartItems && cart.cartItems.length > 0 ?
                (
                    <>
                        <DataGrid
                            columns={columns}
                            rows={rows} getRowId={(row) => row.id}
                            processRowUpdate={async (newRow, oldRow) => await updateRow(newRow, oldRow)}
                        />
                        <IconButton onClick={async () => checkout(cart,session != undefined ? session!.userName as string : "")}>
                            {"Checkout"}
                        </IconButton>
                    </>

                )
                :
                (
                    <Typography>Empty Cart</Typography>
                )
            }
        </Container>
    );
}

export default CartPage;


