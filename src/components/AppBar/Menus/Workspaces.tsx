import Cloud from "@mui/icons-material/Cloud";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentPaste from "@mui/icons-material/ContentPaste";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from "react";

function Workspaces() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <Button
          id="basic-button-workspaces"
          aria-controls={open ? "basic-menu-workspace" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          endIcon={<ExpandMoreIcon/>}
        >
          Workspaces
        </Button>
        <Menu
          id="basic-menu-workspace"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button-workspaces",
          }}
        >
          <MenuItem>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ⌘X
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ⌘C
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              ⌘V
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText>Web Clipboard</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}

export default Workspaces;