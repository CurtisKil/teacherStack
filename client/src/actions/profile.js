import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_CLASS,
  GET_PROFILES,
  CLEAR_PROFILE
} from './types';

export const getCurrentProfile = () => async dispatch => {
  try {
    const response = await axios.get('/api/teacherprofile/me');

    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        status: err.response.status
      }
    });
  }
};

//Get all profiles

export const getProfiles = () => async dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  });

  try {
    const res = await axios.get('/api/teacherprofile');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get profile by id

export const getProfileById = userId => async dispatch => {
  try {
    console.log(userId);
    const res = await axios.get(`/api/teacherprofile/profile/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    console.log(err.response.statusText);
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Create or Update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(formData, 'formdata');

    const res = await axios.post('/api/teacherprofile', formData, config);
    console.log('route getting hit');
    console.log(res.data);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/profile');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response.statusText,
        status: err.response.status
      }
    });
  }
};

// add a class period to profile
export const addClass = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    console.log(formData);

    const res = await axios.put(
      '/api/teacherprofile/classes',
      formData,
      config
    );

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Class Added', 'success'));

    history.push('/profile');
  } catch (err) {
    console.log(err);
  }
};

//Get Class Period
export const getClass = id => async dispatch => {
  try {
    const res = await axios.get(`/api/teacherprofile/classes/${id}`);

    console.log('this is getClass', res);

    dispatch({
      type: GET_CLASS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// add a todo to profile
export const addTodo = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const res = await axios.put('/api/teacherprofile/todos', formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('ToDo Added', 'success'));

    history.push('/profile');
  } catch (err) {
    console.log(err);
  }
};

// Delete Todo

export const deleteTodo = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/teacherprofile/todos/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert('Todo Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
