import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import TodoTextInput from 'components/TodoTextInput';

describe('<TodoTextInput />', () => {
  let handleSave;
  let wrapper;

  beforeEach(() => {
    handleSave = jest.fn();
    wrapper = shallow(
      <TodoTextInput
        editing
        newTodo
        text=""
        placeholder="Please fill your name"
        onSave={handleSave}
      />
    );
  });

  it('should render initial component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('simulates Enter key down to save new todo', () => {
    const mockEvent = {
      which: 13,
      target: { value: 'this is a new todo' },
    };
    wrapper.simulate('keyDown', mockEvent);
    expect(handleSave).toHaveBeenCalledWith(mockEvent.target.value);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('simulates Enter key down to save edited todo', () => {
    const mockEvent = {
      which: 13,
      target: { value: 'this is an edited todo' },
    };
    wrapper.setProps({ newTodo: false });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    wrapper.simulate('keyDown', mockEvent);
    expect(handleSave).toHaveBeenCalledWith(mockEvent.target.value);
  });

  it('simulates non-Enter key down', () => {
    const mockEvent = {
      which: 19,
      target: { value: '' },
    };
    wrapper.simulate('keyDown', mockEvent);
    expect(handleSave).not.toHaveBeenCalled();
  });

  it('simulates change text', () => {
    const mockEvent = {
      target: { value: 'changed text' },
    };
    wrapper.simulate('change', mockEvent);
    expect(wrapper.state()).toMatchSnapshot();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('simulates blur', () => {
    const mockEvent = {
      target: { value: 'current text'},
    };
    wrapper.simulate('blur', mockEvent);
    expect(handleSave).not.toHaveBeenCalled();
  });

  it('simulates blur to save current text', () => {
    const mockEvent = {
      target: { value: 'current text'},
    };
    wrapper.setProps({ newTodo: false });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    wrapper.simulate('blur', mockEvent);
    expect(handleSave).toHaveBeenCalledWith(mockEvent.target.value);
  });
});
