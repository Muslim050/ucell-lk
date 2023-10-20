import { Outlet, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from "src/Components/UI/Header/Header";

function Home() {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <>
      <Header />

      <div>
        <div style={{ maxWidth: "1325px", margin: "0 auto", padding: "15px" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Home;
