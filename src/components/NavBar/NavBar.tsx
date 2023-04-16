import styles from "./NavBar.module.scss";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.brand}>
        <Link href="/">ThinkThaiThai</Link>
      </div>
      <div className={styles.navigation}>
        <ul className={styles.links}>
          <li>
            <Link href="/">About Me</Link>
          </li>
          <li>
            <Link href="/">Price</Link>
          </li>
          <li>
            <Link href="/">Feedbacks</Link>
          </li>
          <li>
            <Link href="/">Free Courses</Link>
          </li>
        </ul>
        <ul className={styles.buttons}>
          <li>
            <button>ENG</button>
          </li>
          <li>
            <button>USD</button>
          </li>
        </ul>
        <button>Log In</button>
      </div>
    </nav>
  );
};

export default NavBar;
