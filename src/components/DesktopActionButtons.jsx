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
      py={4}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      id="desktopButton"
    >
      <Box pl={2} alignSelf="center">
        <Fab
          variant="extended"
          color={!selectedUsersIdArray.length ? "disabled" : "error"}
          size="small"
          onClick={() => {
            handleDelete(selectedUsersIdArray);
          }}
        >
          <DeleteOutlineIcon size="small" />
          Delete Selected
        </Fab>
      </Box>
      <Box
        id="fabBox"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        pr={2}
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
        <Box id="desktopButton">
          {pagenationButtonArray.map((button) => (
            <Fab
              color={
                selectedButtonId === "bt_" + button ? "secondary" : "primary"
              }
              size="small"
              id={`bt_${button}`}
              key={`bt_${button}`}
              onClick={(e) => {
                handleOnClick(e.target.id);
              }}
            >
              {button}
            </Fab>
          ))}
        </Box>
        <Fab
          color={
            selectedButtonId ===
            "bt_" + pagenationButtonArray[pagenationButtonArray.length - 1]
              ? "disabled"
              : usersData.length
              ? "primary"
              : "disabled"
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
              : usersData.length
              ? "primary"
              : "disabled"
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
