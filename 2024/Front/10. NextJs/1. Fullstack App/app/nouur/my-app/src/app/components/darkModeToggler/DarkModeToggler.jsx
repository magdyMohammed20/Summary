"use client";

import React, { useContext } from "react";
import styles from "./styles.module.css";
import { ThemeContext } from "@/context/themeProvider";
function DarkModeToggler() {
  const { mode, toggler } = useContext(ThemeContext);

  return (
    <div className={styles.container} onClick={toggler}>
      <div className={styles.icon}>☀️</div>
      <div className={styles.icon}>🌙</div>
      <div
        className={`${styles.switcher}`}
        style={mode == "light" ? { left: "47%" } : { left: "6%" }}
      />
    </div>
  );
}

export default DarkModeToggler;
