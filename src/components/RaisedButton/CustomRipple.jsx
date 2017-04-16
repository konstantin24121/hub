import React, { PureComponent, PropTypes } from 'react';

import cn from 'classnames';
import s from './CustomRipple.css';

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

  handleTransitionEnd = (e) =>  {
    this.props.onTransitionEnd(this.props.stamp, e);
  }

  render() {
    const rippleWaveCn = cn(s.ripple_wave);
    const {t, l, d} = this.props;
    const rippleStyle = {
      top: t + 'px',
      left: l + 'px',
      width: d + 'px',
      height: d + 'px'
    };

    return (
      <div
        className={rippleWaveCn}
        style={rippleStyle}
        onTransitionEnd={this.handleTransitionEnd}
      >
      </div>
    );
  }
}

export default CustomRipple;
