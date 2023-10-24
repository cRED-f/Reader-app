import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// clsname is a wrapper around clsx that merges tailwind classes
export function clsname(...args: ClassValue[]) {
  return twMerge(clsx(args));
}
