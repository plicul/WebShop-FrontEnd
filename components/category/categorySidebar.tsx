'use client'
import {SyntheticEvent, useContext, useEffect, useState} from 'react';
import { GetServerSideProps } from 'next';
import { CategoryComponent, CategoryComposite } from '../../consts/types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import styles from '../../styles/categorySidebar.module.scss';

import Typography from '@mui/material/Typography';
import {CategoryContext} from "@/components/category/categoryContext";
import {Drawer} from "@mui/material";
interface SidebarProps {
    initialCategories: CategoryComposite[];
    className?: string
}


const transformCategoryToTreeViewItem = (category: CategoryComponent): TreeViewBaseItem => {
    const {category: id, category: label, subcategories} = category as CategoryComposite;
    let children: TreeViewBaseItem[] | undefined;

    if (subcategories && subcategories.length > 0) {
        children = subcategories.map(subCategory => transformCategoryToTreeViewItem(subCategory));
    }

    return {
        id,
        label,
        children
    };
};

const CategorySidebar: React.FC<SidebarProps> = ({ initialCategories,className }) => {

    const categoryContext = useContext(CategoryContext)

    const [categories, setCategories] = useState<CategoryComposite[]>(initialCategories);
    useEffect(() => {
        if (items.length === 0) {
            const transformedItems = categories.map(value => transformCategoryToTreeViewItem(value));
            setItems(transformedItems);
        }
    }, [categories]);

    const [items, setItems] = useState<TreeViewBaseItem[]>([])
    const [lastSelectedItem, setLastSelectedItem] = useState<string | null>(null);

    useEffect(() => {
        if(lastSelectedItem != null)
            categoryContext?.setSelectedCategory(lastSelectedItem)
    }, [lastSelectedItem]);

    const handleItemSelectionToggle = (
        event: SyntheticEvent,
        itemId: string,
        isSelected: boolean,
    ) => {
        if (isSelected) {
            setLastSelectedItem(itemId);
        }
    };
    {/*
    <Stack className={styles.sidebar} spacing={2}>
        <Box sx={{flex: "1 1 auto"}}>
            <RichTreeView
                items={items}
                onItemSelectionToggle={handleItemSelectionToggle}
            />
        </Box>
    </Stack>
    */}
    return (
        <Drawer anchor="left" variant={"permanent"} open={true}
                PaperProps={{
                    sx: {
                        height: 'calc(100% - 50px)',
                        top: 50,
                    },
                }}
                sx={{
                    width: "8.6vw",
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: "8.6vw", boxSizing: 'border-box' },
                }}
        >
            <Box sx={{ flex: "1 1 auto" }}>
                <RichTreeView
                    items={items}
                    onItemSelectionToggle={handleItemSelectionToggle}
                />
            </Box>
        </Drawer>

    );
};
export default CategorySidebar






