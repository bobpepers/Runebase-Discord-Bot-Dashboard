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
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
} from '@mui/material';

import {
  reduxForm,
  Field,
} from 'redux-form';

import {
  fetchItemBasesAction,
  addItemBaseAction,
  updateItemBaseAction,
  removeItemBaseAction,
} from '../../actions/itemBase';

import {
  fetchItemDifficultyAction,
} from '../../actions/itemDifficulty';

import {
  fetchItemFamilyAction,
} from '../../actions/itemFamily';

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

const ItemsBaseView = function (props) {
  const {
    auth,
    itemBase,
    itemFamily,
    itemDifficulty,
    handleSubmit,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitName, setUnitName] = useState(null);
  const [unitLevelReq, setUnitLevelReq] = useState(null);
  const [unitLevelMonster, setUnitLevelMonster] = useState(null);

  const [unitMinDefense, setUnitMinDefense] = useState(null);
  const [unitMaxDefense, setUnitMaxDefense] = useState(null);
  const [unitMinDamage, setUnitMinDamage] = useState(null);
  const [unitMaxDamage, setUnitMaxDamage] = useState(null);

  const [unitItemFamily, setUnitItemFamily] = useState(null);
  const [unitItemDifficulty, setUnitItemDifficulty] = useState(null);

  const [itemDifficultyId, setItemDifficultyId] = useState('All');
  const [itemFamilyId, setItemFamilyId] = useState('All');

  const onEdit = ({
    id,
    currentUnitName,
    currentUnitLevelReq,
    currentUnitLevelMonster,
    currentUnitMinDefense,
    currentUnitMaxDefense,
    currentUnitMinDamage,
    currentUnitMaxDamage,
    currentUnitItemFamily,
    currentUnitItemDifficulty,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitName(currentUnitName);
    setUnitLevelReq(currentUnitLevelReq);
    setUnitLevelMonster(currentUnitLevelMonster);
    setUnitMinDefense(currentUnitMinDefense);
    setUnitMaxDefense(currentUnitMaxDefense);
    setUnitMinDamage(currentUnitMinDamage);
    setUnitMaxDamage(currentUnitMaxDamage);
    setUnitItemFamily(currentUnitItemFamily);
    setUnitItemDifficulty(currentUnitItemDifficulty);
  }

  const onRemove = async (id) => {
    await dispatch(removeItemBaseAction(id));
  }

  const onSave = async ({ id }) => {
    console.log(itemDifficultyId);
    console.log(itemFamilyId);
    console.log('values');
    await dispatch(updateItemBaseAction(
      id,
      unitName,
      unitLevelReq,
      unitLevelMonster,
      unitMinDefense,
      unitMaxDefense,
      unitMinDamage,
      unitMaxDamage,
      itemDifficultyId,
      itemFamilyId,
    ));
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setUnitLevelReq(null);
    setUnitLevelMonster(null);
    setUnitMinDefense(null);
    setUnitMaxDefense(null);
    setUnitMinDamage(null);
    setUnitMaxDamage(null);
    setUnitItemFamily(null);
    setUnitItemDifficulty(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setUnitLevelReq(null);
    setUnitLevelMonster(null);
    setUnitMinDefense(null);
    setUnitMaxDefense(null);
    setUnitMinDamage(null);
    setUnitMaxDamage(null);
    setUnitItemFamily(null);
    setUnitItemDifficulty(null);
  }

  useEffect(() => {
    dispatch(fetchItemDifficultyAction());
    dispatch(fetchItemFamilyAction());
    dispatch(fetchItemBasesAction());
  }, [
    auth,
  ]);

  useEffect(() => { }, [
    itemBase,
    itemFamily,
    itemDifficulty,
  ]);

  const handleFormSubmit = async (obj) => {
    await dispatch(addItemBaseAction(obj));
  }

  const changeItemFamily = (val, preVal) => {
    setItemFamilyId(preVal);
  }
  const changeItemDifficulty = (val, preVal) => {
    setItemDifficultyId(preVal);
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
              name="levelReq"
              component={renderField}
              type="text"
              placeholder="levelReq"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="levelMoster"
              component={renderField}
              type="text"
              placeholder="levelMonster"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="minDefense"
              component={renderField}
              type="text"
              placeholder="minDefense"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="maxDefense"
              component={renderField}
              type="text"
              placeholder="maxDefense"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="minDamage"
              component={renderField}
              type="text"
              placeholder="minDamage"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="maxDamage"
              component={renderField}
              type="text"
              placeholder="maxDamage"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="itemFamily"
              component={renderSelectField}
              onChange={(val, prevVal) => changeItemFamily(val, prevVal)}
              label="itemFamily"
            >
              {itemFamily && itemFamily.data && itemFamily.data.map((server) => (
                <MenuItem key={server.id} value={server.id}>
                  {server.name}
                </MenuItem>
              ))}
            </Field>
          </Grid>
          <Grid item xs={4}>
            <Field
              name="itemDifficulty"
              component={renderSelectField}
              onChange={(val, prevVal) => changeItemDifficulty(val, prevVal)}
              label="itemDifficulty"
            >
              {itemDifficulty && itemDifficulty.data && itemDifficulty.data.map((server) => (
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
              <TableCell align="right">levelReq</TableCell>
              <TableCell align="right">levelMoster</TableCell>
              <TableCell align="right">minDefense</TableCell>
              <TableCell align="right">maxDefense</TableCell>
              <TableCell align="right">minDamage</TableCell>
              <TableCell align="right">maxDamage</TableCell>
              <TableCell align="right">itemFamily</TableCell>
              <TableCell align="right">itemDifficulty</TableCell>
              <TableCell align="right">last updated</TableCell>
              <TableCell align="right">edit/remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemBase
              && itemBase.data
              && itemBase.data.map((rank, i) => {
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
                            value={unitLevelReq}
                            onChange={(event) => setUnitLevelReq(event.target.value)}
                          />

                        ) : (
                          rank.levelReq
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitLevelMonster}
                            onChange={(event) => setUnitLevelMonster(event.target.value)}
                          />

                        ) : (
                          rank.levelMonster
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitMinDefense}
                            onChange={(event) => setUnitMinDefense(event.target.value)}
                          />

                        ) : (
                          rank.minDefense
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitMaxDefense}
                            onChange={(event) => setUnitMaxDefense(event.target.value)}
                          />

                        ) : (
                          rank.maxDefense
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitMinDamage}
                            onChange={(event) => setUnitMinDamage(event.target.value)}
                          />

                        ) : (
                          rank.minDamage
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitMaxDamage}
                            onChange={(event) => setUnitMaxDamage(event.target.value)}
                          />

                        ) : (
                          rank.maxDamage
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <Field
                            name="itemFamily"
                            component={renderSelectField}
                            onChange={(val, prevVal) => changeItemFamily(val, prevVal)}
                            label="itemFamily"
                          >
                            {itemFamily && itemFamily.data && itemFamily.data.map((server) => (
                              <MenuItem key={server.id} value={server.id}>
                                {server.name}
                              </MenuItem>
                            ))}
                          </Field>
                        ) : (
                          <span>{rank.itemQuality && rank.itemQuality.name}</span>
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <Field
                            name="itemDifficulty"
                            component={renderSelectField}
                            onChange={(val, prevVal) => changeItemDifficulty(val, prevVal)}
                            label="itemDifficulty"
                          >
                            {itemDifficulty && itemDifficulty.data && itemDifficulty.data.map((server) => (
                              <MenuItem key={server.id} value={server.id}>
                                {server.name}
                              </MenuItem>
                            ))}
                          </Field>
                        ) : (
                          <span>{rank.itemQuality && rank.itemQuality.name}</span>
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
                                levelReq: unitLevelReq,
                                levelMonster: unitLevelMonster,
                                minDefense: unitMinDefense,
                                maxDefense: unitMaxDefense,
                                minDamage: unitMinDamage,
                                maxDamage: unitMaxDamage,
                                itemFamily: itemFamilyId,
                                itemDifficulty: itemDifficultyId,
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
                                currentUnitLevelReq: rank.levelReq,
                                currentUnitLevelMonster: rank.levelMonster,
                                currentUnitMinDefense: rank.minDefense,
                                currentUnitMaxDefense: rank.maxDefense,
                                currentUnitMinDamage: rank.minDamage,
                                currentUnitMaxDamage: rank.maxDamage,
                                currentUnitItemFamily: rank.itemFamily.id,
                                currentUnitItemDifficulty: rank.itemDifficulty.id,
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
    itemBase: state.itemBase,
    itemFamily: state.itemFamily,
    itemDifficulty: state.itemDifficulty,
  };
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.name) {
    errors.name = 'Name is required'
  }
  if (!formProps.itemFamily) {
    errors.itemFamily = 'Name is itemFamily'
  }
  if (!formProps.itemDifficulty) {
    errors.itemDifficulty = 'Name is itemDifficulty'
  }
  return errors;
}

// const selector = formValueSelector('profile');

export default connect(mapStateToProps, null)(reduxForm({ form: 'itemBase', validate })(ItemsBaseView));
