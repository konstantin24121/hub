// @flow

import React, { PureComponent } from 'react';

import { FlowTest, TextField} from '../../components';

export default class Home extends PureComponent {
  render() {
    return (
      <div>
        <TextField />
        <FlowTest />
        Home Container
      </div>
    );
  }
}
