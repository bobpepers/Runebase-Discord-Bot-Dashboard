import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import {
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  FormControlLabel,
  Switch,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RemoveDailyEnergyKeyDialog from './RemoveDailyEnergyKeyDialog';

const PREFIX = 'UsersTable';

const classes = {
  root: `${PREFIX}-root`,
  table: `${PREFIX}-table`,
  visuallyHidden: `${PREFIX}-visuallyHidden`,
};

const Root = styled('div')({
  [`&.${classes.root}`]: {
    width: '100%',
  },
  [`& .${classes.table}`]: {
    minWidth: 750,
  },
  [`& .${classes.visuallyHidden}`]: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
});

const headCells = [
  {
    id: 'key', numeric: false, disablePadding: true, label: 'Key',
  },
  {
    id: 'discordUserId', numeric: true, disablePadding: false, label: 'Discord User ID',
  },
  {
    id: 'username', numeric: true, disablePadding: false, label: 'Username',
  },
  {
    id: 'expeditionEnergy', numeric: true, disablePadding: false, label: 'Expedition Energy',
  },
  {
    id: 'fishingEnergy', numeric: true, disablePadding: false, label: 'Fishing Energy',
  },
  {
    id: 'huntingEnergy', numeric: true, disablePadding: false, label: 'Hunting Energy',
  },
  {
    id: 'heistEnergy', numeric: true, disablePadding: false, label: 'Heist Energy',
  },
  {
    id: 'heistHits', numeric: true, disablePadding: false, label: 'Heist Hits',
  },
  {
    id: 'removeKey', numeric: true, disablePadding: false, label: 'Remove Key',
  },
  {
    id: 'error', numeric: true, disablePadding: false, label: 'Error',
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    classes, order, orderBy, onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function DailyEnergyTable(props) {
  const {
    dailyEnergyRecords,
    removeDailyEnergyKey,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    totalCount,
  } = props;
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('key');
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);
  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <Root className={classes.root}>
      <TableContainer>
        <Table className={classes.table} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'} aria-label="enhanced table">
          <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />

          <TableBody>
            {stableSort(dailyEnergyRecords, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.key);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.key)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.key}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      <TableCell align="right">{row.key}</TableCell>
                    </TableCell>
                    <TableCell align="right">
                      {row.discordUserId}
                    </TableCell>
                    <TableCell align="right">
                      <Button onClick={() => navigate(`/management/user/${row.key}`)}>{row.username}</Button>
                    </TableCell>
                    <TableCell align="right">{row.expeditionEnergy}</TableCell>
                    <TableCell align="right">{row.fishingEnergy}</TableCell>
                    <TableCell align="right">{row.huntingEnergy}</TableCell>
                    <TableCell align="right">{row.heistEnergy}</TableCell>
                    <TableCell align="right">{row.heistHits}</TableCell>
                    <TableCell align="right">
                      <RemoveDailyEnergyKeyDialog
                        dailyEnergyKey={row.key}
                        confirmRemoveDailyEnergyKey={removeDailyEnergyKey}
                      />
                    </TableCell>
                    <TableCell align="right">{row.error}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={totalCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Root>
  );
}

DailyEnergyTable.propTypes = {
  dailyEnergyRecords: PropTypes.array.isRequired,
  removeDailyEnergyKey: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setRowsPerPage: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default DailyEnergyTable;
