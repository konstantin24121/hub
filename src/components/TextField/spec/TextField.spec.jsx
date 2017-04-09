import React from 'react';
import TextField from '../index';

describe('TextField', () => {
  it('Render a TextField with correct props', () => {
    const rc = shallow(
      <TextField
        name="field"
        placeholder="Placehodor"
        hint="Hint Ladger"
      />
    );
    expect(rc).toMatchSnapshot();
  });

  it('Focus at TextField with float label mast have effect', () => {
    const rc = shallow(
      <TextField name="field" floatingLabel="label" />
    );
    expect(rc).toMatchSnapshot();
    // Simulate focus event by input
    rc.find('input').simulate('focus');
    rc.update();
    expect(rc).toMatchSnapshot();
  });

  it('Blur callback at TextField when input generate blur event', () => {
  const onBlur = jest.fn();
    const rc = shallow(
      <TextField name="field" onBlur={onBlur} />
    );
    // Simulate blur event by input
    rc.find('input').simulate('blur');
    expect(onBlur.mock.calls.length).toBe(1);
  });

  it('TextField change value if receive new props', () => {
    const rc = shallow(
      <TextField name="field" value="zad" />
    );
    rc.setProps({ value: 'nezad' });
    expect(rc.find('input').props().value).toBe('nezad');
  });

  it('TextField mast give value when he changed', () => {
    const newValue = 'nezad';
    const Event = {
      target: {
        value: newValue
      }
    };
    const onChange = jest.fn(({ value }) => value);
    const rc = shallow(
      <TextField name="field" value="zad" onChange={onChange} />
    );
    rc.find('input').simulate('change', Event);
    expect(onChange).toBeCalledWith({value: newValue}, Event);
  });
});
