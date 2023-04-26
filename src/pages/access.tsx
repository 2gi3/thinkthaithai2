import StudentAccess from "@/components/Access/StudentAccess";
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

  // if (session && session.user) {
  //   push("/account");
  //   // return (
  //   //   <div>
  //   //     <h1>Welcome, {session.user.email}</h1>
  //   //     {session.user.image && (
  //   //       <img src={session.user.image} alt="profile picture" />
  //   //     )}
  //   //     <button onClick={() => handleLogOut()}>Log&nbsp;out</button>
  //   //   </div>
  //   // );
  if (status === "loading") {
    return <p>Loading...</p>;
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
