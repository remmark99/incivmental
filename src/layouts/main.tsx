import React from "react";
import Link from "next/link";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import {
    AppBar,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import Image from "next/image";
import useResourcesStore from "@/app/store/resourcesStore";
import styles from "./main.module.scss";

function MainLayout({ children }: any) {
    const { food, science, production } = useResourcesStore((state) => state);

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar
                position="fixed"
                sx={{ width: "calc(100% - 300px)", ml: "300px" }}
            >
                <Toolbar>
                    <Image
                        src="/Apple.svg"
                        alt="Food count"
                        className={styles.resource}
                        width={35}
                        height={35}
                    />
                    <span>{food.toFixed(1)}</span>
                    <Image
                        src="/science.svg"
                        alt="Science count"
                        className={styles.resource}
                        width={35}
                        height={35}
                    />
                    <span>{science.toFixed(1)}</span>
                    <Image
                        src="/Production.svg"
                        alt="Production count"
                        className={styles.resource}
                        width={35}
                        height={35}
                    />
                    <span>{production.toFixed(1)}</span>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: 300,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: 300,
                        boxSizing: "border-box",
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Divider />
                <List>
                    {["Home", "Technology", "Buildings", "Map"].map((text) => (
                        <ListItem key={text} disablePadding>
                            <Link
                                href={
                                    text === "Home"
                                        ? "/"
                                        : `/${text.toLowerCase()}`
                                }
                            >
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
                sx={{ flexGrow: 1, bgColor: "background.default", p: 3 }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}

export default MainLayout;
