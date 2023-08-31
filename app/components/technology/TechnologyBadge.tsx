import React from "react";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import { line } from "d3";

import { TechnologyStatus } from "@/app/store/researchStore";

interface Props {
    name: TechnologyName;
    row: number;
    column: number;
    cost: number;
    status: TechnologyStatus;
    unlocks: BuildingNames[] | undefined;
    onClick: () => void;
    links: [xOffset: number, yOffset: number][];
}

function TechnologyBadge({
    name,
    cost,
    row,
    column,
    status,
    unlocks,
    onClick,
    links,
}: Props) {
    const tooltip = (
        <>
            <div>{name}</div>
            <div>{cost} science</div>
        </>
    );

    let containerStyles = "bg-[#b3ffab]";
    if (status === TechnologyStatus.Locked) {
        containerStyles = "bg-black text-white text-[40px] font-bold";
    } else if (status === TechnologyStatus.CanBeUnlocked) {
        containerStyles = "bg-[#6dd5ed]";
    }

    let data;
    if (status !== TechnologyStatus.Locked) {
        data = (
            <>
                <div className="w-[60px] h-[60px] flex justify-center items-center rounded-full bg-white/50">
                    <Image
                        width={50}
                        height={50}
                        src={`/${name}.svg`}
                        alt={`${name} technology`}
                    />
                </div>
                <div className="pl-2">
                    <div className="text-[16px] font-bold text-white/70">
                        {name}
                    </div>
                    <div>
                        {unlocks &&
                            unlocks.map((unlock) => (
                                <Image
                                    width={30}
                                    height={30}
                                    key={unlock}
                                    src={`${unlock}.svg`}
                                    alt={`${unlock} building`}
                                />
                            ))}
                    </div>
                </div>
            </>
        );
    } else {
        data = <div className="m-auto">???</div>;
    }

    return (
        <Tooltip title={tooltip}>
            <button
                type="button"
                className={`w-[300px] h-[90px] rounded-2xl flex cursor-pointer p-4 ${containerStyles} relative`}
                style={{ gridRowStart: row, gridColumnStart: column }}
                onClick={onClick}
            >
                {data}
                {links.map(([xOffset, yOffset]) => {
                    const width = 200 + xOffset * 500;
                    const height = 100 + Math.abs(yOffset) * 100 * 2;
                    let linkLine;

                    if (yOffset) {
                        linkLine = line()([
                            [0, height / 2],
                            [100, height / 2],
                            [100, height / 2 + 100 * -yOffset],
                            [width, height / 2 + 100 * -yOffset],
                        ]);
                    } else {
                        linkLine = line()([
                            [0, height / 2],
                            [width, height / 2],
                        ])!;
                    }

                    return (
                        <svg
                            width={width}
                            height={height}
                            className="absolute left-full pointer-events-none"
                            style={{
                                top: `calc(50% - ${(height - 2) / 2}px)`,
                            }}
                        >
                            <path
                                d={linkLine!}
                                stroke="black"
                                fill="none"
                                strokeWidth={1}
                            />
                        </svg>
                    );
                })}
            </button>
        </Tooltip>
    );
}

export default TechnologyBadge;
