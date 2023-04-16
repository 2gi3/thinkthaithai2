import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.brand}>
        <a href="/">ThinkThaiThai</a>
      </div>
      <ul className={styles.links}>
        <li>
          <a href="/">About Me</a>
        </li>
        <li>
          <a href="/">Price</a>
        </li>
        <li>
          <a href="/">Feedbacks</a>
        </li>
        <li>
          <a href="/">Free Courses</a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
