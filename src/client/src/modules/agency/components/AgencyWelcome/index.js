import React, { Component, PropTypes } from 'react';
import { toastr } from 'react-redux-toastr';
import { Header, Form, FormInput, FormDropdown, FormButton } from '../../../common';
import { classifications } from '../../constants';
import style from './style.scss';

class Welcome extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      class: '',
      fein: '',
      errors: {
        name: '',
        class: '',
        fein: '',
      },
    };
    this.label = 'FIEN';
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { router, next } = this.props;
    toastr.success('Bam!', this.state.name);
    router.push(next);
  }

  handleChange(name, value) {
    const state = { ...this.state };
    state[name] = value;
    state.errors[name] = this.props.validate(name, value);
    this.setState(state);
  }

  render() {
    return (
      <div className={style.component}>
        <Header title="Welcome" />
        <p>Please identify your agency</p>
        <div className={style.info}>
          <div className={style.input}>
            <Form onSubmit={this.handleClick} >
              <FormInput
                type="text" label="Full Agency Name" name="name"
                value={this.state.name}
                error={this.state.errors.name}
                onChange={this.handleChange.bind(this, 'name')} />
              <FormDropdown
                auto
                label="Federal Tax Classification" name="class"
                source={classifications}
                value={this.state.class}
                onChange={this.handleChange.bind(this, 'class')} />
              <FormInput
                type="text" label={this.label} name="fein"
                value={this.state.fein}
                error={this.state.errors.fein}
                onChange={this.handleChange.bind(this, 'fein')} />
            </Form>
          </div>
          <FormButton icon="play_arrow" label="Continue" onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

Welcome.propTypes = {
  router: PropTypes.object.isRequired,
  validate: PropTypes.func,
  next: PropTypes.string.isRequired,
};

Welcome.defaultProps = {
  validate: () => '',
};

export default Welcome;
