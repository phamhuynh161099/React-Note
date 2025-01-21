import { Attachment, Comment, Group } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "./Card/Card";

const ListCards = () => {
  return (
    <>
      <Box
        sx={{
          p: "0 5px",
          m: "0 5px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflowX: "hidden",
          overflowY: "auto",
          maxHeight: (theme) =>
            `calc(${theme.reactNoteCustom.boardContentHeight} - ${theme.spacing(
              5
            )} - ${theme.reactNoteCustom.columHeaderHeight} - ${
              theme.reactNoteCustom.columnFooterHeight
            })`,
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#ced0da",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#bfc2bf",
          },
        }}
      >
        <Card />
        <Card temporaryHideMedia />
      </Box>
    </>
  );
};

export default ListCards;
