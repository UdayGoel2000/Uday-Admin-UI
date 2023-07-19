import {
  Stack,
  Box,
  Modal,
  Backdrop,
  Fade,
  Typography,
  TextField,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import axios from "axios";
import AppBar from "./appBar";
import SearchBar from "./searchBar";
import { useEffect, useState } from "react";

import UpgradeOutlinedIcon from "@mui/icons-material/UpgradeOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import DetailsCard from "./detailsCard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";

// import { CheckBox } from "@mui/icons-material";

export default function UsersDetailsCard() {
  const [selectedArray, setSelectedArray] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [selectedButton, setSelectedButton] = useState("bt_1");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editData, setEditData] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [buttonArray, setButtonArray] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    let timer;
    // console.log(searchText);
    if (searchText) {
      timer = setTimeout(() => {
        performApiSearch(searchText);
      }, 500);
    } else {
      let arr = apiData;
      let btnId = Number(
        selectedButton.substring(selectedButton.indexOf("_") + 1)
      );
      let TotalRecords = arr.length;
      let TotalPages = Math.ceil(TotalRecords / 10);
      const range = (start, end) => {
        let length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
      };
      setButtonArray(range(1, TotalPages));
      let end = btnId * 10;
      let start = end - 10;

      if (!arr[start]) {
        setSelectedButton("bt_1");
        start = 0;
        end = 10;
      }
      let newArr = [];
      for (let i = start; i < end; i++) {
        if (arr[i]) {
          newArr.push(arr[i]);
        }
      }
      setUsersData(newArr);
      // setUsersData(apiData);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [searchText, apiData, selectedButton, selectedArray, selectAll]);

  const fetchDetails = async () => {
    try {
      let res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      // setUsersData(res.data);
      setApiData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const performApiSearch = (text) => {
    // console.log(text);
    // console.log(apiData);
    let filterName = [
      ...apiData.filter((userData) => {
        if (userData.name.toLowerCase().indexOf(text.toLowerCase()) === -1)
          return false;
        else return true;
      }),
    ];
    let filterEmail = [
      ...apiData.filter((userData) => {
        if (userData.email.toLowerCase().indexOf(text.toLowerCase()) === -1)
          return false;
        else return true;
      }),
    ];
    let filterRole = [
      ...apiData.filter((userData) => {
        if (userData.role.toLowerCase().indexOf(text.toLowerCase()) === -1)
          return false;
        else return true;
      }),
    ];
    let filetredUsers = Array.from(
      new Set([...filterName, ...filterEmail, ...filterRole])
    );
    let arr = filetredUsers;
    let btnId = Number(selectedButton[selectedButton.length - 1]);
    let TotalRecords = arr.length;
    let TotalPages = Math.ceil(TotalRecords / 10);
    const range = (start, end) => {
      let length = end - start + 1;
      return Array.from({ length }, (_, idx) => idx + start);
    };
    setButtonArray(range(1, TotalPages));
    let end = btnId * 10;
    let start = end - 10;

    if (!arr[start]) {
      setSelectedButton("bt_1");
      start = 0;
      end = 10;
    }
    let newArr = [];
    for (let i = start; i < end; i++) {
      if (arr[i]) {
        newArr.push(arr[i]);
      }
    }
    setUsersData(newArr);
    // setUsersData(filetredUsers);
  };

  const selectedIdArray = (id) => {
    let arr = [...selectedArray];
    if (arr.includes(id)) {
      let i = arr.indexOf(id);
      let newArr = arr.slice(0, i).concat(arr.slice(i + 1));
      setSelectedArray(newArr);
      if (newArr.length === 10) setSelectAll(true);
      else setSelectAll(false);
    } else {
      arr.push(id);
      arr.sort((a, b) => Number(a) - Number(b));
      setSelectedArray(arr);
      if (arr.length === 10) setSelectAll(true);
      else setSelectAll(false);
    }
  };

  const deleteUserData = (arr) => {
    // console.log(arr);
    if (!arr.length) {
      console.log("No Selected Records");
    }
    let usersDataAfterDelete = [];
    apiData.forEach((userData) => {
      if (
        arr.every((id) => {
          if (id === userData.id) return false;
          else return true;
        })
      ) {
        usersDataAfterDelete.push(userData);
      }
    });
    setSelectedArray([]);
    setSelectAll(false);
    setApiData(usersDataAfterDelete);
  };

  const editUserDetails = (data) => {
    console.log(data);
    let newData = apiData.map((ele) => {
      if (ele.id === data.id) return data;
      else return ele;
    });
    setApiData(newData);
    handleClose();
  };

  const selectAllFnc = () => {
    let arr = [...usersData].map((userData) => userData.id);
    setSelectAll(true);
    setSelectedArray(arr);
  };

  const disSelectAllFnc = () => {
    setSelectAll(false);
    setSelectedArray([]);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const pannel = (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box
          sx={style}
          display="flex"
          padding="1rem"
          justifyContent="space-between"
          alignItems="center"
          flexDirection="column"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={1}
          >
            <Typography pr={1}>Name</Typography>
            <TextField
              size="small"
              variant="outlined"
              value={editData.name}
              onChange={(e) => {
                setEditData({ ...editData, name: e.target.value });
              }}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={1}
          >
            <Typography pr={1}>Email</Typography>
            <TextField
              size="small"
              variant="outlined"
              value={editData.email}
              onChange={(e) => {
                setEditData({ ...editData, email: e.target.value });
              }}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={1}
          >
            <Typography pr={2}>Role</Typography>
            {/* <TextField
              size="small"
              variant="outlined"
              value={editData.role}
              onChange={(e) => {
                setEditData({ ...editData, role: e.target.value });
              }}
            /> */}
            <Select
              size="small"
              value={editData.role}
              onChange={(e) => {
                setEditData({ ...editData, role: e.target.value });
              }}
            >
              <MenuItem value={"admin"}>Admin</MenuItem>
              <MenuItem value={"member"}>Member</MenuItem>
            </Select>
          </Box>
          <Box pt={1}>
            <Fab
              variant="extended"
              color="primary"
              size="small"
              onClick={() => {
                editUserDetails(editData);
              }}
            >
              <UpgradeOutlinedIcon />
              Update
            </Fab>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );

  return (
    <Stack>
      <AppBar />
      <SearchBar value={searchText} changeValue={setSearchText} />
      <TableContainer component={Paper} m={1}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell className="tableHeadCells">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={() =>
                    selectAll ? disSelectAllFnc() : selectAllFnc()
                  }
                />
              </TableCell>
              <TableCell className="tableHeadCells" align="left">
                <b>Name</b>
              </TableCell>
              <TableCell className="tableHeadCells" align="left">
                <b>Email</b>
              </TableCell>
              <TableCell className="tableHeadCells" align="left">
                <b>Role</b>
              </TableCell>
              <TableCell className="tableHeadCells" align="left">
                <b>Actions</b>
              </TableCell>
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
            {pannel}
          </TableBody>
        </Table>
      </TableContainer>
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
            // color="error"
            size="small"
            onClick={() => {
              deleteUserData(selectedArray);
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
              setSelectAll(false);
              setSelectedArray([]);
              setSelectedButton("bt_1");
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
              setSelectAll(false);
              setSelectedArray([]);
              setSelectedButton(btn);
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
                id={"bt_" + button}
                key={"bt_" + button}
                onClick={(e) => {
                  setSelectAll(false);
                  setSelectedArray([]);
                  setSelectedButton(e.target.id);
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
              setSelectAll(false);
              setSelectedArray([]);
              setSelectedButton(btn);
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
              setSelectAll(false);
              setSelectedArray([]);
              setSelectedButton("bt_" + buttonArray[buttonArray.length - 1]);
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
              deleteUserData(selectedArray);
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
              setSelectedButton("bt_1");
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
              setSelectedButton(btn);
            }}
          >
            <ChevronLeftOutlinedIcon />
          </Fab>
          <Chip
            label={
              "Page " +
              selectedButton.substring(selectedButton.indexOf("_") + 1) +
              " / " +
              buttonArray[buttonArray.length - 1]
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
              setSelectedButton(btn);
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
              setSelectedButton("bt_" + buttonArray[buttonArray.length - 1]);
            }}
          >
            <KeyboardDoubleArrowRightOutlinedIcon />
          </Fab>
        </Box>
      </Box>
    </Stack>
  );
}
