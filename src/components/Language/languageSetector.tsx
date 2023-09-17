import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { LocaleToLanguage } from "@/types";
import styles from "./Language.module.scss";

const LanguageSelector = () => {
  const router = useRouter();
  const { pathname, query } = router;
  const { locale, locales, push, } = useRouter();
  const [selectorIsOpen, setSelectorIsOpen] = useState(false);

  const id = query.id;

  const localeToLanguage: LocaleToLanguage = {
    en: "English",
    zh: "Chinese",
    ja: "Japanese",
    it: "Italian",
  };
  const handleClick = (l: string) => {

    if (pathname === '/courses/[id]') {
      router.replace(`/courses/${id}`, undefined, { locale: l });
    } else {
      push(pathname, undefined, { locale: l });
      setSelectorIsOpen(!selectorIsOpen);
    }

  };

  useEffect(() => {
    setSelectorIsOpen(false)
  }, [pathname])

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
