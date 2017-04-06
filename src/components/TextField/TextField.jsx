import React, { PureComponent, PropTypes } from 'react';
// Helpers
import cn from 'classnames';
import up from 'tools/utils/upperFirst';
import s from './TextField.pcss';

/**
 * Поле для ввода текста, компонент может использоватся
 * как обычный input, так и примитивный textarea
 * @type {ReactPureComponent}
 * @name TextField
 * @namespace components
 * @version 0.1.0
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
    /**
     * Деактивировать поле
     */
    disabled: PropTypes.bool,
    /**
     * Срабатывает при изменении value в поле ввода
     */
    onChange: PropTypes.func,
    /**
     * Срабатывает при получении фокуса полем
     */
    onFocus: PropTypes.func,
    /**
     * Срабатывает при потере фокуса полем
     */
    onBlur: PropTypes.func,
  };

  static defaultProps = {
    value: '',
    placeholder: '',
    floatingLabel: '',
    status: 'normal',
    disabled: false,
    /* eslint-disable no-unused-vars */
    onChange: ({ value }, event) => {},
    onFocus: (event) => {},
    onBlur: (event) => {},
    /* eslint-enable no-unused-vars */
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
  handleFocus = (e) => {
    this.setState({
      isFocused: true,
      isDirty: true,
    });
    this.props.onFocus(e);
  };

  handleBlur = (e) => {
    this.setState({
      isFocused: false,
    });
    this.props.onBlur(e);
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
    this.props.onChange({ value }, e);
  }

  /**
   * Renders
   */
  render() {
    const { name, placeholder, floatingLabel, status, hint, disabled } = this.props;
    const { value, isFocused, isDirty } = this.state;

    const isEmpty = !value;
    const hasFloatingLabel = !!floatingLabel;
    const isLabelFloating = !isEmpty || isFocused;

    const rootCn = cn(s.root, s[`root_is${up(status)}`], {
      [s.root_isFocused]: isFocused,
      [s.root_isDirty]: isDirty,
      [s.root_isDisabled]: disabled,
      [s.root_hasFloatingLabel]: hasFloatingLabel,
      [s.root_hasHint]: !!hint,
    });
    const labelCn = cn(s.label, {
      [s.label_isFloat]: isLabelFloating,
    });
    const placeholderCn = cn(s.placeholder, {
      [s.placeholder_isVisible]: (isLabelFloating && isEmpty)
      || (!hasFloatingLabel && isEmpty),
    });
    const inputCn = cn(s.input);
    const underlineCn = cn(s.underline);
    const underlineStaticCn = cn(s.underlineStatic);
    const underlineDynamicCn = cn(s.underlineDynamic);
    const hintCn = cn(s.hint);

    return (
      <div className={rootCn}>
        {placeholder && <div className={placeholderCn}>{placeholder}</div>}
        {floatingLabel && <div className={labelCn}>{floatingLabel}</div>}
        <input
          type="text"
          name={name}
          value={value}
          className={inputCn}
          disabled={disabled}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        <div className={underlineCn}>
          <hr className={underlineStaticCn} />
          <hr className={underlineDynamicCn} />
        </div>
        {hint && <div className={hintCn}>{hint}</div>}
      </div>
    );
  }
}

export default TextField;
