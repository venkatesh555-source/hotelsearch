import { SearchRounded } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

export default function SearchBarInput({
  value,
  onClick,
  onChange,
  selectLocation,
  location,
}) {
  return (
    <FormControl fullWidth>
      {" "}
      <InputLabel htmlFor='search-hotel'>Departure Dates</InputLabel>{" "}
      <OutlinedInput
        id='search-hotel'
        label='Departure Dates'
        fullWidth
        variant='outlined'
        value={value}
        onChange={onChange}
        endAdornment={
          <InputAdornment position='end' sx={{ width: "70%" }}>
            <FormControl fullWidth size='small'>
              <InputLabel id='location'>Location</InputLabel>{" "}
              <Select
                labelId='location'
                id='hotel-location'
                value={location}
                label='Select Location'
                onChange={selectLocation}
              >
                <MenuItem value='new-york'>New-York</MenuItem>
                <MenuItem value='orlando'>Orlando</MenuItem>
                <MenuItem value='barbados'>Barbados</MenuItem>
                <MenuItem value='toronto'>Toronto</MenuItem>
              </Select>
            </FormControl>
            <IconButton edge='end' aria-label='search' onClick={onClick}>
              <SearchRounded />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
