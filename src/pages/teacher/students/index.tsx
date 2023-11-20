import { fetcherStudent, fetcherStudents } from '@/functions'
import styles from '../teacher.module.scss'
import Spinner from "@/components/Spinner"
import { databaseStudent } from '@/types'
import { useEffect, useState } from "react"
import { FaArrowRight, FaTimes } from 'react-icons/fa'
import useSWR from 'swr';
import TeacherNav from '@/components/NavBar/TeacerNav'


const StudentsList = () => {
    const [students, setStudents] = useState<databaseStudent[]>()
    const [warning, setWarning] = useState(false)
    const [updating, setUpdating] = useState(false)
    const [selectedStudentEmail, setSelectedStudentEmail] = useState<string>('')
    const { data, error, mutate } = useSWR(
        `${process.env.NEXT_PUBLIC_BASIC_URL}/api/students`,
        fetcherStudents
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // const getData = async () => {
        //     const res = await fetch('/api/students');
        //     const json = await res.json();
        //     setStudents(json);
        // }
        // getData()
        if (data) {
            setStudents(data)
            setLoading(false)
            mutate()
            console.log('hello')
        }
    }, [data, updating, mutate])

    const updateData = async () => {
        setUpdating(true);
        await mutate();
        setUpdating(false);
    };

    const subtractOneLesson = async (email: string) => {
        setSelectedStudentEmail(email)
        setWarning(true)
    }

    const confirmSubtractOneLesson = async () => {
        setWarning(false)
        setUpdating(true)
        const res = await fetch("/api/students/lessons", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: 'decrease',
                quantity: 1,
                studentEmail: selectedStudentEmail
            }),
        });
        console.log(res)
        await mutate();
        setUpdating(false)

    }

    const cancelSubtractOneLesson = () => {
        setWarning(false)
        setSelectedStudentEmail('')
    }
    if (loading) {
        return (
            <div className={styles.container}>
                <Spinner diameter={88} />
            </div>
        )
    } else {
        return (
            <main className={styles.container}>
                {students && !updating &&
                    <TeacherNav>
                        <button className='secondaryButton' onClick={updateData}>Refresh data</button>
                    </TeacherNav>
                }
                <div className={styles.studentsList}>
                    {/* <div className={styles.headerRow}>
                        <p>Name</p>
                        <p>Remaining<br />lessons</p>
                    </div> */}
                    {students && !updating ? (
                        Object.values(students).map((student: databaseStudent) => (
                            <div className={styles.student} key={student._id}>
                                <a href={`${process.env.NEXT_PUBLIC_BASIC_URL}/teacher/students/${student._id}`}>
                                    <h3>{student.email}&nbsp;<FaArrowRight /></h3>
                                </a>
                                <p><span>remaining lessons:</span> {student.paidLessons}</p>
                                <button onClick={() => subtractOneLesson(student.email)}>-1 lesson</button>
                            </div>
                        ))
                    ) : (
                        <Spinner diameter={88} />
                    )}

                    {warning && (
                        <div className={styles.warning}>
                            <p>Are you sure you want to subtract one lesson?</p>
                            <div className={styles.actions}>
                                <button onClick={confirmSubtractOneLesson}>Confirm</button>
                                <button onClick={cancelSubtractOneLesson}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        )
    }
}

export default StudentsList;
