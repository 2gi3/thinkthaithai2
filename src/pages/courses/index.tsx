import styles from './courses.module.scss'
import Link from "next/link";

export default function About() {
  return (
    <div className={styles.container}>
      <header>
        <h1>
          The&nbsp;best&nbsp;time to&nbsp;start&nbsp;learning is&nbsp;Now!
        </h1>
      </header>
      <main>
        <Link href='#'>
          <div className={styles.course}>
            <h3>
              Learn the Thai alphabet
            </h3>
            <p className={styles.price}>Free</p>
            <p>The best place to start, if your long term goal is to become fluent in Thai language.</p>
            <div className={styles.footer}>
              <p>Level: <span>Beginner</span></p>
              <p>commitment: <span>15 minutes/day, 1 month</span></p>
            </div>
          </div>
        </Link>
      </main>
    </div>
  );
}
