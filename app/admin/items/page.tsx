import ItemPage from "@/app/admin/items/itemPage";
import {getCategories, getCategoriesName} from "@/lib/DataFetchUtilsServer";

export default async function Page() {
    const categories = await getCategoriesName()

    return (
        <>
            <ItemPage
                categories={categories?.map((category) => (
                    {
                        value: category,
                        label: category,
                    }
                )) ?? []}
            />
        </>
    );
}