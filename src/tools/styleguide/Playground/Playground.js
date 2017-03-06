/* eslint
  import/no-extraneous-dependencies: off,
  import/no-unresolved: off,
  import/extensions: off,
  react/forbid-prop-types: off,
  react/jsx-filename-extension: off
*/
import React, { Component, PropTypes } from 'react';
import debounce from 'lodash/debounce';
import PlaygroundRenderer from 'rsg-components/Playground/PlaygroundRenderer';
import { createSettingsLink, getQueryVariable } from '../utils/settingsLink';
import { generateNewCode } from '../PropsEditor/utils';

export default class Playground extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired,
    evalInContext: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  };

  static contextTypes = {
    config: PropTypes.object.isRequired,
    singleExample: PropTypes.bool,
    targetComponentName: PropTypes.string,
  };

  constructor(props, context) {
    super(props, context);
    const { code } = props;
    const propsFromLink = getQueryVariable('props');
    let resultCode;
    if (propsFromLink) {
      const propsSettings = JSON.parse(propsFromLink);
      resultCode = generateNewCode(
        code,
        context.targetComponentName,
        propsSettings);
    } else {
      resultCode = code;
    }
    this.state = {
      code: resultCode,
      settingsLink: location.href,
    };
  }


  componentWillReceiveProps(nextProps) {
    const { code } = nextProps;
    this.setState({
      code,
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.code !== this.state.code ||
      nextState.showCode !== this.state.showCode ||
      nextState.showPropsEditor !== this.state.showPropsEditor
    );
  }

  componentWillUnmount() {
    // clear pending changes before unmount
    if (this.queuedChange) {
      this.queuedChange.cancel();
    }
  }

  handleChange(code, props) {
    // clear pending changes before proceed
    if (this.queuedChange) {
      this.queuedChange.cancel();
    }
    // stored update action
    const queuedChange = () => this.setState({
      code,
      settingsLink: createSettingsLink(props),
    });

    const { previewDelay } = this.context.config;

    if (previewDelay) {
      // if previewDelay is enabled debounce the code
      this.queuedChange = debounce(queuedChange, previewDelay);
      this.queuedChange();
    } else {
      // otherwise execute it
      queuedChange();
    }
  }

  render() {
    const { code, showCode, showPropsEditor, settingsLink } = this.state;
    const { evalInContext, index, name, props } = this.props;
    const { singleExample } = this.context;

    return (
      <PlaygroundRenderer
        code={code}
        showCode={showCode}
        settingsLink={settingsLink}
        showPropsEditor={showPropsEditor}
        index={index}
        name={name}
        props={props}
        singleExample={singleExample}
        evalInContext={evalInContext}
        onChange={(newCode, newProps) => { this.handleChange(newCode, newProps); }}
      />
    );
  }
}
