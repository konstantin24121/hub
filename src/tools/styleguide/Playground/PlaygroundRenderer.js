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
import { throttle } from 'lodash';

import Toolbar from '../Toolbar';
import PropsEditor from '../PropsEditor';

const s = require('./Playground.css');

const containerSizes = {
  Lg: {
    width: 1024,
    height: 600,
  },
  Md: {
    width: 800,
    height: 600,
  },
  Sm: {
    width: 568,
    height: 480,
  },
  Xs: {
    width: 320,
    height: 480,
  },
};

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
      containerSize: containerSizes.Lg,
      cursorPosition: {},
      containerSizeKey: 'Lg',
      containerBg: 'Light',
      showCode: false,
      showPropsEditor: false,
    };
    this.setNewVertikalDimentions = throttle(this.setNewVertikalDimentions, 1000 / 60);
    this.setNewHorizontalDimentions = throttle(this.setNewHorizontalDimentions, 1000 / 60);
  }

  setNewVertikalDimentions = (event) => {
    const { nativeEvent } = event;
    if (nativeEvent.clientX === 0) return;
    this.setState((prevState) => ({
      containerSize: {
        width: prevState.containerSize.width + (nativeEvent.clientX - prevState.cursorPosition.x),
        height: prevState.containerSize.height,
      },
      cursorPosition: {
        x: nativeEvent.clientX,
        y: nativeEvent.clientY,
      },
    }));
  };

  setNewHorizontalDimentions = (event) => {
    const { nativeEvent } = event;
    if (nativeEvent.clientY === 0) return;
    this.setState((prevState) => ({
      containerSize: {
        width: prevState.containerSize.width,
        height: prevState.containerSize.height + (nativeEvent.clientY - prevState.cursorPosition.y),
      },
      cursorPosition: {
        x: nativeEvent.clientX,
        y: nativeEvent.clientY,
      },
    }));
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

  handleDragStart = (event) => {
    const { nativeEvent } = event;
    this.setState({
      containerSize: {
        width: this._previewContainer.offsetWidth,
        height: this._previewContainer.offsetHeight,
      },
      containerSizeKey: 'Custom',
      cursorPosition: {
        x: nativeEvent.clientX,
        y: nativeEvent.clientY,
      },
    });
  };

  handleChangeContainerSize = (size) => () => {
    this.setState({ containerSize: containerSizes[size], containerSizeKey: size });
  };

  handleDragVertical = (event) => {
    event.persist();
    this.setNewVertikalDimentions(event);
  };

  handleDragHorizontal = (event) => {
    event.persist();
    this.setNewHorizontalDimentions(event);
  };

  render() {
    const { code, name, evalInContext,
      onChange, props, index, singleExample } = this.props;
    const { containerSize, containerBg, showCode, showPropsEditor,
    containerSizeKey, cursorPosition } = this.state;

    const rootClass = cn(s.root, {
      [s.root_singleExample]: singleExample,
    });


    const previewClass = cn(s.preview, 'rsg--example-preview',
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
            <div
              ref={(c) => { this._previewContainer = c; }}
              className={previewClass}
              style={{
                ...containerSize,
              }}
            >
              {preview}
              <div className={s.sizeDrag}>
                <div
                  className={s.sizeDragH}
                  onDrag={this.handleDragHorizontal}
                  onDragStart={this.handleDragStart}
                />
                <div
                  className={s.sizeDragV}
                  onDrag={this.handleDragVertical}
                  onDragStart={this.handleDragStart}
                />
              </div>
              <div className={s.previewSize}>
                {containerSize.width}x{containerSize.height}
              </div>
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
              containerSize={containerSizeKey}
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
