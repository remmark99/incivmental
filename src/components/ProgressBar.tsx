import React from "react";
import LinearProgress from "@mui/material/LinearProgress";

import styles from "./ProgressBar.module.scss";

const normalise = (value: number, max: number) => (value * 100) / max;

interface Props {
    value: number;
    max: number;
}

function ProgressBar({ value, max }: Props) {
    return (
        <div className={`${styles.container} w-full relative`}>
            <span>{`${Math.floor(value)} / ${max}`}</span>
            <LinearProgress
                variant="determinate"
                value={normalise(value, max)}
            />
        </div>
    );
}

export default ProgressBar;
