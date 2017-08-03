import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Header from 'components/Header';
import TodoTextInput from 'components/TodoTextInput';

describe('<Header />', () => {
  let handleAddTodo;
  let wrapper;

  beforeEach(() => {
    handleAddTodo = jest.fn();
    wrapper = shallow(
      <Header
        addTodo={handleAddTodo}
      />
    );
  });

  it('should render initial component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('simulates save todo', () => {
    const mockTodoText = 'Go shopping';
    wrapper.find(TodoTextInput).simulate('save', mockTodoText);
    expect(handleAddTodo).toHaveBeenCalledWith({ text: mockTodoText });
  });

  it('simulates save todo without text', () => {
    wrapper.find(TodoTextInput).simulate('save');
    expect(handleAddTodo).not.toHaveBeenCalled();
  });
});
