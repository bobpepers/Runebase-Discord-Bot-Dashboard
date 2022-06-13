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
  fetchItemModifiersAction,
  addItemModifierAction,
  updateItemModifierAction,
  removeItemModifierAction,
} from '../../actions/itemModifier';

import {
  fetchItemQualityAction,
} from '../../actions/itemQuality';

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

const ItemsModifiersView = function (props) {
  const {
    auth,
    handleSubmit,
    itemQuality,
    itemModifier,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitLevelReq, setUnitLevelReq] = useState(null);
  const [unitLevelMonster, setUnitLevelMonster] = useState(null);
  const [unitPrefix, setUnitPrefix] = useState(null);
  const [unitSuffix, setUnitSuffix] = useState(null);
  const [unitMinStrength, setUnitMinStrength] = useState(null);
  const [unitMaxStrength, setUnitMaxStrength] = useState(null);

  const [unitMinDexterity, setUnitMinDexterity] = useState(null);
  const [unitMaxDexterity, setUnitMaxDexterity] = useState(null);

  const [unitMinVitality, setUnitMinVitality] = useState(null);
  const [unitMaxVitality, setUnitMaxVitality] = useState(null);

  const [unitMinEnergy, setUnitMinEnergy] = useState(null);
  const [unitMaxEnergy, setUnitMaxEnergy] = useState(null);
  const [itemQualityId, setItemQualityId] = useState('');

  const onEdit = ({
    id,
    currentUnitItemQuality,
    currentUnitLevelReq,
    currentUnitLevelMonster,
    currentUnitPrefix,
    currentUnitSuffix,
    currentUnitMinStrength,
    currentUnitMaxStrength,
    currentUnitMinDexterity,
    currentUnitMaxDexterity,
    currentUnitMinVitality,
    currentUnitMaxVitality,
    currentUnitMinEnergy,
    currentUnitMaxEnergy,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setItemQualityId(currentUnitItemQuality);
    setUnitLevelReq(currentUnitLevelReq);
    setUnitLevelMonster(currentUnitLevelMonster);
    setUnitPrefix(currentUnitPrefix);
    setUnitSuffix(currentUnitSuffix);
    setUnitMinStrength(currentUnitMinStrength);
    setUnitMaxStrength(currentUnitMaxStrength);
    setUnitMinDexterity(currentUnitMinDexterity);
    setUnitMaxDexterity(currentUnitMaxDexterity);
    setUnitMinVitality(currentUnitMinVitality);
    setUnitMaxVitality(currentUnitMaxVitality);
    setUnitMinEnergy(currentUnitMinEnergy);
    setUnitMaxEnergy(currentUnitMaxEnergy);
  }

  const onRemove = async (id) => {
    await dispatch(removeItemModifierAction(id));
  }

  const onSave = async ({ id }) => {
    await dispatch(updateItemModifierAction(
      id,
      itemQualityId,
      unitLevelReq,
      unitLevelMonster,
      unitPrefix,
      unitSuffix,
      unitMinStrength,
      unitMaxStrength,
      unitMinDexterity,
      unitMaxDexterity,
      unitMinVitality,
      unitMaxVitality,
      unitMinEnergy,
      unitMaxEnergy,
    ));
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setItemQualityId(null);
    setUnitLevelReq(null);
    setUnitLevelMonster(null);
    setUnitPrefix(null);
    setUnitSuffix(null);
    setUnitMinStrength(null);
    setUnitMaxStrength(null);
    setUnitMinDexterity(null);
    setUnitMaxDexterity(null);
    setUnitMinVitality(null);
    setUnitMaxVitality(null);
    setUnitMinEnergy(null);
    setUnitMaxEnergy(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setItemQualityId(null);
    setUnitLevelReq(null);
    setUnitLevelMonster(null);
    setUnitPrefix(null);
    setUnitSuffix(null);
    setUnitMinStrength(null);
    setUnitMaxStrength(null);
    setUnitMinDexterity(null);
    setUnitMaxDexterity(null);
    setUnitMinVitality(null);
    setUnitMaxVitality(null);
    setUnitMinEnergy(null);
    setUnitMaxEnergy(null);
  }

  useEffect(() => {
    dispatch(fetchItemModifiersAction());
    dispatch(fetchItemQualityAction());
  }, [
    auth,
  ]);

  useEffect(() => { }, [
    itemQuality,
    itemModifier,
  ]);

  const handleFormSubmit = async (obj) => {
    await dispatch(addItemModifierAction(obj));
  }

  const changeItemQuality = (val, preVal) => {
    setItemQualityId(preVal);
  }

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: '100%' }}>
        <Grid container>
          <Grid item xs={4}>
            <Field
              name="itemQuality"
              component={renderSelectField}
              onChange={(val, prevVal) => changeItemQuality(val, prevVal)}
              label="itemQuality"
            >
              {itemQuality && itemQuality.data && itemQuality.data.map((server) => (
                <MenuItem key={server.id} value={server.id}>
                  {server.name}
                </MenuItem>
              ))}
            </Field>
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
              name="levelMonster"
              component={renderField}
              type="text"
              placeholder="levelMonster"
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              name="prefix"
              component={renderField}
              type="text"
              placeholder="prefix"
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              name="suffix"
              component={renderField}
              type="text"
              placeholder="suffix"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="minStrength"
              component={renderField}
              type="text"
              placeholder="minStrength"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="maxStrength"
              component={renderField}
              type="text"
              placeholder="maxStrength"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="minDexterity"
              component={renderField}
              type="text"
              placeholder="minDexterity"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="maxDexterity"
              component={renderField}
              type="text"
              placeholder="maxDexterity"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="minVitality"
              component={renderField}
              type="text"
              placeholder="minVitality"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="maxVitality"
              component={renderField}
              type="text"
              placeholder="maxVitality"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="minEnergy"
              component={renderField}
              type="text"
              placeholder="minEnergy"
            />
          </Grid>
          <Grid item xs={2}>
            <Field
              name="maxEnergy"
              component={renderField}
              type="text"
              placeholder="maxEnergy"
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
              <TableCell align="right">itemQuality</TableCell>
              <TableCell align="right">levelReq</TableCell>
              <TableCell align="right">levelMonster</TableCell>
              <TableCell align="right">prefix</TableCell>
              <TableCell align="right">suffix</TableCell>
              <TableCell align="right">minStrength</TableCell>
              <TableCell align="right">maxStrength</TableCell>
              <TableCell align="right">minDexterity</TableCell>
              <TableCell align="right">maxDexterity</TableCell>
              <TableCell align="right">minVitality</TableCell>
              <TableCell align="right">maxVitality</TableCell>
              <TableCell align="right">minEnergy</TableCell>
              <TableCell align="right">maxEnergy</TableCell>
              <TableCell align="right">last updated</TableCell>
              <TableCell align="right">edit/remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemModifier
              && itemModifier.data
              && itemModifier.data.map((rank, i) => {
                console.log(rank);
                return (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {rank.id}
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <Field
                            name="itemQuality"
                            component={renderSelectField}
                            onChange={(val, prevVal) => changeItemQuality(val, prevVal)}
                            label="itemQuality"
                          >
                            {itemQuality && itemQuality.data && itemQuality.data.map((server) => (
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
                    <TableCell component="th" scope="row" align="right">
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

                    <TableCell component="th" scope="row" align="right">
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

                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitPrefix}
                            onChange={(event) => setUnitPrefix(event.target.value)}
                          />

                        ) : (
                          rank.prefix
                        )
                      }
                    </TableCell>

                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitSuffix}
                            onChange={(event) => setUnitSuffix(event.target.value)}
                          />

                        ) : (
                          rank.suffix
                        )
                      }
                    </TableCell>

                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitMinStrength}
                            onChange={(event) => setUnitMinStrength(event.target.value)}
                          />

                        ) : (
                          rank.minStrength
                        )
                      }
                    </TableCell>

                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitMaxStrength}
                            onChange={(event) => setUnitMaxStrength(event.target.value)}
                          />

                        ) : (
                          rank.maxStength
                        )
                      }
                    </TableCell>

                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitMinDexterity}
                            onChange={(event) => setUnitMinDexterity(event.target.value)}
                          />

                        ) : (
                          rank.minDexterity
                        )
                      }
                    </TableCell>

                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitMaxDexterity}
                            onChange={(event) => setUnitMaxDexterity(event.target.value)}
                          />

                        ) : (
                          rank.maxDexterity
                        )
                      }
                    </TableCell>

                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitMinVitality}
                            onChange={(event) => setUnitMinVitality(event.target.value)}
                          />

                        ) : (
                          rank.minVitality
                        )
                      }
                    </TableCell>

                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitMaxVitality}
                            onChange={(event) => setUnitMaxVitality(event.target.value)}
                          />

                        ) : (
                          rank.maxVitality
                        )
                      }
                    </TableCell>

                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitMinEnergy}
                            onChange={(event) => setUnitMinEnergy(event.target.value)}
                          />

                        ) : (
                          rank.minEnergy
                        )
                      }
                    </TableCell>

                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitMaxEnergy}
                            onChange={(event) => setUnitMaxEnergy(event.target.value)}
                          />

                        ) : (
                          rank.maxEnergy
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
                                itemQuality: itemQualityId,
                                levelReq: unitLevelReq,
                                levelMonster: unitLevelMonster,
                                prefix: unitPrefix,
                                suffix: unitSuffix,
                                minStrength: unitMinStrength,
                                maxStrength: unitMaxStrength,
                                minDexterity: unitMinDexterity,
                                maxDexterity: unitMaxDexterity,
                                minVitality: unitMinVitality,
                                maxVitality: unitMaxVitality,
                                minEnergy: unitMinEnergy,
                                maxEnergy: unitMaxEnergy,
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
                                currentUnitItemQuality: rank.itemQuality,
                                currentUnitLevelReq: rank.levelReq,
                                currentUnitLevelMonster: rank.levelMonster,
                                currentUnitPrefix: rank.prefix,
                                currentUnitSuffix: rank.suffix,
                                currentUnitMinStrength: rank.minStrength,
                                currentUnitMaxStrength: rank.maxStength,
                                currentUnitMinDexterity: rank.minDexterity,
                                currentUnitMaxDexterity: rank.maxDexterity,
                                currentUnitMinVitality: rank.minVitality,
                                currentUnitMaxVitality: rank.maxVitality,
                                currentUnitMinEnergy: rank.minEnergy,
                                currentUnitMaxEnergy: rank.maxEnergy,
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
    itemQuality: state.itemQuality,
    itemModifier: state.itemModifier,
  };
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.itemQuality) {
    errors.itemQuality = 'itemQuality is required'
  }
  return errors;
}

// const selector = formValueSelector('profile');

export default connect(mapStateToProps, null)(reduxForm({ form: 'itemModifier', validate })(ItemsModifiersView));
