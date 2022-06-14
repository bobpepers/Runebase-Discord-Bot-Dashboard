import axios from '../axios';
import {
  FETCH_ITEMDIFFICULTY_BEGIN,
  FETCH_ITEMDIFFICULTY_SUCCESS,
  FETCH_ITEMDIFFICULTY_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchItemDifficultyAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ITEMDIFFICULTY_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/item/difficulty`, {

    })
      .then((response) => {
        dispatch({
          type: FETCH_ITEMDIFFICULTY_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_ITEMDIFFICULTY_FAIL,
          payload: error,
        });
      });
  }
}
