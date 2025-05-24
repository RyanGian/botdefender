import "./Workstation.css";
import Dashboard from "./Dashboard.jsx";

export default function Workstation() {
  return (
    <div className="workstation-container">
      <div className="dashboard-container">
        <Dashboard></Dashboard>
      </div>
    </div>
  );
}
