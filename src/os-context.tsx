import { createContext, useContext } from "react";
import type { Os } from "./types";

export const OsContext = createContext<Os>("mac");

export function useOs(): Os {
  return useContext(OsContext);
}
