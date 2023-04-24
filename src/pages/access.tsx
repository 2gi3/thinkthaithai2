import StudentAccess from "@/components/Access/StudentAccess";
import { useSession, signIn, signOut } from "next-auth/react";
export default function About() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div>
        <h1>Welcome, {session.user.email}</h1>
        <button onClick={() => signIn()}></button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>log&nbsp;in</h1>
        <button onClick={() => signIn()}>log&nbsp;in</button>
      </div>
    );
  }
}
