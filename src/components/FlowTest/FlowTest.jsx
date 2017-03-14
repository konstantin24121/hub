// @flow
import React, { PureComponent } from 'react';

type Props = {
  /**
   * Имя выводимое бля
   */
  name?: string,
  /**
   * Типа
   */
  boold: boolean,
  /**
   * Типа камбербек
   */
  onZad?: void,
};

class FlowTest extends PureComponent {
  static defaultProps = {
    name: 'zad',
    boold: true,
    onZad: () => {},
  };

  props: Props;

  render() {
    return <p>Hello, {this.props.name}!</p>;
  }
}

export default FlowTest;
/**
 * version: 0.0.1
 */
