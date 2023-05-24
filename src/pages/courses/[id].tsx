import { DatabaseCourse, databaseStudent } from '@/types';
import { useSession } from 'next-auth/react'
import styles from './courses.module.scss'
import Link from "next/link";
import { GetStaticPropsContext } from 'next';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useEffect, useState } from 'react';
import CourseIntroduction from '@/components/courses/CourseIntroduction';
import Lesson from '@/components/courses/Lesson';


export default function About({ course }: { course: DatabaseCourse }) {
    const { data } = useSession();
    const [studentData, setStudentData] = useState<databaseStudent | null>(null);
    const [startCourseCompleted, setStartCourseCompleted] = useState(false);
    const [currentLesson, setCurrentLesson] = useState(0)
    // const [completedLessons, setCompletedLessons] = useState<string []>()

    const handleLoadStudentData = () => {
        const savedDataString = localStorage.getItem('databaseStudent');
        const parsedData: databaseStudent = savedDataString ? JSON.parse(savedDataString) : null;
        setStudentData(parsedData);
    };



    const handleStartCourseCompleted = (completed: boolean) => {
        setStartCourseCompleted(completed);
    };

    const completeLesson = async (title: string) => {

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
            }).then(res => res.json()).then(json => console.log(json))

        } catch (error) {
            console.log(error);
        } finally {
            const response: databaseStudent = await fetch(`/api/students?searchBy=email&value=${data?.user?.email}`).then((res) => res.json());
            localStorage.setItem('databaseStudent', JSON.stringify(response));
            setCurrentLesson(prev => prev + 1)
        }
    }



    const completedLessons = studentData?.startedCourses?.[course._id]
    const lesson = course.lessons[currentLesson]
    const incompleteLessonIndex = course.lessons.findIndex(
        (lesson) => !completedLessons?.includes(lesson.title)
    );

    useEffect(() => {
        handleLoadStudentData()
        setCurrentLesson(incompleteLessonIndex !== -1 ? incompleteLessonIndex : 0)
    }, [startCourseCompleted, incompleteLessonIndex, currentLesson])

    // console.log(studentData?.startedCourses?.[course._id])

    const startedCourses = studentData?.startedCourses
    console.log(startedCourses)


    if (startCourseCompleted || startedCourses?.hasOwnProperty(course._id)) {
        return (
            <div className={styles.container}>
                <header>
                    <h1>{course.title}</h1>
                    {/* <p>Progress {course.lessons.length}</p> */}
                    <div className={styles.progressContainer}>
                        {course.lessons.map((lesson, i: number) => (
                            <button key={i}
                                onClick={() => { setCurrentLesson(i) }}
                                className={completedLessons?.includes(lesson.title) ? styles.progress : styles.toLearn}>
                                <span>{lesson.title}</span>
                            </button>
                        ))}

                    </div>
                </header>
                <main>
                    <Lesson lesson={lesson} />
                </main>
                <footer>
                    <button className={styles.previous}><FaArrowLeft /></button>
                    <button onClick={() => {
                        completeLesson(lesson.title)
                    }}>Lesson completed &nbsp; <FaArrowRight /></button>
                </footer>

                {/* {course.lessons.map((lesson, i: number) => (
                    <div key={i} className={styles.container}> */}
                {/* <Lesson lesson={lesson} /> */}
                {/* </div>
                ))} */}
            </div>

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

    const res = await fetch("http://localhost:3000/api/courses", {
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
    const res = await fetch(`http://localhost:3000/api/courses?searchBy=id&value=${id}`, {
        method: "GET",
    });
    const course: DatabaseCourse = await res.json();

    return { props: { course }, revalidate: 60 };
};