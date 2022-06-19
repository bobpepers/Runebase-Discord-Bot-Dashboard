import React, {
  useEffect,
  useState,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

import {
  fetchSkilltreesAction,
  updateSkillTreeAction,
} from '../../actions/skilltrees';

const SkillTreesView = function (props) {
  const {
    auth,
    skilltrees,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitName, setUnitName] = useState(null);

  const onEdit = ({
    id,
    currentUnitName,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitName(currentUnitName);
  }

  const onSave = async ({ id }) => {
    await dispatch(updateSkillTreeAction(
      id,
      unitName,
    ));
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
  }

  useEffect(() => {
    dispatch(fetchSkilltreesAction());
  }, [
    auth,
  ]);

  useEffect(() => { }, [
    skilltrees,
  ]);

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <TableContainer>
        <Table
          size="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">class</TableCell>
              <TableCell align="right">last updated</TableCell>
              <TableCell align="right">edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skilltrees
              && skilltrees.data
              && skilltrees.data.map((rank, i) => {
                console.log(rank);
                return (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {rank.id}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitName}
                            onChange={(event) => setUnitName(event.target.value)}
                          />

                        ) : (
                          rank.name
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        rank.class.name
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        rank.updatedAt
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={() => onSave({
                                id: rank.id,
                                name: unitName,
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
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => onEdit({
                              id: rank.id,
                              currentUnitName: rank.name,
                            })}
                          >
                            Edit
                          </Button>
                        )
                      }
                    </TableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    skilltrees: state.skilltrees,
  };
}

export default connect(mapStateToProps, null)(SkillTreesView);
