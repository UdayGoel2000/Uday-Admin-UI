import React from "react";
import { TableCell } from "@mui/material";

function TableHeaderRows({
  headerKey,
  headerLabel,
  selectAll,
  handleDeSelect,
  handleSelect,
}) {
  return (
    <TableCell className="tableHeadCells" align="left" key={headerKey}>
      {headerKey === "0" ? (
        <input
          type="checkbox"
          checked={selectAll}
          onChange={() => (selectAll ? handleDeSelect() : handleSelect())}
        />
      ) : (
        <b>{headerLabel}</b>
      )}
    </TableCell>
  );
}

export default TableHeaderRows;
