import { useRouter } from "next/router";
import styles from "./Language.module.scss";
import Image from "next/image";
import { LocaleToLanguage } from "@/types";
import { useState } from "react";

const LanguageSelector = () => {
  const router = useRouter();
  const { pathname } = router;
  const { locale, locales, push, } = useRouter();
  const [selectorIsOpen, setSelectorIsOpen] = useState(false);

  const localeToLanguage: LocaleToLanguage = {
    en: "English",
    zh: "Chinese",
    ja: "Japanese",
    it: "Italian",
  };

  const handleClick = (l: string) => {
    push(pathname, undefined, { locale: l });
    setSelectorIsOpen(!selectorIsOpen);
  };

  // const handleClick = (l: string) => {
  //   const updatedLocale = l === locale ? "" : l; // Set the new locale if it's different, otherwise remove the current locale
  //   push({ query: { ...query, locale: updatedLocale } }, undefined, { shallow: true });
  //   setSelectorIsOpen(!selectorIsOpen);
  // };

  return (
    <>
      <button
        data-testid="language-toggle"
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
              <li key={l}>
                <button
                  data-testid={localeToLanguage[l]}
                  aria-label={`select ${localeToLanguage[l]} language`}
                  onClick={() => handleClick(l)}
                >
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
