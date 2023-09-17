import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import useSWR from 'swr';
import Link from "next/link";
import Head from "next/head";
import Spinner from "@/components/Spinner";
import { FaTimes } from "react-icons/fa";
import { fetcherStudent } from "@/functions";
import { DatabaseCourse, databaseStudent } from "@/types";
import { updateStudent } from "@/redux/slices/studentSlice";
import PaymentsHistory from "@/components/PaymentsHistory/PaymentsHistory";
import Calendar from "@/components/calendar";
import styles from "./account.module.scss";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";




//https://calendly.com/thinkthaithai/50min?hide_event_type_details=1?name=${session.user.name}&email=${session.user.email}

const Account = (
  { courses }: { courses: DatabaseCourse[] }
) => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const { data: session, status } = useSession({ required: true });
  const { data, error } = useSWR(
    `/api/students?searchBy=email&value=${session?.user?.email}`,
    fetcherStudent
  );
  const startedCourses = data?.startedCourses
  const [showHistory, setShowHistory] = useState(false)

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
      <>
        <Head>
          <title>ThinkThaiThai</title>
          <meta name="google-site-verification" content="Gsh6SUTRHzoVK6K6CHNPp2eNiowwXRXE5zR14fimbGo" />
          <meta name="description" content="Keep track of your progress, and book a lesson if you need any help!" />
          <meta property="og:url" content="https://www.thikthaithai.com/account" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Reach your goals!" />
          <meta property="og:description" content="Guiding you through every step of your learning journey" />
          <meta property="og:image" content={"https://thinkthaithai.com/1.png"} />
          <link rel="icon" href="/logo.webp" />
        </Head>

        <div className={styles.container}>
          <header>
            <h2>{session.user.name}</h2>
          </header>

          <div>
            {filteredCourses.length === 0 ? <div style={{ paddingBottom: 24 }}>
              <Link className={data?.paidLessons && data?.paidLessons > 0 ? "secondaryButton" : "primaryButton"} href='/courses'>Start a free course</Link>
            </div>
              : <h3>{t('Your courses:')}</h3>}
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

          {data?.paidLessons && <div className={styles.remainingLessons}><h3>{t('Remaining lessons:')} <span>{data.paidLessons}</span></h3></div>}
          {data?.paidLessons && data?.paidLessons > 0 ?
            <div className='primaryButton'><Calendar
              className={styles.button}
              email={session.user.email!}
              name={session.user.name!}
              studentId={data._id || 'noId'}
              label={t("Book a lesson")}
              eventURL={`https://calendly.com/thinkthaithai/50min?hide_event_type_details=1`} /></div>
            : <Link className="secondaryButton" href='/price'>{t('Buy some lessons')}</Link>
          }
          {data?.paidLessons && <div className={styles.remainingLessons}>
            <button
              className="secondaryButton"
              onClick={() => setShowHistory(!showHistory)}>
              {showHistory ? <FaTimes /> : t('Payments history')}
            </button>
            {showHistory && <PaymentsHistory />}</div>}


        </div>
      </>
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
      ...(await serverSideTranslations(locale, ["common"])),
      courses: courses,
    },
    revalidate: 60,
  };
};