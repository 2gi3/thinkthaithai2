import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/aboutMe.module.scss'

export default function About() {
  return (
    <div className={styles.container}>
    <header>
      <div>
      <h2>I&apos;m&nbsp;Natt</h2>
      <p>Here to guide you</p>
      <h1>Every Step of The Way!</h1>
      <p>I have always been passionate about teaching and sharing knowledge with others.
         That's why I pursued a career in education and have been teaching Thai language since 2017
      </p>
      </div>
      <div>
        <Image src='/aboutMe1.webp' alt="Teacher Natt" width={320} height={320} />
      </div>
    </header>
    </div>
  );
}
