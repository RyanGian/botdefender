import React, { useState } from "react";
import "./App.css";
import Workstation from "./workstation/Workstation.jsx";
import Header from "./header/Header.jsx";
import useLocalStorage from "use-local-storage";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";

export default function App() {
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
      </div>
    </MantineProvider>
  );
}
