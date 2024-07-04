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
import {Add, Delete, ExpandLess, ExpandMore, Save} from '@mui/icons-material';
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import {Cart, CartItem, CategoryComposite, Item, Price} from "@/consts/types";
import { revalidateTag } from "next/cache";
import styles from '../../../styles/itemPage.module.scss';
import {ShoppingCartIcon} from "@heroicons/react/16/solid";
import {ItemCard} from "@/components/item/itemCard";
import {useLocalStorage} from "usehooks-ts";
import {API_BASE} from "@/consts/global";
import {DataGrid, GridColDef, GridRowsProp, GridToolbarContainer} from "@mui/x-data-grid";

interface ItemPageProps {
    categories: { value: string; label: string; }[]
}

//datagrid
export function ItemPage({categories}: ItemPageProps) {
    const [items, setItems] = useState<Item[]>([]);
    const [deletedItems, setDeletedItems] = useState<Item[]>([]);

    useEffect(() => {
        if(items.length < 1){
            //fetch get
            fetch(API_BASE + `/item/`, {
                method: "GET"
            }).then(data => data.json())
                .then((itemsTemp: Item[]) => {
                    setItems(itemsTemp)
                })
                .catch(error => {
                    console.log("error" + error + API_BASE)
                })
        }
    }, []);

    //const rows: GridRowsProp = Array.isArray(items) ? (items as Item[]).map((row) => row) : [];
    const [rows,setRows] = useState<GridRowsProp>(items)
    useEffect(() => {
        setRows(Array.isArray(items) ? (items as Item[]).map((row) => row) : [])
    }, [items]);

    const columns: GridColDef[] = [
        { field: 'itemTitle', headerName: 'Title', width: 100 , editable: true},
        { field: 'category', headerName: 'Category', width: 150 , editable: true, type: "singleSelect", valueOptions: categories},
        { field: 'itemDescription', headerName: 'Description', width: 100 , editable: true},
        { field: 'quantity', headerName: 'Quantity', width: 100 , editable: true, type:"number"},
        { field: 'imagePath', headerName: 'Image Path', width: 100 , editable: true, type:"string"},
        { field: 'price', headerName: 'Price', valueGetter: (value, row, column, apiRef) => row.prices[0].amount,
            valueSetter: (value, row) => {
                (row as Item).prices[0].amount = value
                return row
            }
            , width: 100 , editable: true, type:"number"},

    ] ;

    async function save() {
        await fetch(API_BASE + `/item/`,{
                headers: {
                    "Content-Type": "application/json"
                },
                method: "DELETE",
                body: JSON.stringify(deletedItems.map(value => value.id))
            }
        ).then( async res => {
            if(res.status == 200) {
                return true
            } else {
                console.log("handeld error")
            }
        }).catch(error => {
            console.log("error" + error)
        })

        await fetch(API_BASE + `/item/`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(items),
        }).then(data => data.json())
            .then((response: Boolean) => {
            })
            .catch(error => {
                console.log("error" + error)
            })
    }
    async function addRow() {

        const newItem: Item = {
            id: null,itemTitle: "newItem", itemDescription: "",category: "",  prices: [], imagePath: ""
        } as Item

        await fetch(API_BASE + `/item/`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(newItem),
        }).then(data => data.json())
            .then((response: Boolean) => {
            })
            .catch(error => {
                console.log("error" + error)
            })

        //const newItems = items.map(value => value)
        //newItems.push(newItem)
        //setItems(newItems)
    }
    async function deleteRows() {
        const updatedItems: Item[] = [];
        items.forEach((row) => {
            if (!selectedRowIds?.includes(row.itemTitle)) {
                updatedItems.push(row);
            }
            else if(row.itemTitle != ""){
                deletedItems.push(row)
            }
        });
        setItems(updatedItems)
        //items.splice(0, items.length, ...updatedItems);
        selectedRowIds.splice(0, selectedRowIds?.length);
    }
    async function updateRow(newRow: any, oldRow: any) {
        const updatedItems: Item[] = [];
        items.forEach((row) => {
            if (!(row.id == newRow.id)) {
                updatedItems.push(row);
            }
        });
        updatedItems.push(newRow)
        updatedItems.sort((a, b) => {
            if(a.id>=b.id)
                return 1
            else
                return -1
        })
        setItems(updatedItems)
        //items.splice(items.indexOf(oldRow as Item),1,newRow as Item);
        return newRow;
    }

    const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
    const handleSelectionChange = (selection: any) => {
        setSelectedRowIds(selection);
    }
    function CustomToolbar() {
        return (
            <GridToolbarContainer sx={{paddingBottom:"2px", border:"0px"}}>
                <IconButton onClick={() => deleteRows()}> <Delete /> </IconButton>
                <IconButton onClick={() => save()}> <Save /> </IconButton>
                <IconButton onClick={() => addRow()}> <Add /> </IconButton>
            </GridToolbarContainer>
        );
    }



    return (
        <Container maxWidth="md" className={styles.container}>
            <DataGrid
                columns={columns}
                rows={items} getRowId={(row) => row.itemTitle}
                onRowSelectionModelChange={handleSelectionChange}
                editMode={"row"}
                checkboxSelection disableRowSelectionOnClick
                slots={{toolbar: CustomToolbar,}}
                processRowUpdate={async (newRow, oldRow) => await updateRow(newRow, oldRow)}
            />
        </Container>
    );
}

export default ItemPage;


