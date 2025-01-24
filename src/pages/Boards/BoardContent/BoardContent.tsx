import { Box } from "@mui/material";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "@/utils/sort";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DropAnimation,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";

interface BoardContentProps {
  board: any;
}

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function BoardContent({ board }: BoardContentProps) {
  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 10 },
  });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 500 },
  });
  // const sensors = useSensors(pointerSensor);
  const sensors = useSensors(mouseSensor, touchSensor);

  const [orderedColums, setOrderedColums] = useState([]);

  const [activeDragItemId, setActiveDragItemId] = useState<any>(null);
  const [activeDragItemType, setActiveDragItemType] = useState<any>(null);
  const [activeDragItemData, setActiveDragItemData] = useState<any>(null);

  useEffect(() => {
    setOrderedColums(
      mapOrder(board?.columns, board.columnOrderIds, "_id") as any
    );
  }, [board]);

  const handleDragStart = (event: DragStartEvent) => {
    console.log("handleDragStart", event);
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("handleDragEnd", event);
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over?.id) {
      const oldIndex = orderedColums.findIndex((c: any) => c._id === active.id);
      const newIndex = orderedColums.findIndex((c: any) => c._id === over?.id);
      const dndOrderedColumns = arrayMove(orderedColums, oldIndex, newIndex);
      const dndOrderedColumnsIds = dndOrderedColumns.map((c: any) => c._id);

      setOrderedColums(dndOrderedColumns);
    }

    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
  };

  const dropAnimation: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  return (
    <>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
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
          <DragOverlay dropAnimation={dropAnimation}>
            {!activeDragItemType && null}
            {activeDragItemId &&
              activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
                <Column column={activeDragItemData} />
              )}
            {activeDragItemId &&
              activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
                <Card card={activeDragItemData} />
              )}
          </DragOverlay>
        </Box>
      </DndContext>
    </>
  );
}

export default BoardContent;
