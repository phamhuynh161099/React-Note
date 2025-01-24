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
  DragOverEvent,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import { cloneDeep } from "lodash";

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
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState<any>(null);

  useEffect(() => {
    setOrderedColums(
      mapOrder(board?.columns, board.columnOrderIds, "_id") as any
    );
  }, [board]);

  const findColumnByCardId = (cardId: any) => {
    return orderedColums.find((column: any) =>
      column?.cards?.map((card: any) => card._id)?.includes(cardId)
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    console.log("handleDragStart", event);
    setActiveDragItemId(event?.active?.id);
    setActiveDragItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDragItemData(event?.active?.data?.current);

    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return;
    }

    console.log("handleDragOver", event);
    const { active, over } = event;

    if (!active || !over) return;

    const {
      id: activeDragginCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;

    const activeColumn: any = findColumnByCardId(activeDragginCardId);
    const overColumn: any = findColumnByCardId(overCardId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn._id !== overColumn._id) {
      setOrderedColums((prevColumns) => {
        const overCardIndex = overColumn?.cards?.findIndex(
          (card: any) => card._id === overCardId
        );

        let newCardIndex;
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newCardIndex =
          overCardIndex >= 0
            ? overCardIndex + modifier
            : overColumn?.cards?.length + 1;

        const nextColumns = cloneDeep(prevColumns);
        const nextActiveColumn: any = nextColumns.find(
          (column: any) => column._id === activeColumn._id
        );
        const nextOverColumn: any = nextColumns.find(
          (column: any) => column._id === overColumn._id
        );

        if (nextActiveColumn) {
          //
          nextActiveColumn.cards = nextActiveColumn.cards.filter(
            (card: any) => card._id !== activeDragginCardId
          );

          // Cập nhật lại mảng OrderIds, do vừa thay đổi phần tử ở đây
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(
            (card: any) => card._id
          );
        }

        if (nextOverColumn) {
          //
          nextOverColumn.cards = nextOverColumn.cards.filter(
            (card: any) => card._id !== activeDragginCardId
          );

          nextOverColumn.cards = nextOverColumn.cards.toSpliced(
            newCardIndex,
            0,
            activeDraggingCardData
          );

          // Cập nhật lại mảng OrderIds, do vừa thay đổi phần tử ở đây
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
            (card: any) => card._id
          );
        }

        return nextColumns;
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over) return;

    console.log("handleDragEnd", event);
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const {
        id: activeDragginCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;

      const activeColumn: any = findColumnByCardId(activeDragginCardId);
      const overColumn: any = findColumnByCardId(overCardId);

      if (!activeColumn || !overColumn) return;

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(
          (c: any) => c._id === activeDragItemId
        );
        const newCardIndex = overColumn?.cards?.findIndex(
          (c: any) => c._id === overCardId
        );

        const dndOrderedCards = arrayMove(
          oldColumnWhenDraggingCard?.cards,
          oldCardIndex,
          newCardIndex
        );

        setOrderedColums((prevColumns: any) => {
          const nextColumns = cloneDeep(prevColumns);

          const targetColumn: any = nextColumns.find(
            (c: any) => c._id === overColumn._id
          );

          targetColumn.cards = dndOrderedCards;
          targetColumn.cardOrderIds = dndOrderedCards.map((column: any) => column._id);
          return nextColumns;
        });
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over?.id) {
        const oldColumnIndex = orderedColums.findIndex(
          (c: any) => c._id === active.id
        );
        const newColumnIndex = orderedColums.findIndex(
          (c: any) => c._id === over?.id
        );
        const dndOrderedColumns = arrayMove(
          orderedColums,
          oldColumnIndex,
          newColumnIndex
        );
        const dndOrderedColumnsIds = dndOrderedColumns.map((c: any) => c._id);

        setOrderedColums(dndOrderedColumns);
      }
    }

    // Clear state khi keo tha xong
    setActiveDragItemId(null);
    setActiveDragItemType(null);
    setActiveDragItemData(null);
    setOldColumnWhenDraggingCard(null);
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
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCorners}
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
