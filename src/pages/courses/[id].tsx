import { DatabaseCourse } from '@/types';
import { useSession } from 'next-auth/react'
import styles from './courses.module.scss'
import Link from "next/link";
import { GetStaticPropsContext } from 'next';
import { FaArrowLeft } from "react-icons/fa";


export default function About({ course }: { course: DatabaseCourse }) {
    const { data } = useSession();
    console.log(data)


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
            {/* <div>
                <h2>Lessons {course.lessons.length}</h2>


                {course.lessons.map((lesson, i: number) => (
                    <div key={i}>
                        <h3>{lesson.header}</h3>
                        <p>{lesson.body}</p>
                        <p>{lesson.footer}</p>
                    </div>
                ))}
            </div> */}
        </main>
        <footer>
            <Link href='#'>
                <FaArrowLeft />
            </Link>

            <button onClick={() => {
                startCourse()
            }}>
                Start Course
            </button>
        </footer>
    </div>)
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