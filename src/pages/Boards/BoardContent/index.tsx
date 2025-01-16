import { Box } from "@mui/material";

function BoardContent() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "primary.main",
          width: "100%",
          height: (theme) =>
            `calc(100vh - ${theme.reactNoteCustom.appBarHeight} - ${theme.reactNoteCustom.boradBarHeight})`,
          display: "flex",
          alignItems: "center",
        }}
      >
        Board Content
      </Box>
    </>
  );
}

export default BoardContent;
