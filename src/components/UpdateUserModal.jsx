import React from "react";
import Modal from "./Modal";
import {
  Fade,
  Typography,
  TextField,
  Select,
  MenuItem,
  Box,
  Fab,
} from "@mui/material";
import UpgradeOutlinedIcon from "@mui/icons-material/UpgradeOutlined";

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

function UpdateUserModal({
  handleClose,
  openModal,
  userModalData,
  editUserDetails,
  handleChange,
}) {
  return (
    <Modal handleClose={handleClose} open={openModal}>
      <Fade in={openModal}>
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
              value={userModalData.name}
              name="name"
              onChange={handleChange}
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
              value={userModalData.email}
              name="email"
              onChange={handleChange}
            />
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            py={1}
          >
            <Typography pr={2}>Role</Typography>
            <Select
              size="small"
              value={userModalData.role}
              name="role"
              onChange={handleChange}
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
                editUserDetails(userModalData);
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
}

export default UpdateUserModal;
