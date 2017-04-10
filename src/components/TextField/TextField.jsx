// @flow
import type { InputEvent } from 'tools/types/InputEvent.js.flow';
import React, { PureComponent } from 'react';
// Helpers
import classNameBind from 'classnames/bind';
import up from 'tools/utils/upperFirst';

import s from './TextField.pcss';

const cn = classNameBind.bind(s);

type Props = {
  /**
   * Имя поля
   */
  name: string,
  /**
   * Значение поля
   */
  value: string,
  /**
   * Placeholder для поля
   */
  placeholder: string,
  /**
   * Плавающий label
   */
  floatingLabel: string,
  /**
   * Подсказка для поля ввода
   * самое распространненное использование в качестве
   * показа ошибок валидации
   */
  hint?: string,
  /**
   * Статус поля
   */
  status: 'normal' | 'warning' | 'danger',
  /**
   * Деактивировать поле
   */
  disabled: boolean,
  /**
   * Срабатывает при изменении value в поле ввода
   */
  onChange: (
    args: {
      value: string,
    },
    e: Event,
  ) => void,
  /**
   * Срабатывает при получении фокуса полем
   */
  onFocus: (
    e: Event,
  ) => void,
  /**
   * Срабатывает при потере фокуса полем
   */
  onBlur: (
    e: Event,
  ) => void,
};

type State = {
  value: string,
  isFocused: boolean,
  isDirty: boolean,
};

/**
 * Поле для ввода текста, компонент может использоватся
 * как обычный input, так и примитивный textarea
 * @type {ReactPureComponent}
 * @name TextField
 * @namespace components
 * @version 0.1.1
 */
class TextField extends PureComponent {

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

  constructor(props: Props) {
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

  state: State;

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      value: nextProps.value,
    });
  }

  props: Props;

  /**
   * Handles
   */
  handleFocus = (e: Event) => {
    this.setState({
      isFocused: true,
      isDirty: true,
    });
    this.props.onFocus(e);
  };

  handleBlur = (e: Event) => {
    this.setState({
      isFocused: false,
    });
    this.props.onBlur(e);
  };

  handleChange = (e: InputEvent) => {
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
