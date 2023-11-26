import styles from "./style.module.css";
import Image from "next/image";
import { socials } from "./data";
function Footer() {
  return (
    <div className={styles.container}>
      <div>&copy; All Copyrights Rserved</div>

      <div className={styles.social}>
        {socials.map((media) => (
          <Image
            className={styles.icon}
            key={media.id}
            src={media.src}
            alt="prop"
            width={25}
            height={25}
          />
        ))}
      </div>
    </div>
  );
}

export default Footer;
