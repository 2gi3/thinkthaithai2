import { LessonProps } from "@/types"
import styles from '@/pages/courses/courses.module.scss'


const Lesson = ({ lesson }: LessonProps) => {
    console.log(lesson.videoURL)
    return (
        <div className={styles.lesson}>
            <video controls>
                <source src={lesson.videoURL} type="video/mp4" />
            </video>

            <h3>{lesson.title}</h3>
            <p>{lesson.header}</p>
            <p>{lesson.body}</p>
            <p>{lesson.footer}</p>
        </div>

    )
}

export default Lesson