import {getAccount, getItem} from "@/lib/DataFetchUtilsServer";
import AccountPage from "@/app/account/AccountPage";
import ItemPage from "@/app/item/[itemId]/ItemPage";

export default async function Page({ params }: { params: { itemId: number } }) {
    const item = await getItem(params.itemId)
    return (
        <>
            <ItemPage itemParam={item}/>
        </>
    );
}