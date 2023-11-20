import TeacherNav from "@/components/NavBar/TeacerNav"
import CreateCourseForm from "@/components/teacher/CreateCourseForm"
import Link from "next/link"

const CreateCourse = () => {
    return (
        <div className="container">
            <TeacherNav>
                <Link className="secondaryButton" href='/teacher'>Dashboard</Link>
            </TeacherNav>
            <CreateCourseForm />
        </div>
    )
}
export default CreateCourse