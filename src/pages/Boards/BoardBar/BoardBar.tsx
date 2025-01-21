import {
  AddToDrive,
  Bolt,
  Dashboard,
  FilterList,
  PersonAdd,
  VpnLock,
} from "@mui/icons-material";
import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from "@mui/material";
import React from "react";

const MENU_STYLES = {
  color: "white",
  backgroundColor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  ".MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

function BoardBar() {
  return (
    <>
      <Box
        sx={{
          px: 2,
          width: "100%",
          height: (theme) => theme.reactNoteCustom.boradBarHeight,
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          overflowX: "auto",
          alignItems: "center",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          borderBottom: "1px solid white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Chip
            sx={MENU_STYLES}
            icon={<Dashboard />}
            label="Sakata Board"
            clickable
          />

          <Chip
            sx={MENU_STYLES}
            icon={<VpnLock />}
            label="Public/Private workspace"
            clickable
          />

          <Chip
            sx={MENU_STYLES}
            icon={<AddToDrive />}
            label="Add to Driver"
            clickable
          />

          <Chip sx={MENU_STYLES} icon={<Bolt />} label="Automation" clickable />

          <Chip
            sx={MENU_STYLES}
            icon={<FilterList />}
            label="Filters"
            clickable
          />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<PersonAdd />}
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderCollapse: "white",
              },
            }}
          >
            Invite
          </Button>
          <AvatarGroup
            max={4}
            sx={{
              gap: "10px",
              "& .MuiAvatar-root": {
                width: 34,
                height: 34,
                fontSize: 16,
                border: "none",
                color: "white",
                cursor: "pointer",
                "&:first-of-type": {
                  bgcolor: "#a4b0be",
                },
              },
            }}
          >
            <Tooltip title="Sakata">
              <Avatar alt="Sakata" src="/static/images/avatar/1.jpg" />
            </Tooltip>

            <Tooltip title="Sakata">
              <Avatar alt="Sakata" src="/static/images/avatar/1.jpg" />
            </Tooltip>

            <Tooltip title="Sakata">
              <Avatar alt="Sakata" src="/static/images/avatar/1.jpg" />
            </Tooltip>

            <Tooltip title="Sakata">
              <Avatar alt="Sakata" src="/static/images/avatar/1.jpg" />
            </Tooltip>

            <Tooltip title="Sakata">
              <Avatar alt="Sakata" src="/static/images/avatar/1.jpg" />
            </Tooltip>

            <Tooltip title="Sakata">
              <Avatar alt="Sakata" src="/static/images/avatar/1.jpg" />
            </Tooltip>

            <Tooltip title="Sakata">
              <Avatar alt="Sakata" src="/static/images/avatar/1.jpg" />
            </Tooltip>
          </AvatarGroup>
        </Box>
      </Box>
    </>
  );
}

export default BoardBar;
