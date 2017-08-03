import React, { PropTypes, Component } from 'react';
import TodoTextInput from 'components/TodoTextInput';
import style from 'todomvc-app-css/index.css';

export default class Header extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
  };

  handleSave = (text = '') => {
    if (text.length !== 0) {
      this.props.addTodo({ text });
    }
  };

  render () {
    return (
      <header className={style['header']}>
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}
