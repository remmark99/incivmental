"use client";

import React from "react";
import Image from "next/image";

import useResourcesStore from "../store/resourcesStore";

export default function Header() {
    const { food, science, production } = useResourcesStore((state) => state);

    return (
        <div className="w-full h-16 bg-blue-600 px-6 flex items-center">
            <Image src="/Apple.svg" alt="Food count" width={35} height={35} />
            <span>{food.toFixed(1)}</span>
            <Image
                src="/science.svg"
                alt="Science count"
                width={35}
                height={35}
            />
            <span>{science.toFixed(1)}</span>
            <Image
                src="/Production.svg"
                alt="Production count"
                width={35}
                height={35}
            />
            <span>{production.toFixed(1)}</span>
        </div>
    );
}
