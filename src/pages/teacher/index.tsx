import { getServerSession } from "next-auth/next"
import Dashboard from "./dashboard"
import Spinner from "@/components/Spinner";
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from "next/types";
import { authOptions } from '../api/auth/[...nextauth]'

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions)
    const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
    if (
        session &&
        session.user?.email &&
        adminEmails.length > 0 &&
        adminEmails.includes(session.user?.email)) {

        // i tried returning the session and pass it as a prop as in the https://next-auth.js.org documentation,
        // but it is undefined on the client side so i opted for returning a boolean to confirm if the user is an administrator
        // https://next-auth.js.org/configuration/nextjs#unstable_getserversession
        return {
            props: {
                isAdministrator: true,
            },
        };

    } else {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }

    }


    // return {
    //     props: {
    //         administrator: false,
    //     },
    // };



}

const TeacherHome = ({ isAdministrator }: { isAdministrator: boolean }) => {
    const router = useRouter();

    if (!isAdministrator) {
        // Redirect if session is not available
        // router.push('/api/auth/signin');

        return <h1>You are not authorised</h1>;
    }

    return <Dashboard />;
}

export default TeacherHome;
