import { FilledInput, FormControl, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  filledInput: {
    height: 50,
    background: "#E9EEF9",
    borderRadius: 5,
    fontSize: 13,
    fontWeight: "bold",
    color: "#99A9C4",
    letterSpacing: 0,
    display: "flex",
    justifyContent: "center",
    marginBottom: 20,
  },
  input: {
    "&::placeholder": {
      color: "#ADC0DE",
      opacity: 1,
    },
  },
}));

const Search = ({ handleChange }) => {
  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          name="search"
          onChange={handleChange}
          classes={{ root: classes.filledInput, input: classes.input }}
          disableUnderline
          placeholder="Rechercher"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        ></FilledInput>
      </FormControl>
    </form>
  );
};

export default Search;
