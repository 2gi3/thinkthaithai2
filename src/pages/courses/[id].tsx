import { DatabaseCourse, databaseStudent } from '@/types';
import { useSession } from 'next-auth/react'
import styles from './courses.module.scss'
import Link from "next/link";
import { GetStaticPropsContext } from 'next';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import CourseIntroduction from '@/components/courses/CourseIntroduction';
import Lesson from '@/components/courses/Lesson';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { updateStudent } from '@/redux/slices/studentSlice';
import Head from 'next/head';


export default function About(
    { course }: { course: DatabaseCourse }
) {


    const dispatch = useDispatch();
    const studentDataRedux = useSelector(
        (state: RootState) => state.student
    );
    const router = useRouter();




    const { data } = useSession();
    const [startCourseCompleted, setStartCourseCompleted] = useState(false);
    const [currentLesson, setCurrentLesson] = useState(0)

    const handleStartCourseCompleted = (completed: boolean) => {
        setStartCourseCompleted(completed);
    };

    const completedLessons = studentDataRedux?.startedCourses?.[course._id]
    const completeLesson = async (title: string) => {

        if (completedLessons?.includes(title)) {
            setCurrentLesson(prev => prev + 1)
        } else {
            try {

                await fetch("/api/students", {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify({
                        courseId: course._id,
                        lessonTitle: title,
                        studentEmail: data?.user?.email,
                    }),
                }).then(res => res.json())

            } catch (error) {
                console.log(error);
            } finally {
                const response: databaseStudent = await fetch(`/api/students?searchBy=email&value=${data?.user?.email}`).then((res) => res.json());
                localStorage.setItem('databaseStudent', JSON.stringify(response));
                setCurrentLesson(prev => prev + 1)
            }
        }
    }



    const lesson = course.lessons[currentLesson]
    // console.log(currentLesson)
    // console.log(course.lessons.length    )
    const incompleteLessonIndex = course.lessons.findIndex(
        (lesson) => !completedLessons?.includes(lesson.title)
    );

    useEffect(() => {

        const handleLoadStudentData = () => {
            const savedDataString = localStorage.getItem('databaseStudent');
            const parsedData: databaseStudent = savedDataString ? JSON.parse(savedDataString) : null;
            dispatch(updateStudent(parsedData));
        };

        handleLoadStudentData()
    }, [startCourseCompleted, currentLesson, dispatch])

    useEffect(() => {
        setCurrentLesson(incompleteLessonIndex !== -1 ? incompleteLessonIndex : 0)

    }, [incompleteLessonIndex])

    const startedCourses = studentDataRedux?.startedCourses


    if (startCourseCompleted || startedCourses?.hasOwnProperty(course._id)) {

        return (
            <>
                <Head>
                    <title>ThinkThaiThai</title>
                    <meta name="google-site-verification" content="Gsh6SUTRHzoVK6K6CHNPp2eNiowwXRXE5zR14fimbGo" />
                    <meta name="description" content="With free courses and tailored study material, you get so much more than just a simple private lesson" />
                    <meta property="og:url" content="https://www.thikthaithai.com/courses" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="The best value for your money!" />
                    <meta property="og:description" content="Guiding you through every step of your learning journey" />
                    <meta property="og:image" content={"https://thinkthaithai.com/1.png"} />
                    <link rel="icon" href="/logo.webp" />
                </Head>

                <div className={styles.container}>
                    <header>
                        <h1 style={{ width: 'unset' }}>{course.title}</h1>
                        <div className={styles.progressContainer}>
                            {course.lessons.map((lesson, i: number) => (
                                <button key={i}
                                    onClick={() => { setCurrentLesson(i) }}
                                    className={completedLessons?.includes(lesson.title) ? styles.progress : styles.toLearn}>
                                    <span>{lesson.title}</span>
                                    {currentLesson === i + 1 ? <div className={styles.current} ></div> : null}
                                </button>

                            ))}

                        </div>
                    </header>

                    <main>
                        {currentLesson >= course.lessons.length ?
                            <h2>Course completed</h2>
                            : <Lesson lesson={lesson} />
                        }
                    </main>

                    <footer>
                        <button className={styles.previous}
                            onClick={() => {
                                if (currentLesson === 0) {
                                    router.push('/courses')
                                } else { setCurrentLesson(x => x - 1) }
                            }}>
                            <FaArrowLeft />
                        </button>

                        {
                            currentLesson === course.lessons.length ?
                                <button onClick={() => {
                                    router.push('/courses')
                                }}>Start a new course</button>
                                : <button onClick={() => {
                                    completeLesson(lesson.title)
                                }}>
                                    Lesson completed &nbsp; <FaArrowRight />
                                </button>

                        }
                    </footer>
                </div>
            </>

        )
    } else {
        return (
            <CourseIntroduction
                course={course}
                setStartCourseCompleted={handleStartCourseCompleted}
            />

        )
    }


}


export async function getStaticPaths() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/courses`, {
        method: "GET",
    });
    const courses: DatabaseCourse[] = await res.json();




    const paths = courses.map((course) => ({
        params: { id: course._id },
    }));

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const id = context.params!.id
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASIC_URL}/api/courses?searchBy=id&value=${id}`, {
        method: "GET",
    });
    const course: DatabaseCourse = await res.json();

    return { props: { course }, revalidate: 60 };
};