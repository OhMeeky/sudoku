'use client'

import { useState } from "react";
import { useNumberContext } from "./NumberContext";

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Numbers() {
  const { setSelectedNumber } = useNumberContext();
  const [activeNum, setActiveNum] = useState<number | null>(null);

  const chooseNumber = (value: number) => {
    setSelectedNumber(value);
    setActiveNum(value);
  };

  return (
    <div className="flex justify-center">
      {nums.map((n) => (
        <button
          key={n}
          onClick={() => chooseNumber(n)}
          className={`px-4 py-2 rounded mr-4 transition cursor-pointer
            ${
              activeNum === n
                ? "border border-blue-500 text-blue-500 bg-transparent"
                : "bg-blue-500 text-white"
            }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}
