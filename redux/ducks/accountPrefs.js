const TOGGLE_DARKMODE = "toggle_darkmode";
const REST_DARKMODE = "reset_darkmode";

export function toggleDarkMode() {
  return {
    type: TOGGLE_DARKMODE,
  };
}
export function resetDarkMode() {
  return {
    type: false,
  };
}

const initialState = {
  darkMode: false,
};

export default function accontPrefsReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return { ...state, darkMode: !state.darkMode };

    case REST_DARKMODE:
      return { ...state, darkMode: false };

    default:
      return state;
  }
}
