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
  Form,
  Field,
} from 'react-final-form';

import {
  fetchItemModifierLinksAction,
  addItemModifierLinkAction,
  updateItemModifierLinkAction,
  removeItemModifierLinkAction,
} from '../../actions/linkItemModifierToItemType';

import {
  fetchItemTypeAction,
} from '../../actions/itemType';

import {
  fetchItemModifiersAction,
} from '../../actions/itemModifier';

import SelectField from '../../components/form/SelectFields';

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

const LinkItemModifierToItemTypeView = function (props) {
  const {
    auth,
    itemType,
    itemFamily,
    itemModifier,
    itemModifierItemType,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitName, setUnitName] = useState(null);
  const [unitItemType, setUnitItemType] = useState(null);
  const [itemTypeId, setItemTypeId] = useState('All');
  const [itemModifierId, setItemModifierId] = useState('All');

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
    await dispatch(removeItemModifierLinkAction(id));
  }

  const onSave = async ({ id }) => {
    await dispatch(updateItemModifierLinkAction(
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
    dispatch(fetchItemModifiersAction());
    dispatch(fetchItemTypeAction());
    dispatch(fetchItemModifierLinksAction());
  }, [
    auth,
  ]);

  useEffect(() => { }, [
    itemType,
    itemFamily,
  ]);

  const changeItemType = (val, preVal) => {
    setItemTypeId(preVal);
  }
  const changeItemModifier = (val, preVal) => {
    setItemModifierId(preVal);
  }

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <Form
        onSubmit={async (values) => {
          console.log('submitting values');
          console.log(values);
          await dispatch(addItemModifierLinkAction(values));
        }}
        validate={(values) => {
          const errors = {};
          if (!values.itemModifier) {
            errors.itemModifier = 'itemModifier is required'
          }
          if (!values.itemType) {
            errors.itemType = 'itemType is required'
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
              <Grid item xs={6}>
                <Field
                  name="itemType"
                  component={SelectField}
                  parse={(value) => {
                    changeItemType(null, value)
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
                <Field
                  name="itemModifier"
                  component={SelectField}
                  parse={(value) => {
                    changeItemModifier(null, value)
                    return value;
                  }}
                  label="itemModifier"
                >
                  {itemModifier && itemModifier.data && itemModifier.data.map((server) => (
                    <MenuItem key={server.id} value={server.id}>
                      {server.prefix && server.prefix}
                      {' '}
                      {server.suffix && server.suffix}
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
              <TableCell align="right">itemType</TableCell>
              <TableCell align="right">itemModifier</TableCell>
              <TableCell align="right">last updated</TableCell>
              <TableCell align="right">edit/remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemModifierItemType
              && itemModifierItemType.data
              && itemModifierItemType.data.map((rank, i) => {
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
                          rank.itemType.name
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
                            {itemModifier && itemModifier.data && itemModifier.data.map((server) => (
                              <MenuItem key={server.id} value={server.id}>
                                {rank.itemModifier.prefix}
                                {' '}
                                {rank.itemModifier.suffix}
                              </MenuItem>
                            ))}
                          </Field>
                        ) : (
                          <span>
                            {rank.itemModifier.prefix}
                            {' '}
                            {rank.itemModifier.suffix}
                          </span>
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
    itemModifier: state.itemModifier,
    itemModifierItemType: state.itemModifierItemType,
  };
}

export default connect(mapStateToProps, null)(LinkItemModifierToItemTypeView);
