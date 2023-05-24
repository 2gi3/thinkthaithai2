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

    const handleLoadStudentData = () => {
        const savedDataString = localStorage.getItem('databaseStudent');
        const parsedData: databaseStudent = savedDataString ? JSON.parse(savedDataString) : null;
        setStudentData(parsedData);
    };

    const handleStartCourseCompleted = (completed: boolean) => {
        setStartCourseCompleted(completed);
    };

    useEffect(() => {
        handleLoadStudentData()
        console.log(startCourseCompleted)
    }, [startCourseCompleted])

    const lesson = course.lessons[2]



    if (startCourseCompleted) {
        return (
            <div className={styles.container}>
                <header>
                    <h1>{course.title}</h1>
                    {/* <p>Progress {course.lessons.length}</p> */}
                    <div className={styles.progressContainer}>
                        {course.lessons.map((lesson, i: number) => (
                            <div key={i} className={styles.progress}>

                            </div>
                        ))}

                    </div>
                </header>
                <main>
                    <Lesson lesson={lesson} />
                </main>
                <footer>
                    <button className={styles.previous}><FaArrowLeft /></button>
                    <button>Lesson completed &nbsp; <FaArrowRight /></button>
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