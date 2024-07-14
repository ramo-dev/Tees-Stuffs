"use client"
import {useState} from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import {ThemeContext} from "./context/ThemeContext"
import Footer from "./components/Footer.jsx";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  const [isDark, setIsDark] = useState(null);

  return (
    <html lang="en" className={`${isDark && "dark"}`}>
      <body className={inter.className}>
       <ThemeContext.Provider value={{ isDark,setIsDark}}>
          {children}
       </ThemeContext.Provider>
        </body>
    </html>
  );
}
