import Immutable from 'immutable';
import forEach from 'lodash/forEach';
import parseCode from '../utils/parseCode';

export default function(props) {
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
}
