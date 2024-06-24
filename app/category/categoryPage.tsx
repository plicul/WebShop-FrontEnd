'use client'

import CategorySidebar from "@/components/category/categorySidebar";
import {Box} from "@mui/material";
import React, {useEffect, useState} from "react";
import {CategoryComposite, Item} from "@/consts/types";
import {ItemCard} from "@/components/item/itemCard";
import {CategoryContext} from "@/components/category/categoryContext";
import {API_BASE} from "@/consts/global";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2


interface CategoryPageProps {
    initialCategories: CategoryComposite[] | undefined;
}


export function ItemPage({ initialCategories }: CategoryPageProps) {
    const [items, setItems] = useState<Item[] | undefined>([]);
    const router = useRouter()

    const session = useSession()

    const [selectedCategory, setSelectedCategory] = useState<string>("")

    useEffect(() => {
        fetch(API_BASE + "/item/?" + new URLSearchParams({
            // @ts-ignore
            categories: selectedCategory
        }), {
            method: "GET",
            cache: "no-cache"
        }).then(data => data.json())
            .then((items: Item[]) => {
                setItems(items)
            })
            .catch(error => {
                console.log("error" + error + API_BASE)
            })
    }, [selectedCategory]);


    return (
        <>
            <CategoryContext.Provider
                value={{
                    setSelectedCategory: setSelectedCategory
                }}
            >
                <CategorySidebar initialCategories={initialCategories ?? []}/>
                <Grid container spacing={2}>
                    {items && items.map(item =>
                        <Grid xs={4}>
                            <ItemCard onIconClick={() => router.push("/item/"+item.id)} item={item} variant={"small"}/>
                        </Grid>
                    )
                    }
                </Grid>

            </CategoryContext.Provider>

        </>
    );
}

export default ItemPage;


