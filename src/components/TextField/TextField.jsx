import React, { PureComponent, PropTypes } from 'react';
// Helpers
import cn from 'classnames';
import capitalize from 'lodash/capitalize';

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
    /**
     * Плавающий label
     */
    floatingLabel: PropTypes.string,
    /**
     * Подсказка для поля ввода
     * самое распространненное использование в качестве
     * показа ошибок валидации
     */
    hint: PropTypes.string,
    /**
     * Статус поля
     */
    status: PropTypes.oneOf(['normal', 'warning', 'danger']),
  };

  static defaultProps = {
    value: '',
    placeholder: '',
    floatingLabel: '',
    status: 'normal',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      isFocused: false,
      /**
       * Поле было затронуто пользователем
       * как церковный мальчик католическим священником
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
    const { name, placeholder, floatingLabel, status, hint } = this.props;
    const { value, isFocused, isDirty } = this.state;

    const isEmpty = !value;
    const hasFloatingLabel = !!floatingLabel;
    const isLabelFloating = !isEmpty || isFocused;

    const rootStyle = cn(s.root, s[`root_is${capitalize(status)}`], {
      [s.root_isFocused]: isFocused,
      [s.root_isDirty]: isDirty,
    });
    const labelStyle = cn(s.root__label, {
      [s.root__label_isFloat]: isLabelFloating,
    });
    const placeholderStyle = cn(s.root__placeholder, {
      [s.root__placeholder_isVisible]: (isLabelFloating && isEmpty)
      || (!hasFloatingLabel && isEmpty),
    });
    const inputStyle = cn(s.root__input);
    const underlineStyle = cn(s.root__underline);
    const underlineStaticStyle = cn(s.root__underline_static);
    const underlineDynamicStyle = cn(s.root__underline_dynamic);
    const hintStyle = cn(s.root__hint);

    return (
      <div className={rootStyle}>
        {placeholder && <div className={placeholderStyle}>{placeholder}</div>}
        {floatingLabel && <div className={labelStyle}>{floatingLabel}</div>}
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
        {hint && <div className={hintStyle}>{hint}</div>}
      </div>
    );
  }
}

export default TextField;
/**
 * version: 0.0.1
 */
