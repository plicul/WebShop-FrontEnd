
export interface CategoryComponent{
    id: number;
    category: string;
    level: number;
    parent: number | null;
}

export interface CategoryComposite extends CategoryComponent {
    subcategories: CategoryComponent[];
}

export type MenuItem = {
    name: string;
    routePath: string
}