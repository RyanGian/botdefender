import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import "./Resizable.css";

export default function Resizable() {
  return (
    <>
      <PanelGroup autoSaveId="horizontal" direction="horizontal">
        <Panel maxSize={40}>
          <PanelGroup autoSaveId="vertical" direction="vertical">
            <Panel maxSize={75}>
              <div className="panel"></div>
            </Panel>
            <PanelResizeHandle className="resize-height-handler" />
            <Panel maxSize={75}>
              <div className="panel"></div>
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="resize-width-handler" />
        <Panel maxSize={80}>
          <div className="panel"></div>
        </Panel>
      </PanelGroup>
    </>
  );
}
