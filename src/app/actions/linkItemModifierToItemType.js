import axios from '../axios';
import {
  FETCH_LINKITEMMODIFIERS_BEGIN,
  FETCH_LINKITEMMODIFIERS_SUCCESS,
  FETCH_LINKITEMMODIFIERS_FAIL,
  ADD_LINKITEMMODIFIER,
  REMOVE_LINKITEMMODIFIER,
  UPDATE_LINKITEMMODIFIER,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchItemModifierLinksAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_LINKITEMMODIFIERS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/item/modifier/links`, {

    })
      .then((response) => {
        console.log(response);
        dispatch({
          type: FETCH_LINKITEMMODIFIERS_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_LINKITEMMODIFIERS_FAIL,
          payload: error,
        });
      });
  }
}

export function addItemModifierLinkAction(obj) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/item/modifier/link/add`, obj)
      .then((response) => {
        dispatch({
          type: ADD_LINKITEMMODIFIER,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
      });
  }
}

export function updateItemModifierLinkAction(
  id,
  name,
  itemType,
) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/item/modifier/link/update`, {
      id,
      name,
      itemType,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_LINKITEMMODIFIER,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
      });
  }
}

export function removeItemModifierLinkAction(id) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/item/modifier/link/remove`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_LINKITEMMODIFIER,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
      });
  }
}
