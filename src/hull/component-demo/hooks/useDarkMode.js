import { useState, useEffect } from "react";

/**
 * Hook to automatically detect if the user prefers dark mode.
 * @returns {boolean} true if dark mode is enabled.
 */
export const useDarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            return window.matchMedia("(prefers-color-scheme: dark)").matches;
        }
        return false;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = (e) => {
            setIsDarkMode(e.matches);
        };

        mediaQuery.addEventListener("change", handleChange);

        setIsDarkMode(mediaQuery.matches);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    return isDarkMode;
};
