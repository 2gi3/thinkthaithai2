import styles from "./Contacts.module.scss";
import Image from "next/image";

const Contacts = () => {
  return (
    <div className={styles.contacts}>
      <div className={styles.contactsButtons}>
        <ul>
          <li>
            <a href="https://www.instagram.com/thaiwithnatt" target="blank">
              <Image
                src="/instagramIcon.webp"
                width="55"
                height="55"
                alt="Instagram"
              />
            </a>
          </li>
          <li>
            <a
              href="mailto:nattaporn.cl@gmail.com?subject=Message_From_ThinkThaiThai"
              target="blank"
            >
              <Image src="/emailIcon.png" width="50" height="50" alt="Email" />
            </a>
          </li>
          <li>
            <a href="https://wa.me/+66924496600" target="blank">
              <Image
                src="/WhatsApp.webp"
                width="55"
                height="55"
                alt="WhatsApp"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contacts;
