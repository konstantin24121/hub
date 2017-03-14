// @flow
import type { Children } from 'react';
import React, { PureComponent } from 'react';

type Props = {
  /**
   * Имя выводимое бля
   */
  name?: string,
  /**
   * Типа
   */
  boold?: boolean,
  /**
   * Типа камбербек
   */
  onZad: Function,
  /**
   * Перечисление
   */
  enum?: 1 | 2 | 3,
  children?: Children,
};

class FlowTest extends PureComponent {
  static defaultProps = {
    name: 'zad',
    enum: 1,
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
