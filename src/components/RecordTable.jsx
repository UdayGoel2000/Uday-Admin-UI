import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableCell } from "@mui/material";
import DetailsCard from "./DetailsCard";

function RecordTable({
  usersData,
  selectedArray,
  setEditData,
  handleOpen,
  selectedIdArray,
  deleteUserData,
  tableHeaders,
  selectAll,
  handleDeSelect,
  handleSelect,
}) {
  return (
    <TableContainer component={Paper} m={1}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {tableHeaders.map(({ key, label }) => (
              <TableCell className="tableHeadCells" align="left" key={key}>
                {key === "0" ? (
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={() =>
                      selectAll ? handleDeSelect() : handleSelect()
                    }
                  />
                ) : (
                  <b>{label}</b>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData.map((userData) => (
            <DetailsCard
              user={userData}
              selected={selectedArray.includes(userData.id)}
              HandleEdit={(user) => {
                setEditData(user);
                handleOpen();
              }}
              HandleCheck={(id) => {
                selectedIdArray(id);
              }}
              HandleDelete={(idArray) => {
                deleteUserData(idArray);
              }}
              key={userData.id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RecordTable;
