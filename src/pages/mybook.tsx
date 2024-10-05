import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Image from "next/image";
import styles from '@/styles/aboutMe.module.scss';
import Alert from "@/components/Alert/Alert";
import { useState } from "react";
import Price from "@/components/Currency/Price";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import BookDownload from "@/components/BookDownload";


export default function About() {
    const { t } = useTranslation("myBook");
    const router = useRouter();
    const { data, status } = useSession();
    const student = useSelector(
        (state: RootState) => state.student
    );
    const [alertOpened, setAlertOpened] = useState(false)
    const [bookDownloadOpen, setBookDownloadOpen] = useState(false)


    const makePayment = async (product: string) => {
        if (!data) {
            setAlertOpened(true)
        } else {
            try {
                const response = await fetch("/api/payment", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        product,
                        studentEmail: student?.email,
                        studentID: student._id
                    }),
                });

                if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(errorResponse.message || "Payment failed");
                }

                const { url } = await response.json();
                console.log(`The response from the API is: ${url}`)
                router.push(url);
            } catch (error) {
                console.error("Payment error:", error);
            } finally {
            }
        }
    };


    return (
        <>
            <Head>
                <title>Thai language travel book</title>
                <meta name="google-site-verification" content="Gsh6SUTRHzoVK6K6CHNPp2eNiowwXRXE5zR14fimbGo" />
                <meta name="description" content="Learn more about teacher Nat and her teaching style" />
                <meta property="og:url" content="https://www.thikthaithai.com/aboutme" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="A private thai language tutor that offers free courses and tailored learning material" />
                <meta property="og:description" content="Guiding you through every step of your learning journey" />
                <meta property="og:image" content={"https://thinkthaithai.com/1.png"} />
                <link rel="icon" href="/logo.webp" />
            </Head>

            <div className={styles.container}>
                <header>
                    <div>
                        <h2>{t('your perfect companion')}</h2>
                        {/* <p>your perfect companion</p> */}
                        <h1>{t('Essential Thai Phrases for Travelers')}</h1>
                        <p>
                            {t('A book designed to make your travel experience smoother, more enjoyable, and deeply enriching.')}
                        </p>
                        <p>
                            {t('Take it with you anywhere for quick reference on the go.')}
                        </p>
                        <p style={{ width: "100%" }}>                            {t('Audio included')}                        </p>
                    </div>
                    <div>
                        <Image src='/book_cover.webp' alt="Teacher Natt" width={320} height={320} />
                    </div>
                </header>

                <main>
                    <div>
                        <Image src='/lesson_example.webp' alt="Teacher Natt" width={320} height={320} />
                    </div>
                    <div>
                        <p>{t('Learn basic phrases for')} :     </p>
                        <ul style={{ marginBottom: 12 }}>
                            <li>✔️ {t('Going to restaurants')}</li>
                            <li>✔️{t('Traveling')}</li>
                            <li>✔️{t('Shopping')}</li>
                            <li>✔️{t('Asking for directions')}</li>
                        </ul>
                        <p>{t('You will also learn about Interesting places and Famous festivals,')}<br />
                            {t('Popular street food to try and Thai Etiquette')}
                        </p>

                        <p>{t('Phonetic transcriptions make it easy to understand the pronounciation')} </p>
                        <p>{t('104 pages')}</p>
                    </div>
                </main>
                {student?.boughtBooks?.includes('b1') ? (
                    //<div className={styles.CTA}>



                    bookDownloadOpen ? (
                        <BookDownload onClose={() => setBookDownloadOpen(!bookDownloadOpen)} />
                    ) : (
                        <div className={styles.CTA}>
                            <button
                                className="primaryButton" onClick={() => setBookDownloadOpen(!bookDownloadOpen)}>
                                Download Book
                            </button>
                        </div>
                    )




                    // </div>

                ) : (
                    <div className={styles.CTA}>
                        <p>{t('Begin with the right words')}</p>
                        <Price USD={1} />

                        <button
                            className={'primaryButton'}
                            type="button"
                            onClick={() => {
                                if (status === "authenticated" && data && data.user) {
                                    makePayment("b1")
                                } else {
                                    setAlertOpened(true);
                                }
                            }}>
                            {t('grab your guide now!')}
                        </button>
                    </div>
                )}

                {alertOpened && (
                    <Alert
                        heading="Please log in"
                        message="to buy this book"
                        onClose={() => {
                            setAlertOpened(false);
                        }}
                    />
                )}
            </div>
        </>
    );
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "myBook"])),
        },
    };
}