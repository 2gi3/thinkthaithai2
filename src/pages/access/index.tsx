import StudentAccess from "@/components/Access/StudentAccess";
import styles from "./access.module.scss";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { FormEvent, useState } from "react";

export default function About() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disable SSL certificate checks --USE ONLY ON DEVELOPMENT ENVIRONMENT--
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const { push } = useRouter();
  // SIGN IN ROUTE http://localhost:3000/api/auth/signin

  const handleLogOut = async () => {
    const data = await signOut({ redirect: true, callbackUrl: "/" });
  };

  const handleLogIn = (provider: string) => {
    signIn(provider, { redirect: true, callbackUrl: "/account" });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      console.log("no email");
      return false;
    }

    signIn("email", { email });
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  } else {
    return (
      <div className={styles.access}>
        <form onSubmit={(e) => handleSubmit(e)}>
          {/* <label>Email </label> */}
          <input
            type="email"
            placeholder="Email"
            autoFocus={true}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button type="submit">Log in with Email</button>
        </form>
        <p>or</p>
        <button onClick={() => handleLogIn("google")}>
          <BsGoogle /> Log in with Google
        </button>
        <button onClick={() => handleLogIn("facebook")}>
          <BsFacebook /> Log in with Facebook
        </button>
      </div>
    );
  }
}
