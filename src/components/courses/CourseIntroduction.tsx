import { DatabaseCourse, databaseStudent } from '@/types';
import { useSession } from 'next-auth/react'
import styles from '@/pages/courses/courses.module.scss'
import Link from "next/link";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { useState } from 'react';

const CourseIntroduction = ({ course, setStartCourseCompleted }: { course: DatabaseCourse, setStartCourseCompleted: any }) => {

    const [showPopup, setShowPopup] = useState(false);
    const { data, status } = useSession();
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
            <source src={course.introduction.videoURL} type="video/mp4" />
        </video>
        <header>
            <h1 style={{ width: 'unset' }}>{course.title}</h1>
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
            <Link href={`${process.env.NEXT_PUBLIC_BASIC_URL}/courses`}>
                <FaArrowLeft />
            </Link>
            {showPopup ?
                <>
                    <div className={styles.warning}>
                        <button onClick={() => setShowPopup(false)}><FaTimes /></button>
                        <p>Log In to start a course, your account will be created automatically, it only takes a few seconds and it is free!</p>
                    </div>
                    <Link className={styles.buttonLink} href="/access">Log In</Link>
                </>
                : <button onClick={() => {
                    if (status === "authenticated" && data && data.user) {

                        startCourse()

                    } else {

                        setShowPopup(true);

                    }
                }}>
                    Start Course
                </button>
            }
        </footer>
    </div>

    )
}

export default CourseIntroduction