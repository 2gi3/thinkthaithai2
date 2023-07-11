import { LessonProps } from "@/types"
import styles from '@/pages/courses/courses.module.scss'


const Lesson = ({ lesson }: LessonProps) => {
    return (
        <div className={styles.lesson}>
            <iframe src={lesson.videoURL} >


            </iframe>

            <h3>{lesson.title}</h3>
            <p>{lesson.header}</p>
            <p>{lesson.body}</p>
            <p>{lesson.footer}</p>
        </div>

    )
}

export default Lesson