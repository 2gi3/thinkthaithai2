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


export default function About({ course }: { course: DatabaseCourse }) {


    const dispatch = useDispatch();
    const studentDataRedux = useSelector(
        (state: RootState) => state.student
    );
    const router = useRouter();




    const { data } = useSession();
    // const [studentData, setStudentData] = useState<databaseStudent | null>(null);
    const [startCourseCompleted, setStartCourseCompleted] = useState(false);
    const [currentLesson, setCurrentLesson] = useState(0)
    // const [completedLessons, setCompletedLessons] = useState<string []>()

    // const handleLoadStudentData = () => {
    //     const savedDataString = localStorage.getItem('databaseStudent');
    //     const parsedData: databaseStudent = savedDataString ? JSON.parse(savedDataString) : null;
    //     setStudentData(parsedData);
    //     dispatch(updateStudent(parsedData));
    // };

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
                // .then(json => console.log(json))

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
    console.log(currentLesson)
    const incompleteLessonIndex = course.lessons.findIndex(
        (lesson) => !completedLessons?.includes(lesson.title)
    );

    useEffect(() => {
        // const handleLoadStudentData = () => {
        //     const savedDataString = localStorage.getItem('databaseStudent');
        //     const parsedData: databaseStudent = savedDataString ? JSON.parse(savedDataString) : null;
        //     setStudentData(parsedData);
        //     dispatch(updateStudent(parsedData));
        //     console.log(studentDataRedux)
        // };
        const handleLoadStudentData = () => {
            const savedDataString = localStorage.getItem('databaseStudent');
            const parsedData: databaseStudent = savedDataString ? JSON.parse(savedDataString) : null;
            // setStudentData(parsedData);
            dispatch(updateStudent(parsedData));
        };

        handleLoadStudentData()
        // setCurrentLesson(incompleteLessonIndex !== -1 ? incompleteLessonIndex : 0)
    }, [startCourseCompleted, currentLesson, dispatch])

    useEffect(() => {
        setCurrentLesson(incompleteLessonIndex !== -1 ? incompleteLessonIndex : 0)

    }, [incompleteLessonIndex])

    const startedCourses = studentDataRedux?.startedCourses


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
                                {currentLesson === i + 1 ? <div className={styles.current} ></div> : null}
                            </button>

                        ))}

                    </div>
                </header>
                <main>
                    <Lesson lesson={lesson} />
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