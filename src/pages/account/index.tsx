import styles from "./account.module.scss";
import { useSession, signOut } from "next-auth/react";

const Account = () => {
  const { data: session, status } = useSession({ required: true });
  if (status === "authenticated" && session && session.user) {
    return (
      <div>
        <h1>Welcome, {session.user.email}</h1>
        {session.user.image && (
          <img src={session.user.image} alt="profile picture" />
        )}
        <button onClick={() => signOut()}>Log&nbsp;out</button>
      </div>
    );
  } else {
    {
      redirect: {
        destination: "/access";
      }
    }
  }
};

export default Account;
