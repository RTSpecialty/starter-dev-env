import React, { Component, PropTypes } from 'react';

export { default as FormInput } from 'react-toolbox/lib/input';
export { default as FormDropdown } from 'react-toolbox/lib/dropdown';
export { default as FormAutocomplete } from 'react-toolbox/lib/autocomplete';
export { Button as FormButton } from 'react-toolbox/lib/button';

export { default as FormInputMask } from './FormInputMask';

class Form extends Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        {this.props.children}
        <input
          type="submit"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
          tabIndex="-1" />
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.node,
  ]).isRequired,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  onSubmit: () => {},
};

export default Form;
