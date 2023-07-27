import React from "react";
import { Box, Fab, Chip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

function DesktopActionButtons({
  selectedUsersIdArray,
  handleDelete,
  selectedButtonId,
  usersData,
  pagenationButtonArray,
  handleOnClick,
}) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      id="mobileButton"
    >
      <Box sx={{ display: "inline-block" }}>
        <Fab
          color={!selectedUsersIdArray.length ? "disabled" : "error"}
          size="small"
          onClick={() => {
            handleDelete(selectedUsersIdArray);
          }}
        >
          <DeleteOutlineIcon size="small" />
        </Fab>
      </Box>
      <Box
        sx={{ display: "inline-block" }}
        id="fabBoxMob"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Fab
          color={selectedButtonId === "bt_1" ? "disabled" : "primary"}
          size="small"
          id="DoubleArrow"
          onClick={(e) => {
            handleOnClick("bt_1");
          }}
        >
          <KeyboardDoubleArrowLeftOutlinedIcon />
        </Fab>
        <Fab
          color={selectedButtonId === "bt_1" ? "disabled" : "primary"}
          size="small"
          id="ChevronLeft"
          onClick={(e) => {
            let btn =
              "bt_" + (selectedButtonId[selectedButtonId.length - 1] - 1);
            handleOnClick(btn);
          }}
        >
          <ChevronLeftOutlinedIcon />
        </Fab>
        <Chip
          label={
            pagenationButtonArray.length
              ? "Page " +
                selectedButtonId.substring(selectedButtonId.indexOf("_") + 1) +
                " / " +
                pagenationButtonArray[pagenationButtonArray.length - 1]
              : "Page 0 / 0"
          }
          color="primary"
          size="medium"
        />
        <Fab
          color={
            selectedButtonId ===
            "bt_" + pagenationButtonArray[pagenationButtonArray.length - 1]
              ? "disabled"
              : "primary"
          }
          size="small"
          id="ChevronRight"
          onClick={(e) => {
            let btn =
              "bt_" +
              (Number(selectedButtonId[selectedButtonId.length - 1]) + 1);
            handleOnClick(btn);
          }}
        >
          <ChevronRightOutlinedIcon />
        </Fab>
        <Fab
          color={
            selectedButtonId ===
            "bt_" + pagenationButtonArray[pagenationButtonArray.length - 1]
              ? "disabled"
              : "primary"
          }
          size="small"
          id="DoubleArrow"
          onClick={(e) => {
            handleOnClick(
              "bt_" + pagenationButtonArray[pagenationButtonArray.length - 1]
            );
          }}
        >
          <KeyboardDoubleArrowRightOutlinedIcon />
        </Fab>
      </Box>
    </Box>
  );
}

export default DesktopActionButtons;
