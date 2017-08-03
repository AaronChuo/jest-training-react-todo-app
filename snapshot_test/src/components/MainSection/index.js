import React, { Component, PropTypes } from 'react';
import TodoItem from 'components/TodoItem';
import Footer from 'components/Footer';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from 'constants/TodoFilters';
import style from 'todomvc-app-css/index.css';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed,
};

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = { filter: SHOW_ALL };

  handleClearCompleted = () => {
    this.props.actions.clearCompleted();
  };

  handleShow = filter => {
    this.setState({ filter });
  };

  renderToggleAll (completedCount) {
    const { todos, actions } = this.props;

    return (
      <input
        className={style['toggle-all']}
        type="checkbox"
        checked={completedCount === todos.length}
        onChange={actions.completeAll}
      />
    );
  }

  renderFooter (completedCount) {
    const { todos } = this.props;
    const { filter } = this.state;
    const activeCount = todos.length - completedCount;

    return (
      <Footer
        completedCount={completedCount}
        activeCount={activeCount}
        filter={filter}
        onClearCompleted={this.handleClearCompleted}
        onShow={this.handleShow}
      />
    );
  }

  render () {
    const { todos, actions } = this.props;
    const { filter } = this.state;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce(
      (count, todo) => todo.completed ? count + 1 : count,
      0
    );

    return (
      <section className={style['main']}>
        {todos.length && this.renderToggleAll(completedCount)}
        <ul className={style['todo-list']}>
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} {...actions} />
          ))}
        </ul>
        {todos.length && this.renderFooter(completedCount)}
      </section>
    );
  }
}
