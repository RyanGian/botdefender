import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./Dashboard.css";
import React, { useState } from "react";
import { Grid } from "@mantine/core";

import GlobeCanvas from "./components/globe/GlobeCanvas.jsx";
import CountryBreakdown from "./components/countrybreakdown/CountryBreakdown.jsx";

import AttackInput from "./components/attackinput/AttackInput.jsx";

import UserBreakdown from "./components/userbreakdown/UserBreakdown.jsx";

export default function Dashboard() {
  const [userRequestBreakdownCountry, setUserRequestBreakdownCountry] =
    useState("");

  const [userbreakdownLoadingState, setUserbreakdownLoadingState] =
    useState(false);

  const [refresh, setRefresh] = useState(false);

  const toggleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="panel-container">
      <PanelGroup autoSaveId="horizontal" direction="horizontal">
        <Panel
          className="panel-left"
          defaultSize={30}
          minSize={20}
          maxSize={40}
        >
          <AttackInput toggleRefresh={toggleRefresh}></AttackInput>
        </Panel>
        <PanelResizeHandle className="vertical-resize-bar">
          <div className="vertical-bar"></div>
        </PanelResizeHandle>
        <Panel className="panel-right" defaultSize={30} minSize={20}>
          <Grid grow gutter="10px">
            <Grid.Col span={12}>
              <div className="boxes">
                <div style={{ width: "100%", height: "100%" }}>
                  <GlobeCanvas
                    selectedCountry={userRequestBreakdownCountry}
                    setSelectedCountry={setUserRequestBreakdownCountry}
                    setLoadingState={setUserbreakdownLoadingState}
                    refresh={refresh}
                  ></GlobeCanvas>
                </div>
              </div>
            </Grid.Col>
            {/* <Grid.Col span={6}>
              <div className="boxes">1</div>
            </Grid.Col> */}
            <Grid.Col span={6}>
              <div className="boxes">
                <UserBreakdown
                  selectedCountry={userRequestBreakdownCountry}
                  loadingState={userbreakdownLoadingState}
                  setLoadingState={setUserbreakdownLoadingState}
                  refresh={refresh}
                ></UserBreakdown>
              </div>
            </Grid.Col>
            <Grid.Col span={6}>
              <div className="boxes">
                <CountryBreakdown refresh={refresh}></CountryBreakdown>
              </div>
            </Grid.Col>
          </Grid>
        </Panel>
      </PanelGroup>
    </div>
  );
}
