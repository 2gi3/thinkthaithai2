import styles from "./account.module.scss";
import { useSession, signOut } from "next-auth/react";

const Account = () => {
  const { data: session, status } = useSession({ required: true });

  const handleLogOut = async () => {
    const data = await signOut({ redirect: true, callbackUrl: "/" });
  };

  if (status === "loading") {
    return <p>Checking Authentication...</p>;
  } else if (status === "authenticated" && session && session.user) {
    return (
      <div>
        <h1>{session.user.name}</h1>
        {session.user.image && (
          <img src={session.user.image} alt="profile picture" />
        )}
        <button onClick={() => handleLogOut()}>Log&nbsp;out</button>
      </div>
    );
  } else {
    {
      redirect: {
        destination: "/api/auth/signin";
      }
    }
  }
};

export default Account;
