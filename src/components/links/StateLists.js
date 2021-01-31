import React, { useState, useEffect } from "react";
import axios from "axios";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "state", label: "States", minWidth: 80, align: "center",},
  { id: "death", label: "Death", minWidth: 80, align: "center" },

  {
    id: "positive",
    label: "Positive",
    minWidth: 80,
    align: "center",
  },
  {
    id: "negative",
    label: "Negative",
    minWidth: 80,
    align: "center",
  },
  {
    id: "lastUpdateEt",
    label: "Last Update",
    minWidth: 80,
    align: "center",
  },
];

const useStyles = makeStyles({
  root: {
    width: "70%",
    marginLeft: "10%",
    marginTop: "50px",
  },
  container: {
    maxHeight: 350,
  },
});

const StateLists = () => {
  const [states, setStates] = useState([]);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    axios
      .get("https://api.covidtracking.com/v1/states/daily.json")
      .then((res) => {
        const statesFiltered = res.data.sort().slice(0, 56)
        setStates(statesFiltered);
        console.log(states)
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);
  
  return (
    <>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {states
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.hash}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 30, 100]}
        component="div"
        count={states.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

export default StateLists;
