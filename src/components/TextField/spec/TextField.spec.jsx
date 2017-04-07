import React from 'react';
import TextField from '../index';

describe('TextField', () => {
  it('Render a TextField with correct name', () => {
    const wrapper = shallow(
      <TextField name="field" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
