// @flow
import type { Children, Element } from 'react';
import React, { PureComponent } from 'react';

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
  node?: Element,
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
  /**
   * Callback
   */
  onCallback?: Function,
};

/**
 * It's components with flow typing.
 * He show how components with flow must be designed. And how it's work into styleguide.
 */
class FlowTest extends PureComponent {
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

  render() {
    return (
      <p>
        Hello, {this.props.boold && this.props.name}!
        {this.props.enum}{this.props.children}
      </p>
    );
  }
}

export default FlowTest;
/**
 * version: 0.0.1
 */
