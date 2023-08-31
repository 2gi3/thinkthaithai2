import StudentAccess from "@/components/Access/StudentAccess";
import styles from "./access.module.scss";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { FormEvent, useState } from "react";
import Spinner from "@/components/Spinner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";

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
      <>
        <Head>
          <title>ThinkThaiThai</title>
          <meta name="description" content="Log in safely with google or your email" />
          {/* <meta property="og:image" content="/1.png" /> */}
          <meta property="og:url" content="https://www.thikthaithai.com/access" />
          <meta property="og:type" content="website" />

          <meta property="og:title" content="The best value for your money!" />

          <meta
            property="og:description"
            content="Guiding you through every step of your learning journey"
          />

          <meta
            property="og:image"
            content={"https://thinkthaithai.com/1.png"}
          />

          <link rel="icon" href="/logo.webp" />
        </Head>
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
      </>
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