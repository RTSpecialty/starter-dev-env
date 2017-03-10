import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import { toastr } from 'react-redux-toastr';
import validator from 'email-validator';
import style from './style.scss';

function validate(name, value) {
  let error = '';
  switch (name) {
    case 'firstName': {
      error = (value.length !== 0) ? '' : 'Please enter your first name';
      break;
    }
    case 'lastName': {
      error = (value.length !== 0) ? '' : 'Please enter your last name';
      break;
    }
    case 'email': {
      const valid = validator.validate(value);
      error = (valid && value.length !== 0) ? '' : 'Please enter a valid email address';
      break;
    }
    default:
  }
  return error;
}

class Register extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      formDisabled: false,
      dialogActive: false,
      firstName: '',
      lastName: '',
      email: '',
      errors: {
        firstName: '',
        lastName: '',
        error: '',
      },
    };
    this.handleDialog = this.handleDialog.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleServerError = this.handleServerError.bind(this);
    this.actions = [{ label: 'Ok', onClick: this.handleDialog }];
  }

  handleDialog() {
    this.setState({ ...this.state, dialogActive: !this.state.dialogActive });
  }

  handleChange(name, value) {
    const state = { ...this.state };
    state[name] = value;
    state.errors[name] = validate(name, value);
    this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleRegister();
  }

  handleServerError(error) {
    this.setState({ ...this.state, formDisabled: false });
    toastr.error('Oops!', error);
  }

  handleRegister() {
    const state = { ...this.state };
    const fields = ['firstName', 'lastName', 'email'];
    const isValid = fields.map((name) => {
      state.errors[name] = validate(name, state[name]);
      return state.errors[name].length === 0;
    }).reduce((valid, value) => valid && value, true);
    state.formDisabled = isValid;
    this.setState(state);

    if (isValid) {
      const { firstName, lastName, email: username } = this.state;
      this.props.actions.registerUser({ firstName, lastName, username })
        .then(this.handleDialog)
        .catch(this.handleServerError);
    }
  }

  render() {
    return (
      <Card className={style.register}>
        <CardTitle
          title="Welcome to the Connector Agency Portal"
          subtitle="Enter your email to begin the onboading process"
        />
        <div className={style.input}>
          <form onSubmit={this.handleSubmit} >
            <div className={style.names}>
              <div className={style.name}>
                <Input
                  type="text" label="First Name" icon="account_box" name="firstName"
                  value={this.state.firstName}
                  error={this.state.errors.firstName}
                  disabled={this.state.formDisabled}
                  onChange={this.handleChange.bind(this, 'firstName')} />
              </div>
              <div className={style.name}>
                <Input
                  type="text" label="Last Name" name="lastName"
                  value={this.state.lastName}
                  error={this.state.errors.lastName}
                  disabled={this.state.formDisabled}
                  onChange={this.handleChange.bind(this, 'lastName')} />
              </div>
            </div>
            <Input
              type="email" label="Email" icon="email" name="username"
              value={this.state.email}
              error={this.state.errors.email}
              disabled={this.state.formDisabled}
              onChange={this.handleChange.bind(this, 'email')} />
            <input
              type="submit"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
              tabIndex="-1" />
          </form>
        </div>
        <CardActions>
          <Button
            icon="send"
            label="Register"
            onClick={this.handleRegister}
            disabled={this.state.formDisabled} />
          <Dialog
            actions={this.actions}
            active={this.state.dialogActive}
            onEscKeyDown={this.handleDialog}
            onOverlayClick={this.handleDialog}
            title="Confirmation email has been sent" >
            <p>Please check your inbox for the confirmation email
               and the link to continue registering your agency.</p>
          </Dialog>
        </CardActions>
      </Card>
    );
  }
}

Register.propTypes = {
  actions: PropTypes.object.isRequired,
};

export default Register;
