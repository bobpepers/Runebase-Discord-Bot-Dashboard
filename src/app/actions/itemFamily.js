import axios from '../axios';
import {
  FETCH_ITEMFAMILY_BEGIN,
  FETCH_ITEMFAMILY_SUCCESS,
  FETCH_ITEMFAMILY_FAIL,
  ADD_ITEMFAMILY,
  REMOVE_ITEMFAMILY,
  UPDATE_ITEMFAMILY,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchItemFamilyAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ITEMFAMILY_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/item/families`, {

    })
      .then((response) => {
        dispatch({
          type: FETCH_ITEMFAMILY_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_ITEMFAMILY_FAIL,
          payload: error,
        });
      });
  }
}

export function addItemFamilyAction(obj) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/item/family/add`, obj)
      .then((response) => {
        dispatch({
          type: ADD_ITEMFAMILY,
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

export function updateItemFamilyAction(
  id,
  name,
  itemType,
) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/item/family/update`, {
      id,
      name,
      itemType,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_ITEMFAMILY,
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

export function removeItemFamilyAction(id) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/item/family/remove`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_ITEMFAMILY,
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
