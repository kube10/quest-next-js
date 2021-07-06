import styles from "../../styles/Home.module.css";
import Nav from "./Nav";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Nav />
      {children}
    </div>
  );
};

export default Layout;
