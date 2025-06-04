import { Acme, Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const fontCool = Acme({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-cool",
});

export const AppFonts = `${inter.variable} ${fontCool.variable}`;
