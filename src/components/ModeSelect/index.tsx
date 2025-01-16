import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, useColorScheme } from "@mui/material";
import React from "react";
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  SettingsBrightness as SettingsBrightnessIcon,
} from "@mui/icons-material";

const ModeSelect = () => {
  const { mode, setMode } = useColorScheme();
  if (!mode) {
    return null;
  }

  const handleChange = (event: SelectChangeEvent) => {
    setMode(event.target.value as any);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Mode</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={mode}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={"dark"}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <DarkModeIcon fontSize="small" />
            Dark
          </div>
        </MenuItem>
        <MenuItem value={"light"}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LightModeIcon fontSize="small" />
            Light
          </Box>
        </MenuItem>
        <MenuItem value={"system"}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <SettingsBrightnessIcon fontSize="small" />
            System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
};
export default ModeSelect;
