import { LayoutProps } from "@/types";
import NavBar from "./NavBar/NavBar";
import Footer from "./footer/Footer";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
