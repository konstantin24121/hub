import React, { PropTypes, PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';

import cn from 'classnames';
import map from 'lodash/map';
import Immutable from 'immutable';

import { unquote, getType, showSpaces } from '../Props/util';
import generateFields from './utils';
import s from './PropsEditor.css';

export default class PropsEditor extends PureComponent {
	static propTypes = {
		props: PropTypes.object.isRequired,
		componentName: PropTypes.string.isRequired,
		code: PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props);
		this.state = {
			fields: new Immutable.Map({}),
		};
	}

	componentWillMount() {
		const fields = generateFields(this.props);
		this.setState({
			fields: new Immutable.Map(fields),
		});
	}

	componentWillReceiveProps(nextProps) {
		const fields = generateFields(nextProps);
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
		const value = fields.getIn([name, 'disabled']);
		this.setState({
			fields: fields.setIn([name, 'disabled'], !value),
		});
	};

	handleSubmit = () => {
		let propsString = '';
	};

	renderTextField({ name, value, disabled, label, description, hintStyle }) {
		return (
			<TextField
				key={name}
				value={value}
				disabled={disabled}
				floatingLabelText={label}
				hintText={description}
				hintStyle={hintStyle}
				multiLine
				fullWidth
				onChange={this.handleChangeValueTextfield({ name })}
			/>
		);
	}

	renderSelectField(value, { name, variable, disabled, label, description, hintStyle }) {
		const items = value.map((item, key) => {
			const val = showSpaces(unquote(item.value));
			return <MenuItem key={key} value={val} primaryText={val} />;
		});
		return (
			<SelectField
				value={variable}
				disabled={disabled}
				floatingLabelText={label}
				hintText={description}
				hintStyle={hintStyle}
				fullWidth
				onChange={this.handleChangeValueSelectfield({ name })}
			>
				{items}
			</SelectField>
		);
	}

	renderCheckbox({ name, value, label, disabled }) {
		return (
			<div className={s.customCheck}>
				<Checkbox
					defaultChecked={value}
					label={label}
					labelPosition="left"
					onCheck={this.handleChangeValueCheckBox({ name })}
					disabled={disabled}
					style={{ width: 'auto' }}
					labelStyle={{ width: 'auto' }}
				/>
			</div>
		);
	}

	renderField = ({ type, value, description, required, name }) => {
		if (!type) return null;
		const { fields } = this.state;
		const disabled = fields.getIn([name, 'disabled']);
		const variable = fields.getIn([name, 'value']);
		const label = `${name}${required ? '*' : ''}`;
		const hintStyle = { fontSize: 12 };
		let component;
		switch (type.name) {
			case 'bool': {
				component = this.renderCheckbox({
					name,
					value: variable,
					disabled,
					label,
				});
				break;
			}
			case 'enum': {
				component = this.renderSelectField(
					value,
					{
						name,
						variable,
						disabled,
						label,
						description,
						hintStyle,
					},
				);
				break;
			}
			case 'string':
			case 'number': {
				component = this.renderTextField({
					name,
					value: variable,
					disabled,
					label,
					description,
					hintStyle,
				});
				break;
			}
			case 'arrayOf': {
				switch (type.value.name) {
					case 'string':
					case 'number': {
						const concatValue = variable ? variable.join(', ') : variable;
						component = this.renderTextField({
							name,
							value: concatValue,
							disabled,
							label,
							description,
							hintStyle,
						});
						break;
					}
					default: break;
				}
				break;
			}
			default:
				return null;
		}

		if(!component) return null;

		return (
			<div className={s.item} key={name}>
				<div className={s.field}>
					{component}
				</div>
				<div className={s.fieldToggle}>
					<Toggle
						defaultToggled={!disabled}
						onToggle={this.handleToggleProp({ name })}
					/>
				</div>
			</div>
		);
	};


	render() {
		const { props } = this.props;
		const fields = map(props, (item, key) =>
			this.renderField({
				type: getType(item),
				value: item.type.value,
				description: item.description,
				required: item.required,
				name: key,
			})
		);
		return (
			<div className={s.root}>
				<Subheader>Change component props how you like</Subheader>
				<div className={s.items}>
					{fields}
				</div>
				<div className={cn(s.item, s.item_last)}>
					<RaisedButton label="Submit new props" primary onClick={this.handleSubmit} />
				</div>
			</div>
		);
	}
}