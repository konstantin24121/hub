/* eslint
  import/no-extraneous-dependencies: off,
  import/no-unresolved: off,
  import/extensions: off,
  react/forbid-prop-types: off,
  react/jsx-filename-extension: off
*/
import React, { PropTypes, Component } from 'react';
import Markdown from 'rsg-components/Markdown';
import Props from 'rsg-components/Props';
import Examples from 'rsg-components/Examples';
import Responsive from 'react-responsive-decorator';
import Paper from 'material-ui/Paper';
import ReactComponentRenderer from './ReactComponentRenderer';
import Changelog from '../Changelog';

@Responsive
export default class ReactComponent extends Component {
  static propTypes = {
    component: PropTypes.object.isRequired,
    sidebar: PropTypes.bool,
  };

  componentWillMount() {
    const { media } = this.props;
    media({ minWidth: 568 }, () => {
      this.setState({
        isMobile: false,
      });
    });

    media({ maxWidth: 568 }, () => {
      this.setState({
        isMobile: true,
      });
    });
  }

  render() {
    const { sidebar, component } = this.props;
    const { name, pathLine, examples, changelog } = component;
    const { description, props, pure, importString, version } = component.props;
    const { isMobile } = this.state;

    return (
      <Paper
        zDepth={1}
        style={{ padding: '0.2rem 2rem', margin: isMobile ? '1rem -1rem' : '2rem 0' }}
      >
        <ReactComponentRenderer
          name={name}
          pathLine={pathLine}
          description={description && <Markdown text={description} />}
          props={props && <Props props={props} />}
          pure={pure}
          importString={importString}
          version={version}
          examples={examples && <Examples examples={examples} name={name} props={props} />}
          sidebar={sidebar}
          changelog={changelog && <Changelog text={changelog[0].content} />}
        />
      </Paper>
    );
  }
}
