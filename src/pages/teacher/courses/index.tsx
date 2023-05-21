import Link from "next/link";

const Courses = () => {
    return (
        <div>
            <header><h1>Array of courses with CRUD buttons</h1></header>
            <Link href='http://localhost:3000/teacher/courses/create'>
                Create</Link>
        </div>
    )
}
export default Courses