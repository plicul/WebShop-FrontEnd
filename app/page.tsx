import CategoryPage from "@/app/category/categoryPage";
import {getCategories} from "@/lib/DataFetchUtilsServer";

export default async function Page() {
  const initialCategories = await getCategories()

  return (
    <main >
      <CategoryPage initialCategories={initialCategories}/>
    </main>
  );
}
