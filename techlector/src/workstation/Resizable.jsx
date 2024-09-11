import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./Resizable.css";
import React from "react";
import Bottom from "./bottom.svg?react";
import Left from "./left.svg?react";
import Right from "./right.svg?react";
import Top from "./top.svg?react";

export default function Resizable() {
  const handleDrag = () => {
    console.log("Dragging");
  };

  return (
    <>
      <PanelGroup autoSaveId="horizontal" direction="horizontal">
        <Panel maxSize={35}>
          <PanelGroup autoSaveId="vertical" direction="vertical">
            <Panel maxSize={75}>
              <div className="panel"></div>
            </Panel>
            <PanelResizeHandle className="resize-height-handler">
              <div className="with-handle-height ">
                <Top className="top-arrow" />
                <Bottom className="bottom-arrow" />
              </div>
            </PanelResizeHandle>
            <Panel maxSize={75}>
              <div className="panel"></div>
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
          <div className="panel"></div>
        </Panel>
      </PanelGroup>
    </>
  );
}
