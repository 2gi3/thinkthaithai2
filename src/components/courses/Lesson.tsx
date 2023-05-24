import { LessonProps } from "@/types"
import styles from '@/pages/courses/courses.module.scss'


const Lesson = ({ lesson }: LessonProps) => {
    return (
        <div className={styles.lesson}>
            <video controls>
                <source src="https://drive.google.com/uc?export=download&id=1x2gRolOz9kjuuEP2dYgy8-Fu7Kv90XEx" type="video/mp4" />
            </video>

            <h3>{lesson.title}</h3>
            <p>{lesson.header}</p>
            <p>{lesson.body}</p>
            <p>{lesson.footer}</p>
        </div>

    )
}

export default Lesson