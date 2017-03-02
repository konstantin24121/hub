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
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { grey200 } from 'material-ui/styles/colors';
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
    index: PropTypes.number.isRequired,
    singleExample: PropTypes.bool,
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
      showPropsEditor: false,
    }));
  };

  handlePropsEditorToggle = () => {
    this.setState((prevState) => ({
      showPropsEditor: !prevState.showPropsEditor,
      showCode: false,
    }));
  };

  render() {
    const { code, name, evalInContext,
      onChange, props, index, singleExample } = this.props;
    const { containerSize, containerBg, showCode, showPropsEditor } = this.state;

    const rootClass = cn(s.root, {
      [s.root_singleExample]: singleExample,
    });


    const previewClass = cn(s.preview, 'rsg--example-preview',
      s[`preview_Size${containerSize}`],
      s[`preview_Bg${containerBg}`],
    );

    const previewBoxClass = cn(s.previewBox, {
      [s.previewBox_withToolbar]: singleExample,
      [s.previewBox_withEditor]: singleExample && (showPropsEditor || showCode),
    });

    const preview = <Preview code={code} evalInContext={evalInContext} />;
    return (
      <div className={rootClass}>
        {!singleExample &&
          <a href={`/#!/${name}/${index}`} className={s.tools}>
            <IconButton
              tooltip="Customise example"
              tooltipPosition="bottom-left"
            >
              <FontIcon className="material-icons" color={grey200}>settings</FontIcon>
            </IconButton>
          </a>
        }
        <div className={previewBoxClass}>
          {singleExample &&
            <div className={previewClass}>
              {preview}
            </div>
          }
          {!singleExample && preview}
        </div>
        {singleExample &&
          <div className={s.toolWrapper}>
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
          </div>
         }
      </div>
    );
  }
}
