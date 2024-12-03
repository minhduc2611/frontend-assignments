import { AddBox, CloseOutlined } from "@mui/icons-material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Modal, Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";
import { CommonEntity } from "../../types/common";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export interface HeadCell<T> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
  render?: (cell: T) => React.ReactNode;
}

interface EnhancedTableProps<T> {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string | number | symbol;
  rowCount: number;
  headCells: readonly HeadCell<T>[];
}

function EnhancedTableHead<T>(props: EnhancedTableProps<T>) {
  const {
    headCells,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof T) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={String(headCell.id)}
            align={"left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  );
}
interface EnhancedTableToolbarProps {
  title: string;
  numSelected: number;
  keyword?: string;
  setKeyword?: (keyword: string) => void;
  renderCreateComponent?: (callback: () => void) => React.ReactNode;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, title, renderCreateComponent } = props;
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Stack direction={"row"} gap={4} alignItems={"center"}>
          <Box style={{ width: 300 }}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Search"
              variant="outlined"
              value={props.keyword}
              onChange={(e) => props.setKeyword?.(e.target.value)}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <CreateModal renderCreateComponent={renderCreateComponent} />
          </Box>
        </Stack>
      )}
    </Toolbar>
  );
}

type EnhancedSortableTableProps<T extends CommonEntity> = {
  rows: T[];
  headCells: readonly HeadCell<T>[];
  title: string;
  renderUpdateComponent?: (row: T, callback: () => void) => React.ReactNode;
  renderCreateComponent?: (callback: () => void) => React.ReactNode;
  deleteAction?: (row: T, callback: () => void) => void;
};
export default function EnhancedSortableTable<T extends CommonEntity>(
  props: EnhancedSortableTableProps<T>
) {
  const {
    rows,
    headCells,
    title,
    renderUpdateComponent,
    renderCreateComponent,
    deleteAction,
  } = props;
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof T>("id");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [keyword, setKeyword] = React.useState("");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id || 0);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(() => {
    // console.log("rows", rows);
    // console.log("order", order);
    // console.log("orderBy", orderBy);
    return [...rows]
      .sort(getComparator(order, orderBy))
      .filter((row) => {
        const theString = Object.values(row).join(" ").toLowerCase();
        return theString.includes(keyword.toLowerCase());
      })
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [order, orderBy, page, rowsPerPage, rows, keyword]);

  React.useEffect(() => {
    setPage(0);
  }, [keyword]);
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar
          keyword={keyword}
          setKeyword={setKeyword}
          title={title}
          numSelected={selected.length}
          renderCreateComponent={renderCreateComponent}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <EnhancedTableHead<T>
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id || 0);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id || 0)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    {headCells.map((cell: HeadCell<T>, index) => {
                      const key: keyof T = cell.id;
                      return (
                        <TableCell
                          component={index === 0 ? "th" : "td"}
                          key={String(key) + row.id}
                          align={"left"}
                          padding={cell.disablePadding ? "none" : "normal"}
                        >
                          {cell.render ? cell.render(row) : String(row[key])}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <EditModal
                        row={row}
                        renderUpdateComponent={renderUpdateComponent}
                      />
                      <DeleteModal row={row} deleteAction={deleteAction} />
                    </TableCell>
                  </TableRow>
                );
              })}
              {visibleRows.length === 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={headCells.length + 1}>
                    <Stack
                      p={2}
                      width={"100%"}
                      alignItems={"center"}
                      justifyItems={"center"}
                    >
                      <Box>No data matched</Box>
                    </Stack>
                  </TableCell>
                </TableRow>
              )}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

const styleEdit = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function EditModal<T extends CommonEntity>({
  row,
  renderUpdateComponent,
}: {
  row: T;
  renderUpdateComponent?: (row: T, handleClose: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          console.log("update", row.id);
          handleOpen();
        }}
        aria-label="update"
      >
        <BorderColorIcon />
      </IconButton>
      <Modal
        keepMounted
        open={open}
        onClose={() => {
          handleClose();
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={styleEdit}
          position={"relative"}
        >
          <Box
            position={"absolute"}
            right={0}
            paddingRight={4}
            style={{ cursor: "pointer" }}
          >
            <CloseOutlined onClick={handleClose} />
          </Box>
          {renderUpdateComponent && renderUpdateComponent(row, handleClose)}
        </Box>
      </Modal>
    </>
  );
}

function CreateModal<T extends CommonEntity>({
  renderCreateComponent,
}: {
  renderCreateComponent?: (callback: () => void) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Add">
        <IconButton
          color="primary"
          onClick={(e) => {
            e.stopPropagation();
            handleOpen();
          }}
        >
          <AddBox />
        </IconButton>
      </Tooltip>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={styleEdit}
          position={"relative"}
        >
          <Box
            position={"absolute"}
            right={0}
            paddingRight={4}
            style={{ cursor: "pointer" }}
          >
            <CloseOutlined onClick={handleClose} />
          </Box>
          {renderCreateComponent && renderCreateComponent(handleClose)}
        </Box>
      </Modal>
    </>
  );
}
const styleDelete = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function DeleteModal<T extends CommonEntity>({
  row,
  deleteAction,
}: {
  row: T;
  deleteAction?: (row: T, callback: () => void) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        color="error"
        onClick={(e) => {
          e.stopPropagation();
          console.log("delete", row.id);
          handleOpen();
        }}
        aria-label="delete"
      >
        <DeleteIcon />
      </IconButton>
      <Modal
        keepMounted
        open={open}
        onClose={(e: any) => {
          e.stopPropagation();
          handleClose();
        }}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={styleDelete}
          position={"relative"}
          padding={3}
        >
          {/* <Box
            position={"absolute"}
            right={0}
            paddingRight={4}
            style={{ cursor: "pointer" }}
          >
            <CloseOutlined onClick={handleClose} />
          </Box> */}
          <Typography
            id="keep-mounted-modal-title"
            variant="h6"
            component="h2"
            paddingTop={2}
            align="center"
          >
            Are you sure you want to delete?
          </Typography>
          <Stack
            direction={"row"}
            spacing={2}
            justifyContent={"end"}
            paddingTop={3}
          >
            <Button
              variant="contained"
              onClick={() => {
                console.log("delete", row.id);
                deleteAction?.(row, handleClose);
              }}
            >
              Yes
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              No
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}
