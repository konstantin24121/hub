import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import map from 'lodash/map';

import s from './Example.css';
/**
 * It's just components example.
 * He show how components must be designed.
 */
class Example extends PureComponent {
  static propTypes = {
    /**
     * Демонстрационный массив
     */
    array: PropTypes.arrayOf(PropTypes.string),
    /**
     * Фальщь или правда
     */
    booliat: PropTypes.bool,
    /**
     * Просто строка
     */
    string: PropTypes.string,
    /**
     * Обязательный атрибут
     */
    required: PropTypes.string.isRequired,
    /**
     * Перечисляемое свойство
     */
    list: PropTypes.oneOf(['big', 'medium', 'small']),
    /**
     * Число. Просто Число
     */
    integer: PropTypes.number,
    /**
     * Узел
     */
    node: PropTypes.node,
    /**
     * Обекты определенного типа
     */
    stringObjects: PropTypes.objectOf(PropTypes.string),
    /**
     * Шаблон для объекта
     */
    objectWithShape: PropTypes.shape({
      string: PropTypes.string,
      number: PropTypes.number,
    }),
    /**
     * Массив объектов
     */
    arrayOfShapes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    /**
     * Массив объектов c мокой
     */
    mockedShape: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    /**
     * Срабатывает при клике на компонент
     */
    onCallback: PropTypes.func,
  };

  static defaultProps = {
    array: ['nothing'],
    booliat: false,
    list: 'medium',
    integer: 5,
    stringObjects: {
      12411: 'zad',
      111212: 'not zad',
    },
    objectWithShape: {
      string: 'zad',
      number: 1,
    },
    arrayOfShapes: [
      { id: 2, name: 'Leila' },
      { id: 4, name: 'Janna' },
    ],
    // eslint-disable-next-line no-unused-vars
    onCallback: (string, anotherString) => {},
  }

  handleClick = () => {
    this.props.onCallback('zad', 'пухлый');
  };

  renderStrings() {
    const { stringObjects } = this.props;
    return map(stringObjects, (val, key) => <div key={key}>{val}</div>);
  }

  renderShape() {
    const { objectWithShape: { number, string } } = this.props;
    return (
      <div>
        <div>number: {number}</div>
        <div>string: {string}</div>
      </div>
    );
  }

  renderArrayShape() {
    const { arrayOfShapes } = this.props;
    return arrayOfShapes.map(
      ({ id, name }, key) => <li key={key}>{id}: {name}</li>
    );
  }

  renderMockedShape() {
    const { mockedShape } = this.props;
    return mockedShape.map(
      ({ id, name }, key) => <li key={key}>{id}: {name}</li>
    );
  }

  render() {
    const { array, string, required, booliat,
      integer, list, node, arrayOfShapes, mockedShape } = this.props;
    const rootClass = cn(s.root, s[`root_${list}`]);
    return (
      <div className={rootClass} onClick={this.handleClick}>
        {required}
        <br />
        {string}
        {integer && `, ${integer}`}
        {array &&
          <ul>
            {array.map((value, key) => <li key={key}>{value}</li>)}
          </ul>
        }
        {booliat ? 'правда' : 'фальш'}
        {node && node}
        {this.renderStrings()}
        {this.renderShape()}
        {arrayOfShapes &&
          <ul>
            {this.renderArrayShape()}
          </ul>
        }
        {mockedShape &&
          <ul>
            {this.renderMockedShape()}
          </ul>
        }
      </div>
    );
  }
}

export default Example;
/**
 * version: 0.0.1
 */
