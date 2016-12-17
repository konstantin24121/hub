import React, { PropTypes } from 'react';
import Markdown from 'rsg-components/Markdown';
import Props from 'rsg-components/Props';
import Examples from 'rsg-components/Examples';
import ReactComponentRenderer from './ReactComponentRenderer';
import Paper from 'material-ui/Paper';

export default function ReactComponent({
	component,
	sidebar,
}) {
	const { name, pathLine, examples } = component;
	const { description, props, pure, importString, version } = component.props;
	return (
		<Paper
			zDepth={1}
			style={{padding: '0.2rem 1rem'}}
		>
			<ReactComponentRenderer
				name={name}
				pathLine={pathLine}
				description={description && <Markdown text={description} />}
				props={props && <Props props={props} />}
				pure={pure}
				importString={importString}
				version={version}
				examples={examples && <Examples examples={examples} name={name} />}
				sidebar={sidebar}
			/>
		</Paper>
	);
}

ReactComponent.propTypes = {
	component: PropTypes.object.isRequired,
	sidebar: PropTypes.bool,
};
