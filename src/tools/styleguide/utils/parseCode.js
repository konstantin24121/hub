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

function parseProps(conponentNode) {
	const props = {};
	for (const prop of conponentNode.attributes) {
		switch (prop.value.type) {
			case 'Literal': {
				props[prop.name.name] = prop.value.value;
				break;
			}
			case 'JSXExpressionContainer': {
				const { expression } = prop.value;
				if (expression.type === 'Literal') {
					props[prop.name.name] = expression.value;
					break;
				}
				if (expression.type === 'ArrayExpression') {
					const propArray = [];
					for (const node of expression.elements) {
						if (node.type !== 'Literal') continue;
						propArray.push(node.value);
					}
					props[prop.name.name] = propArray;
					break;
				}
				break;
			}
			default: break;
		}
	}
	return props;
}

export default function (code, componentName) {
	const parseCode = acorn.parse(code, {
		plugins: { jsx: true },
	});
	const componentNode = findComponent(parseCode.body[0].expression, componentName, code);
	const props = parseProps(componentNode);
	return props;
}
