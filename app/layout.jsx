"use client";

import { useState } from "react";
import "./globals.css";
import { FaLightbulb } from "react-icons/fa";
import "leaflet/dist/leaflet.css";

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-4 right-6 z-50 bg-gray-300 dark:bg-gray-700 text-sm px-3 py-3 rounded-full border border-black"
        >
          <FaLightbulb className="text-xl dark:text-amber-500"></FaLightbulb>
        </button>
        {children}
      </body>
    </html>
  );
}