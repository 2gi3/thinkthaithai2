import { DatabaseCourse, databaseStudent } from '@/types';
import { useSession } from 'next-auth/react'
import styles from '@/pages/courses/courses.module.scss'
import Link from "next/link";
import { GetStaticPropsContext } from 'next';
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from 'react';

const CourseIntroduction = ({ course, setStartCourseCompleted }: { course: DatabaseCourse, setStartCourseCompleted: any }) => {
    const { data } = useSession();

    const startCourse = async () => {

        try {

            fetch("/api/students", {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    courseId: course._id,
                    studentEmail: data?.user?.email,
                }),
            }).then(res => res.json()).then(json => console.log(json))

        } catch (error) {
            console.log(error);
        } finally {
            const response: databaseStudent = await fetch(`/api/students?searchBy=email&value=${data?.user?.email}`).then((res) => res.json());
            localStorage.setItem('databaseStudent', JSON.stringify(response));
            setStartCourseCompleted(true)
        }
    }
    return (<div className={styles.container}>
        <video controls>
            <source src="https://drive.google.com/uc?export=download&id=1x2gRolOz9kjuuEP2dYgy8-Fu7Kv90XEx" type="video/mp4" />
        </video>
        <header>
            <h1>{course.title}</h1>
            <p className={styles.status}>{course.status}</p>
        </header>
        <main>
            <div className={styles.introduction}>
                <p>{course.introduction.header}</p>
                <p>{course.introduction.body}</p>
                <p>{course.introduction.footer}</p>
            </div>
        </main>
        <footer>
            <Link href='http://localhost:3000/courses'>
                <FaArrowLeft />
            </Link>

            <button onClick={() => {
                startCourse()
            }}>
                Start Course
            </button>
        </footer>
    </div>

    )
}

export default CourseIntroduction