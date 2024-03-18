import styles from "./footer.module.scss";
import packageJson from "package.json";

export function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.version}>Version: {packageJson.version}</p>
      <nav className={styles.links}>
        <a href="#">Docs</a>
        <a href="#">API</a>
        <a href="#">Help</a>
        <a href="#">Community</a>
      </nav>

      <a href="#" className={styles.logo}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={"/icons/logo-small.svg"} alt="logo" />
      </a>
    </div>
  );
}
