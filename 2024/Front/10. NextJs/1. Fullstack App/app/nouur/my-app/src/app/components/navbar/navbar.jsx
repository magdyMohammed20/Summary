import navbarStyles from "./navbar.module.css";
import { navLinks } from "./data";
import Link from "next/link";
import Button from "../buttons/Button";
import { Montserrat, Noto_Kufi_Arabic } from "next/font/google";
import DarkModeToggler from "../darkModeToggler/DarkModeToggler";
const logoFont = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["100"],
});

function Navbar() {
  return (
    <div className={navbarStyles.container}>
      <div className={navbarStyles.logo}>HexaShop</div>

      <nav className={navbarStyles.nav}>
        <ul className={navbarStyles.links}>
          <DarkModeToggler />
          {navLinks.map(({ id, title, url }) => (
            <li key={id}>
              <Link
                href={url}
                className={`${navbarStyles.link} ${logoFont.className}`}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <Button logoFont={logoFont} />
      </nav>
    </div>
  );
}

export default Navbar;
