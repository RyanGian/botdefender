import "./Dropdown.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import React, { useState, useRef, useEffect } from "react";
import "animate.css";

export default function Dropdown() {
  const items = ["Ascending", "Descending"];
  const [dropdownOpen, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownClick = () => {
    setDropdown((prev) => !prev);
  };

  const handleOutsideClick = (event) => {
    // Check if the click is outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="entire-container" ref={dropdownRef}>
      <div className="dropdown-container" onClick={handleDropdownClick}>
        <div>Sort</div>
        <div>
          <RiArrowDropDownLine className="dropdown-arrow" />
        </div>
      </div>

      <div
        className={
          dropdownOpen ? "dropdown-box dropdown-box-open" : "dropdown-box"
        }
      >
        {items.map((e, index) => (
          <div className={"dropdown-box-children"} key={index}>
            {e}
          </div>
        ))}
      </div>
    </div>
  );
}
