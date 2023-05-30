import { fetcherStudent } from "@/functions";
import styles from "./account.module.scss";
import { useSession, signOut } from "next-auth/react";
import useSWR from 'swr';
import Image from "next/image";
import Calendar from "@/components/calendar";
import { useEffect, useState } from "react";
import { databaseStudent } from "@/types";
import { useDispatch } from "react-redux";
import { updateStudent } from "@/redux/slices/studentSlice";

const Account = () => {
  const dispatch = useDispatch();

  const { data: session, status } = useSession({ required: true });
  const [showCalendar, setShowCalendar] = useState(true); // State variable to toggle the calendar


  const { data, error } = useSWR(
    `/api/students?searchBy=email&value=${session?.user?.email}`,
    fetcherStudent
  );
  useEffect(() => {
    data ? dispatch(updateStudent(data)) : null
  }, [data, dispatch])


  const handleLogOut = async () => {
    localStorage.removeItem('databaseStudent');
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

        {data?.paidLessons && <div><p>Remaining lessons: <span>{data.paidLessons}</span></p></div>}

        <div><p>Next lesson: 11/12/2023 - 9 am</p></div>
        <div><p>Your flashcards</p></div>
        <div><p>Your courses</p></div>
        <div>
          <button onClick={() => handleLogOut()}>Log&nbsp;out</button>
        </div>
        {/* <div>
          <button onClick={() => setShowCalendar(!showCalendar)}>Toggle Calendar</button>
        </div> */}
        {showCalendar && <Calendar label='Book a lesson' eventURL='https://calendly.com/thinkthaithai/50min?hide_event_type_details=1' />}

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
