const TOGGLE_DARKMODE = "toggle_darkmode";
const REST_DARKMODE = "reset_darkmode";
const UPLOAD_PIC = "upload_pic";
const DELETE_PIC = "delete_pic";

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

export function uploadPicAction() {
  return { type: UPLOAD_PIC };
}

export function deletePicAction() {
  return { type: DELETE_PIC };
}

const initialState = {
  darkMode: false,
  profilePicture: null,
};

export default function accontPrefsReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return { ...state, darkMode: !state.darkMode };

    case REST_DARKMODE:
      return { ...state, darkMode: false };

    case UPLOAD_PIC:
      return { ...state, profilePicture: action.payload };
    case DELETE_PIC:
      return { ...state, profilePicture: null };

    default:
      return state;
  }
}
