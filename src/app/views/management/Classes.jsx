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
  InputLabel,
  FormHelperText,
  MenuItem,
} from '@mui/material';

import {
  reduxForm,
  Field,
} from 'redux-form';

import {
  fetchClassesAction,
  addClassAction,
  updateClassAction,
  removeClassAction,
} from '../../actions/classes';
import {
  fetchClassDescriptionsAction,
} from '../../actions/classDescriptions';

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

const ClassesView = function (props) {
  const {
    auth,
    classes,
    classDescriptions,
    handleSubmit,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitName, setUnitName] = useState(null);
  const [unitStrength, setUnitStrength] = useState(null);
  const [unitDexterity, setUnitDexterity] = useState(null);
  const [unitVitality, setUnitVitality] = useState(null);
  const [unitEnergy, setUnitEnergy] = useState(null);
  const [unitLife, setUnitLife] = useState(null);
  const [unitMana, setUnitMana] = useState(null);
  const [unitStamina, setUnitStamina] = useState(null);
  const [unitDescription, setUnitDescription] = useState(null);
  const [descriptionId, setDescriptionId] = useState('All');

  const changeDescription = (val, preVal) => {
    setDescriptionId(preVal);
  }

  const onEdit = ({
    id,
    currentUnitName,
    currentUnitStrength,
    currentUnitDexterity,
    currentUnitVitality,
    currentUnitEnergy,
    currentUnitLife,
    currentUnitMana,
    currentUnitStamina,
    currentUnitDescription,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitName(currentUnitName);
    setUnitStrength(currentUnitStrength);
    setUnitDexterity(currentUnitDexterity);
    setUnitVitality(currentUnitVitality);
    setUnitEnergy(currentUnitEnergy);
    setUnitLife(currentUnitLife);
    setUnitMana(currentUnitMana);
    setUnitStamina(currentUnitStamina);
    setUnitDescription(currentUnitDescription);
  }

  const onRemove = async (id) => {
    await dispatch(removeClassAction(id));
  }

  const onSave = async ({ id }) => {
    console.log(unitDescription);
    console.log('unitDescription');
    await dispatch(
      updateClassAction(
        id,
        unitName,
        unitStrength,
        unitDexterity,
        unitVitality,
        unitEnergy,
        unitLife,
        unitMana,
        unitStamina,
        unitDescription.id,
      ),
    );
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setUnitStrength(null);
    setUnitDexterity(null);
    setUnitVitality(null);
    setUnitEnergy(null);
    setUnitLife(null);
    setUnitMana(null);
    setUnitStamina(null);
    setUnitDescription(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setUnitStrength(null);
    setUnitDexterity(null);
    setUnitVitality(null);
    setUnitEnergy(null);
    setUnitLife(null);
    setUnitMana(null);
    setUnitStamina(null);
    setUnitDescription(null);
  }

  useEffect(() => {
    dispatch(fetchClassesAction());
    dispatch(fetchClassDescriptionsAction());
  }, [
    auth,
  ]);

  useEffect(() => { }, [
    classes,
    classDescriptions,
  ]);

  const handleFormSubmit = async (obj) => {
    await dispatch(addClassAction(obj));
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
              name="strength"
              component={renderField}
              type="text"
              placeholder="strength"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="dexterity"
              component={renderField}
              type="text"
              placeholder="dexterity"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="vitality"
              component={renderField}
              type="text"
              placeholder="vitality"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="energy"
              component={renderField}
              type="text"
              placeholder="energy"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="life"
              component={renderField}
              type="text"
              placeholder="life"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="mana"
              component={renderField}
              type="text"
              placeholder="mana"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="stamina"
              component={renderField}
              type="text"
              placeholder="stamina"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="description"
              component={renderSelectField}
              onChange={(val, prevVal) => changeDescription(val, prevVal)}
              label="description"
            >
              {classDescriptions && classDescriptions.data && classDescriptions.data.map((server) => (
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
              <TableCell align="right">strength</TableCell>
              <TableCell align="right">dexterity</TableCell>
              <TableCell align="right">vitality</TableCell>
              <TableCell align="right">energy</TableCell>
              <TableCell align="right">life</TableCell>
              <TableCell align="right">mana</TableCell>
              <TableCell align="right">stamina</TableCell>
              <TableCell align="right">description</TableCell>
              <TableCell align="right">last updated</TableCell>
              <TableCell align="right">edit/remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes
              && classes.data
              && classes.data.map((rank, i) => {
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
                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitStrength}
                            onChange={(event) => setUnitStrength(event.target.value)}
                          />

                        ) : (
                          rank.strength
                        )
                      }
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitDexterity}
                            onChange={(event) => setUnitDexterity(event.target.value)}
                          />

                        ) : (
                          rank.dexterity
                        )
                      }
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitVitality}
                            onChange={(event) => setUnitVitality(event.target.value)}
                          />

                        ) : (
                          rank.vitality
                        )
                      }
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitEnergy}
                            onChange={(event) => setUnitEnergy(event.target.value)}
                          />

                        ) : (
                          rank.energy
                        )
                      }
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitLife}
                            onChange={(event) => setUnitLife(event.target.value)}
                          />

                        ) : (
                          rank.life
                        )
                      }
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitMana}
                            onChange={(event) => setUnitMana(event.target.value)}
                          />

                        ) : (
                          rank.mana
                        )
                      }
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitStamina}
                            onChange={(event) => setUnitStamina(event.target.value)}
                          />

                        ) : (
                          rank.stamina
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <Field
                            name="description"
                            component={renderSelectField}
                            // onChange={(val, prevVal) => setUnitDescription(val, prevVal)}
                            value={unitDescription.id}
                            defaultValue={unitDescription.id}
                            label="description"
                          >
                            {classDescriptions && classDescriptions.data && classDescriptions.data.map((server) => (
                              <MenuItem key={server.id} value={server.id}>
                                {unitDescription.name}
                              </MenuItem>
                            ))}
                          </Field>

                        ) : (
                          rank.classDescription && rank.classDescription.name
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
                                strength: unitStrength,
                                dexterity: unitDexterity,
                                vitality: unitVitality,
                                energy: unitEnergy,
                                life: unitLife,
                                mana: unitMana,
                                stamina: unitStamina,
                                description: unitDescription.id,
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
                                currentUnitStrength: rank.strength,
                                currentUnitDexterity: rank.dexterity,
                                currentUnitVitality: rank.vitality,
                                currentUnitEnergy: rank.energy,
                                currentUnitLife: rank.life,
                                currentUnitMana: rank.mana,
                                currentUnitStamina: rank.stamina,
                                currentUnitDescription: rank.classDescription,
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
    classes: state.classes,
    classDescriptions: state.classDescriptions,
  };
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.name) {
    errors.name = 'Name is required'
  }
  if (!formProps.strength) {
    errors.strength = 'strength is required'
  }
  if (!formProps.dexterity) {
    errors.dexterity = 'dexterity is required'
  }
  if (!formProps.vitality) {
    errors.vitality = 'vitality is required'
  }
  if (!formProps.energy) {
    errors.energy = 'energy is required'
  }
  if (!formProps.life) {
    errors.life = 'life is required'
  }
  if (!formProps.mana) {
    errors.mana = 'mana is required'
  }
  if (!formProps.stamina) {
    errors.stamina = 'stamina is required'
  }
  if (!formProps.description) {
    errors.description = 'description is required'
  }

  return errors;
}

// const selector = formValueSelector('profile');

export default connect(mapStateToProps, null)(reduxForm({ form: 'classes', validate })(ClassesView));
