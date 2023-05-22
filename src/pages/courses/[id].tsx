import { DatabaseCourse } from '@/types';
import styles from './courses.module.scss'
import Link from "next/link";
import { GetStaticPropsContext } from 'next';

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

export const getStaticProps = async (context: GetStaticPropsContext) => {
    const id = context.params!.id
    const res = await fetch(`http://localhost:3000/api/courses?searchBy=id&value=${id}`, {
        method: "GET",
    });
    const course: DatabaseCourse = await res.json();

    return { props: { course }, revalidate: 60 };
};

export default function About(
    { course }: { course: DatabaseCourse }
) {
    return (<div>
        <h1>{course.title}</h1>
        {course.introduction.map((element, i: number) => (
            <div key={i}>
                <h3>{element.header}</h3>
                <p>{element.body}</p>
                <p>{element.footer}</p>
            </div>
        ))}
    </div>)
}
