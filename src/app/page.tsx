'use client'

import Box from "@/components/Box";
import BoxGrid from "@/components/BoxGrid";
import Numbers from "@/components/Numbers";
import { NumberProvider } from "@/components/NumberContext";

export default function Home() {

  return (
    <div className="items-center sm:p-2">
     
      <h1 className="text-center text-5xl">SUDOKU</h1>
      <br /><br />
      

     
      <NumberProvider>
        <Numbers />
        <BoxGrid />
      </NumberProvider>
    </div>
  );
}
