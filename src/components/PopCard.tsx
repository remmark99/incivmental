import {
    Avatar, Box, Button, Divider, Paper, Typography,
} from '@mui/material';
import React from 'react';
import ProgressBar from './ProgressBar';
import styles from './PopCard.module.scss';

interface Props {
    icon: string,
    cardTitle: string,
    foodYield?: number,
    prodYield?: number,
    progressVal: number,
    progressMax: number,
    buttonText: string,
}

const PopCard = (
    {
        icon, cardTitle, foodYield, prodYield, progressVal, progressMax, buttonText,
    }: Props,
) => (
    <Paper className={styles.paper} elevation={1}>
        <Box className={styles.iconBox}>
            <Box>
                <Avatar
                    alt="Pop clicker"
                    src={`/${icon}.svg`}
                />
            </Box>
        </Box>
        <Box className={styles.descriptionBox}>
            <Typography variant="h6">{cardTitle}</Typography>
            <Typography variant="caption"><i>&quot;Your average worker Joe&quot;</i></Typography>
            <Divider variant="fullWidth" />
            <Typography variant="h5">
                {foodYield !== 0 && (
                    <>
                        {foodYield}
                        <img src="/Apple.svg" alt="Population food yield" />
                        {' '}
                    </>
                )}
                {prodYield !== 0 && (
                    <>
                        {prodYield}
                        <img src="/Production.svg" alt="Population production yield" />
                    </>
                )}
            </Typography>
            <ProgressBar value={progressVal} max={progressMax} />
            <Button
                className={styles.button}
                variant="contained"
                size="medium"
            >
                {buttonText}
            </Button>
        </Box>
    </Paper>
);

PopCard.defaultProps = {
    foodYield: 0,
    prodYield: 0,
};

export default PopCard;
