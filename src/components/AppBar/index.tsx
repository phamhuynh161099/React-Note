import {
  Badge,
  Box,
  Button,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ModeSelect from "../ModeSelect";
import AppsIcon from "@mui/icons-material/Apps";

// import { ReactComponent as AppLogo } from '../../assets/applogo.svg?react';
import AppLogo from "../../assets/applogo.svg?react";
import SvgIcon from "@mui/material/SvgIcon";
import Workspaces from "./Menus/Workspaces";
import Recent from "./Menus/Recent";
import Starred from "./Menus/Starred";
import Templates from "./Menus/Templates";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profiles from "./Menus/Profiles";

function AppBar() {
  return (
    <>
      <Box
        px={2}
        sx={{
          width: "100%",
          height: (theme) => theme.reactNoteCustom.appBarHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <AppsIcon sx={{ color: "primary.light" }} />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <SvgIcon
              component={AppLogo}
              inheritViewBox
              sx={{ color: "primary.main" }}
            />
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "primary.light",
              }}
            >
              Note
            </Typography>
          </Box>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />

          <Button variant="outlined">Crate</Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            id="outlined-search"
            label="Search..."
            type="search"
            size="small"
          />
          <ModeSelect />

          <Tooltip title="Notification">
            <Badge color="secondary" variant="dot" sx={{ cursor: "pointer" }}>
              <NotificationsNoneIcon />
            </Badge>
          </Tooltip>

          <Tooltip title="Help">
            <HelpOutlineIcon sx={{ cursor: "pointer" }} />
          </Tooltip>

          <Profiles/>
        </Box>
      </Box>
    </>
  );
}

export default AppBar;