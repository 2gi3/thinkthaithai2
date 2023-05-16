import Spinner from "@/components/Spinner";
import { databaseStudent } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

  
  function Student() {

    const router = useRouter();
  const { id } = router.query;
  console.log(id)
    const [student, setStudent] = useState<databaseStudent>()
    
    useEffect(()=>{
        if (id) {
          const getData = async () => {
            const res = await fetch(`http://localhost:3000/api/students?searchBy=id&value=${id}`);
            const json = await res.json();
            setStudent(json);
          }
          getData();
        }
      }, [id]);
    return (
        <div>
            {student? <h1>{student.name}</h1>: <Spinner diameter={88}/>}
        </div>
    )
      
  }
  
  export default Student;
  