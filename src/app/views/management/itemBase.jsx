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
} from '@mui/material';

import {
  reduxForm,
  Field,
} from 'redux-form';

import {
  fetchClassDescriptionsAction,
  addClassDescriptionAction,
  updateClassDescriptionAction,
  removeClassDescriptionAction,
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

const ClassDescriptionsView = function (props) {
  const {
    auth,
    classDescriptions,
    handleSubmit,
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

  const handleFormSubmit = async (obj) => {
    await dispatch(addClassDescriptionAction(obj));
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
              name="description"
              component={renderField}
              type="text"
              placeholder="description"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              name="image"
              component={renderField}
              type="text"
              placeholder="image"
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

// const selector = formValueSelector('profile');

export default connect(mapStateToProps, null)(reduxForm({ form: 'itemBase', validate })(ClassDescriptionsView));
