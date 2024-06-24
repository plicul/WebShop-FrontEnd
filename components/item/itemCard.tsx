import React, { useState } from "react";
import { Button, Card, CardContent, Chip, Tab, Tabs, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import styles from "@/styles/itemPage.module.scss";
import {Cart, CartItem, Item, Price} from "@/consts/types";
import {API_BASE} from "@/consts/global";
import {useLocalStorage} from "usehooks-ts";
import Image from "next/image";

interface ItemCardProps {
    item: Item;
    variant: "normal" | "small";
    onIconClick?: () => void;
    showError?: (message: string) => void
    showSuccess?: (message: string) => void
    showWarning?: (message: string) => void
}

export function ItemCard({ item, variant, onIconClick,showError,showWarning,showSuccess}: ItemCardProps) {
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

    const [cartId, setCartId, removeCartId] = useLocalStorage<number | undefined>('cartId',undefined)
    async function addToCart() {
        //provjeri je li postoji cartId
        //ako postoji retrievaj cart i update
        //inace napravi novi s ovim itemom
        if(cartId != undefined){
            //fetch get
            const cart: Cart | undefined= await fetch(API_BASE + `/cart/${cartId}`, {
                method: "GET"
            }).then(data => data.json())
                .then((cartTmp: Cart) => {
                    return cartTmp
                })
                .catch(error => {
                    return undefined
                })
            //provjeri je li postoji item koji dodajemo pa mu povecaj amount
            //inace dodaj novi
            if(cart != undefined && cart?.cartItems != undefined && cart?.cartItems.find(cartItem => cartItem.itemId === item.id) != undefined){
                cart.cartItems.find(cartItem => cartItem.itemId === item.id)!.amount += 1
            }
            else{
                const newCartItem : CartItem = {
                    id: undefined,
                    itemId: item.id,
                    itemItemTitle: item.itemTitle,
                    itemImagePath: item.imagePath,
                    itemPrice: activePrice?.amount,
                    cartId: cart?.id,
                    amount: 1,
                }
                cart?.cartItems.push(newCartItem)
            }

            //put req za update
            await fetch(API_BASE + `/cart/`,{
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "PUT",
                    body: JSON.stringify(cart)
                }
            ).then( async res => {
                if(res.status == 200) {
                    showSuccess && showSuccess("Item Added To Cart!")
                } else {
                    let mess = await res.text()
                    showWarning && showWarning("Item Unable To Be Added To Cart!")
                }
            }).catch(error => {
                showError && showError("ERROR!")
            })
        }
        else {
            const newCartItem : CartItem = {
                id: undefined,
                itemId: item.id,
                itemItemTitle: item.itemTitle,
                itemImagePath: item.imagePath,
                itemPrice: activePrice?.amount,
                cartId: undefined,
                amount: 1,
            }
            const newCart : Cart ={
                id:undefined,
                status: 1,
                cartItems: [newCartItem]
            }
            await fetch(API_BASE + `/cart/`, {
                method: "POST",
                body: JSON.stringify(newCart),
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(data => data.json())
                .then((cartTmpId: any) => {
                    setCartId(cartTmpId)
                    showSuccess && showSuccess("Item Added To Cart!")
                })
                .catch(error => {
                    showError && showError("ERROR!")
                    return undefined
                })
        }

    }

    return (
        <Card className={`${styles.card} ${styles[variant]}`}>
            <Image src={item.imagePath} width={200} height={200} alt={item.itemTitle} className={styles.image} onClick={() => {
                onIconClick != undefined ? onIconClick()
                    :
                    ""
            }}/>
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
                        onClick={async () => addToCart()}
                    >
                        Add to Cart
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
