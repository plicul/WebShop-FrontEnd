import {createContext} from "react";

export type CategoryContext = {
    setSelectedCategory: (x: string) => void
}

export const CategoryContext = createContext<CategoryContext | null>(null)