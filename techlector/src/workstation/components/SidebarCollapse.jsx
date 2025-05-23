import "./SidebarCollapse.css";
// import PropTypes from "prop-types";
import { Text } from "@mantine/core";
import { RiArrowRightSLine } from "react-icons/ri";

export default function SidebarCollapse({ label, states }) {
  return (
    <>
      <div className="collapse-container">
        <div className="collapse-icon"></div>
        <Text size="sm" className="label-text">
          {label}
        </Text>
        <RiArrowRightSLine className="right-arrow"></RiArrowRightSLine>
      </div>
      <div className="collapse-container-dropdown">
        {JSON.stringify(states)}
        {states &&
          states.map((e, index) => {
            <div className="menu-items" key={index}>
              {e}
              {label}
            </div>;
          })}
      </div>
    </>
  );
}

// SidebarCollapse.propTypes = {
//   label: PropTypes.string,
//   contents: PropTypes.array,
// };
