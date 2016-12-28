const acorn = require('acorn-jsx');

function findComponent(node, componentName, code) {
  const { openingElement, children, type } = node;
  if (type !== 'JSXElement') return false;

  if (openingElement.name.name === componentName) {
    return openingElement;
  }
  for (const child of children) {
    const findedComponent = findComponent(child, componentName);
    if (findedComponent) return findedComponent;
  }
  throw Error(`Parser can't find component in code ${code}`);
}

function getPureProps(name, code) {
  let regexp = new RegExp(`${name}=(\\{)`, 'gui');
  let match = regexp.exec(code);
  const cutStart = code.slice(match.index);

  regexp = /(\}\n)/;
  match = regexp.exec(cutStart);
  const pureProp = cutStart.slice(0, match.index + 1);
  return pureProp;
}

function getPureCode(name, code) {
  const pureProps = getPureProps(name, code);
  const regexp = new RegExp(`${name}=\\{((.*\\n?\\s*)*)\\}`, 'gui');
  try {
    return regexp.exec(pureProps)[1];
  } catch (e) {
    throw new Error(e);
  }
}

function parseProps(conponentNode, code) {
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
            if (node.type === 'Literal') {
              propArray.push(node.value);
            }
          }
          if (propArray.length !== 0) {
            props[prop.name.name] = propArray.join(', ');
            break;
          }
        }
        props[prop.name.name] = getPureCode(prop.name.name, code);
        break;
      }
      default: {
        console.log(prop);
        break;
      }
    }
  }
  return props;
}

export default function (code, componentName) {
  const parseCode = acorn.parse(code, {
    plugins: { jsx: true },
  });
  const ellement = parseCode.body.find((node) => node.type === 'ExpressionStatement');
  const componentNode = findComponent(ellement.expression, componentName, code);
  const props = parseProps(componentNode, code);
  return props;
}
