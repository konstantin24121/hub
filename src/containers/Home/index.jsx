// @flow

import React, { PureComponent } from 'react';

import { FlowTest, TextField } from 'components';

export default class Home extends PureComponent {
  handle = () => {};
  render() {
    return (
      <div>
        <TextField />
        <FlowTest onZad={this.handle} />
        Home Container
      </div>
    );
  }
}
