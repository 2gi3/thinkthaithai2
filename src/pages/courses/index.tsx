import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from "next-i18next";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import Link from "next/link";
import Head from 'next/head';
import { DatabaseCourse } from '@/types';
import styles from './courses.module.scss';



export default function About(
    { courses }: { courses: DatabaseCourse[] }
) {
    const { t } = useTranslation("courses");
    const studentData = useSelector(
        (state: RootState) => state.student
    );

    const renderProgress = (course: DatabaseCourse) => {

        const courseId = course._id;
        const hasStartedCourse = studentData.startedCourses?.hasOwnProperty(courseId);
        const startedCourseLength = studentData.startedCourses?.[courseId]?.length;
        const lessonCount = course.lessons.length

        let progressElement;
        if (hasStartedCourse) {
            if (startedCourseLength && startedCourseLength >= lessonCount) {
                progressElement = (
                    <p className={styles.completed}>
                        <span>{t('Completed')}</span>
                    </p>
                );
            } else {
                const progressPercentage = Math.ceil((startedCourseLength! / lessonCount) * 100);
                progressElement = (
                    <p className={styles.started}>
                        <span>{t('Progress')}</span> {progressPercentage}%
                    </p>
                );
            }
        } else {
            progressElement = <p className={styles.price}>{course.status.charAt(0).toUpperCase() + course.status.slice(1).toLowerCase()}</p>;
        }

        return progressElement

    }

    return (
        <>
            <Head>
                <title>Learn Thai language for free</title>
                <meta name="google-site-verification" content="Gsh6SUTRHzoVK6K6CHNPp2eNiowwXRXE5zR14fimbGo" />
                <meta name="description" content="Before spanding any money start getting familiar with thai language through these free courses, and contact the teacher if you have any question" />
                <meta property="og:url" content="https://www.thikthaithai.com/courses" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="The best time to start learning is now!" />
                <meta property="og:description" content="Start learning Thai by following these free courses, and contact the teacher if you have any questions" />
                <meta property="og:image" content={"https://thinkthaithai.com/1.png"} />
                <link rel="icon" href="/logo.webp" />
            </Head>

            <div className={styles.container}>
                <header>
                    <h1>
                        {/* The&nbsp;best&nbsp;time to&nbsp;start&nbsp;learning is&nbsp;Now! */}
                        {t('The Best Time to Start Learning is Now!')}
                    </h1>
                </header>

                <main>
                    {courses.map((course: DatabaseCourse) => (
                        <Link href={`${process.env.NEXT_PUBLIC_BASIC_URL}/courses/${course._id}`} key={course._id}>
                            <div className={styles.course}>
                                <h3>
                                    {course.title}
                                </h3>
                                {renderProgress(course)}
                                <p>{course.description}</p>
                                <div className={styles.footer}>
                                    <p>{t('Level')}: <span>{course.level}</span></p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </main>

            </div>
        </>
    );
}



export const getStaticProps = async ({ locale }: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/courses`, {
        method: "GET",
    });
    const courses: DatabaseCourse[] = await res.json();

    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "courses"])),
            courses: courses,
        },
        // revalidate: 60,
    };
};