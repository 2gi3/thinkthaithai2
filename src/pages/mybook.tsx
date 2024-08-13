import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Image from "next/image";
import styles from '@/styles/aboutMe.module.scss';


export default function About() {
    const { t } = useTranslation("aboutme");


    return (
        <>
            <Head>
                <title>Online Thai language teacher</title>
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
                        <h2>your perfect companion</h2>
                        {/* <p>your perfect companion</p> */}
                        <h1>Essential Thai Phrases for Travelers</h1>
                        <p>
                            A book designed to make your travel experience smoother,
                            more enjoyable, and deeply enriching.
                        </p>
                        <p>
                            Take it with you anywhere for quick reference on the go.
                        </p>
                        <p style={{ width: "100%" }}>                            Audio included
                        </p>
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
                        <p>Learn basic phrases for:                        </p>
                        <ul style={{ marginBottom: 12 }}>
                            <li>✔️ Going to restaurants</li>
                            <li>✔️Traveling</li>
                            <li>✔️Shopping</li>
                            <li>✔️Asking direction</li>
                        </ul>
                        <p>You will also learn about
                            Interesting places and
                            Famous festivals, <br />
                            Popular street food to try and
                            Thai Etiquette
                        </p>

                        <p>Easy-to-Understand Pronunciations: Phonetic transcriptions make it easy to speak like a local.
                        </p>
                        <p>Pages: 104
                        </p>
                    </div>
                </main>

                <div className={styles.CTA}>
                    <p>Begins with the right words</p>
                    <Link href='/feedbacks'> grab your guide now!</Link>
                </div>
            </div>
        </>
    );
}

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "aboutme"])),
        },
    };
}