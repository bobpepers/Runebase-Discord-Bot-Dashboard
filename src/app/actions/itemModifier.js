import axios from '../axios';
import {
  FETCH_ITEMMODIFIERS_BEGIN,
  FETCH_ITEMMODIFIERS_SUCCESS,
  FETCH_ITEMMODIFIERS_FAIL,
  ADD_ITEMMODIFIER,
  REMOVE_ITEMMODIFIER,
  UPDATE_ITEMMODIFIER,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchItemModifiersAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ITEMMODIFIERS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/item/modifiers`, {

    })
      .then((response) => {
        console.log(response);
        dispatch({
          type: FETCH_ITEMMODIFIERS_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_ITEMMODIFIERS_FAIL,
          payload: error,
        });
      });
  }
}

export function addItemModifierAction(obj) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/item/modifier/add`, obj)
      .then((response) => {
        dispatch({
          type: ADD_ITEMMODIFIER,
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

export function updateItemModifierAction(
  id,
  itemQuality,
  levelReq,
  levelMonster,
  prefix,
  suffix,
  minStrength,
  maxStrength,
  minDexterity,
  maxDexterity,
  minVitality,
  maxVitality,
  minEnergy,
  maxEnergy,
  minEdefense,
  maxEdefense,
  minEdamage,
  maxEdamage,
) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/item/modifier/update`, {
      id,
      itemQuality,
      levelReq,
      levelMonster,
      prefix,
      suffix,
      minStrength,
      maxStrength,
      minDexterity,
      maxDexterity,
      minVitality,
      maxVitality,
      minEnergy,
      maxEnergy,
      minEdefense,
      maxEdefense,
      minEdamage,
      maxEdamage,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_ITEMMODIFIER,
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

export function removeItemModifierAction(id) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/item/modifier/remove`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_ITEMMODIFIER,
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
