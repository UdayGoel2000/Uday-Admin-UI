import { Box, TextField, InputAdornment } from "@mui/material";
import { Search, Clear } from "@mui/icons-material";

export default function SearchBar({ value, changeValue }) {
  return (
    <Box m={1}>
      <TextField
        id="outlined-basic"
        label="Seacrh by name, email or role"
        value={value}
        fullWidth
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {value.length ? (
                <Clear
                  color="error"
                  onClick={() => {
                    changeValue("");
                  }}
                ></Clear>
              ) : (
                <Search color="primary" />
              )}
            </InputAdornment>
          ),
        }}
        onChange={(e) => {
          changeValue(e.target.value);
        }}
        variant="outlined"
      />
    </Box>
  );
}
