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
  fetchClassesAction,
  addClassAction,
  updateClassAction,
  removeClassAction,
} from '../../actions/classes';
import {
  fetchClassDescriptionsAction,
} from '../../actions/classDescriptions';

import SelectField from '../../components/form/SelectFields';
import TextField from '../../components/form/TextField';

const ClassesView = function (props) {
  const {
    auth,
    classes,
    classDescriptions,
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
  const [unitAttackRating, setUnitAttackRating] = useState(null);
  const [unitDefense, setUnitDefense] = useState(null);
  const [unitDescription, setUnitDescription] = useState(null);
  const [descriptionId, setDescriptionId] = useState('All');

  const changeDescription = (val) => {
    setDescriptionId(val);
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
    currentUnitAttackRating,
    currentUnitDefense,
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
    setUnitAttackRating(currentUnitAttackRating);
    setUnitDefense(currentUnitDefense);
    setUnitDescription(currentUnitDescription);
  }

  const onRemove = async (id) => {
    await dispatch(removeClassAction(id));
  }

  const onSave = async ({ id }) => {
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
        unitAttackRating,
        unitDefense,
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
    setUnitAttackRating(null);
    setUnitDefense(null);
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
    setUnitAttackRating(null);
    setUnitDefense(null);
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

  return (
    <div className="content index600 height100 w-100 transactions transaction">

      <Form
        onSubmit={async (values) => {
          await dispatch(addClassAction(values));
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Name is required'
          }
          if (!values.strength) {
            errors.strength = 'strength is required'
          }
          if (!values.dexterity) {
            errors.dexterity = 'dexterity is required'
          }
          if (!values.vitality) {
            errors.vitality = 'vitality is required'
          }
          if (!values.energy) {
            errors.energy = 'energy is required'
          }
          if (!values.life) {
            errors.life = 'life is required'
          }
          if (!values.mana) {
            errors.mana = 'mana is required'
          }
          if (!values.stamina) {
            errors.stamina = 'stamina is required'
          }
          if (!values.attackRating) {
            errors.attackRating = 'attackRating is required'
          }
          if (!values.defense) {
            errors.defense = 'defense is required'
          }
          if (!values.description) {
            errors.description = 'description is required'
          }

          return errors;
        }}
      >
        {({
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
                  name="strength"
                  component={TextField}
                  type="text"
                  placeholder="strength"
                  label="strength"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="dexterity"
                  component={TextField}
                  type="text"
                  placeholder="dexterity"
                  label="dexterity"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="vitality"
                  component={TextField}
                  type="text"
                  placeholder="vitality"
                  label="vitality"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="energy"
                  component={TextField}
                  type="text"
                  placeholder="energy"
                  label="energy"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="life"
                  component={TextField}
                  type="text"
                  placeholder="life"
                  label="life"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="mana"
                  component={TextField}
                  type="text"
                  placeholder="mana"
                  label="mana"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="stamina"
                  component={TextField}
                  type="text"
                  placeholder="stamina"
                  label="stamina"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="attackRating"
                  component={TextField}
                  type="text"
                  placeholder="attackRating"
                  label="attackRating"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="defense"
                  component={TextField}
                  type="text"
                  placeholder="defense"
                  label="defense"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="description"
                  component={SelectField}
                  parse={(value) => {
                    changeDescription(value)
                    return value;
                  }}
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
              <TableCell align="right">strength</TableCell>
              <TableCell align="right">dexterity</TableCell>
              <TableCell align="right">vitality</TableCell>
              <TableCell align="right">energy</TableCell>
              <TableCell align="right">life</TableCell>
              <TableCell align="right">mana</TableCell>
              <TableCell align="right">stamina</TableCell>
              <TableCell align="right">attackRating</TableCell>
              <TableCell align="right">defense</TableCell>
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
                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitAttackRating}
                            onChange={(event) => setUnitAttackRating(event.target.value)}
                          />

                        ) : (
                          rank.attackRating
                        )
                      }
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitDefense}
                            onChange={(event) => setUnitDefense(event.target.value)}
                          />

                        ) : (
                          rank.defense
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
                                attackRating: unitAttackRating,
                                defense: unitDefense,
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
                                currentUnitAttackRating: rank.attackRating,
                                currentUnitDefense: rank.defense,
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

export default connect(mapStateToProps, null)(ClassesView);
