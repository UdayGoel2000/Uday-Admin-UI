import React from "react";
import { Box, Fab, Chip } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";

function ActionButtons({
  selectedArray,
  handleDelete,
  selectedButton,
  usersData,
  buttonArray,
  handleOnClick,
}) {
  return (
    <>
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
            color={!selectedArray.length ? "disabled" : "error"}
            size="small"
            onClick={() => {
              handleDelete(selectedArray);
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
            color={selectedButton === "bt_1" ? "disabled" : "primary"}
            size="small"
            id="DoubleArrow"
            onClick={(e) => {
              handleOnClick("bt_1");
            }}
          >
            <KeyboardDoubleArrowLeftOutlinedIcon />
          </Fab>
          <Fab
            color={selectedButton === "bt_1" ? "disabled" : "primary"}
            size="small"
            id="ChevronLeft"
            onClick={(e) => {
              let btn = "bt_" + (selectedButton[selectedButton.length - 1] - 1);
              handleOnClick(btn);
            }}
          >
            <ChevronLeftOutlinedIcon />
          </Fab>
          <Box id="desktopButton">
            {buttonArray.map((button) => (
              <Fab
                color={
                  selectedButton === "bt_" + button ? "secondary" : "primary"
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
              selectedButton === "bt_" + buttonArray[buttonArray.length - 1]
                ? "disabled"
                : usersData.length
                ? "primary"
                : "disabled"
            }
            size="small"
            id="ChevronRight"
            onClick={(e) => {
              let btn =
                "bt_" + (Number(selectedButton[selectedButton.length - 1]) + 1);
              handleOnClick(btn);
            }}
          >
            <ChevronRightOutlinedIcon />
          </Fab>
          <Fab
            color={
              selectedButton === "bt_" + buttonArray[buttonArray.length - 1]
                ? "disabled"
                : usersData.length
                ? "primary"
                : "disabled"
            }
            size="small"
            id="DoubleArrow"
            onClick={(e) => {
              handleOnClick("bt_" + buttonArray[buttonArray.length - 1]);
            }}
          >
            <KeyboardDoubleArrowRightOutlinedIcon />
          </Fab>
        </Box>
      </Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        id="mobileButton"
      >
        <Box sx={{ display: "inline-block" }}>
          <Fab
            color={!selectedArray.length ? "disabled" : "error"}
            size="small"
            onClick={() => {
              handleDelete(selectedArray);
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
          // pr={1}
        >
          <Fab
            color={selectedButton === "bt_1" ? "disabled" : "primary"}
            size="small"
            id="DoubleArrow"
            onClick={(e) => {
              handleOnClick("bt_1");
            }}
          >
            <KeyboardDoubleArrowLeftOutlinedIcon />
          </Fab>
          <Fab
            color={selectedButton === "bt_1" ? "disabled" : "primary"}
            size="small"
            id="ChevronLeft"
            onClick={(e) => {
              let btn = "bt_" + (selectedButton[selectedButton.length - 1] - 1);
              handleOnClick(btn);
            }}
          >
            <ChevronLeftOutlinedIcon />
          </Fab>
          <Chip
            label={
              buttonArray.length
                ? "Page " +
                  selectedButton.substring(selectedButton.indexOf("_") + 1) +
                  " / " +
                  buttonArray[buttonArray.length - 1]
                : "Page 0 / 0"
            }
            color="primary"
            size="medium"
          />
          <Fab
            color={
              selectedButton === "bt_" + buttonArray[buttonArray.length - 1]
                ? "disabled"
                : "primary"
            }
            size="small"
            id="ChevronRight"
            onClick={(e) => {
              let btn =
                "bt_" + (Number(selectedButton[selectedButton.length - 1]) + 1);
              handleOnClick(btn);
            }}
          >
            <ChevronRightOutlinedIcon />
          </Fab>
          <Fab
            color={
              selectedButton === "bt_" + buttonArray[buttonArray.length - 1]
                ? "disabled"
                : "primary"
            }
            size="small"
            id="DoubleArrow"
            onClick={(e) => {
              handleOnClick("bt_" + buttonArray[buttonArray.length - 1]);
            }}
          >
            <KeyboardDoubleArrowRightOutlinedIcon />
          </Fab>
        </Box>
      </Box>
    </>
  );
}

export default ActionButtons;
