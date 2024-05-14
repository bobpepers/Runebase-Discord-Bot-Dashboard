import { configureStore } from '@reduxjs/toolkit'
import auth from './auth';
import tfa from './tfa';
import resetPassword from './resetPassword';
import theme from './changeTheme';
import alert from './alert';
import nodeStatus from './nodeStatus';
import servers from './servers';
import activity from './activity';
import users from './users';
import deposits from './deposits';
import withdrawals from './withdrawals';
import dashboardUsers from './dashboardUsers';
import liability from './liability';
import balance from './balance';
import channels from './channels';
import features from './features';
import botSettings from './botSettings';

import acceptWithdrawal from './acceptWithdrawal';
import declineWithdrawal from './declineWithdrawal';
import patchPartners from './patchPartners';
import blockNumber from './blockNumber';
import startSync from './startSync';
import errors from './errors';
import user from './user';
import priceCurrencies from './priceCurrencies';
import userInfo from './userInfo';
import withdrawalAddresses from './withdrawalAddresses';
import withdrawalAddress from './withdrawalAddress';

import botFunctions from './botFunctions';
import botFunction from './botFunction';

import ranks from './ranks';
import reminders from './reminders';
import dailyEnergy from './dailyEnergy';

const store = configureStore({
  reducer: {
    auth,
    resetPass: resetPassword,
    tfa,
    theme,
    alert,

    reminders,

    nodeStatus,
    user,
    servers,
    channels,
    activity,
    users,
    deposits,
    withdrawals,
    dashboardUsers,
    liability,
    balance,
    features,
    acceptWithdrawal,
    declineWithdrawal,
    botSettings,
    patchPartners,
    blockNumber,
    startSync,
    priceCurrencies,
    errors,
    userInfo,

    withdrawalAddresses,
    withdrawalAddress,

    botFunctions,
    botFunction,

    ranks,
    dailyEnergy,
  },
})

export default store;
