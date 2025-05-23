import "./Workstation.css";
import Resizable from "./Resizable.jsx";

export default function Workstation() {
  return (
    <div className="workstation-container">
      <div className="resizable-container">
        <Resizable></Resizable>
      </div>
    </div>
  );
}
