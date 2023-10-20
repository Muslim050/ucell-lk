import { Route, Routes } from "react-router-dom";
import { MainPage } from "src/pages/MainPage/MainPage";
// import Home from "src/pages/Home/Home";
import Home from "../pages/Home/Home";
import ChangeTariffPage from "src/pages/TariffPage/TariffPage";
import ChangeServicesPage from "src/pages/ServicesPage/ServicesPage";
import Login from "src/pages/Login/Login";

export const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/change-rate" element={<ChangeTariffPage />} />
        <Route path="/change-services" element={<ChangeServicesPage />} />
      </Route>
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<Login />} />
    </Routes>
  );
};
