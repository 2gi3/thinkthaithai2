import styles from "./teacher.module.scss";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import useSWR from 'swr';

const TeacherLogIn = () => {
    const adminPassword = 'asdf1234'
    const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Password: ${password}`);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value);
  };

  const { data: session, status } = useSession({ required: true });

  const handleLogOut = async () => {
    const data = await signOut({ redirect: true, callbackUrl: "/" });
  };

  if (status === "loading") {
    return <p>Checking Authentication...</p>;
  } else if (status === "authenticated" && session && session.user) {
    return (
<form onSubmit={handleSubmit}>
  <h1>Log in as the teacher</h1>
      <label>
        Password:
        <input type="password" value={password} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>      
    );
  } else {
    {
      redirect: {
        destination: "/api/auth/signin";
      }
    }
  }
};

export default TeacherLogIn;
