// const courseId = course._id;
// const hasStartedCourse = studentData.startedCourses?.hasOwnProperty(courseId);
// const startedCourseLength = studentData.startedCourses?.[courseId].length;

// let progressElement;
// if (hasStartedCourse) {
//   if (startedCourseLength === lessonCount) {
//     progressElement = (
//       <p className={styles.completed}>
//         <span>Completed</span>
//       </p>
//     );
//   } else {
//     const progressPercentage = Math.ceil((startedCourseLength / lessonCount) * 100);
//     progressElement = (
//       <p className={styles.started}>
//         <span>Progress</span> {progressPercentage}%
//       </p>
//     );
//   }
// } else {
//   progressElement = <p className={styles.price}>{course.status}</p>;
// }

// // Render the progress element in the JSX code
// {progressElement}





import { DatabaseCourse } from '@/types';
import styles from './courses.module.scss'
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export default function About({ courses }: { courses: DatabaseCourse[] }) {

  const dispatch = useDispatch();
  const studentData = useSelector(
    (state: RootState) => state.student
  );


  return (
    <div className={styles.container}>
      <header>
        <h1>
          The&nbsp;best&nbsp;time to&nbsp;start&nbsp;learning is&nbsp;Now!
        </h1>
      </header>
      <main>
        {courses.map((course: DatabaseCourse) => (
          <Link href={`http://localhost:3000/courses/${course._id}`} key={course._id}>
            <div className={styles.course}>
              <h3>
                {course.title}
              </h3>
              {studentData.startedCourses?.hasOwnProperty(course._id) ?
                studentData.startedCourses?.[course._id].length === course.lessons.length ?
                  (
                    <p className={styles.completed}>
                      <span>Completed</span>
                    </p>
                  ) :
                  (
                    <p className={styles.started}>
                      <span>Progress: </span> {Math.ceil((studentData.startedCourses?.[course._id].length / course.lessons.length) * 100)}%
                    </p>
                  ) : (
                  <p className={styles.price}>{course.status}</p>
                )}


              <p>{course.description}</p>
              <div className={styles.footer}>
                <p>Level: <span>{course.level}</span></p>
                {/* <p>commitment: <span>15 minutes/day, 1 month</span></p> */}
              </div>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}



export const getStaticProps = async () => {
  const res = await fetch("http://localhost:3000/api/courses", {
    method: "GET",
  });
  const courses: DatabaseCourse[] = await res.json();

  return { props: { courses }, revalidate: 60 };
};