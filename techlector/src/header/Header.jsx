import styled from "styled-components";
import { Switch, useMantineTheme, rem } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import "./Header.css";

export default function Header({ handleChange, isChecked }) {
  const theme = useMantineTheme();

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <div className="header-container">
      <div className="nav-right">
        <Switch
          className="switch"
          size="md"
          color="dark.4"
          onLabel={moonIcon}
          offLabel={sunIcon}
          onChange={handleChange}
          checked={isChecked}
        />
      </div>
    </div>
  );
}
