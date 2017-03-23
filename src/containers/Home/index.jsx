// @flow

import React, { PureComponent } from 'react';

import { TextField, FlowTest } from 'components';

export default class Home extends PureComponent {
  handle = () => {};
  render() {
    return (
      <div>
        <FlowTest required="zad" onCallback={this.handle} />
        <TextField />
        Home Container
      </div>
    );
  }
}
