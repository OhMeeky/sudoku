'use client'

import { createContext, useState, useContext, ReactNode } from 'react';

interface NumberContextType {
  selectedNumber: number | null;
  setSelectedNumber: (num: number) => void;
}

const NumberContext = createContext<NumberContextType | undefined>(undefined);

export function NumberProvider({ children }: { children: ReactNode }) {
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);

  return (
    <NumberContext.Provider value={{ selectedNumber, setSelectedNumber }}>
      {children}
    </NumberContext.Provider>
  );
}

export function useNumberContext() {
  const context = useContext(NumberContext);
  if (!context) throw new Error("useNumberContext must be used within a NumberProvider");
  return context;
}
