import {
  FETCH_SKILLTREE_BEGIN,
  FETCH_SKILLTREE_SUCCESS,
  FETCH_SKILLTREE_FAIL,
  UPDATE_SKILLTREE,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SKILLTREE:
      return {
        ...state,
        data: state.data.map(
          (rank) => (rank.id === action.payload.id
            ? { ...action.payload }
            : rank),
        ),
        isFetching: false,
        error: null,
      };
    case FETCH_SKILLTREE_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
        data: null,
      };
    case FETCH_SKILLTREE_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        count: action.payload.count,
        isFetching: false,
      };
    case FETCH_SKILLTREE_FAIL:
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
