import React, { PureComponent } from 'react';

import { Example } from 'components';

export default class Home extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Example />
        Home Container
      </div>
    );
  }
}
