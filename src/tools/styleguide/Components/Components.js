import React, { PropTypes } from 'react';
import ReactComponent from 'rsg-components/ReactComponent';
import Sections from 'rsg-components/Sections';
import ComponentsRenderer from './ComponentsRenderer';

export default function Components({
	components,
	sections,
	sidebar,
  singleExample,
}) {
	const componentsJsx = components.map(component => (
		<ReactComponent
			key={component.filepath}
			component={component}
			sidebar={sidebar}
      singleExample={singleExample}
		/>
	));

	const sectionsJsx = (
		<Sections
			sections={sections}
			sidebar={sidebar}
		/>
	);

	return (
		<ComponentsRenderer
			components={componentsJsx}
			sections={sectionsJsx}
      singleExample={singleExample}
		/>
	);
}

Components.propTypes = {
	components: PropTypes.array.isRequired,
	sections: PropTypes.array.isRequired,
	sidebar: PropTypes.bool,
};
