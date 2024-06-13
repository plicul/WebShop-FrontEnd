'use server'

import {Account} from "@/consts/types";
import {API_BASE} from "@/consts/global";

export const updateAccount = async (account: Account): Promise<void> => {
    const response = await fetch(API_BASE + '/user/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(account),
    });
    if (!response.ok) {
        throw new Error('Failed to update account data');
    }
};