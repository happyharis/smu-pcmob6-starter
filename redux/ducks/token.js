const SET_TOKEN = "set_token";

export function setToken(token) {
  return { type: SET_TOKEN, token };
}

const initialState = {
  token: null,
};

export default function tokenReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.token };

    default:
      return state;
  }
}
