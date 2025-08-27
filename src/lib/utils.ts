import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility functions for content truncation and read more functionality
 */

/**
 * Truncates text to a specified word limit
 * @param text - The text to truncate
 * @param wordLimit - Maximum number of words to show (default: 50)
 * @returns Object with truncated text and whether truncation occurred
 */
export function truncateContent(text: string, wordLimit: number = 50): {
  truncated: string;
  isTruncated: boolean;
  originalLength: number;
} {
  const words = text.split(' ');
  const isTruncated = words.length > wordLimit;
  const truncated = isTruncated 
    ? words.slice(0, wordLimit).join(' ') + '..'
    : text;
  
  return {
    truncated,
    isTruncated,
    originalLength: words.length
  };
}

/**
 * Checks if content needs a "Read More" button
 * @param text - The text to check
 * @param wordLimit - Word limit threshold (default: 50)
 * @returns Boolean indicating if read more is needed
 */
export function needsReadMore(text: string, wordLimit: number = 50): boolean {
  return text.split(' ').length > wordLimit;
}
