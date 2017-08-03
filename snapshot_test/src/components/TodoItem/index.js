import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from 'components/TodoTextInput';
import style from 'todomvc-app-css/index.css';

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    completeTodo: PropTypes.func.isRequired,
  };

  state = {
    editing: false,
  };

  handleDoubleClick = () => {
    this.setState({ editing: true });
  };

  handleSave = (id, text) => {
    if (text.length === 0) {
      this.props.deleteTodo({ id });
    } else {
      this.props.editTodo({ id, text });
    }
    this.setState({ editing: false });
  };

  render () {
    const { todo, completeTodo, deleteTodo } = this.props;

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={text => this.handleSave(todo.id, text)}
        />
      );
    } else {
      element = (
        <div className={style['view']}>
          <input
            className={style['toggle']}
            type="checkbox"
            checked={todo.completed}
            onChange={() => completeTodo({ id: todo.id })}
          />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className={style['destroy']} onClick={() => deleteTodo({ id: todo.id })} />
        </div>
      );
    }

    return (
      <li
        className={classnames({
          [style['completed']]: todo.completed,
          [style['editing']]: this.state.editing,
        })}
      >
        {element}
      </li>
    );
  }
}
