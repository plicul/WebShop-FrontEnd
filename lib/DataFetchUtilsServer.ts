'use server'
import {API_BASE} from "@/consts/global";
import {Account, CategoryComposite, Item, MenuItem} from "@/consts/types";
import {auth} from "@/auth";

export async function getCategories() {
    const categories: CategoryComposite[] | undefined = await fetch(API_BASE + "/item-category/tree", {
        method: "GET",
        cache: "no-cache"
    }).then(data => data.json())
        .then((categories: CategoryComposite[]) => {
            return categories
        })
        .catch(error => {
            console.log("error" + error + API_BASE)
            return undefined
        })

    return categories
}
export async function getCategoriesName() {
    const categories: String[] | undefined = await fetch(API_BASE + "/item-category/", {
        method: "GET",
        cache: "no-cache"
    }).then(data => data.json())
        .then((categories: String[]) => {
            return categories
        })
        .catch(error => {
            console.log("error" + error + API_BASE)
            return undefined
        })

    return categories
}

export async function getMenuList() {
    const menuList: MenuItem[] | undefined = await fetch(API_BASE + "/menu/", {
        method: "GET",
        cache: "no-cache"
    }).then(data => data.json())
        .then((menuItems: MenuItem[]) => {
            return menuItems
        })
        .catch(error => {
            console.log("error" + error + API_BASE)
            return undefined
        })

    return menuList
}

export async function getAccount() {
    const session = await auth()

    const account: Account | undefined = await fetch(API_BASE + "/user/?" + new URLSearchParams({
        // @ts-ignore
        userName: session?.userName,
    }), {
        next:{tags:["accountTag"]},
        method: "GET",
        cache: "no-cache"
    }).then(data => data.json())
        .then((account1: Account) => {
            return account1
        })
        .catch(error => {
            console.log("error" + error + API_BASE)
            return undefined
        })

    return account
}

export async function getItem(itemId: number){
    const session = await auth()

    const item: Item | undefined = await fetch(API_BASE + "/item/?" + new URLSearchParams({
        // @ts-ignore
        itemId: itemId.toString(),
    }), {
        next:{tags:["item"]},
        method: "GET",
        //cache: "no-cache"
    }).then(data => data.json())
        .then((item1: Item) => {
            return item1
        })
        .catch(error => {
            console.log("error" + error + API_BASE)
            return undefined
        })

    return item
}