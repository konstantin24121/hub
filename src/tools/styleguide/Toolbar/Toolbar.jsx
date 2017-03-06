import React, { PropTypes, PureComponent } from 'react';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import Palette from 'material-ui/svg-icons/image/palette';
import Snackbar from 'material-ui/Snackbar';
import Tv from 'material-ui/svg-icons/hardware/tv';
import Laptop from 'material-ui/svg-icons/hardware/laptop';
import Tablet from 'material-ui/svg-icons/hardware/tablet-android';
import Phone from 'material-ui/svg-icons/hardware/phone-android';
import CopyToClipboard from 'react-copy-to-clipboard';

import { cyan500 } from 'material-ui/styles/colors';
import Responsive from 'react-responsive-decorator';
import cn from 'classnames';

import { createSettingsLink } from '../utils/settingsLink';
import s from './Toolbar.css';

@Responsive
class Toolbar extends PureComponent {
  static propTypes = {
    containerSizeKey: PropTypes.string.isRequired,
    containerBg: PropTypes.string.isRequired,
    showCode: PropTypes.bool.isRequired,
    showPropsEditor: PropTypes.bool.isRequired,
    onColorChange: PropTypes.func.isRequired,
    onSizeChange: PropTypes.func.isRequired,
    onCodeClick: PropTypes.func.isRequired,
    containerSize: PropTypes.shape(
      { width: PropTypes.number, height: PropTypes.number }
    ).isRequired,
    urlProps: PropTypes.arrayOf(PropTypes.string),
    onPropsEditorClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      snackbarOpen: false,
      settingsLink: location.href,
    };
  }

  componentWillMount() {
    const { media } = this.props;
    media({ minWidth: 450 }, () => {
      this.setState({
        isMobile: false,
      });
    });

    media({ maxWidth: 800 }, () => {
      this.setState({
        isMobile: true,
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { containerSizeKey, containerBg, containerSize } = nextProps;
    const settings = { containerSizeKey, containerBg };
    if (containerSizeKey === 'Custom') settings.containerSize = containerSize;
    this.setState({
      settingsLink: createSettingsLink(nextProps.urlProps, settings),
    });
  }

  handleOnCopy = () => {
    this.setState({
      snackbarOpen: true,
    });
  }

  handleClose = () => {
    this.setState({
      snackbarOpen: false,
    });
  }

  renderDimentionSet = () => {
    const { containerSizeKey, onSizeChange } = this.props;
    return (
      <span>

        <IconButton
          iconClassName="material-icons"
          onClick={onSizeChange('Lg')}
          iconStyle={{ color: containerSizeKey === 'Lg' ? cyan500 : 'currentColor' }}
        >
          tv
        </IconButton>
        <IconButton
          iconClassName="material-icons"
          onClick={onSizeChange('Md')}
          iconStyle={{ color: containerSizeKey === 'Md' ? cyan500 : 'currentColor' }}
        >
          laptop
        </IconButton>
        <IconButton
          iconClassName="material-icons"
          onClick={onSizeChange('Sm')}
          iconStyle={{ color: containerSizeKey === 'Sm' ? cyan500 : 'currentColor' }}
        >
          tablet_android
        </IconButton>
        <IconButton
          iconClassName="material-icons"
          onClick={onSizeChange('Xs')}
          iconStyle={{ color: containerSizeKey === 'Xs' ? cyan500 : 'currentColor' }}
        >
          phone_android
        </IconButton>
      </span>
    );
  };

  renderDimentionSelect = () => {
    const { containerSizeKey, onSizeChange } = this.props;
    const handle = (event, value) => onSizeChange(value)();
    return (
      <IconMenu
        onChange={handle}
        value={containerSizeKey}
        iconButtonElement={
          <IconButton
            touch
            iconStyle={{ color: cyan500 }}
          >
            {containerSizeKey === 'Lg' && <Tv />}
            {containerSizeKey === 'Md' && <Laptop />}
            {containerSizeKey === 'Sm' && <Tablet />}
            {containerSizeKey === 'Xs' && <Phone />}
          </IconButton>
        }
      >
        <MenuItem value="Lg" primaryText="Desctop" />
        <MenuItem value="Md" primaryText="Laptop" />
        <MenuItem value="Sm" primaryText="Tablet" />
        <MenuItem value="Xs" primaryText="Phone" />
      </IconMenu>
    );
  };


  render() {
    const { containerBg, showCode, showPropsEditor,
    onColorChange, onCodeClick, onPropsEditorClick } = this.props;
    const { isMobile, settingsLink } = this.state;

    return (
      <div className={s.toolbar}>
        <div className={s.toolbarGroup}>
          {isMobile ? this.renderDimentionSelect() : this.renderDimentionSet()}
          <div className={s.toolbarSeparator} />
          <IconMenu
            onChange={onColorChange}
            value={containerBg}
            iconButtonElement={
              <IconButton touch>
                <Palette />
              </IconButton>
            }
          >
            <MenuItem value="Dark" primaryText="Dark" />
            <MenuItem value="Light" primaryText="Light" />
            <MenuItem value="Transparent" primaryText="Transparent" />
          </IconMenu>
        </div>
        <div className={cn(s.toolbarGroup, s.toolbarGroup_left)}>
          <div className={s.toolbarSeparator} />
          <IconButton
            iconClassName="material-icons"
            onClick={onPropsEditorClick}
            iconStyle={{ color: showPropsEditor ? cyan500 : 'currentColor' }}
          >
            tune
          </IconButton>
          <IconButton
            iconClassName="material-icons"
            onClick={onCodeClick}
            iconStyle={{ color: showCode ? cyan500 : 'currentColor' }}
          >
            code
          </IconButton>
          <CopyToClipboard
            text={settingsLink}
            onCopy={this.handleOnCopy}
          >
            <IconButton
              iconClassName="material-icons"
              onClick={this.handleOpen}
            >
              link
            </IconButton>
          </CopyToClipboard>
        </div>
        <Snackbar
          open={this.state.snackbarOpen}
          message="Component settings copy at you buffer"
          autoHideDuration={4000}
          onRequestClose={this.handleClose}
        />
      </div>
    );
  }
}

export default Toolbar;
