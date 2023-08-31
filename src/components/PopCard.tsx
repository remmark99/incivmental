import { Avatar, Button, Divider, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import ProgressBar from "./ProgressBar";

interface Props {
    icon: string;
    cardTitle: string;
    foodYield?: number;
    prodYield?: number;
    progressVal?: number;
    progressMax?: number;
    buttonText: string;
    hasTextField?: boolean;
    onButtonClick: (value: number) => void;
    max?: number;
    buttonDisabled?: boolean;
}

export default function PopCard({
    icon,
    cardTitle,
    foodYield = 0,
    prodYield = 0,
    progressVal = 0,
    progressMax = 0,
    buttonText,
    hasTextField = false,
    onButtonClick,
    max = 0,
    buttonDisabled = false,
}: Props) {
    const [value, setValue] = useState(max);

    return (
        <Paper
            className="rounded-2xl max-w-[200px] cursor-pointer"
            elevation={1}
        >
            <div className="flex justify-center p-4 mx-6">
                <div className="grid justify-center items-center w-20 h-20 rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500">
                    <Avatar
                        variant="square"
                        className="w-[60px] h-[60px]"
                        alt="Pop clicker"
                        src={`/${icon}.svg`}
                    />
                </div>
            </div>
            <div className="p-4 pt-0 text-center leading-5 text-[rgba(52,71,103,1)]">
                <span className="font-medium block">{cardTitle}</span>
                <span className="text-sm">
                    <i>&quot;Your average worker Joe&quot;</i>
                </span>
                <Divider className="my-4 opacity-75" variant="fullWidth" />
                <div className="flex items-center justify-center mb-2">
                    {!!foodYield && (
                        <>
                            {foodYield}
                            <Image
                                src="/Apple.svg"
                                alt="Population food yield"
                                height={35}
                                width={35}
                            />
                        </>
                    )}
                    {!!prodYield && (
                        <>
                            {prodYield}
                            <Image
                                src="/Production.svg"
                                alt="Population production yield"
                                height={35}
                                width={35}
                            />
                        </>
                    )}
                </div>
                {hasTextField ? (
                    <div className="flex justify-between h-[30px]">
                        <Button
                            className="w-[30px]"
                            onClick={() => value > 0 && setValue(value - 1)}
                            variant="contained"
                            size="small"
                            disabled={!value}
                        >
                            -
                        </Button>
                        <Typography>{value}</Typography>
                        <Button
                            className="w-[30px]"
                            onClick={() => setValue(value + 1)}
                            variant="contained"
                            size="small"
                            disabled={value >= max}
                        >
                            +
                        </Button>
                    </div>
                ) : (
                    <ProgressBar value={progressVal} max={progressMax} />
                )}
                <Button
                    className="h-[30px] mt-[5px] w-full bg-[#1565c0]"
                    variant="contained"
                    size="medium"
                    onClick={() => {
                        onButtonClick(value);
                        setValue(0);
                    }}
                    disabled={buttonDisabled}
                >
                    {buttonText}
                </Button>
            </div>
        </Paper>
    );
}
