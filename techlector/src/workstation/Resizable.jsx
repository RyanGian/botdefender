import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./Resizable.css";
import React, { useState } from "react";
import Bottom from "./bottom.svg?react";
import Left from "./left.svg?react";
import Right from "./right.svg?react";
import Top from "./top.svg?react";
import { Button } from "@mantine/core";
import ItemMenu from "./ItemMenu.jsx";

export default function Resizable() {
  return <div className="panel-container"></div>;
}

{
  /* <PanelGroup autoSaveId="horizontal" direction="horizontal">
        <Panel minSize={25} defaultSize={35} maxSize={35}>
          <div className="panel-left">
            <ItemMenu />
          </div>
        </Panel>
        <PanelResizeHandle className="resize-width-handler">
          <div className="with-handle-width">
            <Left className="left-arrow" />
            <Right className="right-arrow" />
          </div>
        </PanelResizeHandle>
        <Panel defaultSize={70}>
          <div className="panel-right"></div>
        </Panel> */
}

{
  /*
        <Panel maxSize={10}>
          <PanelGroup autoSaveId="vertical" direction="vertical">
            <Panel maxSize={90}>
              <div className="panel-left"></div>
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="resize-width-handler">
          <div className="with-handle-width">
            <Left className="left-arrow" />
            <Right className="right-arrow" />
          </div>
        </PanelResizeHandle>

        <Panel maxSize={80}>
          <div className="panel-right"></div>
        </Panel> */
}
{
  /* </PanelGroup> */
}
