import React, { Component, PropTypes } from 'react';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import { toastr } from 'react-redux-toastr';
import { Form, FormInput, FormButton } from '../../../components';
import style from './style.scss';

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
  }

  handleChange(name, value) {
    const state = { ...this.state };
    state[name] = value;
    state.errors[name] = this.props.validate(name, value);
    this.setState(state);
  }

  handleClick() {
    const state = { ...this.state };
    const fields = ['password', 'email'];
    const isValid = fields.map((name) => {
      state.errors[name] = this.props.validate(name, state[name]);
      return state.errors[name].length === 0;
    }).reduce((valid, value) => valid && value, true);

    this.setState(state);

    if (isValid) {
      const { email, password } = this.state;
      const { router, actions } = this.props;
      actions.loginUser(email, password)
        .then(() => router.push('/agency/welcome'))
        .catch(error => toastr.error('Oops!', error.message));
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
          <Form onSubmit={this.handleClick} >
            <FormInput
              type="email" label="Email" icon="email" name="username"
              value={this.state.email}
              error={this.state.errors.email}
              onChange={this.handleChange.bind(this, 'email')} />
            <FormInput
              type="password" label="Password" icon="security" name="password"
              value={this.state.password}
              error={this.state.errors.password}
              onChange={this.handleChange.bind(this, 'password')} />
          </Form>
        </div>
        <CardActions>
          <FormButton icon="done" label="Login" onClick={this.handleClick} />
        </CardActions>
      </Card>
    );
  }
}

Login.propTypes = {
  router: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  validate: PropTypes.func.isRequired,
};

export default Login;
