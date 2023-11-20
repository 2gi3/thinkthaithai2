import Spinner from "@/components/Spinner";
import { DatabaseCourse, databaseStudent } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import styles from '../teacher.module.scss'
import accountStyles from '../../account/account.module.scss';
import teacherStyles from '../teacher.module.scss'
import Head from "next/head";
import useSWR from 'swr';
import { fetcherCustomer, fetcherStudent } from "@/functions";
import Link from "next/link";
import TeacherNav from "@/components/NavBar/TeacerNav";


function Student({ courses }: { courses: DatabaseCourse[] }) {

  const router = useRouter();
  const { id } = router.query;
  console.log(id)
  const { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BASIC_URL}/api/students?searchBy=id&value=${id}`,
    fetcherCustomer
  );
  const [studentData, setStudentData] = useState<databaseStudent | null>(null);
  const [loading, setLoading] = useState(true);
  const [warning, setWarning] = useState(false)

  useEffect(() => {
    if (data) {
      setStudentData(data);
      setLoading(false);
    }
  }, [data]);

  const updateData = async () => {
    setLoading(true);
    await mutate();
    setLoading(false);
  };

  const confirmAddOneLesson = async () => {
    setWarning(false)
    setLoading(true)
    const res = await fetch("/api/students/lessons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: 'addLesson',
        quantity: 1,
        studentEmail: studentData?.email
      }),
    });
    console.log(res)
    await mutate();
    setLoading(false)
  }

  if (loading) {

    return (
      <div className={accountStyles.container}>
        <Spinner diameter={88} />
      </div>
    )
  } else if (studentData) {
    const filteredCourses = courses.filter((course) => studentData.startedCourses?.hasOwnProperty(course._id));
    const courseDetails = filteredCourses.map((course) => {
      const sessionsLength = course.lessons.length;
      return {
        title: course.title,
        sessionsLength: sessionsLength,
        id: course._id
      };
    });

    return (
      <div className={accountStyles.container}>
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
        <TeacherNav>
          <Link className="secondaryButton" href='/teacher'>Dashboard</Link>
          <button className='secondaryButton' onClick={updateData}>Refresh data</button>

        </TeacherNav>
        <header className={accountStyles.header}>
          <p>Student&apos;s name:</p>
          <h2>{studentData.name}</h2>
        </header>
        <main>
          <section>
            {
              filteredCourses.length === 0 ? <div style={{ paddingBottom: 24 }}>
                <Link className={studentData?.paidLessons && studentData?.paidLessons > 0 ? "secondaryButton" : "primaryButton"} href='/#'> Invite to a course </Link>
              </div>
                : <h4>
                  completed courses</h4>}
            {courseDetails.map((course) => {
              const courseProgress = studentData.startedCourses?.[course.id]?.length ?? 0;
              const progressPercentage = Math.ceil((courseProgress / course.sessionsLength!) * 100);

              return (
                <div key={course.title} className={accountStyles.startedCourses}>
                  <p className={accountStyles.title}>{course.title}</p>
                  <div className={accountStyles.progressBar}>
                    <div
                      className={accountStyles.progress}
                      style={{ width: `${progressPercentage}%` }}
                    >
                      <p className={accountStyles.progressFigure}> {progressPercentage}%</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
          <section>
            {studentData?.paidLessons && <div>
              <p>Lessons Tally:
                <span>{studentData.lessonsTally}</span>
              </p>
            </div>
            }
            {studentData?.paidLessons ? <div
              className={accountStyles.remainingLessons}>
              <h3>Remaining lessons:
                <span>{studentData.paidLessons}</span>
              </h3>
            </div>
              : <div
                className={accountStyles.remainingLessons}>
                <h4>Never purchased any lesson
                </h4>
              </div>
            }
            <button className="secondaryButton" onClick={() => setWarning(true)}>Add a lesson</button>

            {warning && (
              <div className={teacherStyles.warning}>
                <p>This will give the student a free lesson</p>
                <div className={teacherStyles.actions}>
                  <button onClick={confirmAddOneLesson}>Confirm</button>
                  <button onClick={() => setWarning(false)}>Cancel</button>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    )
  } else {
    <div className={accountStyles.container}>
      <header className={accountStyles.header}>
        <h2>Error</h2>
        <p>There is a problem rethriving the student&apos;s data</p>
      </header>
      <main>
        <h4>Please try again later</h4>
      </main>
    </div>
  }

}

export default Student;


export async function getStaticPaths() {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/students`, {
    method: "GET",
  });
  const studentsData = await res.json();
  console.log({ studentsData })

  // const students: databaseStudent[] = await res.json();
  const students: databaseStudent[] = Object.values(studentsData);




  const paths = students.map((student) => ({
    params: { id: student._id },
  }));

  return {
    paths,
    fallback: false,
  };
}


export const getStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/courses`, {
    method: "GET",
  });
  const courses: DatabaseCourse[] = await res.json();

  return {
    props: {
      courses: courses,
    },
    revalidate: 60,
  };
};