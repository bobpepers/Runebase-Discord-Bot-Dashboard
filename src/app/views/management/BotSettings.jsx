import React, {
  useEffect,
  useState,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

import {
  fetchBotSettings,
  updateBotSettings,
} from '../../actions/botSettings';

const BotSettingsView = function (props) {
  const {
    auth,
    botSettings,
  } = props;
  const dispatch = useDispatch();
  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });
  const [unitMaintenance, setUnitMaintenance] = useState(null);
  const [unitEnabled, setUnitEnabled] = useState(null);
  const [unitGuildId, setUnitGuildId] = useState(null);
  const [unitExpRewardChannelId, setUnitExpRewardChannelId] = useState(null);
  const [unitJoinedRoleId, setUnitJoinedRoleId] = useState(null);
  const [unitRoleDiceChannelId, setUnitRoleDiceChannelId] = useState(null);

  const onEdit = ({
    id,
    currentUnitMaintenance,
    currentUnitEnabled,
    currentUnitGuildId,
    currentUnitExpRewardChannelId,
    currentUnitJoinedRoleId,
    currentUnitRoleDiceChannelId,
  }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    })
    setUnitMaintenance(currentUnitMaintenance);
    setUnitEnabled(currentUnitEnabled);
    setUnitGuildId(currentUnitGuildId);
    setUnitExpRewardChannelId(currentUnitExpRewardChannelId);
    setUnitJoinedRoleId(currentUnitJoinedRoleId);
    setUnitRoleDiceChannelId(currentUnitRoleDiceChannelId);
  }

  const onSave = async ({ id }) => {
    await dispatch(updateBotSettings(
      id,
      unitMaintenance,
      unitEnabled,
      unitGuildId,
      unitExpRewardChannelId,
      unitJoinedRoleId,
      unitRoleDiceChannelId,
    ));
    setInEditMode({
      status: false,
      rowKey: null,
    });
    setUnitMaintenance(null);
    setUnitEnabled(null);
    setUnitGuildId(null);
    setUnitExpRewardChannelId(null);
    setUnitJoinedRoleId(null);
    setUnitRoleDiceChannelId(null);
  }

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });
    setUnitMaintenance(null);
    setUnitEnabled(null);
    setUnitGuildId(null);
    setUnitExpRewardChannelId(null);
    setUnitJoinedRoleId(null);
    setUnitRoleDiceChannelId(null);
  }

  useEffect(() => {
    if (auth.authenticated) {
      dispatch(fetchBotSettings());
    }
  }, [
    auth,
  ]);

  useEffect(() => { }, [
    botSettings,
  ]);

  return (
    <div className="height100 content">
      <TableContainer>
        <Table
          size="small"
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="right">name</TableCell>
              <TableCell align="right">maintenance</TableCell>
              <TableCell align="right">enabed</TableCell>
              <TableCell align="right">discord guild id</TableCell>
              <TableCell align="right">exp Reward channel id</TableCell>
              <TableCell align="right">joined Role id</TableCell>
              <TableCell align="right">role dice channel id</TableCell>
              <TableCell align="right">modify</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {botSettings
              && botSettings.data
              && botSettings.data.map((setting, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {setting.id}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {setting.name}
                  </TableCell>

                  <TableCell align="right">
                    {
                      inEditMode.status && inEditMode.rowKey === setting.id ? (
                        <Select
                          label="Enabled"
                          // defaultValue={unitEnabled ? 'true' : 'false'}
                          value={unitMaintenance}
                          onChange={(event) => setUnitMaintenance(event.target.value)}
                        >
                          <MenuItem key="enableTrue" value="true">
                            True
                          </MenuItem>
                          <MenuItem key="enableFalse" value="false">
                            False
                          </MenuItem>
                        </Select>
                      ) : (
                        <span>{setting.maintenance ? 'true' : 'false'}</span>
                      )
                    }
                  </TableCell>

                  <TableCell align="right">
                    {
                      inEditMode.status && inEditMode.rowKey === setting.id ? (
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
                        <span>{setting.enabled ? 'true' : 'false'}</span>
                      )
                    }
                  </TableCell>

                  <TableCell align="right">
                    {
                      inEditMode.status && inEditMode.rowKey === setting.id ? (
                        <TextField
                          value={unitGuildId}
                          onChange={(event) => setUnitGuildId(event.target.value)}
                        />

                      ) : (
                        setting.discordHomeServerGuildId
                      )
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      inEditMode.status && inEditMode.rowKey === setting.id ? (
                        <TextField
                          value={unitExpRewardChannelId}
                          onChange={(event) => setUnitExpRewardChannelId(event.target.value)}
                        />

                      ) : (
                        setting.expRewardChannelId
                      )
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      inEditMode.status && inEditMode.rowKey === setting.id ? (
                        <TextField
                          value={unitJoinedRoleId}
                          onChange={(event) => setUnitJoinedRoleId(event.target.value)}
                        />

                      ) : (
                        setting.joinedRoleId
                      )
                    }
                  </TableCell>

                  <TableCell align="right">
                    {
                      inEditMode.status && inEditMode.rowKey === setting.id ? (
                        <TextField
                          value={unitRoleDiceChannelId}
                          onChange={(event) => setUnitRoleDiceChannelId(event.target.value)}
                        />

                      ) : (
                        setting.roleDiceChannelId
                      )
                    }
                  </TableCell>

                  <TableCell align="right">
                    {
                      inEditMode.status && inEditMode.rowKey === setting.id ? (
                        <>
                          <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={() => onSave({
                              id: setting.id,
                              maintenance: unitMaintenance,
                              enabled: unitEnabled,
                              guildId: unitGuildId,
                              expRewardChannelId: unitExpRewardChannelId,
                              joinedRoleId: unitJoinedRoleId,
                              roleDiceChannelId: unitRoleDiceChannelId,
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
                        <Button
                          variant="contained"
                          color="primary"
                          size="large"
                          onClick={() => onEdit({
                            id: setting.id,
                            currentUnitMaintenance: setting.maintenance,
                            currentUnitEnabled: setting.enabled,
                            currentUnitGuildId: setting.discordHomeServerGuildId,
                            currentUnitExpRewardChannelId: setting.expRewardChannelId,
                            currentUnitJoinedRoleId: setting.joinedRoleId,
                            currentUnitRoleDiceChannelId: setting.roleDiceChannelId,
                          })}
                        >
                          Edit
                        </Button>
                      )
                    }
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    botSettings: state.botSettings,
  };
}

export default connect(mapStateToProps, null)(BotSettingsView);
