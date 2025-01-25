import { mapOrder } from "@/utils/sort";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  DropAnimation,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  defaultDropAnimationSideEffects,
  getFirstCollision,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { cloneDeep, isEmpty } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import Column from "./ListColumns/Column/Column";
import Card from "./ListColumns/Column/ListCards/Card/Card";
import ListColumns from "./ListColumns/ListColumns";
import { generatePlaceholderCard } from "@/utils/formatters";

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

  const lastOverId = useRef<any>(null);

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

  const moveCardBetweenDifferentColumns = (
    overColumn: any,
    overCardId: any,
    active: any,
    over: any,
    activeColumn: any,
    activeDragginCardId: any,
    activeDraggingCardData: any
  ) => {
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

        //* Thêm 1 card ảo, nếu đã di chuyển hết card
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)];
        }

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

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id,
        };

        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          rebuild_activeDraggingCardData
        );

        //* Xóa card ảo
        nextOverColumn.cards = nextOverColumn.cards.filter(
          (card: any) => !card.FE_PlaceholderCard
        );

        // Cập nhật lại mảng OrderIds, do vừa thay đổi phần tử ở đây
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(
          (card: any) => card._id
        );
      }

      return nextColumns;
    });
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
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDragginCardId,
        activeDraggingCardData
      );
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
        //* Khi kéo card giữa các column khác nhau
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDragginCardId,
          activeDraggingCardData
        );
      } else {
        //* Khi kéo card trong cùng 1 column
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
          targetColumn.cardOrderIds = dndOrderedCards.map(
            (column: any) => column._id
          );
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

  const collisionDetectionStrategy: any = useCallback(
    (args: any) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args });
      }

      //* Tim cac diem giao nhau
      const pointerIntersections = pointerWithin(args);

      //* Nếu là mảng rỗng-> không cần check nữa
      if (!pointerIntersections?.length) return;

      // const intersections = !!pointerIntersections?.length
      //   ? pointerIntersections
      //   : rectIntersection(args);

      let overId: any = getFirstCollision(pointerIntersections, "id");
      if (overId) {
        const checkColumn: any = orderedColums.find(
          (column: any) => column._id === overId
        );

        if (checkColumn) {
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter(
              (container: any) => {
                return (
                  container.id !== overId &&
                  checkColumn?.cardOrderIds?.includes(container.id)
                );
              }
            ),
          })[0]?.id;
        }

        lastOverId.current = overId;
        return [{ id: overId }];
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : [];
    },
    [activeDragItemType, orderedColums]
  );

  return (
    <>
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={collisionDetectionStrategy}
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
