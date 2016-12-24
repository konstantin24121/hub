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
