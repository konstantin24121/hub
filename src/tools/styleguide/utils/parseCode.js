const acorn = require('acorn-jsx');

function findComponent(node, componentName, code) {
	const { openingElement, children, type } = node;
	if (type !== 'JSXElement') return false;

	if (openingElement.name.name === componentName) {
		return openingElement;
	}
	for (const child of children) {
		const findedComponent = findComponent(child, componentName);
		if (!findedComponent) continue;
		return findedComponent;
	}
	throw Error(`Parser can't find component in code ${code}`);
}

function parseProps(conponentNode){
	const props = {};
	for (const prop of conponentNode.attributes) {
		if (prop.value.type !== 'Literal') continue;
		props[prop.name.name] = prop.value.value;
	}
	return props;
}

export default function(code, componentName) {
	const parseCode = acorn.parse(code, {
		plugins: { jsx: true },
	});
	const componentNode = findComponent(parseCode.body[0].expression, componentName, code);
	const props = parseProps(componentNode);
	return props;
}
