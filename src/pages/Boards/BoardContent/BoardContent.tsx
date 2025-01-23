import { Box } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "@/utils/sort";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

interface BoardContentProps {
  board: any;
}

function BoardContent({ board }: BoardContentProps) {
  const [orderedColums, setOrderedColums] = useState([]);
  useEffect(() => {
    setOrderedColums(
      mapOrder(board?.columns, board.columnOrderIds, "_id") as any
    );
  }, [board]);

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("handleDragEnd", event);
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = orderedColums.findIndex((c: any) => c._id === active.id);
      const newIndex = orderedColums.findIndex((c: any) => c._id === over?.id);
      const dndOrderedColumns = arrayMove(orderedColums, oldIndex, newIndex);
      const dndOrderedColumnsIds = dndOrderedColumns.map((c: any) => c._id);

      setOrderedColums(dndOrderedColumns);
    }
  };
  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
            width: "100%",
            height: (theme) => theme.reactNoteCustom.boardContentHeight,
            p: "10px 0",
          }}
        >
          <ListColumns columns={orderedColums} />
        </Box>
      </DndContext>
    </>
  );
}

export default BoardContent;
