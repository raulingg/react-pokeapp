import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function wait(timeInMilliseconds = 1000) {
  return new Promise((resolve)=> {
      setTimeout(resolve, timeInMilliseconds)
  })
}
