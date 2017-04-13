import React, { PureComponent, PropTypes } from 'react';

import cn from 'classnames';
import s from './RaisedButton.css';

class CustomRipple extends PureComponent {
  static propTypes = {
    t: PropTypes.number,
    l: PropTypes.number,
    d: PropTypes.number,
    index: PropTypes.number,
    stamp: PropTypes.number,
    onTransitionEnd: PropTypes.func
  };

  static defaultProps = {
    t: 0,
    l: 0,
    d: 0,
    stamp: Date.now(),
    onTransitionEnd: (e) => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      isEnter: false
    }

  }

  handleTransitionEnd = (e) =>  {
    console.log('handleTransitionEnd', arguments);
    this.props.onTransitionEnd(this.props.index);
  }

  render() {

    const {isEnter} = this.state;
    const rippleAreaCn = cn(s.ripple_area, {
      [s.isRipple] : isEnter
    });
    console.log('rippleAreaCn');
    console.log(rippleAreaCn);
    const rippleWaveCn = cn(s.ripple_wave);
    const {t, l, d} = this.props;
    const rippleStyle = {
      top: t + 'px',
      left: l + 'px',
      width: d + 'px',
      height: d + 'px'
    };

    return (
      <div className={rippleAreaCn}>
        <div
          className={rippleWaveCn}
          style={rippleStyle}
          onTransitionEnd={this.handleTransitionEnd}
        >
        </div>
      </div>
    );
  }
}

export default CustomRipple;
