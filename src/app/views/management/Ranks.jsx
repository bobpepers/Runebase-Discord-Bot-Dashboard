import React, {
  useEffect,
  useState,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField as MuiTextField,
} from '@mui/material';
import {
  Form,
  Field,
} from 'react-final-form';
import {
  fetchRanksAction,
  addRankAction,
  updateRankAction,
  removeRankAction,
} from '../../actions/ranks';
import { fetchServerAction } from '../../actions/servers';
import TextField from '../../components/form/TextField';

const RanksManagementView = function (props) {
  const {
    auth,
    ranks,
    servers,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitName, setUnitName] = useState(null);
  const [unitLevel, setUnitLevel] = useState(null);
  const [unitExp, setUnitExp] = useState(null);
  const [unitRole, setUnitRole] = useState(null);

  const [unitServerId, setUnitServerId] = useState(null);

  const onEdit = ({
    id,
    currentUnitName,
    currentUnitLevel,
    currentUnitExp,
    currentUnitRole,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitName(currentUnitName);
    setUnitLevel(currentUnitLevel);
    setUnitExp(currentUnitExp);
    setUnitRole(currentUnitRole);
  }

  const onRemove = async (id) => {
    await dispatch(
      removeRankAction(id),
    );
  }

  const onSave = async ({ id }) => {
    await dispatch(updateRankAction(
      id,
      unitLevel,
      unitName,
      unitExp,
      unitRole,
    ));
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setUnitLevel(null);
    setUnitExp(null);
    setUnitRole(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setUnitLevel(null);
    setUnitExp(null);
    setUnitRole(null);
  }

  useEffect(() => {
    // dispatch(fetchServerAction());
    dispatch(fetchRanksAction(
      unitServerId,
    ));
    // dispatch(change('ranks', 'groupId', unitServerId));
  }, [
    unitServerId,
  ]);

  useEffect(() => {
    dispatch(fetchServerAction(
      '',
      '',
      '',
      '',
      0,
      500,
    ));
    // dispatch(fetchRanksAction());
  }, [
    auth,
  ]);

  useEffect(() => { }, [
    ranks,
    unitServerId,
  ]);

  const handleServerPick = async (serverId) => {
    setUnitServerId(serverId);
  }

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      {!unitServerId ? (
        <div>
          {servers
            && servers.data
            && servers.data.map((server, index) => (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="btn"
                fullWidth
                size="large"
                style={{
                  marginRight: '5px',
                  marginBottom: '10px',
                }}
                onClick={() => handleServerPick(server.id)}
              >
                {server.groupName}
              </Button>
            ))}
        </div>
      ) : (
        <>
          <Form
            onSubmit={(values) => {
              values.groupId = unitServerId;
              dispatch(addRankAction(values));
            }}
            validate={(values) => {
              const errors = {};
              if (!values.name) {
                errors.name = 'Name is required'
              }
              if (!values.level) {
                errors.level = 'Level is required'
              }
              if (!values.expNeeded) {
                errors.expNeeded = 'ExpNeeded is required'
              }
              if (!values.roleId) {
                errors.roleId = 'RoleID is required'
              }
              return errors;
            }}
          >
            {({
              form,
              handleSubmit,
              values,
              submitting,
              pristine,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container>
                  <Grid item xs={4}>
                    <Field
                      name="name"
                      component={TextField}
                      type="text"
                      placeholder="name"
                      label="name"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      name="level"
                      component={TextField}
                      type="text"
                      placeholder="level"
                      label="level"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      name="expNeeded"
                      component={TextField}
                      type="text"
                      placeholder="expNeeded"
                      label="expNeeded"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      name="roleId"
                      component={TextField}
                      type="text"
                      placeholder="roleId"
                      label="roleId"
                    />
                  </Grid>
                  {/* <Grid item xs={4}>
                    <Field
                      name="groupId"
                      component={TextField}
                      type="text"
                      placeholder="groupId"
                      label="roleId"
                      meta={{ initial: `${unitServerId}` }}
                      props={{
                        disabled: true, // like this
                      }}
                    />
                  </Grid> */}
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="btn"
                      fullWidth
                      size="large"
                      style={{ marginLeft: '5px' }}
                      disabled={pristine || submitting}
                      onClick={() => {
                        dispatch(fetchRanksAction(
                          unitServerId,
                        ));
                      //   dispatch(form.change('ranks', 'groupId', unitServerId));
                      }}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Form>
          <TableContainer>
            <Table
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>id</TableCell>
                  <TableCell align="right">level</TableCell>
                  <TableCell align="right">name</TableCell>
                  <TableCell align="right">expNeed</TableCell>
                  <TableCell align="right">discord role id</TableCell>
                  <TableCell align="right">last updated</TableCell>
                  <TableCell align="right">edit/remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ranks
                  && ranks.data
                  && ranks.data.map((rank, i) => {
                    console.log(rank);
                    return (
                      <TableRow key={i}>
                        <TableCell component="th" scope="row">
                          {rank.id}
                        </TableCell>
                        <TableCell align="right">
                          {
                            inEditMode.status && inEditMode.rowKey === rank.id ? (
                              <MuiTextField
                                value={unitLevel}
                                onChange={(event) => setUnitLevel(event.target.value)}
                              />

                            ) : (
                              rank.level
                            )
                          }
                        </TableCell>
                        <TableCell component="th" scope="row" align="right">
                          {
                            inEditMode.status && inEditMode.rowKey === rank.id ? (
                              <MuiTextField
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
                            inEditMode.status && inEditMode.rowKey === rank.id ? (
                              <MuiTextField
                                value={unitExp}
                                onChange={(event) => setUnitExp(event.target.value)}
                              />

                            ) : (
                              rank.expNeeded
                            )
                          }
                        </TableCell>
                        <TableCell align="right">
                          {
                            inEditMode.status && inEditMode.rowKey === rank.id ? (
                              <MuiTextField
                                value={unitRole}
                                onChange={(event) => setUnitRole(event.target.value)}
                              />

                            ) : (
                              rank.discordRankRoleId
                            )
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
                                    level: unitLevel,
                                    name: unitName,
                                    expNeeded: unitExp,
                                    roleId: unitRole,
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
                                    id: rank.id,
                                    currentUnitLevel: rank.level,
                                    currentUnitName: rank.name,
                                    currentUnitExp: rank.expNeeded,
                                    currentUnitRole: rank.discordRankRoleId,
                                  })}
                                >
                                  Edit
                                </Button>

                                <Button
                                  variant="contained"
                                  color="primary"
                                  size="large"
                                  onClick={() => onRemove(rank.id)}
                                >
                                  Remove
                                </Button>

                              </>
                            )
                          }
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    ranks: state.ranks,
    servers: state.servers,
    initialValues: {
      groupId: 0,
    },
  };
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.name) {
    errors.name = 'Name is required'
  }
  if (!formProps.level) {
    errors.level = 'Level is required'
  }
  if (!formProps.expNeeded) {
    errors.expNeeded = 'expNeeded is required'
  }
  if (!formProps.roleId) {
    errors.roleId = 'roleId is required'
  }
  return errors;
}

// const selector = formValueSelector('profile');

export default connect(mapStateToProps, null)(RanksManagementView);
