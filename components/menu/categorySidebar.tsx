'use client'
import {SyntheticEvent, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { CategoryComponent, CategoryComposite } from '../../consts/types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { TreeViewBaseItem } from '@mui/x-tree-view/models';
import styles from '../../styles/categorySidebar.module.scss';

import Typography from '@mui/material/Typography';
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
    const [categories, setCategories] = useState<CategoryComposite[]>(initialCategories);
    useEffect(() => {
        if (items.length === 0) {
            const transformedItems = categories.map(value => transformCategoryToTreeViewItem(value));
            setItems(transformedItems);
        }
    }, [categories]);

    const [items, setItems] = useState<TreeViewBaseItem[]>([])
    const [lastSelectedItem, setLastSelectedItem] = useState<string | null>(null);

    const handleItemSelectionToggle = (
        event: SyntheticEvent,
        itemId: string,
        isSelected: boolean,
    ) => {
        if (isSelected) {
            setLastSelectedItem(itemId);
        }
    };

    return (
        <Stack className={styles.sidebar} spacing={2}>
            <Box sx={{ flex: "1 1 auto" }}>
                <RichTreeView
                    items={items}
                    onItemSelectionToggle={handleItemSelectionToggle}
                />
            </Box>
        </Stack>
    );
};
export default CategorySidebar






