import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import Dialog from 'react-toolbox/lib/dialog';
import { toastr } from 'react-redux-toastr';
import { Form, FormInput, FormButton } from '../../../components';
import style from './style.scss';

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
    this.handleRegister = this.handleRegister.bind(this);
    this.handleServerError = this.handleServerError.bind(this);
    this.actions = [{ label: 'Ok', onClick: this.handleDialog }];
  }

  handleDialog() {
    this.setState({ ...this.state, dialogActive: !this.state.dialogActive });
    this.props.router.push('/user/password/new');
  }

  handleChange(name, value) {
    const { validate } = this.props;
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
    const { actions, validate } = this.props;
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
      actions.registerUser({ firstName, lastName, username })
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
          <Form onSubmit={this.handleRegister} >
            <div className={style.names}>
              <div className={style.name}>
                <FormInput
                  type="text" label="First Name" icon="account_box" name="firstName"
                  value={this.state.firstName}
                  error={this.state.errors.firstName}
                  disabled={this.state.formDisabled}
                  onChange={this.handleChange.bind(this, 'firstName')} />
              </div>
              <div className={style.name}>
                <FormInput
                  type="text" label="Last Name" name="lastName"
                  value={this.state.lastName}
                  error={this.state.errors.lastName}
                  disabled={this.state.formDisabled}
                  onChange={this.handleChange.bind(this, 'lastName')} />
              </div>
            </div>
            <FormInput
              type="email" label="Email" icon="email" name="username"
              value={this.state.email}
              error={this.state.errors.email}
              disabled={this.state.formDisabled}
              onChange={this.handleChange.bind(this, 'email')} />
          </Form>
        </div>
        <CardActions>
          <FormButton
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
  router: PropTypes.object.isRequired,
  validate: PropTypes.func.isRequired,
};

export default Register;
