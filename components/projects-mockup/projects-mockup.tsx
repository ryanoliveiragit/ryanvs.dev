"use client";
import Image from "next/image";
import { useState } from "react";
import { HoverCardDemo } from "../hoverCard";

type ProjectMockupType = {
    title: string;
    description: string;
    introduction?: string;
    image: string;
    altImage: string;
};

export const ProjectMockup = ({
    title,
    description,
    image,
    introduction,
    altImage,
}: ProjectMockupType) => {
    return (
        <>
            <div className="flex flex-col gap-3 mt-10">
                <h2 className="text-xl font-semibold ">{title} </h2>
                <h3 className="text-md font-semibold ">⚡️{description}</h3>
                <p className="dark:text-[#b8b8b8] text-sm">{introduction}</p>
            </div>

            <div className="w-full h-full flex flex-col gap-2 items-start">
                <Image alt={altImage} height={400} width={900} src={`${image}`} />
                <HoverCardDemo name={title} image={`${image}`} />
            </div>
            <hr className="" />
        </>
    );
};
