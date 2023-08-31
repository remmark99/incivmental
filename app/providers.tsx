"use client";

import { StyledEngineProvider } from "@mui/material";
import React, { useEffect } from "react";
import useResourcesStore from "./store/resourcesStore";

interface Props {
    children: React.ReactNode;
}

export default function Providers({ children }: Props) {
    const updateResources = useResourcesStore((state) => state.updateResources);

    useEffect(() => {
        setInterval(() => updateResources(), 100);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>;
}
