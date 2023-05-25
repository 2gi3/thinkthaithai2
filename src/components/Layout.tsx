import { LayoutProps, databaseStudent } from "@/types";
import NavBar from "./NavBar/NavBar";
import Footer from "./footer/Footer";
import { useDispatch } from "react-redux";
import { updateStudent } from "@/redux/slices/studentSlice";
import { useEffect } from "react";

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const savedDataString = localStorage.getItem('databaseStudent');
    const parsedData: databaseStudent = savedDataString ? JSON.parse(savedDataString) : null;
    // setStudentData(parsedData);
    dispatch(updateStudent(parsedData));
  }, [dispatch])

  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
