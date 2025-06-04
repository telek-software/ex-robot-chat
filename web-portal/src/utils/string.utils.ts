import { createElement } from "react";

/**
 * capitalize
 * @description
 * Capitalize the first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * formatSentence
 * @description
 * Format a sentence to break lines
 *
 */
export function formatSentence(str: string, modifier?: string) {
  const element = modifier ?? "span";

  return str
    .split(".")
    .filter((w) => w.trim() !== "")
    .map((w) => createElement(element, { key: w }, [`${w}.`]));
}
