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
} from '@mui/material';

import {
  Form,
  Field,
} from 'react-final-form';

import {
  fetchClassDescriptionsAction,
  addClassDescriptionAction,
  updateClassDescriptionAction,
  removeClassDescriptionAction,
} from '../../actions/classDescriptions';
import TextField from '../../components/form/TextField';

const ClassDescriptionsView = function (props) {
  const {
    auth,
    classDescriptions,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitName, setUnitName] = useState(null);
  const [unitDescription, setUnitDescription] = useState(null);
  const [unitImage, setUnitImage] = useState(null);

  const onEdit = ({
    id,
    currentUnitName,
    currentUnitDescription,
    currentUnitImage,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitName(currentUnitName);
    setUnitDescription(currentUnitDescription);
    setUnitImage(currentUnitImage);
  }

  const onRemove = async (id) => {
    await dispatch(removeClassDescriptionAction(id));
  }

  const onSave = async ({ id }) => {
    await dispatch(updateClassDescriptionAction(id, unitName, unitDescription, unitImage));
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setUnitDescription(null);
    setUnitImage(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitName(null);
    setUnitDescription(null);
    setUnitImage(null);
  }

  useEffect(() => {
    dispatch(fetchClassDescriptionsAction());
  }, [
    auth,
  ]);

  useEffect(() => { }, [
    classDescriptions,
  ]);

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <Form
        onSubmit={async (values) => {
          await dispatch(addClassDescriptionAction(values));
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
                  name="description"
                  component={TextField}
                  type="text"
                  placeholder="description"
                  label="description"
                />
              </Grid>
              <Grid item xs={4}>
                <Field
                  name="image"
                  component={TextField}
                  type="text"
                  placeholder="image"
                  label="image"
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
              <TableCell align="right">description</TableCell>
              <TableCell align="right">image</TableCell>
              <TableCell align="right">last updated</TableCell>
              <TableCell align="right">edit/remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classDescriptions
              && classDescriptions.data
              && classDescriptions.data.map((rank, i) => {
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
                            value={unitDescription}
                            onChange={(event) => setUnitDescription(event.target.value)}
                          />

                        ) : (
                          rank.description
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === rank.id ? (
                          <TextField
                            value={unitImage}
                            onChange={(event) => setUnitImage(event.target.value)}
                          />

                        ) : (
                          rank.image
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
                                description: unitDescription,
                                image: unitImage,
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
                                currentUnitDescription: rank.description,
                                currentUnitImage: rank.image,
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
    classDescriptions: state.classDescriptions,
  };
}

const validate = (formProps) => {
  const errors = {};
  if (!formProps.name) {
    errors.name = 'Name is required'
  }
  if (!formProps.description) {
    errors.description = 'description is required'
  }
  if (!formProps.image) {
    errors.roleId = 'image is required'
  }
  return errors;
}

export default connect(mapStateToProps, null)(ClassDescriptionsView);
