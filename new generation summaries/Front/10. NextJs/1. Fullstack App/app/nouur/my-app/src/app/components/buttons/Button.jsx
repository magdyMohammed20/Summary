"use client";

import styles from "./button.module.css";
function Button({ logoFont }) {
  return (
    <button
      onClick={() => alert(10)}
      className={`${logoFont.className} ${styles.button}`}>
      Login
    </button>
  );
}

export default Button;
