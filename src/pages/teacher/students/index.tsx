import styles from '../teacher.module.scss'
import Spinner from "@/components/Spinner"
import { databaseStudent } from '@/types'
import { useEffect, useState } from "react"

const StudentsList = () => {
    const [students, setStudents] = useState<databaseStudent[]>()
    useEffect(() => {
        const getData = async () => {
            const res = await fetch('/api/students');
            const json = await res.json();
            setStudents(json);
        }
        getData()
    }, [])

    console.log(students)

    return (
        <div className={styles.studentsList}>
            <div className={styles.headerRow}>
                <p>Name</p>
                <p>Remaining<br />lessons</p>
                <p>Next<br />lesson</p></div>
            {students ?
                Object.values(students).map((student: databaseStudent) => {
                    return <a key={student._id} className={styles.student} href={`${process.env.NEXT_PUBLIC_BASIC_URL}/teacher/students/${student._id}`}>
                        <h3>{student.name}</h3>
                        <p><span>remaining lessons:</span> {student.paidLessons}</p>
                        <p><span>next lesson:</span> 11/12/2023</p>
                    </a>
                })
                : (
                    <Spinner diameter={88} />
                )}
        </div>
    )
}
export default StudentsList