
import React from 'react';
import classnames from 'classnames';
import InputMask from 'react-input-mask';
import FontIcon from 'react-toolbox/lib/font_icon';
import Input from 'react-toolbox/lib/input';
import theme from './theme.scss';

class FormInputMask extends Input {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { onChange } = this.props;
    const value = event.target.value;
    // propagate to to store and therefore to the input
    if (onChange) onChange(value, event);
  }

  render() {
    const { children, disabled, error, floating, hint, icon,
            name, label: labelText, maxLength, multiline, required,
            composeTheme, theme: superTheme,
            type, value, onKeyPress, rows = 1, ...others } = this.props;
    const length = maxLength && value ? value.length : 0;

    const labelClassName = classnames(theme.label, { [theme.fixed]: !floating });

    const className = classnames(theme.input, {
      [theme.disabled]: disabled,
      [theme.errored]: error,
      [theme.hidden]: type === 'hidden',
      [theme.withIcon]: icon,
    }, this.props.className);

    const valuePresent = value !== null
      && value !== undefined
      && value !== ''
      && !(typeof value === 'number' && isNaN(value));

    const inputElementProps = {
      ...others,
      className: classnames(theme.inputElement, { [theme.filled]: valuePresent }),
      onChange: this.handleChange,
      ref: 'input',
      role: 'input',
      name,
      disabled,
      required,
      type,
      value,
    };
    if (!multiline) {
      inputElementProps.maxLength = maxLength;
      inputElementProps.onKeyPress = onKeyPress;
    } else {
      inputElementProps.rows = rows;
      inputElementProps.onKeyPress = this.handleKeyPress;
    }

    // debugger;

    /* eslint-disable jsx-a11y/label-has-for */
    return (
      <div data-react-toolbox="input" className={className}>
        <InputMask {...inputElementProps} />
        {icon ? <FontIcon className={theme.icon} value={icon} /> : null}
        <span className={theme.bar} />
        {labelText
          ? <label className={labelClassName}>
            {labelText}
            {required ? <span className={theme.required}> * </span> : null}
          </label>
          : null}
        {hint ? <span hidden={labelText} className={theme.hint}>{hint}</span> : null}
        {error ? <span className={theme.error}>{error}</span> : null}
        {maxLength ? <span className={theme.counter}>{length}/{maxLength}</span> : null}
        {children}
      </div>
    );
  }
}

export default FormInputMask;
