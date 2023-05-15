import styles from "./teacher.module.scss";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import useSWR from 'swr';
import Link from "next/link";
import { FaArrowRight} from "react-icons/fa";


const Dashboard = () => {
    


    return (
  <div className={styles.container}>
    <Link href='#'>Students&nbsp;<FaArrowRight /></Link>
    <Link href='#'>Feedbacks&nbsp;<FaArrowRight /></Link>
    <Link href='#'>Lessons&nbsp;<FaArrowRight /></Link>
    <Link href='#'>Courses&nbsp;<FaArrowRight /></Link>
  </div>
         );
};

export default Dashboard;
