import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
    return (
        <Drawer className="w-[300px]" variant="permanent" anchor="left">
            <Toolbar />
            <Divider />
            <List className="w-[300px]">
                {["Home", "Technology", "Buildings", "Map"].map((text) => (
                    <ListItem key={text} disablePadding>
                        <Link
                            className="w-full"
                            href={
                                text === "Home" ? "/" : `/${text.toLowerCase()}`
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
    );
}
