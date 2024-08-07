import {getAccount} from "@/lib/DataFetchUtilsServer";
import AccountPage from "@/app/account/AccountPage";

export default async function Page() {
    const account = await getAccount()
    return (
        <>
            <AccountPage accountParam={account}/>
        </>
    );
}