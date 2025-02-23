import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
// import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  useDispatch,
} from 'react-redux';
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
  TextField,
} from '@mui/material';
import BanDialog from './BanDialog';

import {
  updateServerAction,
} from '../../actions/servers';

const PREFIX = 'ServerTable';

const classes = {
  root: `${PREFIX}-root`,
  table: `${PREFIX}-table`,
  visuallyHidden: `${PREFIX}-visuallyHidden`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
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
  }
}));

const headCells = [
  {
    id: 'dbId', numeric: false, disablePadding: true, label: 'id',
  },
  {
    id: 'groupId', numeric: true, disablePadding: false, label: 'group id',
  },
  {
    id: 'serverName', numeric: true, disablePadding: false, label: 'server name',
  },
  {
    id: 'inviteLink', numeric: true, disablePadding: false, label: 'invite link',
  },
  {
    id: 'expRewardChannelId', numeric: true, disablePadding: false, label: 'expRewardChannelId',
  },
  {
    id: 'inActiveChatterRoleId', numeric: true, disablePadding: false, label: 'inActiveChatterRoleId',
  },
  {
    id: 'activeChatterRoleId', numeric: true, disablePadding: false, label: 'activeChatterRoleId',
  },
  {
    id: 'lastActive', numeric: true, disablePadding: false, label: 'last active',
  },
];

function createData(
  id,
  groupId,
  groupName,
  inviteLink,
  expRewardChannelId,
  activeRealm,
  lastActive,
  banned,
  inActiveChatterRoleId,
  activeChatterRoleId,
) {
  return {
    id,
    groupId,
    groupName,
    inviteLink,
    expRewardChannelId,
    activeRealm,
    lastActive,
    banned,
    inActiveChatterRoleId,
    activeChatterRoleId,
  };
}

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
    classes,
    onSelectAllClick,
    order, orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells && headCells.map((headCell) => (
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function ServerTable(props) {
  const {
    servers,
    banServer,
    activeOrDeactivateRealm,
    defaultPageSize,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    totalCount,
  } = props;
  const rows = [];

  servers.forEach((item) => {
    console.log('item');
    console.log(item);
    rows.push(
      createData(
        item.id,
        item.groupId,
        item.groupName,
        item.inviteLink,
        item.expRewardChannelId,
        item.activeRealm,
        item.lastActive,
        item.banned,
        item.inActiveChatterRoleId,
        item.activeChatterRoleId,
      ),
    );
  });


  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [selected, setSelected] = useState([]);
  const [dense, setDense] = useState(false);
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitInviteLink, setUnitInviteLink] = useState(null);
  const [unitExpRewardChannelId, setUnitExpRewardChannelId] = useState(null);

  const [unitInactiveChatterRoleId, setUnitInactiveChatterRoleId] = useState(null);
  const [unitActiveChatterRoleId, setUnitActiveChatterRoleId] = useState(null);

  const onEdit = ({
    id,
    currentUnitInviteLink,
    currentUnitExpRewardChannelId,
    currentUnitInactiveChatterRoleId,
    currentUnitActiveChatterRoleId,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitInviteLink(currentUnitInviteLink);
    setUnitExpRewardChannelId(currentUnitExpRewardChannelId);
    setUnitInactiveChatterRoleId(currentUnitInactiveChatterRoleId);
    setUnitActiveChatterRoleId(currentUnitActiveChatterRoleId);
  }

  const onSave = async ({ id }) => {
    await dispatch(updateServerAction(
      id,
      unitInviteLink,
      unitExpRewardChannelId,
      unitInactiveChatterRoleId,
      unitActiveChatterRoleId,
    ));
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitInviteLink(null);
    setUnitExpRewardChannelId(null);
    setUnitInactiveChatterRoleId(null);
    setUnitActiveChatterRoleId(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitInviteLink(null);
    setUnitExpRewardChannelId(null);
    setUnitInactiveChatterRoleId(null);
    setUnitActiveChatterRoleId(null);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
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
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                  >
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      <p>
                        {row.id}
                      </p>
                    </TableCell>
                    <TableCell align="right">{row.groupId}</TableCell>
                    <TableCell align="right">{row.groupName}</TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === row.id ? (
                          <TextField
                            value={unitInviteLink}
                            onChange={(event) => setUnitInviteLink(event.target.value)}
                          />

                        ) : (
                          row.inviteLink
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === row.id ? (
                          <TextField
                            value={unitExpRewardChannelId}
                            onChange={(event) => setUnitExpRewardChannelId(event.target.value)}
                          />

                        ) : (
                          row.expRewardChannelId
                        )
                      }
                    </TableCell>

                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === row.id ? (
                          <TextField
                            value={unitInactiveChatterRoleId}
                            onChange={(event) => setUnitInactiveChatterRoleId(event.target.value)}
                          />

                        ) : (
                          row.inActiveChatterRoleId
                        )
                      }
                    </TableCell>

                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === row.id ? (
                          <TextField
                            value={unitActiveChatterRoleId}
                            onChange={(event) => setUnitActiveChatterRoleId(event.target.value)}
                          />

                        ) : (
                          row.activeChatterRoleId
                        )
                      }
                    </TableCell>

                    <TableCell align="right">
                      {row.lastActive}
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === row.id ? (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={() => onSave({
                                id: row.id,
                                level: unitInviteLink,
                                expRewardChannelId: unitExpRewardChannelId,
                              })}
                            >
                              Save
                            </Button>

                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              style={{ marginLeft: 8 }}
                              onClick={() => onCancel()}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={() => onEdit({
                                id: row.id,
                                currentUnitInviteLink: row.inviteLink,
                                currentUnitExpRewardChannelId: row.expRewardChannelId,
                                currentUnitInactiveChatterRoleId: row.inActiveChatterRoleId,
                                currentUnitActiveChatterRoleId: row.activeChatterRoleId,
                              })}
                            >
                              Edit
                            </Button>
                            {!row.banned ? (
                              <BanDialog
                                name={row.groupName}
                                confirmBan={banServer}
                                otherId={row.groupId}
                                id={row.id}
                              />
                            ) : (
                              <Button
                                variant="outlined"
                                onClick={() => banServer(row.id, '')}
                              >
                                UNBAN
                              </Button>
                            )}

                            {!row.activeRealm ? (
                              <Button
                                variant="outlined"
                                onClick={() => activeOrDeactivateRealm(row.id)}
                              >
                                Activate Realm
                              </Button>
                            ) : (
                              <Button
                                variant="outlined"
                                onClick={() => activeOrDeactivateRealm(row.id)}
                              >
                                Deactivate Realm
                              </Button>
                            )}

                          </>
                        )
                      }

                    </TableCell>
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

export default ServerTable;
