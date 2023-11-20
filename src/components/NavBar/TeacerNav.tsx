import Link from "next/link"
import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import styles from "./NavBar.module.scss";
import { FaArrowLeft } from "react-icons/fa";



const TeacherNav = ({ children }: { children: ReactNode }) => {
    const router = useRouter();

    return (
        <div className={styles.teacherNav}>
            <button className="secondaryButton" onClick={() => router.back()}>
                <FaArrowLeft />
            </button>
            {children}
        </div>
    );
};

export default TeacherNav;