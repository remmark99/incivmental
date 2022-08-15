import React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import styles from './ProgressBar.module.scss';

const normalise = (value: number, max: number) => ((value * 100) / max);

interface Props {
    value: number,
    max: number,
}

function ProgressBar({ value, max }: Props) {
    return (
        <Box className={styles.container} sx={{ width: '100%' }}>
            <span>{`${value} / ${max}`}</span>
            <LinearProgress variant="determinate" value={normalise(value, max)} />
        </Box>
    );
}

export default ProgressBar;
