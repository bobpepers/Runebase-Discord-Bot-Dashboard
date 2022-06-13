import {
  FETCH_ITEMQUALITY_BEGIN,
  FETCH_ITEMQUALITY_SUCCESS,
  FETCH_ITEMQUALITY_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMQUALITY_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
        data: null,
      };
    case FETCH_ITEMQUALITY_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        count: action.payload.count,
        isFetching: false,
      };
    case FETCH_ITEMQUALITY_FAIL:
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
