import { Box, Button } from "@mui/material";
import Column from "./Column/Column";
import { NoteAdd } from "@mui/icons-material";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";

interface ListColumnsProps {
  columns: any;
}

const ListColumns = ({ columns }: ListColumnsProps) => {
  return (
    <>
      <SortableContext
        items={columns?.map((c:any) => c._id)}
        strategy={horizontalListSortingStrategy}
      >
        <Box
          sx={{
            bgcolor: "inherit",
            width: "100%",
            height: "100%",
            display: "flex",
            overflowX: "auto",
            overflowY: "hidden",
            "&::-webkit-scrollbar-track": {
              m: 2,
            },
          }}
        >
          {columns?.map((column: any, index: any) => {
            return (
              <>
                <Column key={column._id} column={column} />
              </>
            );
          })}

          {/* Box Add new button */}
          <Box
            sx={{
              minWidth: "200px",
              maxWidth: "200px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
            }}
          >
            <Button
              sx={{
                color: "white",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
              }}
              startIcon={<NoteAdd />}
            >
              Add new column
            </Button>
          </Box>
        </Box>
      </SortableContext>
    </>
  );
};

export default ListColumns;
