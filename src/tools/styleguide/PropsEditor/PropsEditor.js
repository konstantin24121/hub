/* eslint
  react/forbid-prop-types: off,
  react/jsx-filename-extension: off
*/
import React, { PropTypes, PureComponent } from 'react';
import Immutable from 'immutable';

import PropsEditorRenderer from './PropsEditorRenderer';

import { parseProps, generateProps, generateNewCode } from './utils';

export default class PropsEditor extends PureComponent {
  static propTypes = {
    props: PropTypes.object.isRequired,
    componentName: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      fields: new Immutable.Map({}),
    };
  }

  componentWillMount() {
    const fields = parseProps(this.props);
    this.setState({
      fields: new Immutable.Map(fields),
    });
  }

  componentWillReceiveProps(nextProps) {
    const fields = parseProps(nextProps);
    this.setState({
      fields: new Immutable.Map(fields),
    });
  }

  setFieldValue = (field, value) => {
    const { fields } = this.state;
    this.setState({
      fields: fields.setIn([field, 'value'], value),
    });
  };

  handleChangeValueTextfield = ({ name }) => (event) => {
    const { value } = event.target;
    this.setFieldValue(name, value);
  };

  handleChangeValueSelectfield = ({ name }) => (event, index, value) => {
    this.setFieldValue(name, value);
  };

  handleChangeValueCheckBox = ({ name }) => (event, value) => {
    this.setFieldValue(name, value);
  };

  handleToggleProp = ({ name }) => () => {
    const { fields } = this.state;
    const field = fields.get(name);
    const newField = field.withMutations((immutableMap) => {
      const value = immutableMap.get('disabled');
      immutableMap.set('disabled', !value)
        .set('value', '');
    });
    this.setState({
      fields: fields.set(name, newField),
    });
  };

  handleSubmit = () => {
    const { code, componentName } = this.props;
    const { fields } = this.state;
    const props = fields.map((field) => generateProps(field.toJS()));
    const newCode = generateNewCode(code, componentName, props.filter((prop) => prop).toArray());
    this.props.onSubmit(newCode);
  };

  render() {
    const { props } = this.props;
    const { fields } = this.state;
    return (
      <PropsEditorRenderer
        props={props}
        fields={fields}
        onSubmit={this.handleSubmit}
        onToggle={this.handleToggleProp}
        onTextChange={this.handleChangeValueTextfield}
        onSelect={this.handleChangeValueSelectfield}
        onCheck={this.handleChangeValueCheckBox}
      />
    );
  }
}
