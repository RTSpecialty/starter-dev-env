import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import validator from 'email-validator';
import { toastr } from 'react-redux-toastr';
import style from './style.scss';

function validate(name, value) {
  let error = '';
  switch (name) {
    case 'password': {
      error = (value.length !== 0) ? '' : 'Please enter your password';
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

class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: '',
      password: '',
      errors: {
        password: '',
        error: '',
      },
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(name, value) {
    const state = { ...this.state };
    state[name] = value;
    state.errors[name] = validate(name, value);
    this.setState(state);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.handleClick();
  }

  handleClick() {
    const state = { ...this.state };
    const fields = ['password', 'email'];
    const isValid = fields.map((name) => {
      state.errors[name] = validate(name, state[name]);
      return state.errors[name].length === 0;
    }).reduce((valid, value) => valid && value, true);

    this.setState(state);

    if (isValid) {
      const { email, password } = this.state;
      const { router, actions } = this.props;
      actions.loginUser(email, password)
        .then(() => router.push('/agency/welcome'))
        .catch(error => toastr.error('Oops!', error));
    }
  }

  render() {
    return (
      <Card className={style.login}>
        <CardTitle
          title="Welcome to the Connector Agency Portal"
          subtitle="Login to manage your agency information"
        />
        <div className={style.input}>
          <form onSubmit={this.handleSubmit} >
            <Input
              type="email" label="Email" icon="email" name="username"
              value={this.state.email}
              error={this.state.errors.email}
              onChange={this.handleChange.bind(this, 'email')} />
            <Input
              type="password" label="Password" icon="security" name="password"
              value={this.state.password}
              error={this.state.errors.password}
              onChange={this.handleChange.bind(this, 'password')} />
            <input
              type="submit"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
              tabIndex="-1" />
          </form>
        </div>
        <CardActions>
          <Button icon="done" label="Login" onClick={this.handleClick} />
        </CardActions>
      </Card>
    );
  }
}

Login.propTypes = {
  router: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

export default Login;
