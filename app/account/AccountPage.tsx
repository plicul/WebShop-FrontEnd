'use client';

import {Box, Button, Container, Card, CardContent, Typography, IconButton, Alert} from "@mui/material";
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { Account } from "@/consts/types";
import { updateAccount } from "@/lib/account/utils";
import { revalidateTag } from "next/cache";
import styles from '../../styles/AccountPage.module.scss';

interface AccountPageProps {
    accountParam: Account | undefined;
}

export function AccountPage({ accountParam }: AccountPageProps) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [account, setAccount] = useState<Account | undefined>(accountParam);
    const [visibleSections, setVisibleSections] = useState({
        accountDetails: true,
        contactInfo: true,
        addressInfo: true,
    });

    useEffect(() => {
        if (accountParam && account == undefined) setAccount(accountParam);
    }, [accountParam]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (account) {
            const { name, value } = e.target;
            const updatedAccount = { ...account };

            const propertyPath = name.split('.');
            let tempObject = updatedAccount;

            for (let i = 0; i < propertyPath.length; i++) {
                const key = propertyPath[i];
                if (i === propertyPath.length - 1) {
                    // @ts-ignore
                    tempObject[key] = value;
                } else {
                    // @ts-ignore
                    if (!tempObject[key]) {
                        // @ts-ignore
                        tempObject[key] = {};
                    }
                    // @ts-ignore
                    tempObject = tempObject[key];
                }
            }

            setAccount(updatedAccount);
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (account) {
            try {
                setSuccess("Account Data Edited Successfully!")
            }
            catch (e) {
                setError("Error Updating Account Info!")
            }
            await updateAccount(account);
            revalidateTag("accountTag");
        }
    };

    const toggleSection = (section: string) => {
        setVisibleSections((prevState) => ({
            ...prevState,
            // @ts-ignore
            [section]: !prevState[section],
        }));
    };

    return (
        <Container maxWidth="md" className={styles.container}>
            <Typography variant="h4" component="h1" gutterBottom className={styles.title}>
                Edit Account
            </Typography>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <Card className={styles['form-group']}>
                        <CardContent>
                            <div className={styles.subtitle}>
                                <Typography variant="h5" component="h2">
                                    Account Details
                                </Typography>
                                <IconButton onClick={() => toggleSection('accountDetails')}>
                                    {visibleSections.accountDetails ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </div>
                            <div className={!visibleSections.accountDetails ? styles.hidden : ''}>
                                <TextField
                                    className={styles.textField}
                                    label="Name"
                                    name="name"
                                    value={account?.name || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    className={styles.textField}
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={account?.password || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className={styles['form-group']}>
                        <CardContent>
                            <div className={styles.subtitle}>
                                <Typography variant="h5" component="h2">
                                    Contact Information
                                </Typography>
                                <IconButton onClick={() => toggleSection('contactInfo')}>
                                    {visibleSections.contactInfo ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </div>
                            <div className={!visibleSections.contactInfo ? styles.hidden : ''}>
                                <TextField
                                    className={styles.textField}
                                    label="Phone Number"
                                    name="contact.phoneNumber"
                                    value={account?.contact?.phoneNumber || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    className={styles.textField}
                                    label="Email"
                                    name="contact.email"
                                    value={account?.contact?.email || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    className={styles.textField}
                                    label="First Name"
                                    name="contact.firstName"
                                    value={account?.contact?.firstName || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    className={styles.textField}
                                    label="Last Name"
                                    name="contact.lastName"
                                    value={account?.contact?.lastName || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className={styles['form-group']}>
                        <CardContent>
                            <div className={styles.subtitle}>
                                <Typography variant="h5" component="h2">
                                    Address Information
                                </Typography>
                                <IconButton onClick={() => toggleSection('addressInfo')}>
                                    {visibleSections.addressInfo ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                            </div>
                            <div className={!visibleSections.addressInfo ? styles.hidden : ''}>
                                <TextField
                                    className={styles.textField}
                                    label="Street Address"
                                    name="address.streetAddress"
                                    value={account?.address?.streetAddress || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    className={styles.textField}
                                    label="City"
                                    name="address.city"
                                    value={account?.address?.city || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    className={styles.textField}
                                    label="Postal Code"
                                    name="address.postalCode"
                                    value={account?.address?.postalCode || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                />
                                <TextField
                                    className={styles.textField}
                                    label="Country"
                                    name="address.country"
                                    value={account?.address?.country || ''}
                                    onChange={handleChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {error && (
                        <Alert severity="error">{error}</Alert>
                    )}
                    {success && (
                        <Alert severity="success">{success}</Alert>
                    )}
                    <Button type="submit" variant="contained" color="primary" className={styles.button}>
                        Save Changes
                    </Button>
                </form>
        </Container>
    );
}

export default AccountPage;