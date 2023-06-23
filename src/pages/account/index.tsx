import { fetcherStudent } from "@/functions";
import styles from "./account.module.scss";
import { useSession, signOut } from "next-auth/react";
import useSWR from 'swr';
import Image from "next/image";
import Calendar from "@/components/calendar";
import { useEffect, useState } from "react";
import { DatabaseCourse, databaseStudent } from "@/types";
import { useDispatch } from "react-redux";
import { updateStudent } from "@/redux/slices/studentSlice";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Account = (
  { courses }: { courses: DatabaseCourse[] }
) => {

  const dispatch = useDispatch();

  const { data: session, status } = useSession({ required: true });


  const { data, error } = useSWR(
    `/api/students?searchBy=email&value=${session?.user?.email}`,
    fetcherStudent
  );
  const startedCourses = data?.startedCourses

  useEffect(() => {
    data ? dispatch(updateStudent(data)) : null
  }, [data, dispatch])


  const handleLogOut = async () => {
    localStorage.removeItem('databaseStudent');
    const data = await signOut({ redirect: true, callbackUrl: "/" });
  };

  if (status === "loading") {
    return <Spinner diameter={88} />
  } else if (status === "authenticated" && session && session.user) {
    const filteredCourses = courses.filter((course) => startedCourses?.hasOwnProperty(course._id));
    const courseDetails = filteredCourses.map((course) => {
      const sessionsLength = course.lessons.length;
      return {
        title: course.title,
        sessionsLength: sessionsLength,
        id: course._id
      };
    });
    return (
      <div className={styles.container}>
        <header>
          <h2>{session.user.name}</h2>
        </header>

        {/* <div><p>Next lesson: 11/12/2023 - 9 am</p></div>
        <div><p>Your flashcards</p></div> */}
        <div><p>Your courses</p>
          {courseDetails.map((course) => {
            const courseProgress = startedCourses?.[course.id]?.length ?? 0;
            return (
              <li key={course.title}>
                {course.title} (Progress: {Math.ceil((courseProgress / course.sessionsLength!) * 100)}%)
              </li>
            );
          })}</div>

        {data?.paidLessons && <div><p>Remaining lessons: <span>{data.paidLessons}</span></p></div>}
        {data?.paidLessons && data?.paidLessons > 0 ?
          <Calendar label='Book a lesson' eventURL={`https://calendly.com/thinkthaithai/50min?hide_event_type_details=1?name=${session.user.name}&email=${session.user.email}`} />
          : <Link href='/price'>Buy some lessons</Link>
        }

        <div>
          <button onClick={() => handleLogOut()}>Log&nbsp;out</button>
        </div>

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

export const getStaticProps = async ({ locale }: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/courses`, {
    method: "GET",
  });
  const courses: DatabaseCourse[] = await res.json();

  return {
    props: {
      // ...(await serverSideTranslations(locale, ["common", "courses"])),
      courses: courses,
    },
    revalidate: 60,
  };
};