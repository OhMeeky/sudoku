'use client'

import { useEffect } from "react";
import { useNumberContext } from "./NumberContext";

const nums = [1,2,3,4,5,6,7,8,9];



export default function Numbers({}) {
    const { setSelectedNumber } = useNumberContext();

    function chooseNumber(value: number) {
        console.log(value);
        setSelectedNumber(value);
    }

    return (
        <div className="flex justify-center">
            {nums.map((n) => (
                <div key={n}>
                    <input type="button" value={n} onClick={() => setSelectedNumber(n)} className="bg-blue-500 text-white px-4 py-2 rounded mr-4 cursor-pointer" />
                </div>
            ))}
        </div>
    )
}