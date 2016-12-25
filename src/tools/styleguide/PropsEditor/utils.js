import Immutable from 'immutable';
import forEach from 'lodash/forEach';
import parseCode from '../utils/parseCode';

export function parseProps(props) {
	const codeParams = parseCode(props.code, props.componentName);
	const fields = {};
	forEach(props.props, (item, key) => {
		fields[key] = new Immutable.Map({
			name: key,
			type: item.type,
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

export function generateProps(field) {
	const { type, name, disabled, value} = field;
	if (disabled) return;

	switch (type.name) {
		case 'string':
			return `${name}="${value}"`;

		case 'number':
			return `${name}={${parseFloat(value)}}`;

		case 'enum': {
			const rawValue = parseFloat(value);
			if (rawValue) {
				return `${name}={${rawValue}}`;
			}
			return `${name}="${value}"`;
		}

		case 'bool':
			return `${name}={${value ? 'true' : 'false'}}`;

		case 'arrayOf': {
			switch (type.value.name) {
				case 'number':
					return `${name}={[${value}]}`;

				case 'string': {
					const rawValue = value.replace(/([\wа-я]+)($|,){1}\s*/iug, `'\$1'\$2 `);
					return `${name}={[${rawValue}]}`;
				}
				default: return;
			}
		}
		default: return;
	}
}

function getTabsForProps(code, componentName) {
	const regExp = new RegExp(`<${componentName}\n+([\t]+)`, 'g');
	try {
		const tabs = regExp.exec(code)[1];
		return tabs;
	} catch (e) {
		throw new Error(e);
	}
}

export function generateNewCode(code, componentName, props) {
	const tabs = getTabsForProps(code, componentName);
	const formattedProps = props.join(`\n${tabs}`);
	const regExp = new RegExp(`<${componentName}(.|\t|\n)+/>`, 'g');
	return code.replace(
		regExp,
		`<${componentName}\n${tabs}${formattedProps}\n${tabs.slice(0, -1)}/>`
	);
}
