import { ModalPayment } from "src/Components/UI/ModalUI/ModalPayment/ModalPayment";
import { DashboardRoutes } from "./routes/DashboardRoutes";

export const App = () => {
  return (
    <div className="App">
      <ModalPayment />

      <DashboardRoutes />
    </div>
  );
};
