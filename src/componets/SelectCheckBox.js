import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function SelectCheckBox({ filterName, label, options, onFilterChange }) {
  const [selectedValues, setSelectedValues] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedValues(
      typeof value === "string" ? value.split(",") : value
    );
    onFilterChange(filterName, typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id={`select-multiple-checkbox-label-${filterName}`}>
        {label}
      </InputLabel>
      <Select
        labelId={`select-multiple-checkbox-label-${filterName}`}
        id={`select-multiple-checkbox-${filterName}`}
        multiple
        value={selectedValues}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={selectedValues.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
