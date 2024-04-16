import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../widgets/Header/Header";
import Footer from "../widgets/Footer/Footer";
import Main from "../widgets/Main/Main";


const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <Main>
        <Outlet />
      </Main>
      <Footer />
    </>
  );
}

export default Layout;