import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const element = document.querySelector('html');
    element.classList.remove("light", "dark");
    if(darkMode) {
        element.classList.add("dark");
    } else {
        element.classList.add("light");
    }
  }, [darkMode])

  return (
    <nav className="sticky top-0 md:h-[72px] h-[65px] md:px-[35px] px-[15px] bg-[#ffffffd0] dark:bg-[#21242bb6] shadow-custom backdrop-blur-sm flex justify-end">
      <button className="p-5 rounded-full text-lg font-semibold">
        {darkMode ? (
          <FaSun size={26} className="text-white" onClick={toggleDarkMode} />
        ) : (
          <FaMoon size={26} className="text-gray-900" onClick={toggleDarkMode} />
        )}
      </button>
    </nav>
  );
}
