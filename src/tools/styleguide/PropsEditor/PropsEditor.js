import React, { PropTypes, PureComponent } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import map from 'lodash/map';

import { unquote, getType, showSpaces } from '../Props/util';
import s from './PropsEditor.css';

export default class PropsEditor extends PureComponent {
	static propTypes = {
		props: PropTypes.object.isRequired,
	};

	renderField = ({ type, value, description, required, name }) => {
		if (!type) return null;

		switch (type.name) {
			case 'enum': {
				const items = value.map(({ value }, key) => {
					const val = showSpaces(unquote(value));
					return <MenuItem key={key} value={val} primaryText={val} />;
				});
				return (
					<SelectField
						floatingLabelText={`${name}${required ? '*' : ''}`}
						hintText={description}
						hintStyle={{fontSize: 12}}
						fullWidth
					>
						{items}
					</SelectField>
				);
			}
			default:
				return (
					<TextField
						key={name}
						floatingLabelText={`${name}${required ? '*' : ''}`}
						hintText={description}
						hintStyle={{fontSize: 12}}
						multiLine
						fullWidth
					/>
				)
		}
	};

	render() {
		const { props } = this.props;
		console.log(props);
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
					<RaisedButton label="Submit new props" primary={true}/>
				</div>
			</div>
		);
	}
}
