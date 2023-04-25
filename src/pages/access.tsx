import StudentAccess from "@/components/Access/StudentAccess";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsGoogle, BsFacebook } from "react-icons/bs";
import { FormEvent, useState } from "react";

export default function About() {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disable SSL certificate checks --USE ONLY ON DEVELOPMENT ENVIRONMENT--
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const { push } = useRouter();

  const handleLogOut = async () => {
    const data = await signOut({ redirect: true, callbackUrl: "/" });
    // push(data.url);
  };

  const handleLogIn = (provider: string) => {
    signIn(provider);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      console.log("no email");
      return false;
    }

    console.log("before");
    signIn("email", { email, redirect: false });
    console.log("after");
  };

  if (session && session.user) {
    return (
      <div>
        <h1>Welcome, {session.user.email}</h1>
        {session.user.image && (
          <img src={session.user.image} alt="profile picture" />
        )}
        <button onClick={() => handleLogOut()}>Log&nbsp;out</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>log&nbsp;in&nbsp;by:</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>Email address</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button type="submit">Log in</button>
        </form>
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
