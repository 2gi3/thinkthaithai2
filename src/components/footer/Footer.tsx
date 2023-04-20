import Contacts from "../Contacts/Contacts";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <Contacts />
      <div className={styles.credits}>
        <p></p>
        <h3></h3>
        <p></p>
        <p></p>
      </div>
    </footer>
  );
};

export default Footer;
