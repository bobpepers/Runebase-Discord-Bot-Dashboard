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
  MenuItem,
} from '@mui/material';

import {
  Form,
  Field,
} from 'react-final-form';

import {
  fetchItemFamilyAction,
  addItemFamilyAction,
  updateItemFamilyAction,
  removeItemFamilyAction,
} from '../../actions/itemFamily';

import {
  fetchItemTypeAction,
} from '../../actions/itemType';
import SelectField from '../../components/form/SelectFields';
import TextField from '../../components/form/TextField';

const ItemsFamiliesView = function (props) {
  const {
    auth,
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

  const changeItemType = (val) => {
    setItemTypeId(val);
  }

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <Form
        onSubmit={async (values) => {
          await dispatch(addItemFamilyAction(values));
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Name is required'
          }
          if (!values.itemFamily) {
            errors.itemFamily = 'Name is itemFamily'
          }
          if (!values.itemDifficulty) {
            errors.itemDifficulty = 'Name is itemDifficulty'
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
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="itemType"
                  component={SelectField}
                  parse={(value) => {
                    changeItemType(value)
                    return value;
                  }}
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
                  style={{ marginLeft: '5px' }}
                  disabled={pristine || submitting}
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
export default connect(mapStateToProps, null)(ItemsFamiliesView);
