'use client'

import { useNumberContext } from './NumberContext';
import { useState } from "react";
import Box from "./Box";

export default function BoxGrid() {
  const boxPosition = Array.from({ length: 81 }, (_, i) => i + 1);

  const { selectedNumber } = useNumberContext();

  const [boxContents, setBoxContents] = useState(Array(81).fill(0)); //inizializza tutti i box a 0

  const chooseBox = (pos: number) => {
    const newContents = [...boxContents];
    newContents[pos] = selectedNumber; 

    if(checkBox(newContents)){ //passiamo newContents per avere i valori aggiornati
        setBoxContents(newContents);
    }
  }

  function checkBox (contents: number[]) { //returna false se la board non rispetta le regole
    for(let row = 0; row < 9; row++) { //questo for mi mette sulla riga x
        const start = row * 9;
        const end = start + 9;
        const seen = new Set(); //Seen = data structure che non puo contenere duplicati
        // console.log(`Controllo riga ${row + 1}:`);

        for(let i = start; i < end; i++) { //questo for controlla la riga
            const num = contents[i]; //inizia da 0, perchè i alla prima iterazione è = 0
            if(num == 0) continue
            if(seen.has(num)) { //prima verifichi che non ci sia un duplicato nella riga
                // console.log(`Duplicato trovato: ${num} nella riga ${row + 1}`);
                alert(`Duplicato trovato: ${num} nella riga ${row + 1}`)
                return false;
            } else { //se non ce duplicato lo aggiungi al set della riga
                seen.add(num);
            }
        }
    }
    for(let col = 0; col < 9; col++) {
        const seen = new Set();
        // console.log(`Controllo colonna ${col + 1}:`);

        for(let row = 0; row < 9; row++){
            const i = row * 9 + col;
            const num = contents[i];
            if(num == 0) continue
            if(seen.has(num)) {
                // console.log(`Duplicato trovato: ${num} nella colonna ${col + 1}`);
                alert(`Duplicato trovato: ${num} nella colonna ${col + 1}`)
                return false;
            } else {
                seen.add(num);
            }
        }
    }

    //incomprensibile (chatgpt)
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
            } else {
                seen.add(num);
            }
        }
        }
    }
    }
    return true;
  }

    function handleSubmit() { // se c'è almeno un 0 nella board
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="grid grid-cols-9 grid-rows-9 w-fit border-gray-700">
        {boxPosition.map((pos, i) => {
          const row = Math.floor(i / 9);
          const col = i % 9;

          const borders = [
            col % 3 === 0 ? "border-l-4 border-gray-700" : "",
            row % 3 === 0 ? "border-t-4 border-gray-700" : "",
            col === 8 ? "border-r-4 border-gray-700" : "",
            row === 8 ? "border-b-4 border-gray-700" : "",
          ].join("  ");

          return (
            <div
              key={i}
              className={`flex items-center justify-center border-1 border-gray-700 text-white ${borders}`}
              onClick={() => chooseBox(i)}
              >

              <Box position={pos} content={boxContents[i]} />
            </div>
          );
        })}
      </div>
      <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow">SUBMIT</button>
    </div>
  );
}
