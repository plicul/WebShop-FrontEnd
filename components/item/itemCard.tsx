import React, { useState } from "react";
import { Button, Card, CardContent, Chip, Tab, Tabs, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import styles from "@/styles/itemPage.module.scss";
import { Item, Price } from "@/consts/types";

interface ItemCardProps {
    item: Item;
    variant: "normal" | "small";
}

export function ItemCard({ item, variant }: ItemCardProps) {
    const [quantity, setQuantity] = useState<number>(1);
    const [tabValue, setTabValue] = useState<number>(0);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        if (value > 0) {
            setQuantity(value);
        }
    };

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabValue(newValue);
    };

    const getActivePrice = (prices: Price[]) => {
        return prices.find(price => price.activeFlag) || prices[0];
    };

    const getLowestPrice = (prices: Price[]) => {
        return prices.reduce((lowest, price) => price.amount < lowest.amount ? price : lowest, prices[0]);
    };

    const activePrice = item ? getActivePrice(item.prices) : null;
    const lowestPrice = item ? getLowestPrice(item.prices) : null;

    return (
        <Card className={`${styles.card} ${styles[variant]}`}>
            <img src={item.imagePath} alt={item.itemTitle} className={styles.image} />
            <CardContent>
                <Typography className={styles.title}>
                    {item.itemTitle}
                </Typography>
                <Chip label={`Category: ${item.category}`} className={styles.categoryChip} color="primary" />
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Description" />
                    <Tab label="Specification" />
                </Tabs>
                <div className={styles.tabContent}>
                    {tabValue === 0 && (
                        <Typography className={styles.description}>
                            {item.itemDescription}
                        </Typography>
                    )}
                    {tabValue === 1 && (
                        <Typography className={styles.description}>
                            {item.specification ?? ""}
                        </Typography>
                    )}
                </div>
                <div className={styles.priceSection}>
                    {activePrice && (
                        <>
                            <Typography className={styles.price}>
                                ${activePrice.amount.toFixed(2)}
                            </Typography>
                            {lowestPrice && activePrice.id !== lowestPrice.id && (
                                <Typography className={styles.lowestPrice}>
                                    Lowest Price: ${lowestPrice.amount.toFixed(2)}
                                </Typography>
                            )}
                        </>
                    )}
                </div>
                <div className={styles.buttonGroup}>
                    <TextField
                        type="number"
                        label=""
                        value={quantity}
                        onChange={handleQuantityChange}
                        className={styles.quantityInput}
                        inputProps={{ min: 1 }}
                    />
                    <Button
                        variant="contained"
                        className={styles.button}
                        startIcon={<ShoppingCartIcon />}
                    >
                        Add to Cart
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
