import * as actions from 'actions/todos';

describe('Todos actions', () => {
  it('should dispatch ADD_TODO action', () => {
    expect(actions.addTodo({})).toMatchSnapshot();
  });

  it('should dispatch DELETE_TODO action', () => {
    expect(actions.deleteTodo({})).toMatchSnapshot();
  });

  it('should dispatch EDIT_TODO action', () => {
    expect(actions.editTodo({})).toMatchSnapshot();
  });

  it('should dispatch COMPLETE_TODO action', () => {
    expect(actions.completeTodo({})).toMatchSnapshot();
  });

  it('should dispatch COMPLETE_ALL action', () => {
    expect(actions.completeAll()).toMatchSnapshot();
  });

  it('should dispatch CLEAR_COMPLETED action', () => {
    expect(actions.clearCompleted()).toMatchSnapshot();
  });
});
