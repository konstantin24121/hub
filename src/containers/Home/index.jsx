// @flow

import React, { PureComponent } from 'react';

import { TextField } from 'components';

export default class Home extends PureComponent {
  handle = () => {};
  render() {
    return (
      <div>
        <TextField />
        Home Container
      </div>
    );
  }
}
