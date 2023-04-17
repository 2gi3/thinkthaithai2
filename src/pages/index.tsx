import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useExchangeRate } from "@/functions/hooks";
import Price from "@/components/Currency/Price";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const currency = useSelector((state: RootState) => state.currency.value);

  return (
    <>
      <Head>
        <title>ThinkThaiThai</title>
        <meta name="description" content="Achieve your Thai language Goals!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Price />
      </main>
    </>
  );
}
