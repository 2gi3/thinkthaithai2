import Feedback from "@/components/feedback";
import { DatabaseFeedback } from "@/types";
import styles from '@/styles/feedbacks.module.scss'
import Image from "next/image";

export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/feedbacks", {
    method: "GET",
  });
  const feedbacks: DatabaseFeedback[] = await res.json();

  return { props: { feedbacks }, revalidate: 60 };
};

export default function About({ feedbacks }: { feedbacks: DatabaseFeedback[] } ) {
  console.log(feedbacks)
  return (
    <>
    <header>
      <h1>What&nbsp;My&nbsp;Students&nbsp;Say</h1>
    </header>
    <main className={styles.main}>
      {feedbacks.map((feedback : DatabaseFeedback)=>{
        return(
          <Feedback feedback={feedback} />
        )
      })}
    </main>
    </>
  );
}
