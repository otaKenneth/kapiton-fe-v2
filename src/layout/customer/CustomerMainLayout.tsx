import Header from "../../components/customer/Header";
import Footer from "../../components/customer/Footer";
import { Outlet } from "react-router-dom";

const CustomerMainLayout = () => {
  return (
    <>
      <Header />
      <main className="bg-primaryBackground">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default CustomerMainLayout;
