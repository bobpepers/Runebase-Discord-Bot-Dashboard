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
  MenuItem,
} from '@mui/material';

import {
  Form,
  Field,
} from 'react-final-form';
import {
  fetchItemBasesAction,
  addItemBaseAction,
  updateItemBaseAction,
  removeItemBaseAction,
} from '../../actions/itemBase';
import { fetchItemDifficultyAction } from '../../actions/itemDifficulty';
import { fetchItemFamilyAction } from '../../actions/itemFamily';

import SelectField from '../../components/form/SelectFields';

const ItemsBaseView = function (props) {
  const {
    auth,
    itemBase,
    itemFamily,
    itemDifficulty,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitName, setUnitName] = useState(null);
  const [unitLevelReq, setUnitLevelReq] = useState(null);
  const [unitLevelMonster, setUnitLevelMonster] = useState(null);

  const [unitStrengthReq, setUnitStrengthReq] = useState(null);
  const [unitDexterityReq, setUnitDexterityReq] = useState(null);
  const [unitDurability, setUnitDurability] = useState(null);
  const [unitSockets, setUnitSockets] = useState(null);

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
    currentUnitStrengthReq,
    currentUnitDexterityReq,
    currentUnitLevelMonster,
    currentUnitDurability,
    currentUnitSockets,
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
    setUnitStrengthReq(currentUnitStrengthReq);
    setUnitDexterityReq(currentUnitDexterityReq);
    setUnitLevelMonster(currentUnitLevelMonster);
    setUnitDurability(currentUnitDurability);
    setUnitSockets(currentUnitSockets);
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
      unitStrengthReq,
      unitDexterityReq,
      unitLevelMonster,
      unitDurability,
      unitSockets,
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
    setUnitStrengthReq(null);
    setUnitDexterityReq(null);
    setUnitLevelMonster(null);
    setUnitDurability(null);
    setUnitSockets(null);
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
    setUnitStrengthReq(null);
    setUnitDexterityReq(null);
    setUnitLevelMonster(null);
    setUnitDurability(null);
    setUnitSockets(null);
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

  const changeItemFamily = (val, preVal) => {
    setItemFamilyId(preVal);
  }
  const changeItemDifficulty = (val, preVal) => {
    setItemDifficultyId(preVal);
  }

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <Form
        onSubmit={async (values) => {
          await dispatch(addItemBaseAction(values));
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
                  label="name"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="levelReq"
                  component={TextField}
                  type="text"
                  placeholder="levelReq"
                  label="levelReq"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="strengthReq"
                  component={TextField}
                  type="text"
                  placeholder="strengthReq"
                  label="strengthReq"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="dexterityReq"
                  component={TextField}
                  type="text"
                  placeholder="dexterityReq"
                  label="dexterityReq"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="levelMonster"
                  component={TextField}
                  type="text"
                  placeholder="levelMonster"
                  label="levelMonster"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="durability"
                  component={TextField}
                  type="text"
                  placeholder="durability"
                  label="durability"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="sockets"
                  component={TextField}
                  type="text"
                  placeholder="sockets"
                  label="sockets"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="minDefense"
                  component={TextField}
                  type="text"
                  placeholder="minDefense"
                  label="minDefense"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="maxDefense"
                  component={TextField}
                  type="text"
                  placeholder="maxDefense"
                  label="maxDefense"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="minDamage"
                  component={TextField}
                  type="text"
                  placeholder="minDamage"
                  label="minDamage"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="maxDamage"
                  component={TextField}
                  type="text"
                  placeholder="maxDamage"
                  label="maxDamage"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="itemFamily"
                  component={SelectField}
                  parse={(value) => {
                    changeItemFamily(value)
                    return value;
                  }}
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
                  component={SelectField}
                  parse={(value) => {
                    changeItemDifficulty(value)
                    return value;
                  }}
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
              <TableCell align="right">levelReq</TableCell>
              <TableCell align="right">strengthReq</TableCell>
              <TableCell align="right">dexterityReq</TableCell>
              <TableCell align="right">levelMonster</TableCell>
              <TableCell align="right">durability</TableCell>
              <TableCell align="right">sockets</TableCell>
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
                            value={unitStrengthReq}
                            onChange={(event) => setUnitStrengthReq(event.target.value)}
                          />

                        ) : (
                          rank.strengthReq
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitDexterityReq}
                            onChange={(event) => setUnitDexterityReq(event.target.value)}
                          />

                        ) : (
                          rank.dexterityReq
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
                            value={unitDurability}
                            onChange={(event) => setUnitDurability(event.target.value)}
                          />

                        ) : (
                          rank.durability
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitSockets}
                            onChange={(event) => setUnitSockets(event.target.value)}
                          />

                        ) : (
                          rank.sockets
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
                          <span>{rank.itemFamily && rank.itemFamily.name}</span>
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
                          <span>{rank.itemDifficulty && rank.itemDifficulty.name}</span>
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
                                strengthReq: unitStrengthReq,
                                dexterityReq: unitDexterityReq,
                                levelMonster: unitLevelMonster,
                                durability: unitDurability,
                                sockets: unitSockets,
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
                                currentUnitStrengthReq: rank.strengthReq,
                                currentUnitDexterityReq: rank.dexterityReq,
                                currentUnitLevelMonster: rank.levelMonster,
                                currentUnitDurability: rank.durability,
                                currentUnitSockets: rank.sockets,
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

export default connect(mapStateToProps, null)(ItemsBaseView);
