import axios from '../axios';
import {
  FETCH_DAILY_ENERGY_BEGIN,
  FETCH_DAILY_ENERGY_SUCCESS,
  FETCH_DAILY_ENERGY_FAIL,
  UPDATE_DAILY_ENERGY,
  ENQUEUE_SNACKBAR,
  REMOVE_DAILY_ENERGY,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchDailyEnergyAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_DAILY_ENERGY_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/management/dailyenergy`)
      .then((response) => {
        dispatch({
          type: FETCH_DAILY_ENERGY_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_DAILY_ENERGY_FAIL,
          payload: error,
        });
      });
  }
}

export function removeDailyEnergyKeyAction(dailyEnergyKey) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/dailyenergy/remove`, {
      dailyEnergyKey,
    })
      .then((response) => {
        dispatch({
          type: REMOVE_DAILY_ENERGY,
          payload: {
            key: dailyEnergyKey, // Include the key in the payload
            result: response.data.result,
          },
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: `Success: deleted daily energy key: ${dailyEnergyKey}`,
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
      });
  }
}

export function updateDailyEnergyAction(
  dailyEnergyKey,
  expeditionEnergy,
  fishingEnergy,
  huntingEnergy,
  heistEnergy,
  heistHits,
) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/dailyenergy/update`, {
      dailyEnergyKey,
      expeditionEnergy,
      fishingEnergy,
      huntingEnergy,
      heistEnergy,
      heistHits,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_DAILY_ENERGY,
          payload: response.data.result,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: `Success: updated daily energy key: ${dailyEnergyKey}`,
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
      });
  }
}
