
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

export interface Account {
    id: number;
    name: string;
    password: string;
    type?: UserType;
    contact?: Contact;
    address?: Address;
}
interface UserType {
    //TODO
    id: number;
    name: string;
}

interface Contact {
    id: number;
    phoneNumber?: string;
    email: string;
    firstName: string;
    lastName: string;
    creationDate: Date;
}

interface Address {
    id: number;
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
    creationDate: Date;
}

export interface Item {
    id: number;
    itemTitle: string;
    itemDescription: string;
    category: string;
    prices: Price[];
    specification?: string;
    imagePath: string;
}
export interface Price {
    id: number;
    priceType: string;
    activeFlag: boolean;
    amount: number;
}