import {API_BASE} from "@/consts/global";
import {Cart} from "@/consts/types";

export async function checkout(cart: Cart, userName: string){
    const res = await fetch(API_BASE + `/cart/checkout/${userName}`, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify(cart),
    }).then(data => data.json())
        .then((response: String) => {
            return response
        })
        .catch(error => {
            console.log("error" + error)
        })
    return res
}