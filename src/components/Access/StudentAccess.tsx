import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IStudent } from "@/types";

const CreateStudentForm = () => {
  const [preview, setPreview] = useState<string>("");
  const [formData, setFormData] = useState<IStudent>({
    name: "",
    email: "",
    password: "",
    fundedLessons: 0,
    imageFile: preview,
  });
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(JSON.stringify(formData));
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setPreview("");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      console.log(preview);
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      imageFile: preview,
    }));
  }, [preview]);

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
      <div>
        <label htmlFor="image">Image:</label>
        {preview ? (
          <img src={preview} alt="Preview" style={{ maxWidth: "200px" }} />
        ) : (
          <div>No image selected</div>
        )}
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <button type="submit">Create Student</button>
    </form>
  );
};

export default CreateStudentForm;
