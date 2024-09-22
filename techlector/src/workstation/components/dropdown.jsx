import "./dropdown.css";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function Dropdown() {
  return (
    <div className="dropdown-container">
      <div>Sort</div>
      <div>
        <RiArrowDropDownLine className="dropdown-arrow" />
      </div>
    </div>
  );
}
