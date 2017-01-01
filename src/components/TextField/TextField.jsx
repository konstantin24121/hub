import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';

import s from './TextField.css';

/**
 * Поле для ввода текста, компонент может использоватся
 * как обычный input, так и примитивный textarea
 */
class TextField extends PureComponent {
  static propTypes = {
    /**
     * Имя поля
     */
    name: PropTypes.string.isRequired,
    /**
     * Значение поля
     */
    value: PropTypes.string,
    /**
     * Placeholder для поля
     */
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    value: '',
    placeholder: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isFocused: false,
      /**
       * Поле было тронуто пользователем
       */
      isDirty: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value,
    });
  }

  /**
   * Handles
   */
  handleFocus = () => {
    this.setState({
      isFocused: true,
      isDirty: true,
    });
  };

  handleBlur = () => {
    this.setState({
      isFocused: false,
    });
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  /**
   * Renders
   */
  render() {
    const { name, placeholder } = this.props;
    const { value, isFocused, isDirty } = this.state;

    const rootStyle = cn(s.root, {
      [s.root_isFocused]: isFocused,
      [s.root_isDirty]: isDirty,
    });
    const placeholderStyle = cn(s.root__placeholder, {
      [s.root__placeholder_isVisible]: !value,
    });
    const inputStyle = cn(s.root__input);
    const underlineStyle = cn(s.root__underline);
    const underlineStaticStyle = cn(s.root__underline_static);
    const underlineDynamicStyle = cn(s.root__underline_dynamic);

    return (
      <div className={rootStyle}>
        <div className={placeholderStyle}>{placeholder}</div>
        <input
          type="text"
          name={name}
          value={value}
          className={inputStyle}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <div className={underlineStyle}>
          <hr className={underlineStaticStyle} />
          <hr className={underlineDynamicStyle} />
        </div>
      </div>
    );
  }
}

export default TextField;
/**
 * version: 0.0.1
 */
