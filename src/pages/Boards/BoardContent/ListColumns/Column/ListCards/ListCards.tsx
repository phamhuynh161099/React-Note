import { Box } from "@mui/material";
import Card from "./Card/Card";

interface ListCardsProps {
  cards: any;
}

const ListCards = ({ cards }: ListCardsProps) => {
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
        {cards?.map((card: any) => {
          return (
            <>
              <Card key={card?._id} card={card}/>
            </>
          );
        })}
      </Box>
    </>
  );
};

export default ListCards;
