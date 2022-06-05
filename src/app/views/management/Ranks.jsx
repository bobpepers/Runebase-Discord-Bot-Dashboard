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
  TextField,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';

import {
  reduxForm,
  Field,
} from 'redux-form';

import {
  fetchRanksAction,
  addRankAction,
  updateRankAction,
  removeRankAction,
} from '../../actions/ranks';

const renderField = ({
  input, type, placeholder, meta: { touched, error },
}) => (
  <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
    <FormControl
      variant="outlined"
      fullWidth
    >
      <TextField
        // className="outlined-email-field"
        label={placeholder}
        type={type}
        variant="outlined"
        inputProps={{ className: 'outlined-email-field' }}
        {...input}
      />
      {touched && error && <div className="form-error">{error}</div>}
    </FormControl>
  </div>
);

const RanksManagementView = function (props) {
  const {
    auth,
    ranks,
    handleSubmit,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitName, setUnitName] = useState(null);
  const [unitExp, setUnitExp] = useState(null);
  const [unitRole, setUnitRole] = useState(null);

  const onEdit = ({
    id,
    currentUnitName,
    currentUnitExp,
    currentUnitRole,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitName(currentUnitName);
    setUnitExp(currentUnitExp);
    setUnitRole(currentUnitRole);
  }

  const onRemove = async (id) => {
    await dispatch(removeRankAction(id));
  }

  const onSave = async ({ id }) => {
    await dispatch(updateRankAction(id, unitName, unitExp, unitRole));
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setUnitExp(null);
    setUnitRole(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setUnitExp(null);
    setUnitRole(null);
  }

  useEffect(() => {
    dispatch(fetchRanksAction());
  }, [
    auth,
  ]);

  useEffect(() => { }, [
    ranks,
  ]);

  const handleFormSubmit = async (obj) => {
    await dispatch(addRankAction(obj));
  }

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: '100%' }}>
        <Grid container>
          <Grid item xs={4}>
            <Field
              name="name"
              component={renderField}
              type="text"
              placeholder="name"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="expNeeded"
              component={renderField}
              type="text"
              placeholder="expNeeded"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="roleId"
              component={renderField}
              type="text"
              placeholder="roleId"
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="btn"
              fullWidth
              size="large"
              style={{ marginRight: '5px' }}
            >
              Add
            </Button>
          </Grid>
        </Grid>

      </form>
      <TableContainer>
        <Table
          size="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
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
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
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
                          <TextField
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
    </div>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    ranks: state.ranks,
  };
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.name) {
    errors.name = 'Name is required'
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

export default connect(mapStateToProps, null)(reduxForm({ form: 'priceCurrencies', validate })(RanksManagementView));
