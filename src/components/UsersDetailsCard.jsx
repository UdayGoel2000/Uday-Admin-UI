import { Stack } from "@mui/material";
import axios from "axios";
import AppBar from "./AppBar";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";

import DetailsCard from "./DetailsCard";
import TableHeaderRows from "./TableHeaderRows";
import ActionButtons from "./ActionButtons";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UpdateUserModal from "./UpdateUserModal";

const tableHeaders = [
  {
    key: "0",
    label: "CheckBox",
  },
  {
    key: "1",
    label: "Name",
  },
  {
    key: "2",
    label: "Email",
  },
  {
    key: "3",
    label: "Role",
  },
  {
    key: "4",
    label: "Action",
  },
];

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
    if (searchText) {
      timer = setTimeout(() => {
        performApiSearch(searchText.toLowerCase());
      }, 500);
    } else {
      pagenation(apiData);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [searchText, apiData, selectedButton, selectedArray, selectAll]);

  const pagenation = (dataArray) => {
    let arr = dataArray;
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
  };

  const fetchDetails = async () => {
    try {
      let res = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setApiData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const performApiSearch = (text) => {
    let filetredUsers = apiData.filter(
      ({ email, name, role }) =>
        email.toLowerCase().includes(text) ||
        name.toLowerCase().includes(text) ||
        role.toLowerCase().includes(text)
    );
    pagenation(filetredUsers);
  };

  const selectedIdArray = (id) => {
    let arr = [...selectedArray];
    if (arr.includes(id)) {
      setSelectedArray(arr.filter((ele) => ele !== id));
      setSelectAll(false);
    } else {
      arr.push(id);
      setSelectedArray(arr);
      if (arr.length === usersData.length) setSelectAll(true);
      else setSelectAll(false);
    }
  };

  const deleteUserData = (selectedArray) => {
    if (!selectedArray.length) return;

    setSelectedArray([]);
    setSelectAll(false);
    setApiData(apiData.filter(({ id }) => !selectedArray.includes(id)));
  };

  const editUserDetails = (data) => {
    setApiData(apiData.map((ele) => (ele.id === data.id ? data : ele)));
    handleClose();
  };

  const selectAllFnc = () => {
    setSelectedArray(usersData.map((userData) => userData.id));
    setSelectAll(true);
  };

  const deSelectAllFnc = () => {
    setSelectedArray([]);
    setSelectAll(false);
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleOnClick = (button_id) => {
    setSelectAll(false);
    setSelectedArray([]);
    setSelectedButton(button_id);
  };

  return (
    <Stack>
      <AppBar />
      <SearchBar value={searchText} changeValue={setSearchText} />
      <TableContainer component={Paper} m={1}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {tableHeaders.map(({ key, label }) => (
                <TableHeaderRows
                  key={key}
                  headerKey={key}
                  headerLabel={label}
                  selectAll={selectAll}
                  handleDeSelect={deSelectAllFnc}
                  handleSelect={selectAllFnc}
                />
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

      <UpdateUserModal
        handleClose={handleClose}
        open={open}
        editData={editData}
        handleChange={handleChange}
        editUserDetails={editUserDetails}
      />

      <ActionButtons
        selectedArray={selectedArray}
        handleDelete={deleteUserData}
        selectedButton={selectedButton}
        buttonArray={buttonArray}
        handleOnClick={(button_id) => handleOnClick(button_id)}
        usersData={usersData}
      />
    </Stack>
  );
}
