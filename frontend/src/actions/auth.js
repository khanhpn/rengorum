import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_RESET,
  EDIT_PROFILE_REQUEST,
  EDIT_PROFILE_SUCCESS,
  EDIT_PROFILE_FAILURE,
  EDIT_PROFILE_RESET,
  LOGOUT,
} from './types';
import {loginApi, logoutApi, editProfileApi} from '../api';
import store from '../store';
import {hideModal} from './modal';
import {apiErrorHandler} from '../utils/errorhandler';

export const login = (email, password) => dispatch => {
  dispatch(loginRequest());

  loginApi(email, password)
    .then(response => {
      dispatch(loginSuccess(response.data));
      dispatch(hideModal());
    })
    .catch(error => {
      const errorMessage = apiErrorHandler(error);
      dispatch(loginFailure(errorMessage));
    });
};

export const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

export const loginSuccess = data => {
  return {
    type: LOGIN_SUCCESS,
    token: data.token,
    id: data.id,
    age: data.age,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    role: data.role
  };
};

export const loginFailure = error => {
  return {
    type: LOGIN_FAILURE,
    error,
  };
};

export const logout = () => dispatch => {
  // logoutApi();
  dispatch({
    type: LOGOUT,
  });
};

export const loginReset = () => {
  return {
    type: LOGIN_RESET,
  };
};

export const editProfile = newProfile => dispatch => {
  dispatch(editProfileRequest());

  const username = store.getState().auth.username;
  if (!username) {
    dispatch(editProfileFailure('Not authenticated'));
  } else {
    editProfileApi(username, newProfile)
      .then(response => {
        dispatch(editProfileSuccess(newProfile));
      })
      .catch(error => {
        const errorMessage = apiErrorHandler(error);
        dispatch(editProfileFailure(errorMessage));
      });
  }
};

export const editProfileRequest = () => {
  return {
    type: EDIT_PROFILE_REQUEST,
  };
};

export const editProfileSuccess = newProfile => {
  return {
    type: EDIT_PROFILE_SUCCESS,
    avatar: newProfile.avatar,
    name: newProfile.name,
  };
};

export const editProfileFailure = error => {
  return {
    type: EDIT_PROFILE_FAILURE,
    error,
  };
};

export const editProfileReset = () => {
  return {
    type: EDIT_PROFILE_RESET,
  };
};
