import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

import { Box, Button, ButtonGroup } from "@mui/material";

export default function DetailsCard({
  user,
  selected,
  HandleCheck,
  HandleEdit,
  HandleDelete,
}) {
  const { id, name, email, role } = user;
  return (
    <TableRow id={selected ? "tableRowSelected" : "tableRow"} key={id}>
      <TableCell align="left">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => {
            HandleCheck(id);
          }}
        />
      </TableCell>
      <TableCell align="left">{name}</TableCell>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{role}</TableCell>
      <TableCell align="left">
        <Box display="flex" justifyContent="start" alignItems="center">
          <ButtonGroup>
            <Button
              className="edit-delete"
              startIcon={<EditNoteOutlinedIcon />}
              variant="text"
              onClick={() => {
                // console.log("edit");
                HandleEdit(user);
              }}
            />
          </ButtonGroup>

          <ButtonGroup>
            <Button
              className="edit-delete"
              startIcon={<DeleteOutlineIcon />}
              variant="text"
              color="error"
              onClick={() => {
                HandleDelete([id]);
              }}
            />
          </ButtonGroup>
        </Box>
      </TableCell>
    </TableRow>
  );
}
