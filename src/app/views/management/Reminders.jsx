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
  Select,
  MenuItem,
} from '@mui/material';

import {
  Form,
  Field,
} from 'react-final-form';

import {
  fetchReminders,
  addReminder,
  updateReminder,
  removeReminder,
} from '../../actions/reminders';
import { fetchServerAction } from '../../actions/servers';
import { fetchChannelsAction } from '../../actions/channels';
import SelectField from '../../components/form/SelectFields';
import TextField from '../../components/form/TextField';

const RemindersView = function (props) {
  const {
    auth,
    servers,
    channels,
    reminders,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitMessage, setUnitMessage] = useState(null);
  const [unitCron, setUnitCron] = useState(null);
  const [unitEmbed, setUnitEmbed] = useState(null);
  const [unitEnabled, setUnitEnabled] = useState(null);
  const [serverId, setServerId] = useState('All');

  const onEdit = ({
    id,
    currentUnitMessage,
    currentUnitCron,
    currentUnitEmbed,
    currentUnitEnabled,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitMessage(currentUnitMessage);
    setUnitCron(currentUnitCron);
    setUnitEmbed(currentUnitEmbed);
    setUnitEnabled(currentUnitEnabled);
  }

  const onRemove = async (id) => {
    await dispatch(removeReminder(id));
  }

  const onSave = async ({ id }) => {
    await dispatch(updateReminder(
      id,
      unitMessage,
      unitCron,
      unitEmbed,
      unitEnabled,
    ));

    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitMessage(null);
    setUnitCron(null);
    setUnitEmbed(null);
    setUnitEnabled(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    })
    setUnitMessage(null);
    setUnitCron(null);
    setUnitEmbed(null);
    setUnitEnabled(null);
  }
  const changeServer = (val) => {
    setServerId(val);
  }

  useEffect(() => {
    dispatch(fetchReminders());

    dispatch(
      fetchServerAction(
        '',
        '',
        '',
        'All',
        0,
        99999,
      ),
    );

    dispatch(
      fetchChannelsAction(
        '',
        '',
        '',
        serverId,
        0,
        99999,
      ),
    );
  }, [
    serverId,
    auth,
  ]);

  useEffect(() => { }, [
    servers,
    channels,
    serverId,
  ]);

  // const handleFormSubmit = async (obj) => {
  //   await dispatch(addReminder(obj));
  // }

  return (
    <div className="content index600 height100 w-100 transactions transaction">
      <Form
        onSubmit={async (values) => {
          await dispatch(addReminder(values));
        }}
        validate={(values) => {
          const errors = {};
          if (!values.channel) {
            errors.channel = 'Server is required'
          }
          if (!values.message) {
            errors.message = 'Message is required'
          }
          if (!values.cron) {
            errors.cron = 'Cron is required'
          }
          if (!values.embed) {
            errors.embed = 'Embed is required'
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
              <Grid item xs={6}>
                <Field
                  name="server"
                  component={SelectField}
                  parse={(value) => {
                    changeServer(value)
                    return value;
                  }}
                  label="Server"
                >
                  {servers && servers.data && servers.data.map((server) => (
                    <MenuItem key={server.id} value={server.id}>
                      {server.groupName}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="channel"
                  component={SelectField}
                  label="Channel"
                >
                  {channels && channels.data && channels.data.map((channel) => (
                    <MenuItem key={channel.id} value={channel.id}>
                      {channel.channelName}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="cron"
                  component={TextField}
                  type="text"
                  placeholder="cron"
                />
              </Grid>
              <Grid item xs={6}>
                <Field
                  name="embed"
                  component={SelectField}
                  label="embed"
                >
                  <MenuItem key="1" value="true">
                    True
                  </MenuItem>
                  <MenuItem key="2" value="false">
                    False
                  </MenuItem>
                </Field>
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="message"
                  component={TextField}
                  type="text"
                  placeholder="message"
                />
              </Grid>
              <Grid item xs={12}>
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
              <TableCell align="right">server</TableCell>
              <TableCell align="right">channel</TableCell>
              <TableCell align="right">message</TableCell>
              <TableCell align="right">cron</TableCell>
              <TableCell align="right">embed</TableCell>
              <TableCell align="right">enabled</TableCell>
              <TableCell align="right">edit/remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reminders
              && reminders.data
              && reminders.data.map((reminder, i) => {
                console.log(reminder);
                return (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      {reminder.id}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {reminder.channel.group.groupName}
                    </TableCell>
                    <TableCell align="right">
                      {
                        reminder.channel.channelName
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === reminder.id ? (
                          <TextField
                            value={unitMessage}
                            multiline
                            fullWidth
                            rows={6}
                            onChange={(event) => setUnitMessage(event.target.value)}
                          />

                        ) : (
                          reminder.message
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === reminder.id ? (
                          <TextField
                            value={unitCron}
                            onChange={(event) => setUnitCron(event.target.value)}
                          />

                        ) : (
                          reminder.cron
                        )
                      }
                    </TableCell>

                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === reminder.id ? (
                          <Select
                            label="Embed"
                            // defaultValue={unitEnabled ? 'true' : 'false'}
                            value={unitEmbed}
                            onChange={(event) => setUnitEmbed(event.target.value)}
                          >
                            <MenuItem key="embedTrue" value="true">
                              True
                            </MenuItem>
                            <MenuItem key="embedFalse" value="false">
                              False
                            </MenuItem>
                          </Select>
                        ) : (
                          <span>{reminder.embed ? 'true' : 'false'}</span>
                        )
                      }
                    </TableCell>

                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === reminder.id ? (
                          <Select
                            label="Enabled"
                            // defaultValue={unitEnabled ? 'true' : 'false'}
                            value={unitEnabled}
                            onChange={(event) => setUnitEnabled(event.target.value)}
                          >
                            <MenuItem key="enableTrue" value="true">
                              True
                            </MenuItem>
                            <MenuItem key="enableFalse" value="false">
                              False
                            </MenuItem>
                          </Select>
                        ) : (
                          <span>{reminder.enabled ? 'true' : 'false'}</span>
                        )
                      }
                    </TableCell>
                    <TableCell align="right">
                      {
                        inEditMode.status && inEditMode.rowKey === reminder.id ? (
                          <>
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={() => onSave({
                                id: reminder.id,
                                cron: unitCron,
                                message: unitMessage,
                                embed: unitEmbed,
                                enabled: unitEnabled,
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
                                id: reminder.id,
                                currentUnitMessage: reminder.message,
                                currentUnitCron: reminder.cron,
                                currentUnitEmbed: reminder.embed,
                                currentUnitEnabled: reminder.enabled,
                              })}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              onClick={() => onRemove(reminder.id)}
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
    servers: state.servers,
    channels: state.channels,
    reminders: state.reminders,
  };
}

export default connect(mapStateToProps, null)(RemindersView);
