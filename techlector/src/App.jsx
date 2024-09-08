import React, { useState } from "react";
import "./App.css";
import Workstation from "./workstation/Workstation.jsx";
import Header from "./header/Header.jsx";
import useLocalStorage from "use-local-storage";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

export default function App() {
  // const preference = window.matchMedia("(prefers-color-scheme: dark)").matches;
  // const [isDark, setIsDark] = useLocalStorage("isDark", preference);

  const [isDark, setIsDark] = useLocalStorage("isDark", false);
  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
      <div className="App" data-theme={isDark ? "dark" : "light"}>
        <Header
          isChecked={isDark}
          handleChange={() => {
            setIsDark(!isDark);
          }}
        ></Header>
        <Workstation></Workstation>
        {/* <h1 className="title">hello world!</h1>
        <div className="box">
          <h2>This is a box</h2>
        </div> */}
      </div>
    </MantineProvider>
  );
}
