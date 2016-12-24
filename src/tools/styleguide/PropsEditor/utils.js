import Immutable from 'immutable';
import forEach from 'lodash/forEach';
import parseCode from '../utils/parseCode';

export function parseProps(props) {
	const codeParams = parseCode(props.code, props.componentName);
	const fields = {};
	forEach(props.props, (item, key) => {
		fields[key] = new Immutable.Map({
			name: key,
			defaultValue: item.defaultValue,
			value: codeParams[key],
			disabled: !codeParams[key],
		});
	});
	return fields;
};

export function parseDefault(defaultVal) {
	const func = new Function('', `return ${defaultVal.value};`);
	return func();
}

export function getTypeForLabel(type) {
	switch (type.name) {
		case 'string': return type.name;
		case 'number': return 'int';
		case 'enum': return 'oneOf';
		case 'bool': return type.name;
		case 'arrayOf': return `${type.name}[${getTypeForLabel(type.value)}]`;
		default: return '';
	}
}
