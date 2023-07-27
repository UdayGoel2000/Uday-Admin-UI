import { Stack } from "@mui/material";
import AppBar from "./AppBar";
import SearchBar from "./SearchBar";
import { useEffect, useReducer } from "react";
import { useSnackbar } from "notistack";

import DesktopActionButtons from "./DesktopActionButtons";
import MobileActionButtons from "./MobileActionButtons";

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

export default function AdminHomePage() {
  const { enqueueSnackbar } = useSnackbar();

  const [
    {
      selectedUsersIdArray,
      searchText,
      openModal,
      selectAll,
      pagenationButtonArray,
      selectedButtonId,
      usersData,
      userModalData,
    },
    setState,
  ] = useReducer((state, newState) => ({ ...state, ...newState }), {
    selectedUsersIdArray: [],
    searchText: "",
    openModal: false,
    selectAll: false,
    pagenationButtonArray: [],
    selectedButtonId: "bt_1",
    usersData: [],
    userModalData: {},
  });

  const [apiData, setApiData] = useFetch(
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
    [],
    (err) =>
      enqueueSnackbar(err, {
        variant: "error",
      })
  );

  useEffect(() => {
    setState({ selectAll: false, selectedUsersIdArray: [] });
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
  }, [searchText, apiData, selectedButtonId]);

  const pagenation = (records) => {
    let btnId = Number(
      selectedButtonId.substring(selectedButtonId.indexOf("_") + 1)
    );

    let TotalPages = Math.ceil(records.length / 10);

    const range = (start, end) =>
      Array.from({ length: end - start + 1 }, (_, idx) => idx + start);

    setState({ pagenationButtonArray: range(1, TotalPages) });
    let end = btnId * 10;
    let start = end - 10;

    if (!records[start]) {
      setState({ selectedButtonId: "bt_1" });
      start = 0;
      end = 10;
    }
    setState({ usersData: records.slice(start, end) });
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
    let arr = [...selectedUsersIdArray];
    if (arr.includes(id)) {
      setState({
        selectedUsersIdArray: arr.filter((ele) => ele !== id),
        selectAll: false,
      });
    } else {
      arr.push(id);
      setState({
        selectedUsersIdArray: arr,
        selectAll: arr.length === usersData.length,
      });
    }
  };

  const deleteUserData = (selectedUsersIdArray) => {
    if (!selectedUsersIdArray.length) return;

    setApiData(apiData.filter(({ id }) => !selectedUsersIdArray.includes(id)));
    setState({ selectedUsersIdArray: [], selectAll: false });
  };

  const editUserDetails = (data) => {
    setApiData(apiData.map((ele) => (ele.id === data.id ? data : ele)));
    setState({ openModal: false });
  };

  const selectAllFnc = () => {
    setState({
      selectedUsersIdArray: usersData.map((userdata) => userdata.id),
      selectAll: true,
    });
  };

  const deSelectAllFnc = () => {
    setState({ selectedUsersIdArray: [], selectAll: false });
  };

  const handleChange = (e) => {
    setState({
      userModalData: { ...userModalData, [e.target.name]: e.target.value },
    });
  };

  const handleOnClick = (button_id) => {
    setState({
      selectAll: false,
      selectedUsersIdArray: [],
      selectedButtonId: button_id,
    });
  };

  return (
    <Stack>
      <AppBar />
      <SearchBar
        value={searchText}
        changeValue={(searchedValue) => setState({ searchText: searchedValue })}
      />

      <RecordTable
        usersData={usersData}
        selectedUsersIdArray={selectedUsersIdArray}
        setUserModalData={(data) => setState({ userModalData: data })}
        handleOpen={() => setState({ openModal: true })}
        selectedIdArray={selectedIdArray}
        deleteUserData={deleteUserData}
        tableHeaders={tableHeaders}
        selectAll={selectAll}
        handleDeSelect={deSelectAllFnc}
        handleSelect={selectAllFnc}
      />

      <UpdateUserModal
        handleClose={() => setState({ openModal: false })}
        openModal={openModal}
        userModalData={userModalData}
        handleChange={handleChange}
        editUserDetails={editUserDetails}
      />

      <DesktopActionButtons
        selectedUsersIdArray={selectedUsersIdArray}
        handleDelete={deleteUserData}
        selectedButtonId={selectedButtonId}
        pagenationButtonArray={pagenationButtonArray}
        handleOnClick={(button_id) => handleOnClick(button_id)}
        usersData={usersData}
      />
      <MobileActionButtons
        selectedUsersIdArray={selectedUsersIdArray}
        handleDelete={deleteUserData}
        selectedButtonId={selectedButtonId}
        pagenationButtonArray={pagenationButtonArray}
        handleOnClick={(button_id) => handleOnClick(button_id)}
        usersData={usersData}
      />
    </Stack>
  );
}
