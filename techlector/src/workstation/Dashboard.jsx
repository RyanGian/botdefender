import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./Dashboard.css";
import React, { useState } from "react";

import { Button } from "@mantine/core";
import ItemMenu from "./ItemMenu.jsx";
import Dropdown from "./components/Dropdown.jsx";
import SpecificFilters from "./components/SpecificFilters.jsx";
import { Grid } from "@mantine/core";

import GlobeCanvas from "./components/globe/GlobeCanvas.jsx";
import CountryBreakdown from "./components/countrybreakdown/CountryBreakdown.jsx";

import AttackInput from "./components/attackinput/AttackInput.jsx";

import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from "react-icons/tb";

import { PiSquaresFourFill } from "react-icons/pi";

import { IoIosApps } from "react-icons/io";
import { IoApps } from "react-icons/io5";
import { FaSquare } from "react-icons/fa";
import { MdFilterListAlt } from "react-icons/md";

export default function Dashboard() {
  return (
    <div className="panel-container">
      <PanelGroup autoSaveId="horizontal" direction="horizontal">
        <Panel
          className="panel-left"
          defaultSize={30}
          minSize={20}
          maxSize={40}
        >
          {/* <div className="collapsible-navbar">
            <TbLayoutSidebarLeftCollapseFilled className="left-collapse-button" />
          </div> */}
          {/* <div className="filters-search-row">
            <Dropdown></Dropdown>
            <PiSquaresFourFill className="stack" />
            <MdFilterListAlt className="stack" />
          </div> */}
          <AttackInput></AttackInput>
          {/* <SpecificFilters></SpecificFilters> */}
        </Panel>
        <PanelResizeHandle className="vertical-resize-bar">
          <div className="vertical-bar"></div>
        </PanelResizeHandle>
        <Panel className="panel-right" defaultSize={30} minSize={20}>
          <Grid grow gutter="10px">
            <Grid.Col span={12}>
              <div className="boxes">
                <div style={{ width: "100%", height: "100%" }}>
                  <GlobeCanvas></GlobeCanvas>
                </div>
              </div>
            </Grid.Col>
            {/* <Grid.Col span={6}>
              <div className="boxes">1</div>
            </Grid.Col> */}
            <Grid.Col span={6}>
              <div className="boxes">1</div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className="boxes">
                <CountryBreakdown></CountryBreakdown>
              </div>
            </Grid.Col>
          </Grid>
          {/* <div className="bottom-options">
            <IoIosApps className="stack" />
            <IoApps className="stack" />
            <FaSquare className="stack" />
          </div> */}
        </Panel>
      </PanelGroup>
    </div>
  );
}
