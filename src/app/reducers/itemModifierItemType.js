import {
  FETCH_LINKITEMMODIFIERS_BEGIN,
  FETCH_LINKITEMMODIFIERS_SUCCESS,
  FETCH_LINKITEMMODIFIERS_FAIL,
  ADD_LINKITEMMODIFIER,
  REMOVE_LINKITEMMODIFIER,
  UPDATE_LINKITEMMODIFIER,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_LINKITEMMODIFIER:
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
    case REMOVE_LINKITEMMODIFIER:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
        isFetching: false,
      };
    case UPDATE_LINKITEMMODIFIER:
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
    case FETCH_LINKITEMMODIFIERS_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
        data: null,
      };
    case FETCH_LINKITEMMODIFIERS_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        count: action.payload.count,
        isFetching: false,
      };
    case FETCH_LINKITEMMODIFIERS_FAIL:
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
