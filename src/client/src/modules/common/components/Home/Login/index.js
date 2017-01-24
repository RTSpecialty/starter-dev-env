import React, { Component } from 'react';
import { Card, CardTitle, CardActions } from 'react-toolbox/lib/card';
import Input from 'react-toolbox/lib/input';
import { Button } from 'react-toolbox/lib/button';
import style from './style.scss';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(name, value) {
    this.setState({ ...this.state, [name]: value });
  }

  handleClick() {
    throw new Error(this.state.email);
  }

  render() {
    return (
      <Card className={style.login}>
        <CardTitle
          title="Welcome to the Connector Agency Portal"
          subtitle="Login to manage your agency information"
        />
        <div className={style.input}>
          <Input
            type="email" label="Email" icon="email" name="username"
            value={this.state.email}
            onChange={this.handleChange.bind(this, 'email')} />
          <Input
            type="password" label="Password" icon="security" name="password"
            value={this.state.password}
            onChange={this.handleChange.bind(this, 'password')} />
        </div>
        <CardActions>
          <Button icon="done" label="Login" onClick={this.handleClick} />
        </CardActions>
      </Card>
    );
  }
}

export default Login;
