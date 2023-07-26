import {
  FETCH_RANKS_BEGIN,
  FETCH_RANKS_SUCCESS,
  FETCH_RANKS_FAIL,
  UPDATE_RANK,
  REMOVE_RANK,
  ADD_RANK,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case ADD_RANK:
    return {
      ...state,
      data: [
        {
          ...action.payload,
        },
        ...state.data,
      ],
      isFetching: false,
    };
  case REMOVE_RANK:
    return {
      ...state,
      data: state.data.filter((item) => item.id !== action.payload.id),
      isFetching: false,
    };
  case UPDATE_RANK:
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
  case FETCH_RANKS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case FETCH_RANKS_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      isFetching: false,
    };
  case FETCH_RANKS_FAIL:
    return {
      ...state,
      data: [],
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
