import React, { Component, PropTypes } from 'react';
import { toastr } from 'react-redux-toastr';
import { Header, Form, FormInput, FormButton } from '../../../common';
import style from './style.scss';

class AgencyCoverage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: '',
      errors: {
        name: '',
      },
    };
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
        <Header title="Agency E & O Coverage" />
        <p>Please enter your E&O carrier and coverage limits</p>
        <div className={style.info}>
          <div className={style.input}>
            <Form onSubmit={this.handleClick} >
              <FormInput
                type="text" label="PlaceHolder" name="name"
                value={this.state.name}
                error={this.state.errors.name}
                onChange={this.handleChange.bind(this, 'name')} />
            </Form>
          </div>
          <FormButton icon="play_arrow" label="Continue" onClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

AgencyCoverage.propTypes = {
  router: PropTypes.object.isRequired,
  validate: PropTypes.func.isRequired,
  next: PropTypes.string.isRequired,
};

export default AgencyCoverage;
