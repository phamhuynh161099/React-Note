import { Box } from "@mui/material";
import React from "react";

function BoardBar() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "primary.dark",
          width: "100%",
          height: (theme) => theme.reactNoteCustom.boradBarHeight,
          display: "flex",
          alignItems: "center",
        }}
      >
        Board Bar
      </Box>
    </>
  );
}

export default BoardBar;
