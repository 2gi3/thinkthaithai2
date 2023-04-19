import { LayoutProps } from "@/types";
import NavBar from "./NavBar/NavBar";

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <NavBar />
      {children}
      {/* <footer>footer</footer> */}
    </div>
  );
};

export default Layout;
