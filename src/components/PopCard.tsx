import {
    Avatar, Box, Button, Divider, Paper, TextField, Typography,
} from '@mui/material';
import React, { useState } from 'react';
import ProgressBar from './ProgressBar';
import styles from './PopCard.module.scss';

const defaultProps = {
    foodYield: 0,
    prodYield: 0,
    progressVal: 0,
    progressMax: 0,
    hasTextField: false,
    max: 0,
};

interface Props {
    icon: string,
    cardTitle: string,
    foodYield?: number,
    prodYield?: number,
    progressVal?: number,
    progressMax?: number,
    buttonText: string,
    hasTextField?: boolean,
    onButtonClick: (value: number) => void,
    max?: number,
}

type PopCardProps = Props & typeof defaultProps;

const PopCard = (
    {
        icon,
        cardTitle,
        foodYield,
        prodYield,
        progressVal,
        progressMax,
        buttonText,
        hasTextField,
        onButtonClick,
        max,
    }: PopCardProps,
) => {
    const [value, setValue] = useState(max);

    return (
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
                {
                    hasTextField
                        ? (
                            <Box className={styles.textField}>
                                <Button
                                    onClick={() => value > 0 && setValue(value - 1)}
                                    variant="contained"
                                    size="small"
                                    disabled={!value}
                                >
                                    -
                                </Button>
                                <Typography>{value}</Typography>
                                <Button
                                    onClick={() => setValue(value + 1)}
                                    variant="contained"
                                    size="small"
                                    disabled={value >= max}
                                >
                                    +
                                </Button>
                            </Box>
                        )
                        : <ProgressBar value={progressVal} max={progressMax} />
                }
                <Button
                    className={styles.button}
                    variant="contained"
                    size="medium"
                    onClick={() => { onButtonClick(value); setValue(0); }}
                    disabled={!value}
                >
                    {buttonText}
                </Button>
            </Box>
        </Paper>
    );
};

PopCard.defaultProps = defaultProps;

export default PopCard;
