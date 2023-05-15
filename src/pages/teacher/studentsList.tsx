import Spinner from "@/components/Spinner"
import { useEffect, useState } from "react"

const StudentsList =()=>{
    const [students, setStudents] = useState<any>()
    useEffect(()=>{
        const getData = async () => {
            const res = await fetch('/api/students');
            const json = await res.json();
            setStudents(json);
          }
        getData()          
    },[])

    console.log(students)
    
    return(
        <div>
            {students?
            Object.values(students).map((student: any) => {
                return <div key={student._id}>{student.name}</div>
              })
              : (
                <Spinner diameter={88}/>
      )}
        </div>
    )
}
export default StudentsList