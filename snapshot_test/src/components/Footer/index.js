import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from 'constants/TodoFilters';
import style from 'todomvc-app-css/index.css';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed',
};

export default class Footer extends Component {
  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired,
  };

  renderTodoCount () {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className={style['todo-count']}>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink (filter) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, onShow } = this.props;
    const className = {
      [style['selected']]: filter === selectedFilter,
    };

    return (
      <a
        className={className}
        style={{ cursor: 'pointer' }}
        onClick={() => onShow(filter)}
      >
        {title}
      </a>
    );
  }

  renderClearButton () {
    const { onClearCompleted } = this.props;

    return (
      <button className={style['clear-completed']} onClick={onClearCompleted}>
        Clear completed
      </button>
    );
  }

  render () {
    const { completedCount } = this.props;

    return (
      <footer className={style['footer']}>
        {this.renderTodoCount()}
        <ul className={style['filters']}>
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter => (
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          ))}
        </ul>
        {completedCount > 0 && this.renderClearButton()}
      </footer>
    );
  }
}
