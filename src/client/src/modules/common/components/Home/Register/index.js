import React, { Component } from 'react';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import Dialog from 'react-toolbox/lib/dialog';
import validator from 'email-validator';
import style from './style.scss';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      disabled: false,
      active: false,
      email: '',
      error: '',
    };
    this.handleDialog = this.handleDialog.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.actions = [{ label: 'Ok', onClick: this.handleDialog }];
  }

  handleDialog() {
    this.setState({ ...this.state, active: !this.state.active });
  }

  handleChange(value) {
    const state = { ...this.state, email: value };
    const valid = validator.validate(value);
    state.error = (valid && state.error.length !== 0) ? '' : state.error;
    this.setState(state);
  }

  handleRegister() {
    const valid = validator.validate(this.state.email);
    if (!valid) {
      this.setState({ ...this.state, error: 'Please enter a valid email address' });
    } else {
      this.setState({ active: true, disabled: true });
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
          <Input
            type="email" label="Email" icon="email" name="username"
            value={this.state.email}
            error={this.state.error}
            disabled={this.state.disabled}
            onChange={this.handleChange} />
        </div>
        <CardActions>
          <Button
            icon="send"
            label="Register"
            onClick={this.handleRegister}
            disabled={this.state.disabled} />
          <Dialog
            actions={this.actions}
            active={this.state.active}
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

export default Register;
