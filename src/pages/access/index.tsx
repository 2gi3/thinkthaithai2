import StudentAccess from "@/components/Access/StudentAccess";
import styles from "./access.module.scss";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { FormEvent, useState } from "react";
import Spinner from "@/components/Spinner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export default function About() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disable SSL certificate checks --USE ONLY ON DEVELOPMENT ENVIRONMENT--
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const { push } = useRouter();
  const { t } = useTranslation("common");

  // SIGN IN ROUTE ${process.env.NEXT_PUBLIC_BASIC_URL}/api/auth/signin

  const handleLogOut = async () => {
    const data = await signOut({ redirect: true, callbackUrl: "/" });
  };

  const handleLogIn = (provider: string) => {
    signIn(provider, { redirect: true, callbackUrl: "/account" });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      console.log("no email");
      return false;
    }

    signIn("email", { email, redirect: true, callbackUrl: "/account" });
  };

  if (status === "loading") {
    return <Spinner diameter={88} />;
  } else {
    return (
      <div className={styles.access}>
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* <label>Email </label> */}
          <input
            type="email"
            placeholder="Email"
            autoFocus={true}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button type="submit">{t('Log in with Email')}</button>
        </form>
        <p>or</p>
        <button onClick={() => handleLogIn("google")}>
          <BsGoogle /> {t('Log in with Google')}
        </button>


        {/* <button onClick={() => handleLogIn("facebook")}>
          <BsFacebook /> {t('Log in with Facebook')}
        </button> */}


      </div>
    );
  }
}


export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}