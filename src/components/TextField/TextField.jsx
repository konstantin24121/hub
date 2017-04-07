import React, { PureComponent, PropTypes } from 'react';
// Helpers
import classNameBind from 'classnames/bind';
import up from 'tools/utils/upperFirst';
import s from './TextField.pcss';

const cn = classNameBind.bind(s);
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

    const rootCn = cn({
      root: true,
      [`root_is${up(status)}`]: true,
      root_isFocused: isFocused,
      root_isDirty: isDirty,
      root_isDisabled: disabled,
      root_hasFloatingLabel: hasFloatingLabel,
      root_hasHint: !!hint,
    });
    const labelCn = cn({
      label: true,
      label_isFloat: isLabelFloating,
    });
    const placeholderCn = cn({
      placeholder: true,
      placeholder_isVisible: (isLabelFloating && isEmpty)
      || (!hasFloatingLabel && isEmpty),
    });
    const inputCn = cn({ input: true });
    const underlineCn = cn({ underline: true });
    const underlineStaticCn = cn({ underlineStatic: true });
    const underlineDynamicCn = cn({ underlineDynamic: true });
    const hintCn = cn({ hint: true });

    return (
      <div className={rootCn}>
        яzad
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
