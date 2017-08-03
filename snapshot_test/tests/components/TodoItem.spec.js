import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TodoItem from 'components/TodoItem';
import TodoTextInput from 'components/TodoTextInput';
import { todoList } from 'mock-data';

describe('<TodoItem />', () => {
  let handleEditTodo;
  let handleDeleteTodo;
  let handleCompleteTodo;
  let wrapper;

  beforeEach(() => {
    handleEditTodo = jest.fn();
    handleDeleteTodo = jest.fn();
    handleCompleteTodo = jest.fn();
    wrapper = shallow(
      <TodoItem
        todo={todoList[0]}
        editTodo={handleEditTodo}
        deleteTodo={handleDeleteTodo}
        completeTodo={handleCompleteTodo}
      />
    );
  });

  it('should render initial component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('simulates double click to editing mode', () => {
    wrapper.find('.view label').simulate('doubleClick');
    expect(wrapper.state()).toMatchSnapshot();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('simulates save todo in editing mode', () => {
    const { id, text } = todoList[0];
    wrapper.setState({ editing: true });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    wrapper.find(TodoTextInput).simulate('save', text);
    expect(handleEditTodo).toHaveBeenCalledWith({ id, text });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('simulates save todo without text in editing mode', () => {
    const { id, text } = todoList[0];
    wrapper.setState({ editing: true });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    wrapper.find(TodoTextInput).simulate('save', '');
    expect(handleDeleteTodo).toHaveBeenCalledWith({ id });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('simulates change checkbox status to complete todo', () => {
    wrapper.find('.view .toggle').simulate('change');
    expect(handleCompleteTodo).toHaveBeenCalledWith({ id: todoList[0].id });
  });

  it('simulates click button to delete todo', () => {
    wrapper.find('.view .destroy').simulate('click');
    expect(handleDeleteTodo).toHaveBeenCalledWith({ id: todoList[0].id });
  });
});
