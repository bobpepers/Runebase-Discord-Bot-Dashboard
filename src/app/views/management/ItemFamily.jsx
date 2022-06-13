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
  FormHelperText,
  MenuItem,
  InputLabel,
  Select,
} from '@mui/material';

import {
  reduxForm,
  Field,
} from 'redux-form';

import {
  fetchItemFamilyAction,
  addItemFamilyAction,
  updateItemFamilyAction,
  removeItemFamilyAction,
} from '../../actions/itemFamily';

import {
  fetchItemTypeAction,
} from '../../actions/itemType';

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

const renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl className="admin-form-field" style={{ width: '100%' }}>
    <InputLabel error={touched && error}>{label}</InputLabel>
    <Select
      style={{ width: '100%' }}
      floatingLabelText={label}
      error={touched && error}
      {...input}
      children={children}
      {...custom}
    />
    <FormHelperText error={touched && error}>{error}</FormHelperText>
  </FormControl>
)

const ItemsFamiliesView = function (props) {
  const {
    auth,
    handleSubmit,
    itemType,
    itemFamily,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitName, setUnitName] = useState(null);
  const [unitItemType, setUnitItemType] = useState(null);
  const [itemTypeId, setItemTypeId] = useState('All');

  const onEdit = ({
    id,
    currentUnitName,
    currentUnitItemType,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitName(currentUnitName);
    setUnitItemType(currentUnitItemType);
  }

  const onRemove = async (id) => {
    await dispatch(removeItemFamilyAction(id));
  }

  const onSave = async ({ id }) => {
    await dispatch(updateItemFamilyAction(
      id,
      unitName,
      itemTypeId,
    ));
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setItemTypeId(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setItemTypeId(null);
  }

  useEffect(() => {
    dispatch(fetchItemFamilyAction());
    dispatch(fetchItemTypeAction());
  }, [
    auth,
  ]);

  useEffect(() => { }, [
    itemType,
    itemFamily,
  ]);

  const handleFormSubmit = async (obj) => {
    await dispatch(addItemFamilyAction(obj));
  }

  const changeItemType = (val, preVal) => {
    setItemTypeId(preVal);
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
              name="itemType"
              component={renderSelectField}
              onChange={(val, prevVal) => changeItemType(val, prevVal)}
              label="itemType"
            >
              {itemType && itemType.data && itemType.data.map((server) => (
                <MenuItem key={server.id} value={server.id}>
                  {server.name}
                </MenuItem>
              ))}
            </Field>
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
              <TableCell align="right">itemType</TableCell>
              <TableCell align="right">last updated</TableCell>
              <TableCell align="right">edit/remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemFamily
              && itemFamily.data
              && itemFamily.data.map((rank, i) => {
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
                          <Field
                            name="itemType"
                            component={renderSelectField}
                            onChange={(val, prevVal) => changeItemType(val, prevVal)}
                            label="itemType"
                          >
                            {itemType && itemType.data && itemType.data.map((server) => (
                              <MenuItem key={server.id} value={server.id}>
                                {server.name}
                              </MenuItem>
                            ))}
                          </Field>
                        ) : (
                          <span>{rank.itemType.name}</span>
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
                                itemType: unitItemType,
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
                                currentUnitItemType: rank.itemType,
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
    itemType: state.itemType,
    itemFamily: state.itemFamily,
  };
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.name) {
    errors.name = 'Name is required'
  }
  if (!formProps.itemType) {
    errors.itemType = 'itemType is required'
  }
  return errors;
}

// const selector = formValueSelector('profile');

export default connect(mapStateToProps, null)(reduxForm({ form: 'itemFamily', validate })(ItemsFamiliesView));
