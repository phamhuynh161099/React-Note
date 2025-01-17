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
  color: "primary.main",
  backgroundColor: "white",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  "& .MuiSvgIcon-root": {
    color: "primary.main",
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
          borderTop: "1px solid #00bfa5",
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
          <Button variant="outlined" startIcon={<PersonAdd />}>
            Invite
          </Button>
          <AvatarGroup
            max={4}
            sx={{
              "& .MuiAvatar-root": {
                width: 34,
                height: 34,
                fontSize: 16,
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
