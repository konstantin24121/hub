import React, { PropTypes, PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';
import Checkbox from 'material-ui/Checkbox';

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

	renderField = ({ type, value, description, required, name }) => {
		if (!type) return null;

		const { fields } = this.state;
		const disabled = fields.getIn([name, 'disabled']);
		const variable = fields.getIn([name, 'value']);
		const label = `${name}${required ? '*' : ''}`;
		const hintStyle = { fontSize: 12 };

		switch (type.name) {
			case 'bool': {
				return (
					<Checkbox
						defaultChecked={variable}
						label={label}
						labelPosition="left"
						onCheck={this.handleChangeValueCheckBox({ name })}
						disabled={disabled}
					/>
				);
			}
			case 'enum': {
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
			case 'node':
			case 'objectOf':
			case 'shape':
			case 'func': return null;
			case 'arrayOf': {
				switch (type.value.name) {
					case 'string': {
						return (
							<TextField
								key={name}
								value={variable}
								disabled={disabled}
								floatingLabelText={label}
								hintText={description}
								hintStyle={hintStyle}
								multiLine
								fullWidth
								onChange={this.handleChangeValueTextfield({ name })}
							/>
						)
					}
					default: return null;
				}
			}
			default:
				return (
					<TextField
						key={name}
						value={variable}
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
	};

	render() {
		const { props } = this.props;
		const fields = map(props, (item, key) =>
			<div className={s.item} key={key}>
				{this.renderField({
					type: getType(item),
					value: item.type.value,
					description: item.description,
					required: item.required,
					name: key,
				})}
				<Toggle
					onToggle={this.handleToggleProp({ name: key })}
				/>
			</div>
		);
		return (
			<div className={s.root}>
				<Subheader>Change component props how you like</Subheader>
				<div className={s.items}>
					{fields}
				</div>
				<div className={s.item}>
					<RaisedButton label="Submit new props" primary onClick={this.handleSubmit}/>
				</div>
			</div>
		);
	}
}
