import { useState } from "react";
import { useRouter } from "next/router";
import { IStudent } from "@/types";

const CreateStudentForm = () => {
  const [formData, setFormData] = useState<IStudent>({
    name: "",
    email: "",
    password: "",
    fundedLessons: 0,
  });
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log(data);
      //   router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="fundedLessons">Funded Lessons:</label>
        <input
          type="number"
          id="fundedLessons"
          name="fundedLessons"
          value={formData.fundedLessons}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Create Student</button>
    </form>
  );
};

export default CreateStudentForm;
