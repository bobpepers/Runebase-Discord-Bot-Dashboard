import {
  FETCH_ITEMTYPE_BEGIN,
  FETCH_ITEMTYPE_SUCCESS,
  FETCH_ITEMTYPE_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMTYPE_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
        data: null,
      };
    case FETCH_ITEMTYPE_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        count: action.payload.count,
        isFetching: false,
      };
    case FETCH_ITEMTYPE_FAIL:
      return {
        ...state,
        data: null,
        count: 0,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
