import { Box } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "@/utils/sort";

interface BoardContentProps {
  board: any;
}

function BoardContent({ board }: BoardContentProps) {
  const orderedColumns = mapOrder(board?.columns,board.columnOrderIds,'_id')
  return (
    <>
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
          width: "100%",
          height: (theme) => theme.reactNoteCustom.boardContentHeight,
          p: "10px 0",
        }}
      >
        <ListColumns columns={orderedColumns}/>
      </Box>
    </>
  );
}

export default BoardContent;
