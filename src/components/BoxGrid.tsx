'use client'

import { useNumberContext } from './NumberContext';
import { useState } from "react";
import Box from "./Box";

export default function BoxGrid() {
  const boxPosition = Array.from({ length: 81 }, (_, i) => i + 1);
  const { selectedNumber } = useNumberContext();
  const [boxContents, setBoxContents] = useState(Array(81).fill(0));

  const chooseBox = (pos: number) => {
    const newContents = [...boxContents];
    newContents[pos] = selectedNumber;

    if (checkBox(newContents)) {
      setBoxContents(newContents);
    }
  };

  function checkBox(contents: number[]) {
    // --- Righe ---
    for (let row = 0; row < 9; row++) {
      const start = row * 9;
      const end = start + 9;
      const seen = new Set();

      for (let i = start; i < end; i++) {
        const num = contents[i];
        if (num === 0) continue;
        if (seen.has(num)) {
          alert(`Duplicato trovato: ${num} nella riga ${row + 1}`);
          return false;
        }
        seen.add(num);
      }
    }

    // --- Colonne ---
    for (let col = 0; col < 9; col++) {
      const seen = new Set();
      for (let row = 0; row < 9; row++) {
        const i = row * 9 + col;
        const num = contents[i];
        if (num === 0) continue;
        if (seen.has(num)) {
          alert(`Duplicato trovato: ${num} nella colonna ${col + 1}`);
          return false;
        }
        seen.add(num);
      }
    }

    // --- Blocchi 3x3 ---
    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        const seen = new Set();
        for (let r = row; r < row + 3; r++) {
          for (let c = col; c < col + 3; c++) {
            const i = r * 9 + c;
            const num = contents[i];
            if (num === 0) continue;
            if (seen.has(num)) {
              alert(`Duplicato trovato: ${num} nel blocco`);
              return false;
            }
            seen.add(num);
          }
        }
      }
    }

    return true;
  }

  function handleSubmit() {
    const newContents = [...boxContents];
    if (newContents.includes(0)) {
      alert("Completa tutte le celle prima di inviare!");
      return;
    }

    if (checkBox(newContents)) {
      alert("Congratulazioni!");
    } else {
      alert("Non funzionante");
    }
  }

  return (
    <div className="relative min-h-screen text-white flex items-center justify-center">
      <div className="fixed left-8 top-1/2 -translate-y-1/2">
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded shadow"
        >
          SUBMIT
        </button>
      </div>

      <div className="grid grid-cols-9 grid-rows-9 border-gray-700">
        {boxPosition.map((pos, i) => {
          const row = Math.floor(i / 9);
          const col = i % 9;

          const borders = [
            col % 3 === 0 ? "border-l-4 border-gray-700" : "",
            row % 3 === 0 ? "border-t-4 border-gray-700" : "",
            col === 8 ? "border-r-4 border-gray-700" : "",
            row === 8 ? "border-b-4 border-gray-700" : "",
          ].join(" ");

          return (
            <div
              key={i}
              className={`inline-flex items-center justify-center border border-gray-700 text-white ${borders}`}
              onClick={() => chooseBox(i)}
            >
              <Box position={pos} content={boxContents[i]} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
