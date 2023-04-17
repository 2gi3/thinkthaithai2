import { useRouter } from "next/router";
import styles from "./Language.module.scss";
import Image from "next/image";
import { LocaleToLanguage } from "@/types";
import { useState } from "react";

const LanguageSelector = () => {
  const { locale, locales, push } = useRouter();
  const [selectorIsOpen, setSelectorIsOpen] = useState(false);

  const localeToLanguage: LocaleToLanguage = {
    en: "English",
    zh: "Chinese",
    ja: "Japanese",
    it: "Italian",
  };

  const handleClick = (l: string) => {
    push("/", undefined, { locale: l });
    setSelectorIsOpen(!selectorIsOpen);
  };

  return (
    <>
      <button
        className={styles.LanguageButton}
        aria-label="Select a language"
        onClick={() => setSelectorIsOpen(!selectorIsOpen)}
      >
        <Image
          className={styles.flag}
          height={20}
          width={30}
          src={`/images/Flag${localeToLanguage[locale!]}.webp`}
          alt={`${localeToLanguage[locale!]} flag`}
        />
      </button>
      {selectorIsOpen ? (
        <div className={styles.languageList}>
          <ul>
            {locales?.map((l) => (
              <li>
                <button key={l} onClick={() => handleClick(l)}>
                  {localeToLanguage[l]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default LanguageSelector;
