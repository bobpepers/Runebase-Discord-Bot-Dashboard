import React, {
  useEffect,
} from 'react';
import {
  Route,
  Routes,
  // useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import toggleTheme from './helpers/toggleTheme';

import Home from './views/Home';

// import Activity from './views/Activity';
import Settings from './views/Settings';

import Register from './views/register/Register';
import RegisterVerify from './views/register/RegisterVerify';
import VerifyEmail from './views/register/VerifyEmail';
import RegisterVerified from './views/register/RegisterVerified';

import ResetPassword from './views/resetPassword/ResetPassword';
import ResetPasswordVerify from './views/resetPassword/ResetPasswordVerify';
import ResetPasswordNew from './views/resetPassword/ResetPasswordNew';

import Servers from './views/management/Servers';
import UserView from './views/management/User';

import Channels from './views/management/Channels';
import Users from './views/management/Users';
import BotSettings from './views/management/BotSettings';
import Features from './views/management/Features';
import DashboardUsers from './views/management/DashboardUsers';
import PriceCurrenciesManagement from './views/management/PriceCurrencies';
import WithdrawalAddressesView from './views/management/WithdrawalAddresses';
import WithdrawalAddressView from './views/management/WithdrawalAddress';
import RanksManagementView from './views/management/Ranks';
import ClassDescriptionsView from './views/management/ClassDescription';
import ClassesView from './views/management/Classes';
import ItemsFamiliesView from './views/management/ItemFamily';
import ItemsModifiersView from './views/management/ItemModifiers';
import ItemsBaseView from './views/management/itemBase';
import LinkItemModifierToItemTypeView from './views/management/LinkItemModifierToItemType'

import Deposits from './views/functions/Deposits';
import Withdrawals from './views/functions/Withdrawals';
import Errors from './views/functions/Errors';

import Login from './views/login/Login';
import LoginTFA from './views/login/Login2FA';
import LogoutView from './views/Logout';

import { authenticated } from './actions/auth';

const RequireAuth = function (props) {
  const {
    Isauthenticated,
    tfaLocked,
    doneLoading,
  } = props;
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticated());
  }, []);

  useEffect(() => {
    console.log('require auth');
    console.log(tfaLocked);
    console.log(doneLoading);
    console.log(Isauthenticated);
  }, [
    Isauthenticated,
    doneLoading,
    tfaLocked,
  ]);

  if (!Isauthenticated && doneLoading) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (tfaLocked && doneLoading) {
    return <Navigate to="/login/2fa" state={{ from: location }} />;
  }
  return <Outlet />;
}

const RoutesX = function (props) {
  const {
    theme,
  } = props;
  useEffect(() => {
    toggleTheme(theme);
  }, [
    theme,
  ]);

  return (
    <Routes>
      <Route
        element={<RequireAuth {...props} />}
      >
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/management/users"
          element={<Users />}
        />
        <Route
          path="/management/user/:userId"
          element={<UserView />}
        />
        <Route
          path="/management/bot/settings"
          element={<BotSettings />}
        />
        <Route
          path="/management/features"
          element={<Features />}
        />
        <Route
          path="/management/servers"
          element={<Servers />}
        />
        <Route
          path="/management/channels"
          element={<Channels />}
        />
        <Route
          path="/management/withdrawaladdresses"
          element={<WithdrawalAddressesView />}
        />
        <Route
          path="/management/withdrawaladdress/:addressId"
          element={<WithdrawalAddressView />}
        />

        {/* <Route
          path="/activity"
          element={<Activity />}
        /> */}
        <Route
          path="/functions/deposits"
          element={<Deposits />}
        />
        <Route
          path="/functions/withdrawals"
          element={<Withdrawals />}
        />
        <Route
          path="/functions/errors"
          element={<Errors />}
        />
        <Route
          path="/management/dashboardusers"
          element={<DashboardUsers />}
        />
        <Route
          path="/management/pricecurrencies"
          element={<PriceCurrenciesManagement />}
        />
        <Route
          path="/management/ranks"
          element={<RanksManagementView />}
        />
        <Route
          path="/management/item/base"
          element={<ItemsBaseView />}
        />
        <Route
          path="/management/item/families"
          element={<ItemsFamiliesView />}
        />
        <Route
          path="/management/item/modifiers"
          element={<ItemsModifiersView />}
        />
        <Route
          path="/management/item/LinkItemModifierToItemType"
          element={<LinkItemModifierToItemTypeView />}
        />

        <Route
          path="/management/classes"
          element={<ClassesView />}
        />
        <Route
          path="/management/class/descriptions"
          element={<ClassDescriptionsView />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>

      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        path="/login"
        element={<Login />}
      />
      <Route
        path="/logout"
        element={<LogoutView />}
      />

      <Route
        path="/login/2fa"
        element={<LoginTFA />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      <Route
        path="/reset-password/verify"
        element={<ResetPasswordVerify />}
      />
      <Route
        path="/reset-password/new"
        element={<ResetPasswordNew />}
      />

      <Route
        path="/register/verify-register"
        element={<RegisterVerify />}
      />
      <Route
        path="/register/verify-email"
        element={<VerifyEmail />}
      />
      <Route
        path="/register/verified"
        element={<RegisterVerified />}
      />
    </Routes>
  )
}

RoutesX.propTypes = {
  theme: PropTypes.shape({
    theme: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.theme,
  Isauthenticated: state.auth.authenticated,
  tfaLocked: state.auth.tfaLocked,
  doneLoading: state.auth.doneLoading,
})

export default connect(mapStateToProps, null)(RoutesX);
