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

//https://calendly.com/thinkthaithai/50min?hide_event_type_details=1?name=${session.user.name}&email=${session.user.email}

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
    console.log(filteredCourses)
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
        <div>
          {filteredCourses.length === 0 ? <div style={{ paddingBottom: 24 }}>
            <Link className="primaryButton" href='/courses'>Start a free course</Link>
          </div>
            : <p>Your courses:</p>}
          {courseDetails.map((course) => {
            const courseProgress = startedCourses?.[course.id]?.length ?? 0;
            const progressPercentage = Math.ceil((courseProgress / course.sessionsLength!) * 100);

            return (
              <div key={course.title} className={styles.startedCourses}>
                <p className={styles.title}>{course.title}</p>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progress}
                    style={{ width: `${progressPercentage}%` }}
                  >
                    <p className={styles.progressFigure}> {progressPercentage}%</p>
                  </div>
                </div>
              </div>
            );
          })}</div>

        {data?.paidLessons && <div><p>Remaining lessons: <span>{data.paidLessons}</span></p></div>}
        {data?.paidLessons && data?.paidLessons > 0 ?
          <div className='primaryButton'><Calendar
            className={styles.button}
            email={session.user.email!}
            name={session.user.name!}
            label='Book a lesson'
            eventURL={`https://calendly.com/thinkthaithai/50min?hide_event_type_details=1&a2=${data._id}`} /></div>
          : <Link className="secondaryButton" href='/price'>Buy some lessons</Link>
        }

        {/* <div>
          <button className="secondaryButton" onClick={() => handleLogOut()}>Log&nbsp;out</button>
        </div> */}

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