'use client'

import { useState } from "react";

interface BoxProps {
  position: number;
  content: number;
}

export default function Box({ position, content }: BoxProps) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);

    // Reset the effect after a short time
    setTimeout(() => setIsClicked(false), 150);
  };

  return (
    <input
      type="button"
      value={content}
      onClick={handleClick}
      className={`cursor-pointer p-6 rounded transition 
        ${isClicked ? "scale-95 bg-gray-600/30" : "scale-100 bg-gray-800/10"} 
        hover:bg-gray-600/20 active:scale-95`}
    />
  );
}
