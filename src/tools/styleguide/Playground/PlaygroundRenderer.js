/* eslint
  import/no-extraneous-dependencies: off,
  import/no-unresolved: off,
  import/extensions: off,
  react/forbid-prop-types: off,
  react/jsx-filename-extension: off
*/
import React, { PropTypes, PureComponent } from 'react';
import Editor from 'rsg-components/Editor';
import Preview from 'rsg-components/Preview';
import cn from 'classnames';

import Toolbar from '../Toolbar';
import PropsEditor from '../PropsEditor';

const s = require('./Playground.css');

export default class PlaygroundRenderer extends PureComponent {
  static propTypes = {
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    props: PropTypes.object.isRequired,
    evalInContext: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      containerSize: 'Lg',
      containerBg: 'Light',
      showCode: false,
      showPropsEditor: false,
    };
  }

  handleChangeContainerSize = (size) => () => {
    this.setState({ containerSize: size });
  };

  handleChangeContainerBackground = (event, value) => {
    this.setState({ containerBg: value });
  };

  handleCodeToggle = () => {
    this.setState((prevState) => ({
      showCode: !prevState.showCode,
    }));
  };

  handlePropsEditorToggle = () => {
    this.setState((prevState) => ({
      showPropsEditor: !prevState.showPropsEditor,
    }));
  };

  render() {
    const { code, name, evalInContext,
      onChange, props } = this.props;
    const { containerSize, containerBg, showCode, showPropsEditor } = this.state;
    const previewClass = cn(s.preview, 'rsg--example-preview',
      s[`preview_Size${containerSize}`],
      s[`preview_Bg${containerBg}`],
    );
    return (
      <div className={s.root}>
        <div className={s.previewBox}>
          <Preview code={code} evalInContext={evalInContext} />
          {/* <div className={previewClass}>
          </div> */}
        </div>
        {/* <div className={s.toolWrapper}>
          <div className={s.toolsWrapper}>
            {(showPropsEditor && props) && (
              <PropsEditor
                props={props}
                componentName={name}
                code={code}
                onSubmit={onChange}
              />
            )}
            {showCode && (
              <div className={s.editorWrapper} >
                <Editor code={code} onChange={onChange} />
              </div>
            )}
          </div>
          <Toolbar
            containerSize={containerSize}
            containerBg={containerBg}
            showCode={showCode}
            showPropsEditor={showPropsEditor}
            onSizeChange={this.handleChangeContainerSize}
            onColorChange={this.handleChangeContainerBackground}
            onCodeClick={this.handleCodeToggle}
            onPropsEditorClick={this.handlePropsEditorToggle}
          />
        </div> */}
      </div>
    );
  }
}
