// @flow
import type { Children, Element } from 'react';
import React, { PureComponent, PropType } from 'react';
import cn from 'classnames';
import map from 'lodash/map';

import s from './FlowTest.css';

type Shape = {
  id: number,
  name: string,
}

type Props = {
  /**
   * String array props
   */
  array?: Array<string>,
  /**
   * Boolean props
   */
  bool?: boolean,
  /**
   * String props
   */
  string?: string,
  /**
   * Required string props
   */
  required: string,
  /**
   * Union props
   */
  list?: 'big' | 'medium' | 'small',
  /**
   * Number props
   */
  integer?: number,
  /**
   * Node/children props
   */
  node?: Element<any>,
  /**
   * Map of string
   */
  stringObjects?: {[id: string]: string},
  /**
   * Shape props
   */
  objectWithShape?: {
    string: string,
    number: number,
  },
  /**
   * Array of shapes
   */
  arrayOfShapes: Array<Shape>,
  /**
   * Props with mock
   */
  mockedShape: Array<Shape>,
  /**
   * Children
   */
  children?: Children,

  onCallback?: Function,
};

/**
 * It's components with flow typing.
 * He show how components with flow must be designed. And how it's work into styleguide.
 */
class FlowTest extends PureComponent {
  static propTypes = {
    /**
     * Callback
     */
    onCallback: PropType.func,
  }

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
  };

  props: Props;

  handleClick = () => {
    const { onCallback } = this.props;
    const string = 'string';
    const anotherString = 'string';
    onCallback(string, anotherString);
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
        {this.props.children}
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

export default FlowTest;
/**
 * version: 0.0.1
 */
