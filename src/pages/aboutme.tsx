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
    <main>
    <div>
        <Image src='/aboutMe2.webp' alt="Teacher Natt" width={320} height={320} />
      </div>
      <div>
        <p>I have experience working with students of all levels and ages, and I use a variety of teaching methods to make sure that each student gets the individual attention they need.</p>
        <p>My goal is to help You learn to speak Thai with confidence and understand our beautiful culture on a deeper level.</p>
        <p>In my free time, I enjoy watching movies, learning new languages, surfing the internet, and travelling.
Currently, I'm learning Japanese, so I understand the challenges of learning a second language from both a teacher's and a student's point of view.</p>
        <p>Thank you for taking the time to learn more about me and my teaching style. I look forward to helping you achieve your language goals!</p>
      </div>
    </main>
    <div className={styles.CTA}>
        <p>Don&apos;t take my word for it!</p>
        <Link href='/feedbacks'> See what my students say about me</Link>
      </div>
    </div>
  );
}
