import {getAccount, getCategories} from "@/lib/DataFetchUtilsServer";
import AccountPage from "@/app/account/AccountPage";
import CategorySidebar from "@/components/category/categorySidebar";
import CategoryPage from "@/app/category/categoryPage";

export default async function Page() {
    const initialCategories = await getCategories()

    return (
        <>
            <CategoryPage initialCategories={initialCategories ?? []} />
        </>
    );
}