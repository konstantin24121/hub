import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import map from 'lodash/map';

import s from './Simple.css';
/**
 * It's just components example.
 * He show how components must be designed.
 */
class Simple extends PureComponent {
  static propTypes = {
    /**
     * String array props
     */
    array: PropTypes.arrayOf(PropTypes.string),
    /**
     * Boolean props
     */
    bool: PropTypes.bool,
    /**
     * String props
     */
    string: PropTypes.string,
    /**
     * Required props
     */
    required: PropTypes.string.isRequired,
    /**
     * Union props
     */
    list: PropTypes.oneOf(['big', 'medium', 'small']),
    /**
     * Number props
     */
    integer: PropTypes.number,
    /**
     * Node/children props
     */
    node: PropTypes.node,
    /**
     * Map of string
     */
    stringObjects: PropTypes.objectOf(PropTypes.string),
    /**
     * Shape props
     */
    objectWithShape: PropTypes.shape({
      string: PropTypes.string,
      number: PropTypes.number,
    }),
    /**
     * Array of shapes
     */
    arrayOfShapes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    /**
     * Props with mock
     */
    mockedShape: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    /**
     * Children
     */
    children: PropTypes.node,
    /**
     * Callback
     */
    onCallback: PropTypes.func,
  };

  static defaultProps = {
    array: ['string'],
    bool: false,
    list: 'medium',
    integer: 5,
    stringObjects: {
      one: 'one',
      two: 'two',
    },
    objectWithShape: {
      string: 'string',
      number: 1,
    },
    arrayOfShapes: [
      { id: 2, name: 'Frodo' },
      { id: 4, name: 'Sam' },
    ],
    // eslint-disable-next-line no-unused-vars
    onCallback: (string, anotherString) => {},
  }

  handleClick = () => {
    this.props.onCallback('string', 'one more string');
  };

  renderStrings() {
    const { stringObjects } = this.props;
    return map(stringObjects, (val, key) => <div key={key}>{val}</div>);
  }

  renderShape() {
    const { objectWithShape: { number, string } } = this.props;
    return (
      <div>
        <span>number: {number}</span>,
        <span>string: {string}</span>
      </div>
    );
  }

  renderArrayShape() {
    const { arrayOfShapes } = this.props;
    return arrayOfShapes.map(
      ({ id, name }, key) => <span key={key}>{id}: {name}</span>
    );
  }

  renderMockedShape() {
    const { mockedShape } = this.props;
    return mockedShape.map(
      ({ id, name }, key) => <span key={key}>{id}: {name}, </span>
    );
  }

  render() {
    const { array, string, required, bool,
      integer, list, node, arrayOfShapes, mockedShape } = this.props;
    const rootClass = cn(s.root, s[`root_${list}`]);
    return (
      <div className={rootClass} onClick={this.handleClick}>
        {required}
        <br />
        {string}
        {integer && `, ${integer}`}
        {array &&
          <div>
            {array.map((value, key) => <span key={key}>{value}, </span>)}
          </div>
        }
        {bool ? 'True' : 'False'}
        {node && node}
        {this.renderStrings()}
        {this.renderShape()}
        {arrayOfShapes &&
          <div>
            {this.renderArrayShape()}
          </div>
        }
        {mockedShape &&
          <div>
            {this.renderMockedShape()}
          </div>
        }
      </div>
    );
  }
}

export default Simple;
/**
 * version: 0.0.1
 */