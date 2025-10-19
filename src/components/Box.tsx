'use client'

import { useEffect } from "react";

interface BoxProps {
    position: number;
    content: number;
}


export default function Box({position, content} : BoxProps) {
    return (
            // {/* <div>{content}</div> */}
        // <input>{position}</input>
        <input type="button" value={content} className="cursor-pointer p-6 "/> 
    );
}