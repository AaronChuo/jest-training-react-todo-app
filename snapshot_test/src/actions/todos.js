import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  COMPLETE_TODO,
  COMPLETE_ALL,
  CLEAR_COMPLETED,
} from 'constants/todos';

export const addTodo = (payload) => {
  return {
    type: ADD_TODO,
    payload,
  };
};

export const deleteTodo = (payload) => {
  return {
    type: DELETE_TODO,
    payload,
  };
};

export const editTodo = (payload) => {
  return {
    type: EDIT_TODO,
    payload,
  };
};

export const completeTodo = (payload) => {
  return {
    type: COMPLETE_TODO,
    payload,
  };
};

export const completeAll = () => {
  return {
    type: COMPLETE_ALL,
  };
};

export const clearCompleted = () => {
  return {
    type: CLEAR_COMPLETED,
  };
};
