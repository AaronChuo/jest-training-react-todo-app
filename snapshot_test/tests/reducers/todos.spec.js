import * as actions from 'actions/todos';
import todosReducer from 'reducers/todos';
import { todoList } from 'mock-data';

describe('Todos reducer', () => {
  it('should return initial state', () => {
    expect(todosReducer(undefined, {})).toMatchSnapshot();
  });

  it('should add new todo', () => {
    const action = actions.addTodo({
      text: 'meeting with team members',
    });
    expect(todosReducer(todoList, action)).toMatchSnapshot();
  });

  it('should delete the todo', () => {
    const action = actions.deleteTodo({
      id: 1,
    });
    expect(todosReducer(todoList, action)).toMatchSnapshot();
  });

  it('should edit the todo', () => {
    const action = actions.editTodo({
      id: 1,
      text: 'dinner with boss',
    });
    expect(todosReducer(todoList, action)).toMatchSnapshot();
  });

  it('should complete the todo', () => {
    const action = actions.completeTodo({
      id: 1,
    });
    expect(todosReducer(todoList, action)).toMatchSnapshot();
  });

  it('should complete all todos', () => {
    const action = actions.completeAll();
    expect(todosReducer(todoList, action)).toMatchSnapshot();
  });

  it('should clear completed todo', () => {
    const action = actions.clearCompleted();
    expect(todosReducer(todoList, action)).toMatchSnapshot();
  });

  it('should return current state with wrong action', () => {
    const action = {
      type: 'WRONG_ACTION',
    };
    expect(todosReducer(todoList, action)).toMatchSnapshot();
  });
});
