import React from 'react';
import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import {
    AppBar,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import styles from './main.module.scss';
import { useAppSelector } from '../redux/hooks';
import { selectFood, selectProduction, selectScience } from '../redux/reducers/resources';

const MainLayout = ({ children }: any) => {
    const food = useAppSelector(selectFood);
    const science = useAppSelector(selectScience);
    const production = useAppSelector(selectProduction);

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ width: 'calc(100% - 300px)', ml: '300px' }}>
                <Toolbar>
                    <img src="/Apple.svg" alt="Food count" className={styles.resource} />
                    <span>{ food.toFixed(1) }</span>
                    <img src="/science.svg" alt="Science count" className={styles.resource} />
                    <span>{ science.toFixed(1) }</span>
                    <img src="/Production.svg" alt="Production count" className={styles.resource} />
                    <span>{ production.toFixed(1) }</span>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: 300,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 300,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    {['Home', 'Technology', 'Buildings', 'Map'].map((text) => (
                        <ListItem key={text} disablePadding>
                            <Link href={text === 'Home' ? '/' : `/${text.toLowerCase()}`}>
                                <ListItemButton>
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgColor: 'background.default', p: 3 }}
            >
                <Toolbar />
                { children }
            </Box>
        </Box>
    );
};

export default MainLayout;
