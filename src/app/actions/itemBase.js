import axios from '../axios';
import {
  FETCH_ITEMBASE_BEGIN,
  FETCH_ITEMBASE_SUCCESS,
  FETCH_ITEMBASE_FAIL,
  ADD_ITEMBASE,
  REMOVE_ITEMBASE,
  UPDATE_ITEMBASE,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchItemBasesAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ITEMBASE_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/item/bases`, {

    })
      .then((response) => {
        dispatch({
          type: FETCH_ITEMBASE_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_ITEMBASE_FAIL,
          payload: error,
        });
      });
  }
}

export function addItemBaseAction(obj) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/item/base/add`, obj)
      .then((response) => {
        dispatch({
          type: ADD_ITEMBASE,
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

export function updateItemBaseAction(
  id,
  name,
  levelReq,
  strengthReq,
  dexterityReq,
  levelMonster,
  durability,
  sockets,
  minDefense,
  maxDefense,
  minDamage,
  maxDamage,
  itemDifficultyId,
  itemFamilyId,
) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/item/base/update`, {
      id,
      name,
      levelReq,
      strengthReq,
      dexterityReq,
      levelMonster,
      durability,
      sockets,
      minDefense,
      maxDefense,
      minDamage,
      maxDamage,
      itemDifficultyId,
      itemFamilyId,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_ITEMBASE,
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

export function removeItemBaseAction(id) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/item/base/remove`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_ITEMBASE,
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
