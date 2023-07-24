import { Stack } from "@mui/material";
import AppBar from "./AppBar";
import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import ActionButtons from "./ActionButtons";

import UpdateUserModal from "./UpdateUserModal";
import useFetch from "../hooks/useFetch";
import RecordTable from "./RecordTable";

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
  const { enqueueSnackbar } = useSnackbar();

  const [selectedArray, setSelectedArray] = useState([]);
  const [apiData, setApiData] = useFetch(
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
    [],
    (err) =>
      enqueueSnackbar(err, {
        variant: "error",
      })
  );
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

  const pagenation = (records) => {
    let btnId = Number(
      selectedButton.substring(selectedButton.indexOf("_") + 1)
    );

    let TotalPages = Math.ceil(records.length / 10);

    const range = (start, end) =>
      Array.from({ length: end - start + 1 }, (_, idx) => idx + start);

    setButtonArray(range(1, TotalPages));
    let end = btnId * 10;
    let start = end - 10;

    if (!records[start]) {
      setSelectedButton("bt_1");
      start = 0;
      end = 10;
    }
    setUsersData(records.slice(start, end));
  };

  const performApiSearch = (text) => {
    let filetredUsers = apiData.filter(
      ({ email, name, role }) =>
        email.toLowerCase().includes(text) ||
        name.toLowerCase().includes(text) ||
        role.toLowerCase().includes(text)
    );
    if (!filetredUsers.length)
      enqueueSnackbar("No result Found", {
        variant: "warning",
        autoHideDuration: 1000,
      });
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

      <RecordTable
        usersData={usersData}
        selectedArray={selectedArray}
        setEditData={setEditData}
        handleOpen={handleOpen}
        selectedIdArray={selectedIdArray}
        deleteUserData={deleteUserData}
        tableHeaders={tableHeaders}
        selectAll={selectAll}
        handleDeSelect={deSelectAllFnc}
        handleSelect={selectAllFnc}
      />

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
