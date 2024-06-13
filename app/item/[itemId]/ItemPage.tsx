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
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import {Item, Price} from "@/consts/types";
import { revalidateTag } from "next/cache";
import styles from '../../../styles/itemPage.module.scss';
import {ShoppingCartIcon} from "@heroicons/react/16/solid";
import {ItemCard} from "@/components/item/itemCard";

interface ItemPageProps {
    itemParam: Item | undefined;
}


export function ItemPage({ itemParam }: ItemPageProps) {
    const [item, setItem] = useState<Item | undefined>(itemParam);

    useEffect(() => {
        if (itemParam && item === undefined) {
            setItem(itemParam);
        }
    }, [itemParam]);


    return (
        <Container maxWidth="md" className={styles.container}>
            {item ? (
                <ItemCard item={item} variant={"normal"}/>
            ) : (
                <Typography variant="h6">Loading item...</Typography>
            )}
        </Container>
    );
}

export default ItemPage;


