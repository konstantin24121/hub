import React, { PropTypes, PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import map from 'lodash/map';
import forEach from 'lodash/forEach';
import set from 'lodash/set';
import assign from 'lodash/assign';
import parseCode from '../utils/parseCode';

import { unquote, getType, showSpaces } from '../Props/util';
import s from './PropsEditor.css';

export default class PropsEditor extends PureComponent {
	static propTypes = {
		props: PropTypes.object.isRequired,
		componentName: PropTypes.string.isRequired,
		code: PropTypes.string.isRequired,
	};

	constructor(props) {
		super(props);
		const codeParams = parseCode(props.code, props.componentName);
		const fields = {};
		forEach(props.props, (item, key) => {
			fields[key] = {
				name: key,
				value: item.defaultValue ? item.defaultValue.value : '',
				disable: true,
			};
		});
		this.state = {
			fields,
		};
	}

	handleChangeValueTextfield = ({ name }) => (event) => {
		const fields = assign({}, this.state.fields);
		const newFields = set(fields, `${name}`, event.target.value);
		this.setState({ fields: newFields });
	};

	handleChangeValueSelectfield = ({ name }) => (event, index, value) => {
		const fields = assign({}, this.state.fields);
		const newFields = set(fields, `${name}`, value);
		this.setState({ fields: newFields });
	};

	handleSubmit = () => {
		let propsString = '';
	};

	renderField = ({ type, value, description, required, name }) => {
		if (!type) return null;

		const { fields } = this.state;
		switch (type.name) {
			case 'enum': {
				const items = value.map(({ value }, key) => {
					const val = showSpaces(unquote(value));
					return <MenuItem key={key} value={val} primaryText={val} />;
				});
				return (
					<SelectField
						value={fields[name].value}
						floatingLabelText={`${name}${required ? '*' : ''}`}
						hintText={description}
						hintStyle={{fontSize: 12}}
						fullWidth
						onChange={this.handleChangeValueSelectfield({ name })}
					>
						{items}
					</SelectField>
				);
			}
			case 'func': return null;
			default:
				return (
					<TextField
						key={name}
						value={fields[name].value}
						floatingLabelText={`${name}${required ? '*' : ''}`}
						hintText={description}
						hintStyle={{fontSize: 12}}
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
