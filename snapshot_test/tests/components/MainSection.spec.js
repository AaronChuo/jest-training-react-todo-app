import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import MainSection from 'components/MainSection';
import TodoItem from 'components/TodoItem';
import Footer from 'components/Footer';
import { todoList } from 'mock-data';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from 'constants/TodoFilters';

describe('<MainSection />', () => {
  let actions;
  let wrapper;

  beforeEach(() => {
    actions = {
      clearCompleted: jest.fn(),
      completeAll: jest.fn(),
      editTodo: jest.fn(),
      deleteTodo: jest.fn(),
      completeTodo: jest.fn(),
    };
    wrapper = shallow(
      <MainSection
        todos={todoList}
        actions={actions}
      />
    );
  });

  it('should render initial component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render component with filter SHOW_ACTIVE', () => {
    wrapper.setState({ filter: SHOW_ACTIVE });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render component with filter SHOW_COMPLETED', () => {
    wrapper.setState({ filter: SHOW_COMPLETED });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('simulates show todo with filter', () => {
    wrapper.find(Footer).simulate('show', SHOW_ACTIVE);
    expect(wrapper.state()).toMatchSnapshot();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('simulates clear completed todo', () => {
    wrapper.find(Footer).simulate('clearCompleted');
    expect(actions.clearCompleted).toHaveBeenCalled();
  });
});
