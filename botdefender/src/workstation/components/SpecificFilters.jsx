import "./SpecificFilters.css";
// import LinksGroup from "./NavbarLinks.jsx";
import { RiArrowDropDownLine } from "react-icons/ri";
import SidebarCollapse from "./SidebarCollapse.jsx";
import { useState } from "react";

export default function SpecificFilters() {
  const [state, setState] = useState(false);
  const [state1, setState1] = useState(false);

  function MakeState(label, state, setState) {
    return { label: label, state: state, setState: setState };
  }

  const aws = [
    MakeState("option 1", state, setState),
    MakeState("option 2", state1, setState1),
  ];

  return <></>;
}
