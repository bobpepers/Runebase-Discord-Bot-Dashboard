import axios from '../axios';
import {
  FETCH_DAILY_ENERGY_BEGIN,
  FETCH_DAILY_ENERGY_SUCCESS,
  FETCH_DAILY_ENERGY_FAIL,
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
