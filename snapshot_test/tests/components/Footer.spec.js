import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Footer from 'components/Footer';
import {
  SHOW_ALL,
  SHOW_ACTIVE,
  SHOW_COMPLETED,
} from 'constants/TodoFilters';

describe('<Footer />', () => {
  let handleClearCompleted;
  let handleShow;
  let wrapper;

  beforeEach(() => {
    handleClearCompleted = jest.fn();
    handleShow = jest.fn();
    wrapper = shallow(
      <Footer
        completedCount={6}
        activeCount={2}
        filter={SHOW_ALL}
        onClearCompleted={handleClearCompleted}
        onShow={handleShow}
      />
    );
  });

  it('should render initial component', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render component without any active todo', () => {
    wrapper.setProps({ activeCount: 0 });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render component with an active todo', () => {
    wrapper.setProps({ activeCount: 1 });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render component with multiple active todos', () => {
    wrapper.setProps({ activeCount: 2 });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render component without any completed todo', () => {
    wrapper.setProps({ completedCount: 0 });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render component with filter SHOW_ACTIVE', () => {
    wrapper.setProps({ filter: SHOW_ACTIVE });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('should render component with filter SHOW_COMPLETED', () => {
    wrapper.setProps({ filter: SHOW_COMPLETED });
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('simulates click button to filter todos', () => {
    wrapper.find('.filters li a').first().simulate('click');
    expect(handleShow).toHaveBeenCalled();
  });

  it('simulates click button to clear completed todos', () => {
    wrapper.find('.clear-completed').simulate('click');
    expect(handleClearCompleted).toHaveBeenCalled();
  });
});
