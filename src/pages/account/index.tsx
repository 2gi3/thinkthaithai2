import { fetcherStudent } from "@/functions";
import styles from "./account.module.scss";
import { useSession, signOut } from "next-auth/react";
import useSWR from 'swr';
import Image from "next/image";
import Calendly from "@/components/calendar";

const Account = () => {

  const { data, error } = useSWR(
    `/api/students?searchBy=email&value=gippolito@hotmail.co.uk`,
    fetcherStudent
  );

  const { data: session, status } = useSession({ required: true });

  const handleLogOut = async () => {
    const data = await signOut({ redirect: true, callbackUrl: "/" });
  };

  if (status === "loading") {
    return <p>Checking Authentication...</p>;
  } else if (status === "authenticated" && session && session.user) {
    return (
      <div className={styles.container}>
      <header>
        <h2>{session.user.name}</h2>        
        </header>
        
        {data?.paidLessons &&<div><p>Remaining lessons: <span>{data.paidLessons}</span></p></div>}
               
        <div><p>Next lesson: 11/12/2023 - 9 am</p></div>
        <div><p>Your flashcards</p></div>
        <div><p>Your courses</p></div>
        <div>
        <button onClick={() => handleLogOut()}>Log&nbsp;out</button>
        </div>
        <Calendly />
      </div>
    );
  } else {
    {
      redirect: {
        destination: "/api/auth/signin";
      }
    }
  }
};

export default Account;
